<template>
  <Swiper :slides-per-view="1" :initial-slide="0">
    <SwiperSlide v-for="(cotacao, index) in orderedCotacoes" :key="index">
      <ion-card class="card-center">
        <ion-card-header>
          <ion-card-subtitle class="ion-text-center titulo-card">
            {{ cotacao.name }}
            <ion-buttons class="pin-icon">
              <ion-button @click="togglePin(cotacao.code)">
                <ion-icon
                  size="small"
                  :icon="isPinned(cotacao.code) ? starSharp : starOutline"
                  slot="icon-only"
                />
              </ion-button>
            </ion-buttons>
          </ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          <ion-grid :fixed="true">
            <ion-row class="ion-text-center">
              <ion-col>
                <div>
                  1 {{ cotacao.name.split("/")[0].toLowerCase() }}
                  {{ $t("equivale") }}:
                </div>
                <strong>{{ toCurrency(parseFloat(cotacao.bid)) }}</strong>
              </ion-col>
            </ion-row>
          </ion-grid>

          <ion-grid :fixed="true" style="margin-top: -10px">
            <ion-row class="ion-text-center">
              <ion-col class="fw-bold variacao">
                <fieldset class="br-15">
                  <legend>{{ $t("variacao") }}</legend>
                  R$ {{ cotacao.varBid }}
                  <ion-icon
                    v-if="parseFloat(cotacao.varBid) < 0"
                    :icon="trendingDownOutline"
                    class="icon-variacao"
                    color="danger"
                  />
                  <ion-icon
                    v-else
                    :icon="trendingUpOutline"
                    class="icon-variacao"
                    color="success"
                  />
                </fieldset>
              </ion-col>
            </ion-row>
          </ion-grid>

          <ion-grid :fixed="true" style="margin-top: -10px">
            <ion-row class="ion-text-center">
              <ion-col class="fw-bold ultima-atualizacao">
                <div class="fs-10">{{ $t("ultima_atualizacao") }}:</div>
                <span class="fs-12">
                  {{ formatDate(cotacao.create_date) }}
                </span>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>
    </SwiperSlide>
  </Swiper>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { Coins, CoinsMetadata } from "@/models/coins";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonGrid,
  IonIcon,
  IonButtons,
  IonButton,
} from "@ionic/vue";
import {
  trendingDownOutline,
  trendingUpOutline,
  starSharp,
  starOutline,
} from "ionicons/icons";

export default defineComponent({
  name: "CarroselCotacoes",
  components: {
    Swiper,
    SwiperSlide,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
    IonGrid,
    IonIcon,
    IonButtons,
    IonButton,
  },
  props: {
    cotacoes: {
      type: Object as PropType<Coins>,
      required: true,
    },
  },
  data() {
    return {
      trendingDownOutline,
      trendingUpOutline,
      starSharp,
      starOutline,
      pinnedCodes: this.getPinnedCodes(),
    };
  },
  computed: {
    orderedCotacoes(): CoinsMetadata[] {
      const todas = Object.values(this.cotacoes);
      const pinadas = todas.filter((c) => this.pinnedCodes.includes(c.code));
      const naoPinadas = todas.filter(
        (c) => !this.pinnedCodes.includes(c.code)
      );
      return [...pinadas, ...naoPinadas];
    },
  },
  methods: {
    toCurrency(value: number) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(value));
    },
    formatDate(dateStr: string): string {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      const pad = (n: number) => n.toString().padStart(2, "0");
      return `${pad(date.getDate())}/${pad(
        date.getMonth() + 1
      )}/${date.getFullYear()} ${pad(date.getHours())}:${pad(
        date.getMinutes()
      )}:${pad(date.getSeconds())}`;
    },
    getPinnedCodes(): string[] {
      const saved = localStorage.getItem("pinnedCotacoes");
      return saved ? JSON.parse(saved) : [];
    },
    savePinnedCodes() {
      localStorage.setItem("pinnedCotacoes", JSON.stringify(this.pinnedCodes));
    },
    isPinned(code: string): boolean {
      return this.pinnedCodes.includes(code);
    },
    togglePin(code: string) {
      if (this.isPinned(code)) {
        this.pinnedCodes = this.pinnedCodes.filter((c: any) => c !== code);
      } else {
        this.pinnedCodes.push(code);
      }
      this.savePinnedCodes();
    },
  },
});
</script>

<style scoped>
.pin-icon {
  position: absolute;
  margin: -20px -25px 0 0;
  z-index: 10;
  cursor: pointer;
}

.titulo-card {
  font-size: 16px;
  font-weight: bold;
  margin-top: -5px;
  margin-bottom: -15px;
}

.icon-variacao {
  font-size: 17px;
  margin-bottom: -4px;
  margin-left: 5px;
}

.card-center {
  width: 85%;
  display: block;
  margin: 0 auto;
  margin-top: 10px;
}

.ultima-atualizacao {
  margin-top: 5px;
  font-size: 12px;
}

.variacao {
  margin: 0 auto;
  margin-top: 5px;
  font-size: 12px;
  max-width: 200px;
}

.pin-icon {
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 22px;
  z-index: 10;
  cursor: pointer;
}
</style>
