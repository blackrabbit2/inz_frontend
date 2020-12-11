<template>
  <v-btn dark color="secondary" text small @click="usun(przedmiot)">
    <v-icon>fas fa-trash</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "usun_przedmiot",
  props: ["przedmiot"],

  methods: {
    usun: function (przedmiot) {
      if (confirm("Na pewno usunąć przedmiot " + przedmiot.nazwa)) {
        this.$api.delete("/przedmioty/" + przedmiot.id + "/").then(() => {
          przedmiot.id = 0;
          this.$emit("przedmiotUsun");
        });
      }
    },
  },
};
</script>