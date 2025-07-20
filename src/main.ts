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

const messages = {
  'pt-br': ptBr,
  'en-us': enUs,
  'es-es': esEs
}

const supportedLocales = ['pt-br', 'en-us', 'es-es']

function getBrowserLocale() {
  const navLang = navigator.language.toLowerCase()
  if (supportedLocales.includes(navLang)) {
    return navLang
  }
  const prefix = navLang.split('-')[0]
  const found = supportedLocales.find(l => l.startsWith(prefix))
  if (found) return found
  return 'en-us' // padrão
}

function getSavedLocale(): string | null {
  return localStorage.getItem('locale')
}

function setSavedLocale(locale: string) {
  localStorage.setItem('locale', locale)
}

const locale = getSavedLocale() ?? (() => {
  const browserLocale = getBrowserLocale()
  setSavedLocale(browserLocale)
  return browserLocale
})()

const i18n = createI18n({
  legacy: false, // para Composition API (vue 3)
  locale,
  fallbackLocale: 'pt-br',
  messages,
  defaultLocale: 'pt-br',
})

const app = createApp(App)
  .use(store, key)
  .use(i18n)
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});
