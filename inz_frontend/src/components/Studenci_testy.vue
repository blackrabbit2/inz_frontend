<template>
    <v-row justify="center">
      <v-expansion-panels>
      <v-expansion-panel>
      <v-expansion-panel-header>
      Studenci wyniki quizów
      </v-expansion-panel-header>
      <v-expansion-panel-content>

        <v-card>
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
          </v-expansion-panel-content>
       </v-expansion-panel>
       </v-expansion-panels>
  </v-row>
</template>

<script>
export default {
    

    // methods: {
    //   getColor (calories) {
    //     if (calories > 400) return 'red'
    //     else if (calories > 200) return 'orange'
    //     else return 'green'
    //     }
    // }
}
</script>