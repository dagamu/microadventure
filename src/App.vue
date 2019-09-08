<template>
  <div>
    <Nav/>
    <div class="row">
      
      <div class="col s12 l3 ">
        <Menu/>
      </div>

      <div class="col s12 l7 ">
        <CanvasContainer/>
      </div>
      
      <div class="col s12 l2">
        <SideBar/>
      </div>

      <div class="col s12 l5" >
        <Login/>
      </div>
    </div>
  </div>
</template>

<script>

  import CanvasContainer from './components/CanvasContainer'
  import Menu from './components/Menu'
  import Nav from './components/Nav'
  import SideBar from './components/SideBar'
  import Login from './components/Login'

  export default {
    components: {
      CanvasContainer,
      Menu,
      Nav,
      SideBar,
      Login
    }
  }
</script>
