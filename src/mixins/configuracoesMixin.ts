import { store } from "@/store/index";

export const configuracoesMixin = {
  methods: {
    carregaModoDark() {
      if (!localStorage.getItem("modoDark")) {
        localStorage.setItem(
          "modoDark",
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "true"
            : "false"
        );
      }

      const modoDark = localStorage.getItem("modoDark") === "true";
      store.commit("setModoDark", modoDark);
      document.documentElement.classList.toggle("ion-palette-dark", modoDark);
    },
  },
};
