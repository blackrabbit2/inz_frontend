<template>
  <v-row justify="center">
    <Dodaj_przedmiot />
    <v-expansion-panels focusable>
      <v-expansion-panel v-for="przedmiot in przedmioty" :key="przedmiot.id">
        <v-expansion-panel-header>
        <v-row justify="space-between">
        <v-col cols="9" sm="5">
        {{przedmiot.nazwa}}
        </v-col>
        <v-col cols="3" sm="1" v-if="przedmiot">
                <Usun_przedmiot
                  @przedmiotUsun="przedmiot_init"
                  :przedmiot="przedmiot"
                  :key="przedmiot.id"
                />
              </v-col>
        </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- Nazwa componentu, który wstawiamy w tym miejscu :props='obiekt,który chcemy przekazać' -->
          <Grupy :przedmiot="przedmiot" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
import Grupy from "./Grupy";
import Dodaj_przedmiot from "./Dodaj_przedmiot";
import Usun_przedmiot from "./Usun_przedmiot"

export default {
  name: "glowna_prowadzacy",
  props: [""],

  components: {
    Grupy: Grupy,
    Dodaj_przedmiot: Dodaj_przedmiot,
    Usun_przedmiot: Usun_przedmiot,
  },

  data: () => ({
    przedmioty: [],
  }),

  mounted: function () {
    this.$api.get("przedmioty/").then((response) => {
      this.przedmioty = response.data;
    });
  },
  methods: {
    przedmiot_init(){
         this.$api.get("przedmioty/")
         .then((response) => {
      this.przedmioty = response.data;
    });
    }
  },
};
</script>
