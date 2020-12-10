<template>
    <v-dialog
        v-model='show'
        max-width="500px"
    >
        <v-card>
        <v-card-title>
          <span class="headline">Profil studenta</span>
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
            <v-col cols="12">
                <v-text-field
                  label="Imię*"
                  v-model="imie"
                  required
                ></v-text-field>
              </v-col>

            <v-col cols="12">
                <v-text-field
                  label="Nazwisko*"
                  v-model="nazwisko"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Numer indeksu*"
                  v-model.number="numer_indeksu"
                  type="number"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Nowe haslo*"
                  v-model.number="kod_indywidualny"
                  type="number"
                  required
                ></v-text-field>
              </v-col>

                </v-row>
            </v-container>
             <small>*indicates required field</small>
        </v-card-text>

        <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="secondary"
                    text
                    @click="zapisz_dane"
                >
                    Zapisz
                </v-btn>
        </v-card-actions>

        </v-card>
    </v-dialog>
 </template>

<script>
export default {
    props: ['user', 'value'],

    data() {
        return {
            student:{
                id: null,
                numer_indeksu: null,
            },
            imie: null,
            nazwisko: null,
            numer_indeksu: null,
            kod_indywidualny: null,
        }
    },

    computed: {
        show: {
            get () {
            return this.value;
            },
            set (value) {
            this.$emit('input', value);
            
            this.$api
                .get('studenci/')
                .then(response => {
                this.student = response.data[0]
                })
            }
        }
    },

    mounted() {

    },

    methods: {
        zapisz_dane: function () {
            console.log(this.student.id)
            this.$api
            .put('studenci/'+ this.student.id+'/',
            {
                numer_indeksu: this.numer_indeksu,
                kod_indywidualny: this.kod_indywidualny,
            })
            .then( 
                this.$api
                .put('users/'+this.user.id+'/',
                {
                   first_name: this.imie,
                   last_name: this.nazwisko,    
                })
            ) 
        }
    },
}
</script>