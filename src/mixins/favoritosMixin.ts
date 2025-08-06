import { ItemNoticia } from "@/models/itemNoticia";
import { Preferences } from "@capacitor/preferences";

export const favoritosMixin = {
  methods: {
    async favoritarNoticia(item: ItemNoticia) {
      item.favorito = !item.favorito;

      const noticiasFavoritas = await Preferences.get({
        key: "noticiasFavoritas",
      });
      let noticiasFavoritasArray = noticiasFavoritas.value
        ? JSON.parse(noticiasFavoritas.value)
        : [];

      if (item.favorito) {
        noticiasFavoritasArray.push(item);
      } else {
        noticiasFavoritasArray = noticiasFavoritasArray.filter(
          (noticia: ItemNoticia) => noticia.id !== item.id
        );
      }

      await Preferences.set({
        key: "noticiasFavoritas",
        value: JSON.stringify(noticiasFavoritasArray),
      });
    },
    async carregarNoticiasFavoritas() {
      const noticiasFavoritas = await Preferences.get({
        key: "noticiasFavoritas",
      });
      const noticiasFavoritasArray = noticiasFavoritas.value
        ? JSON.parse(noticiasFavoritas.value)
        : [];

      return noticiasFavoritasArray;
    },
    async buscaQtdNoticiasFavoritas() {
      const noticiasFavoritas = await Preferences.get({
        key: "noticiasFavoritas",
      });
      const noticiasFavoritasArray = noticiasFavoritas.value
        ? JSON.parse(noticiasFavoritas.value)
        : [];

      return await noticiasFavoritasArray.length;
    },
  },
};
