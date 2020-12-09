<template>
<!-- Utwórz nowe zadanie -->
         <v-dialog
                v-model="cwiczenie.nowe_zadanie"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
                >
                <template v-slot:activator="{ on, attrs }">

                <v-btn
                dark
                color="secondary"
                v-bind="attrs"
                v-on="on"
                >Uwtórz nowe zadanie
                </v-btn>
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
            {{poprawna}}
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

</template>

<script>


export default {
    name: 'quiz_prowadzacy',
    props: ['cwiczenie'],

    data: () => ({
        nowe_zadanie: null,
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
        
    }),

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
            console.log(this.poprawna)
             this.$api 
            .post('quiz/zadania/',
            {
                tresc_zadania: this.tresc,
                test: this.cwiczenie.id,
            }
            )
            .then(response =>{
                var poprawna = this.poprawna
                this.odpowiedzi.map(odpowiedz => {
                    this.$api
                    .put('quiz/zadania/'+response.data.id+'/dodaj_odp/',
                    {
                        tresc: odpowiedz.text
                    })
                    .then(response_zadanie => {
                        if (odpowiedz.id == poprawna){
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
                    } )
        },
        }
    }
</script>