describe('Page', function() {

  it('runs the initializer block for the given scope', function() {
    var block = jasmine.createSpy();
    page('a-scope', block);

    page.run('a-scope');
    expect(block).toHaveBeenCalled();
  })

  it('sends the current scope as an argument', function() {
    var arg;
    page('the-scope', function(scope) { arg = scope; })
    page.run('the-scope')

    expect(arg).toEqual('the-scope');
  })

  it('runs the before callbacks', function() {
    var beforeBlock = jasmine.createSpy();
    page(':before', beforeBlock);
    page('with-before-block', function() { })

    page.run('with-before-block')
    expect(beforeBlock).toHaveBeenCalled();
  })

  it("doesn't run before callbacks when theresn't blocks to run", function() {
    var beforeBlock = jasmine.createSpy();
    page(':before', beforeBlock);

    page.run('scope-without-blocks');
    expect(beforeBlock).not.toHaveBeenCalled();
  })

  it('runs multiple blocks for the given scope', function() {
    var sequence = [];
    page('multiple', function() { sequence.push(1) })
    page('multiple', function() { sequence.push(2) })

    page.run('multiple');
    expect(sequence).toEqual([1,2]);
  })

  it('halts the chain if a block returns false', function() {
    var block = jasmine.createSpy();
    page('halting', function() { return false; })
    page('halting', block)
    page.run('halting');

    expect(block).not.toHaveBeenCalled();
  })

  it('stores the same block for more than one scope', function() {
    var called = 0;
    page('one', 'two', function() { called += 1; })

    page.run('one');
    page.run('two');
    expect(called).toEqual(2);
  })

  it('detects the current scope if none is given to the run', function() {
    spyOn(page, 'identify');

    page.run();
    expect(page.identify).toHaveBeenCalled();
  })
})