# vue-ga-directive

A directive for accessing the Google Analytics window.ga object by using attributes.

### Install

Available through npm as `vue-ga-directive`. Or include as an inline script, like in `example.html`.

### Demo

You can load up the `example.html` file here to test the directive.

### Usage

Here is how you might typically use this directive:

```html
<button type="button" v-ga-event:click.prevent="My Custom Label" v-ga-value="99" v-ga-callback="myVmFunction">Fire Click Event</button>
```

You can see we have `v-ga-event` which is listening for a `click` and it will also trigger `event.preventDefault()`. This is the same format as normal Vue `v-on:*` events.

Next we have the `v-ga-value` property. This is a positive Int that will be passed to the event. [Read the docs for more on eventValue](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventValue).

The last item is `v-ga-callback`. This will trigger that function in your current `Vue.vm`. It is like calling `this.myVmFunction(directiveInstance, event.target)`. For example, you might want to track the event, and then when the request is done, trigger a form submit or fetch a piece of data.

You can see a `Vue` instance in `js/main.js` if you want more details.