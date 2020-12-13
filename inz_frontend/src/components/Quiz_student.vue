<template>
<v-dialog v-model="student.quiz" fullscreen hide-overlay transition="dialog-bottom-transistion">
    <template v-slot:activator="{on, attrs}">
        <v-btn color="secondary" v-bind="attrs" v-on="on" @click="zadania_student">Rozwiąż quiz
        </v-btn>
    </template>
    <v-card :key="student_quiz.id">
        <v-toolbar dark color="primary">
            <v-btn icon dark @click="student.quiz = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Quiz do ćwiczenia: {{cwiczenie.nazwa_cwiczenia}} </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn v-if="!student_quiz.zatwierdzenie" tile elevation="0" color="primary" @click="wyslij_test">
                    Wyślij test!
                </v-btn>
                <v-btn v-else>
                    TEST UKOŃCZONY
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <div :key="student_quiz.id">
            <v-carousel height="400" hide-delimiter-background show-arrows-on-hover>
                <v-carousel-item v-for="n in student_quiz.odpowiedzi" :key="n.id">
                    <v-sheet color="secondary" height="100%">
                        <v-row class="fill-height" align="center" justify="center">
                            <div class="display-3">
                                {{ n.pytanie.tresc_zadania }}
                                <v-container class="px-0" fluid v-if="n.pytanie.odpowiedzi">
                                    <v-radio-group v-model="n.pytanie.odpowiedzi.id">
                                        <v-radio v-for="odpowiedz in n.pytanie.odpowiedzi" :key="odpowiedz.id" :label="`${odpowiedz.tresc}`" :value="odpowiedz.id" @change="poprawna(odpowiedz.id, n.id)"></v-radio>
                                    </v-radio-group>
                                </v-container>
                            </div>
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
        </div>

    </v-card>

</v-dialog>
</template>

>

<script>
export default {
    name: "quiz_student",
    props: ["student", "cwiczenie"],

    components: {
    },

    data() {
        return {
            onboarding: 0,
            quiz: [],
            student_quiz: [],
            odpowiedz: null,
            licz_zadania: {},
            wynik: null,
        }
    },

    methods: {
        zadania_student() {
            this.$api
                .post('quiz/test/generuj_test_studenta/', {
                    cwiczenie: this.cwiczenie.id,
                })
                .then((response) => {
                    this.student_quiz = response.data;
                })
        },
        poprawna(odpowiedz_id, zadanie_id) {
            this.$api
                .patch('quiz/zadanie_studenta/' + zadanie_id + '/', {
                    odpowiedz: odpowiedz_id,
                })
                .then(() => {
                    this.licz_zadania['odp' + zadanie_id] = true
                })
        },
        wyslij_test() {
            if (Object.keys(this.licz_zadania).length === this.cwiczenie.liczba_zadan_do_zrobienia) {
                this.$api
                    .patch('quiz/test/' + this.student_quiz.id + '/', {
                        zatwierdzenie: true,
                    })
                    .then(() => {
                        this.student_quiz.id += 1;
                        this.student_quiz.id -= 1;
                        setTimeout(this.$api
                            .get('quiz/test/' + this.student_quiz.id + '/wyniki/')
                            .then((response) => {
                                this.wynik = response.data;
                                alert(this.wynik.wynik_procentowy)
                            }), 500)
                    })
            } else {
                alert("Nie zaznaczono wszystkich odpowiedzi!");
            }
        },
    },

}
</script>>
