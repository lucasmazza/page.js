page.at('index', function() {
  alert('so, you are on the "index" page.');
});

page.at('other', function() {
  alert('So, you will nott see the other message in this page');
});

page.at(':after', function() {
  alert(':)');
});

page.dispatch();
