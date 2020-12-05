import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary : "#00695c",
                secondary: "#439889",
                accent: "#003d33"
            }
        }
    },
    icons: {
        iconfont: 'fa',
      },
});
