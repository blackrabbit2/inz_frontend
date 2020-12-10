<template>
  <v-btn dark color="secondary" text small @click="usun(grupa)">
    <v-icon>fas fa-trash</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "usun_grupe",
  props: ["grupa"],

  methods: {
    usun: function (grupa) {
      if (confirm("Na pewno usunąć grupę " + grupa.kod_grupy)) {
        this.$api.delete("/grupy/" + grupa.id + "/").then(() => {
          grupa.id = 0;
          this.$emit("grupaUsun");
        });
      }
    },
  },
};
</script>
