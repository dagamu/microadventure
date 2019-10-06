import Vue from 'vue';
import Vuex from 'vuex'
import Firebase from 'firebase/app';

Vue.use(Vuex)

require('firebase/database');

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
var usersRef = db.ref('users')



export const store = new Vuex.Store({
	state: {
		db,
        usersRef,
        numUsers: 0,
        cell: ''
	},
    mutations: {
        incrementUsersNum (state) {
          state.numUsers++
        },
        updateUsersNum (state, num ) {
          state.numUsers = num
        },
        updateCell(state, cell){
            state.cell = cell;
        }


    }
})