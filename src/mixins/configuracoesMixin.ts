import { store } from "@/store/index";
import { Preferences } from "@capacitor/preferences";

export const configuracoesMixin = {
  methods: {
    async carregaModoDark() {
      if (!(await Preferences.get({ key: "modoDark" })).value) {
        await Preferences.set({ key: 'modoDark', value: 'true' });
      }

      const modoDark = (await Preferences.get({ key: "modoDark" })).value === 'true';
      store.commit("setModoDark", modoDark);
      store.state.configuracoes.modoDark = modoDark
      document.documentElement.classList.toggle("ion-palette-dark", modoDark);
    },
  },
};
