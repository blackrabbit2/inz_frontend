<template>
 <v-row justify="center"
 :key='studenci_view'>
      <v-expansion-panels>
      <v-expansion-panel>
      <v-expansion-panel-header>
      Studenci dane
      </v-expansion-panel-header>
      <v-expansion-panel-content>
       <v-card
          v-if="this.studenci.length">
            <v-card-title>
              Studenci
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
              <v-data-table
              :headers="headers"
              :items="studenci"
              :search="search"
              class="elevation-1"
              >
          </v-data-table>
          </v-card>

        <v-card 
        v-else
        >
            <v-card-title> 
                  Wygeneruj studentów
                  <v-spacer></v-spacer>
            </v-card-title>
            <v-form v-model="valid">
              <v-container>
                <v-row
                justify="center">
                  <v-col
                    cols="16"
                    md="4"
                  >
                    <v-text-field
                      v-model.number="liczba_studentow"
                      type="number"
                      :rules="rule"
                      label="Liczba studentów"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="16"
                    md="4"
                  >
                  <v-text-field
                    v-model.number="liczba_grup_lab"
                    type="number"
                    :rules="rule"
                    label="Liczba grup laboratoryjnych"
                    required
                  ></v-text-field>
                  </v-col>

                  <v-col
                    cols="16"
                    md="4"
                  >
                  <v-btn
                      depressed
                      color="primary"
                      type="submit"
                      @click='generuj_studentow'
                    >
                      Wygeneruj
                    </v-btn>
                  </v-col>

                </v-row>
              </v-container>
            </v-form>
        </v-card>

       
          </v-expansion-panel-content>
       </v-expansion-panel>
       </v-expansion-panels>
  </v-row>
</template>

<script>
export default {
  name: 'studenci_dane',
  props: ['grupa',],

    data: () => ({
      valid: false,
      liczba_studentow: '',
      liczba_grup_lab: '',
      rule: [
        v => !!v || 'Pole nie może być puste',
        // v => v.typeof == number || 'Wpisz liczbę arabską'
      ],
      search: '',
      studenci_view: 0,
      headers: [
          {
            text: 'Nr indeksu',
            align: 'start',
            sortable: false,
            value: 'nr_indeksu',
          },
          { text: 'Id', value: 'id' },
          { text: 'Imię', value: 'imie' },
          { text: 'Nazwisko', value: 'nazwisko' },
          { text: 'Gr lab', value: 'grupa_lab' },
          { text: 'Kod', value: 'kod' },
        ],

      studenci: [],
    }),
   
    methods: {
      generuj_studentow: function(){
        this.$api
        .post('grupy/'+this.grupa.id+'/generuj_studentow/',
        {
          liczba_studentow: this.liczba_studentow,
          liczba_grup_lab: this.liczba_grup_lab,
        }
        )
        // .then(() => {
        //   //  this.$forceUpdate()
        // })
        
      }
    },

     mounted: function () {
       this.$api
          .get('studenci/?grupa='+this.grupa.id)
          .then(response => {
            response.data.map(x => {
              this.studenci.push(
                {
                  id: x.id,
                  nr_indeksu: x.numer_indeksu,
                  imie: x.first_name,
                  nazwisko: x.last_name,
                  grupa_lab: x.grupa_lab,
                  kod: x.kod_indywidualny
                }
              )
            })
          })
        }
}
</script>