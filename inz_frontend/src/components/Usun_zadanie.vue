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
    methods: {
        usun_zadanie: function(zadanie){
            if(confirm("Na pewno ususnąć zadanie?")){
                this.$api
                console.log(zadanie.id)
                .delete('/quiz/zadania/'+zadanie.id)
                // .then(() => {
                //     zadanie.id=0
                //     var removeIndexZadanie = this.zadania.map(item => item.id).indexOf(zadanie.id)
                //     removeIndexZadanie && this.zadania.splice(removeIndexZadanie, 1)
                //     this.$forceUpdate()
                // })
            }
        }
    },

}
</script>