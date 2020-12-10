<template>
    <v-dialog>
        <template v-slot:activator="{ on, attrs }">
                <v-btn
                dark
                color="secondary"
                v-bind="attrs"
                v-on="on"
                >Protokół
                </v-btn>
             </template>
             <v-card>
                 <v-toolbar
                    dark
                    color="primary"
                 >
                    <v-btn
                        icon
                        dark
                        @click="cwiczenie.stworz_protokol=false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>
                    Protokol do cwiczenia: {{cwiczenie.nazwa_cwiczenia}}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
             </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'protokol_prowadzacy',
    props: ['cwiczenie'],

    data: () => ({
      stworz_protokol: [],  
    }),

    methods: {
        
    }
}
</script>