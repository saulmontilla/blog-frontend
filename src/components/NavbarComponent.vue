<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark-blue">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Laravel-Sanctum</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item" v-if="loggedIn">
            <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
        </ul>

        <!-- If is Guest -->
        <ul v-if="!loggedIn" class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
          <li class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
          </li>
        </ul>

        <!-- If is Logged in -->
        <ul v-else class="navbar-nav">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-expanded="false"
            >
                {{ userName }}
            </a>
            <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <button 
                  class="dropdown-item"
                  @click="logout()"
                >
                    Logout
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { authComputed } from "@/store/helpers.js";

export default {
  name: "navbar-component",
  computed: {
    ...authComputed
  },
  methods: {
      logout () {
          this.$store.dispatch('auth/logout')
          this.$router.go(0)
      }
  }
};
</script>