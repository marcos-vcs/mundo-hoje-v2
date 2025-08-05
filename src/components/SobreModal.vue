<template>
    <ion-modal :is-open="isOpen">
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ $t("sobre") }}</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="setOpen(false)">
                        <ion-icon :icon="closeOutline" slot="icon-only"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            TEXTO SOBRE
        </ion-content>
    </ion-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { closeOutline } from 'ionicons/icons';
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
    name: 'SobreModal',
    emits: ['setOpen'],
    components: {
        IonButtons,
        IonButton,
        IonModal,
        IonHeader,
        IonToolbar,
        IonContent,
        IonTitle,
    },
    data() {
        return {
            closeOutline,
        }
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        setOpen(value: boolean) {
            this.$emit("setOpen", value);
        },
    },
});
</script>