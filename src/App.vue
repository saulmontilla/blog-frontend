<template>
  <div id="app">
    <navbar-component />

    <router-view class="container-fluid"/>

    <notification-container />
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent'
import NotificationContainer from '@/components/notification/NotificationContainerComponent'

export default {
  components: {
    NavbarComponent,
    NotificationContainer
  }  
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.bg-dark-blue {
  background-color: darkblue;
}

.navbar a.router-link-exact-active {
  color: #fff !important;
}

.form-group {
  margin-bottom: 1rem;
}
</style>
