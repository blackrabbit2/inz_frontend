<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-0.25"
          fab
          dark
          small
          color="secondary"
          @click="dialog = false"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Nowe ćwiczenie</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Temat*"
                  v-model="temat"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Ilość zadan*"
                  v-model.number="ilosc_zadan"
                  type="number"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-file-input
                  multiple
                  v-model="instrukcja"
                  label="Instrukcja"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" text @click="dialog = false"> Close </v-btn>
          <v-btn color="secondary" text type="submit" @click="zapisz_cwiczenie">
            Zapisz
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "dodaj_cw",
  props: ["przedmiot"],

  data: () => ({
    dialog: false,
    temat: [],
    ilosc_zadan: [],
    instrukcja: [],
  }),

  methods: {
    zapisz_cwiczenie: function () {
      this.$api
        .post("cwiczenia/", {
          nazwa_cwiczenia: this.temat,
          liczba_zadan_do_zrobienia: this.ilosc_zadan,
          przedmiot: this.przedmiot.id,
          instrukcje: this.instrukcja,
        })
        .then(() => {
          this.dialog = false;
          this.$emit("cwiczenieRefresh");
        })
        .catch(function (error) {
          alert(error);
        });
    },
  },
};
</script>
