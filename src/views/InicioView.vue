<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          {{ $t("mundo_hoje") }}
          <img src="../../public/favicon.png" alt="Mundo Hoje" class="logo" />
        </ion-title>
        <ion-buttons slot="end">
          <ion-button @click="reset">
            <ion-icon :icon="refreshOutline" slot="icon-only" />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            {{ $t("inicio") }}
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card v-for="item in noticia.items" :key="item.id">
        <ion-card-header>
          <ion-card-title>{{ item.titulo }}</ion-card-title>
          <ion-card-subtitle>{{ item.data_publicacao }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <p>{{ item.introducao }}</p>
          <img
            v-if="item.imagens.image_intro"
            :src="item.imagens.image_intro"
            alt="Imagem de introdução"
          />
          <p>
            <a :href="item.link" target="_blank">{{ $t("leia_mais") }}</a>
          </p>
        </ion-card-content>
      </ion-card>

      <ion-infinite-scroll @ionInfinite="ionInfinite">
        <ion-infinite-scroll-content></ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/vue";
import { refreshOutline } from "ionicons/icons";
import { defineComponent } from "vue";
import ibgeNoticeService from "@/services/ibgeNoticeService";
import { Noticia } from "@/models/noticia";
import { Imagem } from "@/models/imagem";

export default defineComponent({
  name: "InicioView",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonIcon,
    IonButton,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  },
  data() {
    return {
      refreshOutline,
      noticia: {} as Noticia,
      qtd: 20,
      page: 1,
      loading: false,
    };
  },
  mounted() {
    this.buscarNoticias();
  },
  methods: {
    buscarNoticias() {
      ibgeNoticeService
        .getNotices(this.qtd, this.page)
        .then((response) => {
          const noticiasData = response;

          this.noticia = {
            ...noticiasData,
            items: [
              ...(this.noticia.items || []),
              ...noticiasData.items.map((newsItem: any) => ({
                data_publicacao: newsItem.data_publicacao,
                destaque: newsItem.destaque,
                editoria: newsItem.editoria,
                id: newsItem.id,
                introducao: newsItem.introducao,
                link: newsItem.link,
                titulo: newsItem.titulo,
                tipo: newsItem.tipo,
                produto_id: newsItem.produto_id,
                imagens: this.sanitizaJsonImagens(newsItem.imagens),
              })),
            ],
          };

          this.page += 1;
        })
        .catch((error) => {
          console.error("Erro ao carregar notícias:", error);
        });
    },
    ionInfinite(event: CustomEvent) {
      if (this.loading) {
        (event.target as HTMLIonInfiniteScrollElement).complete();
        return;
      }

      this.loading = true;

      ibgeNoticeService
        .getNotices(this.qtd, this.page)
        .then((response) => {
          const noticiasData = response;

          if (!noticiasData.items.length) {
            (event.target as HTMLIonInfiniteScrollElement).disabled = true;
          }

          this.noticia = {
            ...noticiasData,
            items: [
              ...(this.noticia.items || []),
              ...noticiasData.items.map((newsItem: any) => ({
                data_publicacao: newsItem.data_publicacao,
                destaque: newsItem.destaque,
                editoria: newsItem.editoria,
                id: newsItem.id,
                introducao: newsItem.introducao,
                link: newsItem.link,
                titulo: newsItem.titulo,
                tipo: newsItem.tipo,
                produto_id: newsItem.produto_id,
                imagens: this.sanitizaJsonImagens(newsItem.imagens),
              })),
            ],
          };

          this.page += 1;
        })
        .catch((error) => {
          console.error("Erro ao carregar notícias:", error);
        })
        .finally(() => {
          this.loading = false;
          (event.target as HTMLIonInfiniteScrollElement).complete();
        });
    },
    sanitizaJsonImagens(imagens: string): Imagem {
      try {
        const url = "https://agenciadenoticias.ibge.gov.br/";
        const imagensJson = imagens
          .replace(/^"+|"+$/g, "")
          .replace(/\\"/g, '"')
          .replace(/\\\\/g, "\\");
        const parseImagens = JSON.parse(imagensJson) as Imagem;
        return {
          image_intro: parseImagens.image_intro
            ? url + parseImagens.image_intro
            : "",
          float_intro: parseImagens.float_intro
            ? url + parseImagens.float_intro
            : "",
          image_intro_alt: parseImagens.image_intro_alt || "",
          image_intro_caption: parseImagens.image_intro_caption || "",
          image_fulltext: parseImagens.image_fulltext
            ? url + parseImagens.image_fulltext
            : "",
          float_fulltext: parseImagens.float_fulltext
            ? url + parseImagens.float_fulltext
            : "",
          image_fulltext_alt: parseImagens.image_fulltext_alt || "",
          image_fulltext_caption: parseImagens.image_fulltext_caption || "",
        } as Imagem;
      } catch (error) {
        console.error("Erro ao analisar JSON de imagens:", error);
        return {} as Imagem;
      }
    },
    reset() {
      this.noticia = {} as Noticia;
      this.page = 1;
      this.loading = false;
      this.buscarNoticias();
    }
  },
});
</script>

<style scoped>
.logo {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
ion-title {
  display: flex;
  align-items: center;
}
ion-title img {
  margin-left: 10px;
}
</style>
