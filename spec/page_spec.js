describe('Page', function() {
  beforeEach(function() {
    this.page = new Page();
  });

  it('runs the initializer block for the given scope', function() {
    var block = jasmine.createSpy();
    this.page.at('a-scope', block);

    this.page.detect = function() { return 'a-scope'; };
    this.page.recognize();
    expect(block).toHaveBeenCalled();
  });

  it('sends the current scope as an argument', function() {
    var arg;
    this.page.at('the-scope', function(scope) { arg = scope; })
    this.page.detect = function() { return 'the-scope'; };
    this.page.recognize();

    expect(arg).toEqual('the-scope');
  });

  it('always run the before and after block', function() {
    var beforeBlock = jasmine.createSpy(),
        afterBlock = jasmine.createSpy();
    this.page.at(':before', beforeBlock);
    this.page.at(':after', afterBlock);

    this.page.detect = function() { return 'scope-without-blocks'; };
    this.page.recognize();

    expect(beforeBlock).toHaveBeenCalled();
    expect(afterBlock).toHaveBeenCalled();
  });

  it('runs multiple blocks for the given scope', function() {
    var sequence = [];
    this.page.at('multiple', function() { sequence.push(1) })
    this.page.at('multiple', function() { sequence.push(2) })

    this.page.detect = function() { return 'multiple'; };
    this.page.recognize();

    expect(sequence).toEqual([1,2]);
  });

  it('halts the chain if a block returns false', function() {
    var block = jasmine.createSpy();
    this.page.at('halting', function() { return false; })
    this.page.at('halting', block);

    this.page.detect = function() { return 'halting'; };
    this.page.recognize();

    expect(block).not.toHaveBeenCalled();
  });

  it("runs the chain on the following order - 'before', initializers, and 'after'", function() {
    var sequence = []
    this.page.at('chain',   function() { sequence.push('initializer'); })
    this.page.at(':before', function() { sequence.push(':before') });
    this.page.at(':after',  function() { sequence.push(':after') });

    this.page.detect = function() { return 'chain'; };
    this.page.recognize();

    expect(sequence).toEqual([':before', 'initializer', ':after'])
  });

  it('stores the same block for more than one scope', function() {
    var called = 0;
    this.page.at('one two', function() { called += 1; })

    this.page.detect = function() { return 'one'; };
    this.page.recognize();

    this.page.detect = function() { return 'two'; };
    this.page.recognize();

    expect(called).toEqual(2);
  });

  it('detects the current scope if none is given to the run', function() {
    spyOn(this.page, 'detect');

    this.page.recognize();
    expect(this.page.detect).toHaveBeenCalled();
  });
});
