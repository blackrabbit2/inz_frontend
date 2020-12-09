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
                console.log(cwiczenie.id)
                .delete('/cwiczenia/'+ cwiczenie.id)
                .then(() => {
                    cwiczenie.id = 0
                    var removeIndex = this.cwiczenia.map(item => item.id).indexOf(cwiczenie.id)
                    ~removeIndex && this.cwiczenia.splice(removeIndex, 1)
                    this.$forceUpdate()  
                })
            }
        },
    }
}
</script>