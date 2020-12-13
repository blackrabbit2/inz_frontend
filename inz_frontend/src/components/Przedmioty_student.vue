<template>
  <v-container>
    <v-row>
      <v-col v-for="przedmiot in przedmioty" :key="przedmiot.id" cols="4">
        <Przedmiot :student="student" :przedmiot="przedmiot" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Przedmiot from "./Przedmiot";

export default {
  name: "przedmioty",
  props: ["przedmioty", "student"],

  components: {
    Przedmiot: Przedmiot,
  },

  data: () => ({}),
};
</script>
