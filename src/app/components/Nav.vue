<template>
    <nav>
        <div class="nav-wrapper valign  blue darken-4" style="width:100%">
            <a href="http://colegionesperanza.cl" target="_blank" class="brand-logo" style="display: flex;align-items: center;">
                <img class="responsive-img left" width="40" src="http://colegionesperanza.cl/content/esp.ico" style="margin-left:10px" />
                <span style="margin-left:50px;">MicroAdventure</span></a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><a target="_blank" href="https://github.com/Dagamu110/microadventure">Codigo Web</a></li>
                <li><a target="_blank" href="editor.p5js.org/Dagamu110/present/igodaxxUK">Codigo iFrame</a></li>
                <li><a href="collapsible.html">Jugadores</span></a></li>
            </ul>
    </div>
</nav>
</template>
<script type="text/javascript">
    

    export default {
        data (){
            return {
                db: this.$store.state.db,
                usersRef: this.$store.state.usersRef,
                numUsers: this.$store.state.numUsers
            }
        },
        mounted: function(){

            var store = this.$store

           this.usersRef.on("child_added", function(snap) {
              store.commit('incrementUsersNum')
            });
           this.usersRef.once("value", function(snap) {
                var num = snap.numChildren();
                console.log(num)
                store.commit('updateUsersNum', num )
            });
        }
    }

</script>
