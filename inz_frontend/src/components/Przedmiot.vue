<template>
<v-card min-height="200">
    <v-btn v-on:click="toggleDetail" block cover tile elevation="0" color="secondary">
        {{ przedmiot.nazwa }}
    </v-btn>

    <v-card-subtitle v-show="!detail">
        {{ przedmiot.opiekun.user.username }}
    </v-card-subtitle>
    <!--lista ćwiczeń-->
    <v-expand-x-transition>
        <v-list v-show="detail">
            <v-list-group v-for="cwiczenie in cwiczenia" :key="cwiczenie.id" no-action>
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title v-text="cwiczenie.nazwa_cwiczenia"></v-list-item-title>
                    </v-list-item-content>
                </template>
                <!--Instrukcje-->
                <v-list-group no-action sub-group>
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>Intrukcje</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item v-for="(instrukcja, i) in cwiczenie.instrukcje" v-bind:key="i" :href="instrukcja.plik" target="_blank">
                        <v-list-item-title v-text="instrukcja.nazwa"></v-list-item-title>
                    </v-list-item>
                </v-list-group>
                <!-- Quiz-->
                <v-divider></v-divider>
                <v-list-item>
                    <v-list-item-content v-if="">                        
                            <Quiz_student :cwiczenie="cwiczenie" :student="student" />
                    </v-list-item-content>
                </v-list-item>
                <!--Protokół-->
                <v-divider></v-divider>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Protokół</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
    </v-expand-x-transition>
</v-card>
</template>

<script>
import axios from "axios";
import Quiz_student from './Quiz_student'

export default {
    name: "przedmiot",
    props: ["przedmiot", "student"],

    components: {
        Quiz_student: Quiz_student
    },

    data: () => ({
        cwiczenia: [],
        detail: false,
    }),

    mounted: function () {
        axios
            .get("http://127.0.0.1:8000/cwiczenia/?przedmiot=" + this.przedmiot.id)
            .then((response) => {
                this.cwiczenia = response.data;
            });
    },
    methods: {
        toggleDetail: function () {
            this.detail = !this.detail;
        },
    },
};
</script>
