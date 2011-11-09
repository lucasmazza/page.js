page('index', function() {
  alert("so, you're on the 'index' page.");
});

page('other', function() {
  alert("So, you won't see the other message in this page");
})

page(":after", function() {
  alert(':)');
})
page.run();
