<template>
         <v-btn
            dark
            color='secondary'
            text
            small
            @click="usun(cwiczenie)"
            >
            <v-icon>fas fa-trash</v-icon>
            </v-btn>   
</template>

<script>
export default {
    name: 'usun_cw',
    props: ['cwiczenie'],

    methods: {
        usun: function(cwiczenie){
            if(confirm("Na pewno usunąć ćwiczenie "+cwiczenie.nazwa_cwiczenia)){
                this.$api
                .delete('/cwiczenia/'+ cwiczenie.id)
                .then(() => {
                    cwiczenie.id = 0
                    this.$emit('cwiczenieRefresh'); 
                })
            }
        },
    }
}
</script>