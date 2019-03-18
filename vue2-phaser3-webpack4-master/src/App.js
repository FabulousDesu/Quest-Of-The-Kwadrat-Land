import Vue from 'vue';
import Game from '@/components/Game';
import Counter from '@/components/Counter'
import template from '@/templates/app.html';

let App = Vue.component('App', {
    template: template,
    components: {Game, Counter}

});

export default App;
