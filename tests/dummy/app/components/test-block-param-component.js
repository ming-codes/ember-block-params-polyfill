import Ember from 'ember';
import layout from '../templates/components/test-block-param-component';

export default Ember.Component.extend({
  layout,

  up: null,

  down: Ember.computed('up', function () {
    return this.get('up') + 1;
  }).readOnly()
});
