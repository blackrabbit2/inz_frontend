<template>
    <v-row justify="center">
        <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                class="mx-0.25"
                fab
                dark
                small
                color="secondary"
                @click="dialog=false"
                v-bind="attrs"
                v-on="on"
            >
                <v-icon dark>
                    mdi-plus
                </v-icon>
            </v-btn>
        </template>
    <v-card>
        <v-card-title>
          <span class="headline">Nowa grupa</span>
        </v-card-title>

    <v-card-text>
          <v-container>
            <v-row>
             
            <v-col cols="12">
                <v-select
                v-model="wybierz_prowadzacy"
                  :items="prowadzacy"
                  label="Prowadzący*"
                  required
                ></v-select>
              </v-col>

            <v-col cols="12">
                <v-text-field
                  v-model="kod_grupy"
                  label="Kod grupy*"
                  required
                ></v-text-field>
              </v-col>

               <v-col
                cols="12"
                sm="6"
              >
                <v-select
                v-model="dzien_tygodnia"
                  :items="['PON_N', 'PON_P', 'PON',
                           'WT_N', 'WT_P', 'WT', 
                           'SR_N', 'SR_P', 'SR',
                           'CZ_N', 'CZ_P', 'CZ',
                           'PT_N', 'PT_P', 'PT',]"
                  label="Dzień tygodnia*"
                  required
                ></v-select>
              </v-col>

               <v-col
                cols="12"
                sm="6"
              >
                <v-select
                v-model="godzina"
                  :items="['7', '9','11',
                          '13','15', '17',
                          '18',]"
                  label="Godzina*"
                  required
                ></v-select>
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
                    @click="dialog = false"
                >
                    Close
                </v-btn>
                <v-btn
                    color="secondary"
                    text
                    type="submit"
                    @click="zapisz_grupe"
                >
                    Save
                </v-btn>
            </v-card-actions>
        
     </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
    name: 'dodaj_grupe',
    props: ['przedmiot'],

    data: () => ({
        dialog: false,
        prowadzacy: [],
        kod_grupy: null,
        dzien_tygodnia: null,
        godzina: null,
        wybierz_prowadzacy: null,
    }),

    methods: {
        zapisz_grupe: function() {
            this.$api
            .post('grupy/',
            {
                kod_grupy: this.kod_grupy,
                prowadzacy: this.wybierz_prowadzacy,
                przedmiot: this.przedmiot.id,
                dzien_tygodnia: this.dzien_tygodnia,
                godzina: this.godzina,
            })
            .then(() => {
              this.dialog = false
              this.$emit('grupaRefresh')
            }
          )
        },
    },

    mounted:function() {
      this.$api
        .get('prowadzacy/')
        .then(response =>{
          response.data.map(y => {
            this.prowadzacy.push(
              {
             value: y.id,
             text: y.tytul_naukowy + ' ' + y.user.first_name + ' ' + y.user.last_name
            })
          })
          })
    },
}
</script>