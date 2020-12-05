<template>
    <v-row justify="center">
          <v-col cols="12"
      sm="6">
          <v-card
          class="mx-auto"
          min-height="100"
          max-width="344"
          outlined
        >

<!-- dodawanie nowych prowadzących cz.1-->
        <v-card-text>
          <div class="headline align-self-center"> Dodaj prowadzacego </div>
        </v-card-text>
        <v-card-actions>
            <v-btn
              outlined
              rounded
              color="secondary"
              block
              @click="show=!show"
            >
              Dodaj
            </v-btn>
          </v-card-actions>
<!-- dodawanie nowych prowadzących cz.2-->
        <v-expand-transition>
            <v-card v-show="show">
            <v-form>
            <v-card-title>
            <span class="headline">Nowy prowadzący</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                    v-model="username"
                    label="Login*"
                    required
                    >
                    </v-text-field>

                    <v-text-field
                    v-model="haslo"
                      label="Password*"
                      type="password"
                      required
                    ></v-text-field>

                    <v-text-field
                    v-model="imie"
                    label="Imię*"
                    required
                    >
                    </v-text-field>

                    <v-text-field
                    v-model="nazwisko"
                    label="Nazwisko*"
                    required
                    >
                    </v-text-field>
                    <v-select
                    v-model="tytul_naukowy"
                    :items="['inżynier', 'magister', 'doktor', 'profesor']"
                    label="Tytuł naukowy*"
                    required
                    >
                    </v-select>

                   </v-col>
               </v-row>
              </v-container>
    
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn
                color="primary"
                text
                @click="zapisz_prowadzacy"
                >
                Dodaj
                </v-btn>
            </v-card-actions>
            </v-form>
            </v-card>
        </v-expand-transition>
          </v-card>
      </v-col>

<!-- dodawanie nowych przedmiotow cz.1-->
      <v-col cols="12"
      sm="6">
          <v-card
          class="mx-auto"
          min-height="100"
          max-width="344"
          outlined
        >
        <v-card-text>
          <div class="headline"> Dodaj przedmiot </div>
        </v-card-text>
        <v-card-actions>
            <v-btn
              outlined
              rounded
              color="secondary"
              block
              bottom
              @click="show= !show"
            >
              Dodaj
            </v-btn>
          </v-card-actions>
<!-- dodawanie nowych przedmiotow cz.2-->
           <v-expand-transition>
            <v-card v-show="show">
            <v-form>
            <v-card-title class="headline">
            <span> Nowy przedmiot </span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                    v-model="nazwa_przedmiotu"
                    label="Nazwa przedmiotu*"
                    required
                    >
                    </v-text-field>
                  </v-col>

                 <v-col cols="12">
                    <v-select
                    :items="prowadzacy_zajecia"
                    v-model="dodaj_prowadzacy"
                    label="Prowadzący*"
                    required
                    >
                    </v-select>
                   </v-col>
               </v-row>
              </v-container>
    
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn
                color="primary"
                text
                @click="zapisz_przedmiot"
                >
                Dodaj
                </v-btn>
            </v-card-actions>
            </v-form>
            </v-card>
        </v-expand-transition>

          </v-card>
      </v-col>
      </v-row>
</template>

<script>
export default {
    name: 'dodaj_przedmiot',
    props: [],

    data: () => ({
        show: false,
        username: null,
        haslo: null,
        imie: null,
        nazwisko: null,
        tytul_naukowy: null,
        dodaj_prowadzacy: null,
        dodaj_przedmiot: false,
        prowadzacy_zajecia: [],
        nazwa_przedmiotu: '',
    }),

    methods: {
        zapisz_przedmiot: function() {
            this.$api
            .post('przedmioty/',
            {
                opiekun: this.dodaj_prowadzacy,
                nazwa: this.nazwa_przedmiotu,
            })
        },

        zapisz_prowadzacy: function(){
            this.$api
            .post('users/',
            {
                first_name: this.imie,
                last_name: this.nazwisko,
                username: this.username,
                password: this.haslo,
            })
            .then( response =>{
                this.$api
                 .post('prowadzacy/',
                {
                    user: response.data.id,
                    tytul_naukowy: this.tytul_naukowy,
                }),
                this.username = null,
                this.haslo = null,
                this.imie = null,
                this.nazwisko = null,
                this.tytul_naukowy = null,  
              alert("Dodano nowego prowadzącego")
            }
            )
        }
    },

    mounted:function() {
      this.$api
        .get('prowadzacy/')
        .then(response =>{
          response.data.map(y => {
            this.prowadzacy_zajecia.push(
              {
             value: y.id,
             text: y.tytul_naukowy + ' ' + y.user.first_name + ' ' + y.user.last_name
            })
          })
          })
    },
}
</script>
