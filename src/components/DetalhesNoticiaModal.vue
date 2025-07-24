<template>
  <ion-modal :is-open="isOpen">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t("detalhes_noticia") }}</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="setOpen(false)">
            <ion-icon :icon="closeOutline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum
        quidem recusandae ducimus quos reprehenderit. Veniam, molestias quos,
        dolorum consequuntur nisi deserunt omnis id illo sit cum qui. Eaque,
        dicta.
      </p>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { closeOutline } from "ionicons/icons";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
} from "@ionic/vue";

export default defineComponent({
  name: "DetalhesNoticiaModal",
  components: {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
  },
  emits: ["setOpen"],
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      closeOutline: closeOutline,
    };
  },
  methods: {
    setOpen(value: boolean) {
      this.$emit("setOpen", value);
    },
  },
});
</script>

<style scoped></style>
