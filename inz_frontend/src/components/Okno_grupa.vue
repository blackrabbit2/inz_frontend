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
                v-on="on">
                <v-row justify="space-between">
                    <v-col cols="9" sm="5">
                    {{grupa.kod_grupy+" "+grupa.dzien_tygodnia + ", godzina: " + grupa.godzina}}
                    </v-col>
                    <v-col cols="3" sm="1" v-if='grupa'>
                        <Usun_grupe @grupaUsun='przekaz' :grupa="grupa" :key="grupa.id"/>
                    </v-col>   

                </v-row>
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
                <v-spacer></v-spacer>
                    <v-toolbar-items>
                            <v-btn
                            dark
                            text
                            @click="usun(grupa)"
                            >
                            <v-icon>fas fa-trash</v-icon>
                            Usuń grupę
                            </v-btn>
                    </v-toolbar-items>
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
import Usun_grupe from './Usun_grupe';

export default {
    name: 'okno_grupa',
    props: ['grupy'],

    components: {
        'Studenci_dane': Studenci_dane,
        'Studenci_testy': Studenci_testy,
        'Usun_grupe': Usun_grupe,
  },

     data: () =>({
        dialog: [],
    }),

    methods: {
        przekaz(){
            this.$emit('grupaRefresh');
        },
        usun: function(grupa){
            if(confirm("Na pewno usunąć grupę "+grupa.kod_grupy)){
                this.$api
                .delete('/grupy/'+ grupa.id)
                .then(() => {
                    grupa.id = 0
                    this.$emit('grupaRefresh')
                })
            }

        }
    },

}
</script>