<template>
  <v-row justify="center">
      <Dodaj_przedmiot />
    <v-expansion-panels focusable>
      <v-expansion-panel
        v-for="przedmiot in przedmioty"
        :key="przedmiot.id"
      >
        <v-expansion-panel-header
        v-text='przedmiot.nazwa'/> 
        <v-expansion-panel-content>
        <!-- Nazwa componentu, który wstawiamy w tym miejscu :props='obiekt,który chcemy przekazać' -->
          <Grupy :przedmiot='przedmiot'/>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
import Grupy from './Grupy';
import Dodaj_przedmiot from './Dodaj_przedmiot';

  export default {
    name: 'glowna_prowadzacy', 
    props: ['',],


    components: {
        'Grupy': Grupy,
        'Dodaj_przedmiot': Dodaj_przedmiot,
    },


    data: () => ({
        przedmioty: [],
      
    }),

    mounted: function () {
      this.$api
        .get('przedmioty/')
        .then(response => {
            this.przedmioty = response.data
        })
  }
  }
</script>
