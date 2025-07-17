<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="inicio" href="/tabs/inicio">
          <ion-icon aria-hidden="true" :icon="home" />
          <ion-label>{{ $t("inicio") }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="favoritos" href="/tabs/favoritos">
          <ion-icon aria-hidden="true" :icon="heart" />
          <ion-label>{{ $t("favoritos") }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="configuracoes" href="/tabs/configuracoes">
          <ion-icon aria-hidden="true" :icon="settings" />
          <ion-label>{{ $t("configuracoes") }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { settings, home, heart } from 'ionicons/icons';
</script>
