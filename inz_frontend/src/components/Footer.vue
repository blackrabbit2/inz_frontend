<template>
 <v-footer
      dark
      padless
    >
      <v-card
        flat
        tile
        app
        color="primary"
        class="flex white--text text-center "
      >

        <v-card-text>
          <v-btn
            max-height="24px"
            v-for="icon in icons"
            :key="icon"
            class="mx-3 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text class="white--text pt-0">
            Projekt wykonano w ramach pracy inżynierskiej.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Weronika Dziedzic</strong>
        </v-card-text>
      </v-card>
    </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  })
}
</script>