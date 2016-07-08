/*global QUnit*/
import { Page } from '../src/page';

function setCurrentScope(scope) {
  document.body.dataset.page = scope;
}

QUnit.module('Page', {
  beforeEach: function() {
    this.page = new Page();
  }
});

QUnit.test('throws an error when [data-page] does not exist on body', function(assert) {
  var self = this;
  assert.throws(
    () => self.page.dispatch(),
    /<body> does not have a \[data-page\] attribute/
  );
});

QUnit.test('runs the initializer block for the given scope', function(assert) {
  this.page.at('a-scope', () => assert.ok(true));

  setCurrentScope('a-scope');
  this.page.dispatch();
});

QUnit.test('sends the current scope as an argument', function(assert) {
  this.page.at('the-scope', (transition) => assert.equal(transition.scope, 'the-scope'));

  setCurrentScope('the-scope');
  this.page.dispatch();
});

QUnit.test('sends custom data as an argument', function(assert) {
  this.page.at('a-scope', (transition) => assert.ok(transition.data.foobar));

  setCurrentScope('a-scope');
  this.page.dispatch({ foobar: true });
});

QUnit.test('always run the before and after block', function(assert) {
  this.page.at(':before', () => assert.ok(true));
  this.page.at(':after', () => assert.ok(true));

  setCurrentScope('scope-without-blocks');
  this.page.dispatch();
});

QUnit.test('runs multiple blocks for the given scope', function(assert) {
  this.page.at('multiple', () => assert.ok(true));
  this.page.at('multiple', () => assert.ok(true));

  setCurrentScope('multiple');
  this.page.dispatch();
  assert.expect(2);
});

QUnit.test('runs blocks that does not have variants and the ones with specific variants', function(assert) {
  this.page.at('a-scope', () => assert.ok(true));
  this.page.at('a-scope+variant', (transition) => {
    assert.deepEqual(['variant'], transition.variants);
  });

  this.page.at('a-scope+another-variant', () => assert.ok(false));

  setCurrentScope('a-scope+variant');
  this.page.dispatch();
});

QUnit.test('runs blocks with the exact multiple variants', function(assert) {
  this.page.at('a-scope+one+two', (transition) => {
    assert.deepEqual(['one', 'two'], transition.variants);
  });

  this.page.at('a-scope+two+one', (transition) => {
    assert.deepEqual(['one', 'two'], transition.variants);
  });

  this.page.at('a-scope+one+two+three', () => assert.ok(false));

  setCurrentScope('a-scope+one+two');
  this.page.dispatch();
});

QUnit.test('halts the chain if a block returns false', function(assert) {
  this.page.at('halting', () => false);
  this.page.at('halting', () => assert.ok(false));

  setCurrentScope('halting');
  this.page.dispatch();

  assert.expect(0);
});

QUnit.test('runs the chain on the following order: "before", initializers, and "after"', function(assert) {
  var sequence = [];
  this.page.at('chain',   () => sequence.push('initializer'));
  this.page.at(':before', () => sequence.push(':before'));
  this.page.at(':after', () => sequence.push(':after'));

  this.page.at(':after',  () => assert.deepEqual([':before', 'initializer', ':after'], sequence));

  setCurrentScope('chain');
  this.page.dispatch();
});

QUnit.test('stores the same block for more than one scope', function(assert) {
  this.page.at('one two', () => assert.ok(true));
  setCurrentScope('one');
  this.page.dispatch();

  setCurrentScope('two');
  this.page.dispatch();

  assert.expect(2);
});
