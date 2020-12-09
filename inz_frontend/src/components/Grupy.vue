<template>
    <v-row justify="center">
 <!--- grupy ---------------------------->
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <v-container
                fluid
                class="pa-0"
            >
            <v-row align="center">
            <v-col
                align-self="start"
                cols="1"
                sm="1"
            >
                <div class="text-center">
                  <Dodaj_grupe @grupaRefresh='init_grupa' :przedmiot="przedmiot"/> 
                </div>
            </v-col>
             <v-col
                cols="11"
                sm="6"
            >
                <div class="text-left">
                     Grupy
                </div>
            </v-col>
            </v-row>
            </v-container>
        </v-expansion-panel-header>
     
        <v-expansion-panel-content>
            <Okno_grupa :grupy="grupy"/>
        </v-expansion-panel-content>
      </v-expansion-panel>
     </v-expansion-panels>

<!-- cwiczenia ----------------------->
    <v-expansion-panels>
         <v-expansion-panel>
        <v-expansion-panel-header>
        <v-container
                fluid
                class="pa-0"
            >
            <v-row align="center">
            <v-col
                align-self="start"
                cols="1"
                sm="1"
            >
                <div class="text-center">
                  <Dodaj_cw @cwiczenieRefresh='init_cwiczenie' :przedmiot="przedmiot"/> 
                </div>
            </v-col>
             <v-col
                cols="11"
                sm="6"
            >
                <div class="text-left">
                    Ćwiczenia
                </div>
            </v-col>
            </v-row>
            </v-container>

        </v-expansion-panel-header>
     
        <v-expansion-panel-content>
           <v-expansion-panels>
            <v-expansion-panel 
            v-for="cwiczenie in cwiczenia"
            :key="cwiczenie.id"
            >
                <v-expansion-panel-header
                >
                <v-row justify='center'>
                <v-col cols="9">
                 {{cwiczenie.nazwa_cwiczenia}}
                </v-col>
                <v-col cols="3">
                    <Usun_cw :cwiczenie='cwiczenie'/>
                </v-col>
                </v-row>
                </v-expansion-panel-header>
                
        <!-- Quiz ----------------------->
                <v-expansion-panel-content>
                <v-row justify="space-around">
                <v-col cols="5">
                     <Quiz_prowadzacy :cwiczenie="cwiczenie" :key="cwiczenie.id"/>    
                </v-col>
                <v-col cols="5">

                     <Wyswietl_quiz :cwiczenie="cwiczenie" :key="cwiczenie.id"/>
                </v-col>
                </v-row>
                </v-expansion-panel-content>
               
            </v-expansion-panel>
          </v-expansion-panels>
        </v-expansion-panel-content>
      </v-expansion-panel>
</v-expansion-panels>
  </v-row>
</template>

<script>
import Okno_grupa from './Okno_grupa';
import Dodaj_grupe from './Dodaj_grupe';
import Dodaj_cw from './Dodaj_cw';
import Quiz_prowadzacy from './Quiz_prowadzacy';
import Wyswietl_quiz from './Wyswietl_quiz';
import Usun_cw from './Usun_cw'

export default {
    name: 'grupy',
    props: ['przedmiot'],

    components: {
        'Okno_grupa': Okno_grupa,
        'Dodaj_grupe': Dodaj_grupe,
        'Dodaj_cw': Dodaj_cw,
        'Quiz_prowadzacy': Quiz_prowadzacy,
        'Wyswietl_quiz': Wyswietl_quiz,
        'Usun_cw': Usun_cw,
    },

    data: () =>({
        grupy: [],
        cwiczenia: [],
        dialog: false,
    }),

    methods:{
        init_grupa(){
          this.$api
          .get('grupy/?przedmiot='+this.przedmiot.id)
          .then(response => {
              this.grupy = response.data
          })
        },
        init_cwiczenie(){
          this.$api
          .get('cwiczenia/?przedmiot='+ this.przedmiot.id)
          .then(response => {
             this.cwiczenia = response.data
        })
        },
    },
    
    mounted: function () {
        this.init_grupa();
        this.init_cwiczenie();
    },    
}
</script>