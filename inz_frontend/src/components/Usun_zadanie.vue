<template>
    <v-btn
    dark
    text
    color="secondary"
    @click="usun_zadanie(zadanie)"
    >
     <v-icon>fas fa-trash</v-icon>
    </v-btn>    
</template>

<script>
export default {
    name: "usun_zadanie",
    props: ['zadanie'],

    methods: {
        usun_zadanie: function(zadanie){
            if(confirm("Na pewno ususnąć zadanie?")){
                this.$api
                .delete('/quiz/zadania/'+zadanie.id)
                .then( () => {
                this.$emit('zadanieRefresh');
            })
                
            }
        }
    },

}
</script>