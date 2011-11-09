describe('Page', function() {

  it('runs the initializer block for the given scope', function() {
    var block = jasmine.createSpy();
    page('a-scope', block);

    page.run('a-scope');
    expect(block).toHaveBeenCalled();
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