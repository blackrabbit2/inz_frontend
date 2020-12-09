<template>
<v-row justify="center">

<!-- Utwórz nowe zadanie -->
      <v-expansion-panel 
         :key="cwiczenie.id"
         >
         <v-dialog
                v-model="cwiczenie.nowe_zadanie"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
                >
                <template v-slot:activator="{ on, attrs }">

                <v-expansion-panel-header
                v-bind="attrs"
                v-on="on"
                >Uwtórz nowe zadanie
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
                        @click="cwiczenie.nowe_zadanie=false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>
                    Tworzenie zadania
                    </v-toolbar-title>
                </v-toolbar>

<!-- Treść zadania -->

            <v-form>
            <v-row justify="center" align="baseline">
            <v-col cols="10">
                <v-textarea
                v-model="tresc"
                filled
                auto-grow
                rows="2"
                label="Tresć zadania"
                required
                ></v-textarea>
            </v-col>
            <v-col cols="1">
             <v-card 
             outlined dark color="secondary">
             POPRAWNA
             </v-card>
            </v-col>
            </v-row>

 <!-- Kolejne treści odpowiedzi -->
 <v-radio-group v-model='poprawna' required>
      <v-row justify="center" v-model="pole_odp"
      v-for="odpowiedz in odpowiedzi"
      :key=odpowiedz.id>
            <v-col cols="1">
            <v-btn fab small
            @click="usun(odpowiedz.id)">
            <v-icon>fas fa-trash</v-icon>
            </v-btn>
        </v-col>
        <v-col cols="9">
              <v-text-field 
                v-model="odpowiedz.text"
                type="text"
                filled
                label="Treść odpowiedzi"
                required
                ></v-text-field>
        </v-col>

        <v-col cols="1">
                    <v-radio
                    :value="odpowiedz.id"
                    ></v-radio>
        </v-col>
        </v-row>
 </v-radio-group>


<!-- Guziki: dodaj odp i zatierdz test -->
     <v-row justify="space-around" dense>
     
       <v-col cols="10" sm="5">
               <v-card-actions>
                    <v-btn
                    dark
                    color="primary"
                   @click="nowa_odp"
                    >
                    Dodaj odpowiedz
                    </v-btn>
                </v-card-actions>
       </v-col>

        <v-col cols="10" sm='5'>
                <v-card-actions>
                        <v-btn
                        @click="zatwierdz_zadanie"
                        dark
                        color="primary">
                        Zatwierdz zadanie
                        </v-btn>
                </v-card-actions>
        </v-col>
     </v-row>
     </v-form>               
     </v-card>
     </v-dialog>
     </v-expansion-panel>

<!-- Wyświetl wszystkie zadania -->
    <v-expansion-panel>
             <v-dialog
                v-model="cwiczenie.pokaz_zadania"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
                :key="lista_zadan"
                >
                <template v-slot:activator="{ on, attrs }">

                <v-expansion-panel-header
                v-bind="attrs"
                v-on="on"
                >Wyświetl zadania
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
                        @click="cwiczenie.pokaz_zadania=false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>
                    Zadania dla {{cwiczenie.nazwa_cwiczenia}}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-list>
                    <v-col cols="10">
                        <v-list-item-group  v-for="zadanie in zadania" :key="zadanie.id"
                        >
                        <v-switch v-model='zadanie.write'>
                        </v-switch>
                        <v-list-item-title >
                        <v-text-field 
                        @blur="save_zadanie(zadanie)"
                        label="treść"
                        :value='zadanie.tresc_zadania'
                        :readonly='!zadanie.write'
                        v-model='zadanie.tresc_zadania'>
                        </v-text-field>
                        
                        </v-list-item-title>

                         

                        <v-list-item-group subGroup="true" color="primary" v-if='zadanie.poprawna'>
                           <v-radio-group v-model='zadanie.poprawna.id' required :key='zadanie.id'>
                            <v-row> 
                            <v-list-item v-for="odpowiedz in zadanie.odpowiedzi" :key="odpowiedz.id">

                                <v-col cols='9'>
                                <v-text-field 
                                @blur="save_odp(odpowiedz)"
                                :value='odpowiedz.tresc'
                                :readonly='!zadanie.write'
                                v-model='odpowiedz.tresc'>
                                </v-text-field>
                                </v-col>
                                
                                <v-col cols="1">
                                    <v-radio
                                    :key='odpowiedz.id'
                                    :value="odpowiedz.id"
                                    :readonly='!zadanie.write'
                                    @change="save_poprawna(odpowiedz.id, zadanie.id)"
                                    ></v-radio>
                                </v-col>

                            </v-list-item>
                        </v-row>
                         </v-radio-group>
                        </v-list-item-group>

                        </v-list-item-group>
                    </v-col>
                    </v-list>
          
                </v-card>

             </v-dialog>              
        </v-expansion-panel>
  </v-row>
</template>

<script>

export default {
    name: 'quiz_prowadzacy',
    props: ['cwiczenie'],

    components:{

    },

    data: () => ({
        nowe_zadanie: null,
        pokaz_zadanie: null,
        lista_zadan: 0,
        odpowiedzi: [
            {
                id: 0,
                text: null,
                poprawna: false,
            },
        ],
        tresc: null,
        poprawna: null,
        pole_odp: null,
        zadania: [
            {
                id: 12,
                tresc: null,
                poprawna: {
                    id: 12,
                    tresc: null
                }
            }
        ],
        
    }),

    mounted: function() {
        this.pobierz_zadania()
        console.log(this.zadania)
    },

    methods: {
        nowa_odp: function () {
                this.odpowiedzi.push(
                    {
                        text: null,
                        poprawna: false,
                        id: this.odpowiedzi[this.odpowiedzi.length-1].id+1
                    }
                )
           },
        usun: function(odpowiedz_id){
            this.odpowiedzi.splice(odpowiedz_id, 1)
            this.odpowiedzi.map(function(item){
                if(item.id > odpowiedz_id){
                    item.id --;
                }
            })
            if (this.poprawna==odpowiedz_id){
                this.poprawna = null;
            }
            if (this.poprawna > odpowiedz_id){
                this.poprawna --;
            }
        },

        zatwierdz_zadanie: function(){
             this.$api 
            .post('quiz/zadania/',
            {
                tresc_zadania: this.tresc,
                test: this.cwiczenie.id,
            }
            )
            .then(response =>{
                this.odpowiedzi.map(odpowiedz => {
                    this.$api
                    .put('quiz/zadania/'+response.data.id+'/dodaj_odp/',
                    {
                        tresc: odpowiedz.text
                    })
                    .then(response_zadanie => {
                        if (odpowiedz.id == this.poprawna){
                            this.$api.put('quiz/zadania/'+response.data.id+'/wybierz_poprawna/',
                            {
                                odpowiedz: response_zadanie.data.id
                            }
                            )
                        }
                    })
                })
                this.odpowiedzi = [
                    {
                    id: 0,
                    text: null,
                    poprawna: false,
                    },
                ],
                this.tresc = null
                this.poprawna = null
                this.pole_odp = null
                }

            )
        },

        pobierz_zadania: function() {
            this.$api
            .get('quiz/zadania/?test='+this.cwiczenie.id)
            .then(response => {
                this.zadania = response.data
            })
            this.lista_zadan+=1
        },

        save_zadanie: function(zadanie){
            this.$api
            .put('quiz/zadania/'+ zadanie.id + '/',
            {
                tresc_zadania: zadanie.tresc_zadania,
                test: zadanie.test
            })
        },

        save_odp: function(odpowiedz){
            this.$api
            .put('quiz/odpowiedzi/'+odpowiedz.id + '/',
            {
                tresc: odpowiedz.tresc
            })
        },
        save_poprawna: function(poprawna_id, zadanie_id){
            this.$api
            .put('quiz/zadania/'+zadanie_id+'/wybierz_poprawna/',
                            {
                                odpowiedz: poprawna_id
                            }
                )
        },
        }
    }
</script>