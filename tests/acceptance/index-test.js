import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | index');

test('yield-block-params helper', function(assert) {
  let controller = this.application.__container__.lookup('controller:application');

  function verify(selector, value) {
    Ember.$(selector).each(function () {
      assert.equal(Ember.$(this).text(), value);
    });
  }

  visit('/');

  return andThen(() => {
    let mutable = (Math.random() * Date.now()).toString(36);

    verify('.inner-scope', '2');
    verify('.mid-scope', '1');
    verify('.outer-scope, .inner-scope-ctrl', 'Hello');
    
    Ember.run(() => {
      controller.set('controllerValue', mutable);
    });

    verify('.outer-scope, .inner-scope-ctrl', mutable);
  });

});
