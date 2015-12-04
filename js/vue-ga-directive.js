/* globals Vue */
Vue.directive('ga-event', {
  params: ['v-ga-callback', 'v-ga-value'],
  bind: function () {
    // if window.ga is not loaded, just mock it with the console
    if (typeof(window.ga) !== 'function') {
      console.warn('Vue Ga Directive: The window.ga function could not be found. Using console.log instead.');
      window.ga = function(s, d) {
        console.log(s, d);
      };
    }
    this.handler = function () {
      // mimics the Vue style of click listeners
      if (this.modifiers.prevent) {
        event.preventDefault();
      }
      if (this.modifiers.stop) {
        event.stopPropagation();
      }
      // prepare our data for further manipulation
      var data = {
        eventCategory: this.el.nodeName.toLowerCase(), // lowercase our element name
        eventAction: this.arg, // this is the event that is being triggered
        eventLabel: this.expression, // what was passed in v-ga-event?
        hitType: "event" // needed for the ga.send
      };
      // test if there is a valid callback in our Vue instance
      if (typeof(this.params.vGaCallback) !== 'undefined' && typeof(this.vm[this.params.vGaCallback]) === 'function') {
        this.vm[this.params.vGaCallback].call(this, this.el);
      }
      // check if there is a valid number being passed in v-ga-value
      if (typeof(this.params.vGaValue) !== 'undefined') {
        data.value = parseInt(this.params.vGaValue, 10);
      }
      window.ga('send', data);
    }.bind(this);
    // setup the element with the listener
    this.el.addEventListener(this.arg, this.handler);
  },
  unbind: function () {
    // shut er' down
    this.el.removeEventListener(this.arg, this.handler);
  }
});