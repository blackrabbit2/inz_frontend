<template>
<v-app :key='user.id'>
    <v-app-bar app color="primary" dark>
        <p>Interaktywne instrukcje laboratoryjne {{ user.first_name }}</p>
        <v-spacer></v-spacer>

        <Logowanie @studentComplete="odbierz_student" :user="user" />
    </v-app-bar>

    <v-main>
        <Glowna_prowadzacy v-if="user.prowadzacy" />
        <Przedmioty_student v-else-if="user.student" :przedmioty="przedmioty" />
        <Przedmioty v-else :przedmioty="przedmioty" />
    </v-main>

    <Footer />
</v-app>
</template>

<script>
import Przedmioty from "./components/Przedmioty";
import Logowanie from "./components/Logowanie";
import Glowna_prowadzacy from "./components/Glowna_prowadzacy";
import Footer from "./components/Footer";
import Przedmioty_student from "./components/Przedmioty_student";

export default {
    name: "App",

    components: {
        Przedmioty: Przedmioty,
        Logowanie: Logowanie,
        Przedmioty_student: Przedmioty_student,
        Glowna_prowadzacy: Glowna_prowadzacy,
        Footer: Footer,
    },

    data: () => ({
        user: {
            id: null,
            student: false,
            prowadzacy: false,
        },
        przedmioty: [],
        student: [],
    }),

    mounted: function () {
        this.$api.get("przedmioty/").then((response) => {
            this.przedmioty = response.data;
        });
        if (this.$cookie.get('Token')) {
            this.$api.defaults.headers.common["Authorization"] =
                "Token " + this.$cookie.get('Token');
            this.$api
                .get('studenci/')
                .then((response) => {
                    this.student = response.data[0]
                    this.user = response.data[0].user
                })
        }
    },

    methods: {
        sprawdz_uzytkownika: function (id) {
            //Wczytanie danych użytkownika i wypełnienie zmiennej user
            this.user.imie = id;
        },
        odbierz_student: function (student) {
            this.student = student;
            this.user = student.user;
        }
    },
};
</script>
