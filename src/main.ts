import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';
import { IonicVue } from '@ionic/vue';
import { key, store } from './store/index';
import ptBr from './locales/pt-br'
import enUs from './locales/en-us'
import esEs from './locales/es-es'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
import '@ionic/vue/css/palettes/dark.class.css';
/* import '@ionic/vue/css/palettes/dark.system.css'; */

/* Theme variables */
import './theme/variables.css';

/* Global styles */
import './theme/global.css';

const messages = {
  'pt-br': ptBr,
  'en-us': enUs,
  'es-es': esEs
}

const i18n = createI18n({
  legacy: false,
  locale: 'pt-br',
  fallbackLocale: 'pt-br',
  defaultLocale: 'pt-br',
  messages,
})

const app = createApp(App)
  .use(store, key)
  .use(i18n)
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});
