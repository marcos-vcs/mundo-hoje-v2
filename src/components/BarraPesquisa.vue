<template>
    <div class="barra-pesquisa">
        <ion-searchbar :debounce="1000" v-model="pesquisa" @ionInput="pesquisou" :placeholder="$t('pesquisar')"></ion-searchbar>
    </div>
</template>

<script lang="ts">
import { IonSearchbar } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BarraPesquisa',
    emits: ['pesquisou'],
    components: {
        IonSearchbar,
    },
    data() {
        return {
            pesquisa: ''
        };
    },
    methods: {
        pesquisou(evento: any) {
            this.$emit('pesquisou', evento.target.value.toLowerCase())
        },
        limparPesquisa() {
            this.pesquisa = '';
        }
    },
});
</script>

<style scoped>
.barra-pesquisa {
    padding: 10px;
}
</style>