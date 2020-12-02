<template>
    <v-row justify="center">
      <v-expansion-panel 
         v-for="grupa in grupy"
         :key="grupa.id"
         >
<!-- :retain-focus="false" aby nie powstawał błąd, ze v-dialog jest v-for i dało się zamknąć okno -->
            <v-dialog
                v-model="grupa.dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
                :retain-focus="false"
                >
             <template v-slot:activator="{ on, attrs }">

                <v-expansion-panel-header
                v-bind="attrs"
                v-on="on"
                v-text='grupa.kod_grupy + " " + grupa.dzien_tygodnia + ", godzina: " + grupa.godzina'>
       
                </v-expansion-panel-header> 
             </template>
             <v-card>
                 <v-toolbar
                    dark
                    color="primary"
                 >
                    <v-btn
                        icon
                        dark
                        @click="grupa.dialog=false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                <v-toolbar-title>
                {{grupa.kod_grupy+" "+grupa.dzien_tygodnia + ", godzina: " + grupa.godzina}}
                </v-toolbar-title>
                </v-toolbar>

                 <v-expansion-panels>
                     <Studenci_dane :grupa="grupa" :key="grupa.id"/>
                </v-expansion-panels>
        

                    <v-expansion-panels>
                         <Studenci_testy :grupa="grupa" :key="grupa.id"/>
                    </v-expansion-panels>

               </v-card>
               

             </v-dialog>
     </v-expansion-panel>
  </v-row>
</template>

<script>
import Studenci_dane from './Studenci_dane';
import Studenci_testy from './Studenci_testy';

export default {
    name: 'okno_grupa',
    props: ['grupy'],

    components: {
        'Studenci_dane': Studenci_dane,
        'Studenci_testy': Studenci_testy,
  },

     data: () =>({
        dialog: [],
    }),

}
</script>