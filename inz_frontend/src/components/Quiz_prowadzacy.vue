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
                <v-text-field
                v-model="tresc"
                filled
                label="Tresć zadania"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
                ></v-text-field>
            </v-col>
            </v-row>

            <v-row justify="center" align="baseline">
            <v-col cols="10">
                <v-text-field
                v-model="odpowiedz"
                filled
                label="Dodaj treść odpowiedzi"
                requireds
                ></v-text-field>
            </v-col>

            <v-col cols="1">
                <validation-provider
                    
                    rules="required"
                    name="checkbox"
                >
                    <v-checkbox
                    v-model="checkbox"
                  
                    value="1"
                    label="Option"
                    type="checkbox"
                    required
                    ></v-checkbox>
        </validation-provider>

            </v-col>
            </v-row>
      
      <!-- Guzik do dodania kolejnych treści odpowiedzi -->
     <v-row justify="center">
       <v-col cols="11" sm="5">
               <v-card-actions>
                    <v-btn
                    dark
                    color="primary"
                    @click="show=!show"
                    >
                    Dodaj odpowiedz
                    </v-btn>
                </v-card-actions>
       </v-col>

        <v-col cols="11" sm='5'>
                <v-card-actions>
                        <v-btn
                        dark
                        color="primary">
                        Zatwierdz
                        </v-btn>
                </v-card-actions>
        </v-col>
     </v-row>
 

        <v-expand-transition>
            <v-card v-show="show">
              <v-text-field
                v-model="odpowiedz"
                label="Dodaj treść odpowiedzi"
                required
                ></v-text-field>
            </v-card>
           
        </v-expand-transition>


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
                </v-toolbar>

               </v-card>
             </v-dialog>              
        </v-expansion-panel>
  </v-row>
</template>

<script>
// import { required} from 'vee-validate/dist/rules'
// import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

export default {
    name: 'quiz_prowadzacy',
    props: ['cwiczenie'],

// setInteractionMode('eager')

// extend('required' {
//         ...required,
//         message: '{_field_} can not be empty',
//     }),

    components:{
        //  ValidationProvider,
        //  ValidationObserver,
    },

    data: () => ({
        show: false,
        nowe_zadanie: null,
        pokaz_zadanie: null,
        odpowiedz: null,
        tresc: null,
        checkbox: null,
    }),

    methods: {
        // clear () {
        //      this.checkbox = null
        }
    
    
}
</script>