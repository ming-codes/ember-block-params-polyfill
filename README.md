# ember-block-params-polyfill

[![Greenkeeper badge](https://badges.greenkeeper.io/ming-codes/ember-block-params-polyfill.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/ming-codes/ember-block-params-polyfill.svg?branch=master)](https://travis-ci.org/ming-codes/ember-block-params-polyfill)
[![npm version](https://badge.fury.io/js/ember-block-params-polyfill.svg)](http://badge.fury.io/js/ember-block-params-polyfill)

This Ember CLI Addon polyfills the block param feature first introduced in Ember 1.10.

## How to use

It's pretty straight forward for component templates, just go ahead and pass in arguments
to your yield helper.

```hbs
{{yield arg1 arg2}}
```

However, when you're using the yielded block param in normal templates, the params will be
injected into context.

```hbs
{{#test-block-param-component up=0}}{{! as |down|}}
  Yield before scope: <span class="mid-scope">{{down}}</span> (1)
  {{#test-block-param-component up=down}}{{! as |down|}}
    Yield <span class="inner-scope">{{down}}</span> (2)

    From controller scope: <span class="inner-scope-ctrl">{{controllerValue}}</span>
  {{/test-block-param-component}}
  Yield after scope: <span class="mid-scope">{{down}}</span> (1)
{{/test-block-param-component}}
```

It's recommended to add a comment at the end to indicate there is an injected property.
Furthermore, this aids in upgrading where you can find and replace all instances of `}}{{!`

## Limitations

Normal templates does not have the freedom to choose block param names.

Currently only tested under 1.8.1
