import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./plugins/router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

loadFonts();

const pinia = createPinia();

createApp(App).use(vuetify).use(pinia).use(router).mount("#app");
