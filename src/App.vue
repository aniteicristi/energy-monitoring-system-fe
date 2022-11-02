<template>
  <v-app>
    <v-main>
      <v-app-bar color="primary">
        <RouterLink to="/">
          <v-btn plain><v-icon icon="mdi-home"></v-icon></v-btn
        ></RouterLink>
        <RouterLink to="/">
          <v-btn plain><v-icon icon="mdi-flash" color="white"></v-icon></v-btn
        ></RouterLink>
        <v-app-bar-title>Energy Monitor</v-app-bar-title>
      </v-app-bar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup></script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
</style>
