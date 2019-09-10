<template>
    <div class="card">
        <div class="card-image">
            
        </div>
        <div class="card-content">
            <span v-text="this.status" class="card-title"></span>
            <div v-if="this.status == 'Ingresa'">
                <div class="row">
                    <form class="col s12">
                        <div class="row section">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">account_circle</i>
                                <input 
                                v-model='loginData.email'
                                id="loginEmail"
                                type="email"
                                class="validate"
                                required
                                />
                                <label for="loginEmail">Email</label>
                            </div>
                            <div class="input-field col s12">
                                <i class="material-icons prefix">vpn_key</i>
                                <input 
                                v-model='loginData.password' 
                                id="loginPass" 
                                type="password" 
                                class="validate"
                                required
                                />
                                <label for="loginPass">Contraseña</label>
                            </div>
                            <div class="col s12">
                                <a href="#" v-on:click="this.signup">No tienes una Cuenta?</a>   
                                <a class="waves-effect waves-light btn right" v-on:click='this.loginSubmit'><i class="material-icons right">cloud</i>Enviar</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div v-else-if="this.status == 'Registrate'">
                <div class="row">
                    <form class="col s12">
                        <div class="row section">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">account_circle</i>
                                <input 
                                v-model='signupData.email'
                                id="signupEmail"
                                type="email"
                                class="validate"
                                required
                                />
                                <label for="signupEmail">Email</label>
                            </div>
                            <div class="input-field col s12">
                                <i class="material-icons prefix">vpn_key</i>
                                <input 
                                v-model='signupData.password' 
                                id="signupPass" 
                                type="password" 
                                class="validate"
                                data-length="10"
                                required
                                />
                                <label for="signupPass">Contraseña</label>
                            </div>
                            <div class="input-field col s12">
                                <i class="material-icons prefix">vpn_key</i>
                                <input 
                                v-model='signupData.rePassword' 
                                id="signupRePass" 
                                type="password" 
                                class="validate"
                                required
                                />
                                <label for="signupRePass">Repeticion de la Contraseña</label>
                            </div>
                            <div class="col s12">
                                <a href="#" v-on:click="this.login">Ya Tienes una Cuenta?</a>
                                <a class="waves-effect waves-light btn right" v-on:click='this.signupSubmit'><i class="material-icons right">cloud</i>Enviar</a>
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div>


        </div>
    </div>
</template>
<script>
import Firebase from 'firebase/app';
require('firebase/database');

M.AutoInit();

var FirebaseConfig = {
    apiKey: "AIzaSyAwC-JhePY8S69bfcocq4KeSzjwcGwe1dM",
    authDomain: "microadventure-64643.firebaseapp.com",
    databaseURL: "https://microadventure-64643.firebaseio.com",
    projectId: "microadventure-64643",
    storageBucket: "",
    messagingSenderId: "105267431231",
    appId: "1:105267431231:web:30ff15d936592faa"
};


Firebase.initializeApp(FirebaseConfig);
var db = Firebase.database();

let usersRef = db.ref('users');
console.log(usersRef)

export default {
    firebase: {
        users: usersRef
    },
    data() {
        return{
            loginData: {
                email: '',
                password: ''
            },
            signupData: {
                email: '',
                password: '',
                rePassword: ''  
            },
            status: 'Registrate'
        }
    },
    methods: {
        validarEmail: function(email){
            var method = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
            return method.test(email)
        },
        login: function () {
            this.status = 'Ingresa';
        },
        signup: function () {
            this.status = 'Registrate';
        },
        loginSubmit: function() {
            if( this.loginData.email != '' && this.loginData.password != ''){
                if(this.validarEmail(this.loginData.email)){


                    var dataLogin = this.loginData;

                    usersRef.orderByKey().on("value", function(snp){
                                    snp.forEach(function(data){
                                        if ( data.val().email == dataLogin.email && data.val().password === dataLogin.password) {
                                            
                                            M.toast({html:'Has Ingresado'})

                                            this.loginData.email = '';
                                            this.loginData.password = '';

                                           }else{

                                                M.toast({html:'Cuenta no Encontrada'})
                                            
                                        }
                                    })
                                })

                }else{
                    M.toast({html:'Email no Valido'})
                }

            }else {
                M.toast({html:'Completa todos los Campos'})
            }
        },
        signupSubmit : function () {
            if( this.signupData.email != '' && this.signupData.password != '' && this.signupData.rePassword != ''){
                if(this.validarEmail(this.signupData.email)){
                    if( this.signupData.password.length >= 10 ){
                        if ( this.signupData.password === this.signupData.rePassword ) {

                            var repeatEmail = false;
                            var dataSignup = this.signupData;
                           
                            usersRef.orderByKey().on("value", function(snp){
                                    snp.forEach(function(data){
                                        if ( data.val().email == dataSignup.email ) {
                                            repeatEmail = true;
                                        }
                                    })
                                })

                            if( !repeatEmail ){

                                usersRef.push({
                                    email: this.signupData.email,
                                    password: this.signupData.password
                                });

                                this.signupData.email = '';
                                this.signupData.password = '';
                                this.signupData.rePassword = '';

                            } else {
                                M.toast({html:'Tu Correo ya esta Usado'})

                            }


                        }else{
                            M.toast({html:'Las Contraseñas no Coinciden'})
                        }
                    }else{
                        M.toast({html:'Tu Contraseña no es Suficiente'})
                    }
                }else{
                    M.toast({html:'Email no Valido'})
                }

            }else {
                M.toast({html:'Completa todos los Campos'})
            }
        }
    }

}
</script>