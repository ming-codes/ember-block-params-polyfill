import Ember from 'ember';

const emberYield = Ember.__loader.require('ember-handlebars/helpers/yield').default;

//Ember.assert('This version of Ember has yield forward. There is no need to use this polyfill', !hasYieldForward);

const handlebarsViewHelper = Ember.Handlebars.makeViewHelper(Ember.View.extend({
  tagName: '',
  isVirtual: true,

  yieldProperties: null,

  component: Ember.computed.alias('parentView'),

  content: Ember.computed('component', function () {
    let content = this.nearestWithProperty('yieldProperties') || this.get('parentView');

    return Ember.ObjectProxy.create({
      content: content.get('origContext') || content.get('_parentView.context')
    });
  }).readOnly(),

  context: Ember.computed.alias('content'),

  init() {
    let yieldProperties = this.get('yieldProperties') || [];
    let component = this.get('component');
    let content = this.get('content');

    Ember.assert('yield-block-params can only be used in the component template.', component instanceof Ember.Component);

    this._super(...arguments);

    yieldProperties.forEach(prop => {
      content[prop] = null;
      this[`${prop}Binding`] = Ember.Binding
        .from(`component.${prop}`)
        .to(`content.${prop}`)
        .connect(this);
    });

    this.templateBinding = this.templateBinding || Ember.Binding
      .from('_parentView.context.template')
      .to('template')
      .connect(this);
  }
}));

export default function (...args) {
  let options = args.pop();

  if (arguments.length === 1) {
    return emberYield.apply(this, arguments);
  }

  options.hash.yieldProperties = args;

  return handlebarsViewHelper(options);
}
