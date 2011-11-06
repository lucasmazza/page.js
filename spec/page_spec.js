describe('Page', function() {

  it('works', function() {
    expect(page).toBeDefined();
  })

  var block, another;

  beforeEach(function() {
    block = function() { }
    another = function() { }
    page.clear();
  })

  it('stores a initializer block', function() {
    page('a-scope', block)

    var initializers = page.initializers['a-scope'];
    expect(initializers).toContain(block);
  })

  it('stores multiple blocks', function() {
    page('a-scope', block)
    page('a-scope', another)

    var initializers = page.initializers['a-scope'];
    expect(initializers.length).toBe(2);
  })
})