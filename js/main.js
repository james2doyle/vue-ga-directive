/* globals Vue */

// create a root instance
var App = new Vue({
  el: '#app',
  data: {
    loggedEvent: ''
  },
  methods: {
    logGaEvent: function(el) {
      this.loggedEvent = el.innerText;
    }
  }
});