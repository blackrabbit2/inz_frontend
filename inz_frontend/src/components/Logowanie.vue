<template>
<v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="user.id != null" tile elevation="0" color="secondary" v-bind="attrs" v-on="on" @click="wyloguj">Wyloguj
        </v-btn>
        <v-btn v-else tile elevation="0" color="secondary" v-bind="attrs" v-on="on" @click="logowanie">Logowanie
        </v-btn>
    </template>
    <v-list>
        <v-list-item>
            <v-list-item-title>
                <v-dialog v-model="logowanie_student" max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-list-item-title v-bind="attrs" v-on="on">
                            Student
                        </v-list-item-title>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Logowanie studenta</span>
                        </v-card-title>
                        <v-form v-on:submit.prevent="zaloguj_student">
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="haslo" label="Password*" type="password" required>
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                                <small>*indicates required field</small>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" text type="submit"> Zaloguj </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                </v-dialog>
            </v-list-item-title>
        </v-list-item>

        <v-list-item>
            <v-list-item-title>
                <v-dialog v-model="logowanie_prowadzacy" max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-list-item-title v-bind="attrs" v-on="on">
                            Prowadzący
                        </v-list-item-title>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Logowanie prowadzącego</span>
                        </v-card-title>
                        <v-form v-on:submit.prevent="zaloguj_prowadzacy">
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field v-model="login" label="Login" hint="" required>
                                            </v-text-field>
                                            <v-text-field v-model="haslo" label="Password*" type="password" required>
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                                <small>*indicates required field</small>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" text type="submit" @click="zaloguj_prowadzacy">
                                    Zaloguj
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                </v-dialog>
            </v-list-item-title>
        </v-list-item>
    </v-list>
    <Uzupelnienie_danych @studentRefresh='student_complete' :user="user.id" v-model="uzupelnienie_danych" />
</v-menu>
</template>

<script>
import Uzupelnienie_danych from "./Uzupelnienie_danych";

export default {
    name: "logowanie",
    props: ["user"],

    components: {
        Uzupelnienie_danych: Uzupelnienie_danych,
    },
    data: () => ({
        uzupelnienie_danych: false,
        logowanie_student: false,
        logowanie_prowadzacy: false,
        haslo: null,
        login: null,
    }),

    methods: {
        zaloguj_prowadzacy: function () {
            this.$api
                .post("logowanie_prowadzacy/", {
                    login: this.login,
                    haslo: this.haslo
                })
                .then((response) => {
                    this.$api.defaults.headers.common["Authorization"] =
                        "Token " + response.data.token;
                    this.$cookie.set('Token', response.data.token, 1)
                    this.user.id = response.data.user;
                    this.user.prowadzacy = true;
                    this.logowanie_prowadzacy = false;
                })
                .catch(function (error) {
                    alert(error);
                });
        },
        zaloguj_student: function () {
            this.$api
                .post("logowanie/", {
                    haslo: this.haslo
                })
                .then((response) => {
                    this.$api.defaults.headers.common["Authorization"] =
                        "Token " + response.data.token;
                    this.$cookie.set('Token', response.data.token, 1)
                    this.$api
                        .get('users/' + response.data.user + '/')
                        .then((response) => {
                            this.user = response.data
                            if (!this.user.first_name) {
                                this.uzupelnienie_danych = true;
                            } else {
                                this.$api
                                    .get('studenci/')
                                    .then((response) => {
                                        this.$emit('studentComplete', response.data[0])
                                    })
                            }
                            this.user.student = true;
                            this.logowanie_student = false;
                        })

                })
                .catch(function (error) {
                    alert(error);
                });
        },
        wyloguj: function () {
            alert("Na pewno chcesz się wylogować?");
            this.$api.defaults.headers.common["Authorization"] = null;
            this.user.id = null;
            this.user.student = false;
            this.user.prowadzacy = false;
            this.$cookie.delete('Token')
        },
        logowanie: function () {
            if (this.user.student || this.user.prowadzacy) {
                return "Wyloguj";
            } else {
                return "Logowanie";
            }
        },
        student_complete: function (student_odebrany) {
            this.$emit('studentComplete', student_odebrany)
        },
    },
};
</script>
