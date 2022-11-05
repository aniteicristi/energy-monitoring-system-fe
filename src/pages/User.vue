<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id;
</script>

<template>
  <v-main>User {{ id }}</v-main>
</template>

<style></style>
