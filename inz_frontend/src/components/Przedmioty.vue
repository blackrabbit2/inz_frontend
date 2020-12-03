<template>
  <v-container>
      <v-row>
          <v-col
            v-for="przedmiot in przedmioty"
            :key="przedmiot.id"
            cols="4"
          >
          <v-card
          min-height="200"
          >
         <v-btn
         v-on:click='toggleDetail'
         block
         cover
         tile
         elevation="0"
         color="secondary">
             {{przedmiot.nazwa}}
        </v-btn>

    <v-card-subtitle v-show='!detail'>
        Opiekun przedmiotu: {{przedmiot.opiekun.user.username}}
    </v-card-subtitle>
          </v-card>
 
          </v-col>
        </v-row>
  </v-container>
</template>

<script>
// import Przedmiot from './Przedmiot';

  export default {
    name: 'przedmioty',
    props: ['przedmioty'],


    components: {
        // 'Przedmiot': Przedmiot,

    },


    data: () => ({
      detail: false,
    }),

    methods: {
    toggleDetail: function () {
        this.detail = !this.detail
     }
  }
  }
</script>
