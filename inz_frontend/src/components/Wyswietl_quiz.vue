<template>
  <!-- Wyświetl wszystkie zadania -->
  <v-dialog
    v-model="cwiczenie.pokaz_zadania"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark color="secondary" v-bind="attrs" v-on="on"
        >Wyświetl zadania
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="cwiczenie.pokaz_zadania = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>
          Zadania dla {{ cwiczenie.nazwa_cwiczenia }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-list>
        <v-col cols="10">
          <v-list-item-group v-for="zadanie in zadania" :key="zadanie.id">
            <v-row>
              <v-col cols="8">
                <v-switch v-model="zadanie.write"> </v-switch>
              </v-col>
              <v-col cols="3">
                <Usun_zadanie
                  @zadanieRefresh="pobierz_zadania"
                  :zadanie="zadanie"
                />
              </v-col>
            </v-row>

            <v-list-item-title>
              <v-text-field
                @blur="save_zadanie(zadanie)"
                label="treść"
                :value="zadanie.tresc_zadania"
                :readonly="!zadanie.write"
                v-model="zadanie.tresc_zadania"
              >
              </v-text-field>
            </v-list-item-title>
            <v-list-item-group
              subGroup="true"
              color="primary"
              v-if="zadanie.poprawna"
            >
              <v-radio-group
                v-model="zadanie.poprawna.id"
                required
                :key="zadanie.id"
                column
              >
                <v-row>
                  <v-list-item
                    v-for="odpowiedz in zadanie.odpowiedzi"
                    :key="odpowiedz.id"
                  >
                    <v-col cols="9">
                      <v-text-field
                        @blur="save_odp(odpowiedz)"
                        :value="odpowiedz.tresc"
                        :readonly="!zadanie.write"
                        v-model="odpowiedz.tresc"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="1">
                      <v-radio
                        :key="odpowiedz.id"
                        :value="odpowiedz.id"
                        :readonly="!zadanie.write"
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
</template>

<script>
import Usun_zadanie from "./Usun_zadanie.vue";

export default {
  name: "wyswietl_quiz",
  props: ["cwiczenie", "bus"],

  components: {
    Usun_zadanie: Usun_zadanie,
  },

  data: () => ({
    pokaz_zadanie: [],
    lista_zadan: 0,
    zadania: [
      {
        id: 0,
        tresc: null,
        poprawna: {
          id: null,
          tresc: null,
        },
      },
    ],
  }),

  mounted: function () {
    this.pobierz_zadania();
    this.bus.$on("zadanieRefresh", this.pobierz_zadania);
  },

  methods: {
    pobierz_zadania: function () {
      this.$api
        .get("quiz/zadania/?test=" + this.cwiczenie.id)
        .then((response) => {
          this.zadania = response.data;
        });
      this.lista_zadan += 1;
    },
    save_zadanie: function (zadanie) {
      this.$api.put("quiz/zadania/" + zadanie.id + "/", {
        tresc_zadania: zadanie.tresc_zadania,
        test: zadanie.test,
      });
    },

    save_odp: function (odpowiedz) {
      this.$api.put("quiz/odpowiedzi/" + odpowiedz.id + "/", {
        tresc: odpowiedz.tresc,
      });
    },
    save_poprawna: function (poprawna_id, zadanie_id) {
      this.$api.put("quiz/zadania/" + zadanie_id + "/wybierz_poprawna/", {
        odpowiedz: poprawna_id,
      });
    },
  },
};
</script>
