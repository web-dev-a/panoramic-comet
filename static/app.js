// Replace with your own values
const searchClient = algoliasearch(
  'G7MVO6PS34',
  '1e0e2ec12c7e3c36b59ce40e7ea62db2' // search only API key, not admin API key
);

const search = instantsearch({
  indexName: 'check',
  searchClient,
  routing: true,
  exactOnSingleWordQuery: 'word',
  searchFunction: function(helper) {
    if (helper.state.query === '') {
      return;
    }
        helper.search();   
    
  },

  searchFunction: function(helper) {              
     if (helper.state.query.length < 6) {                         
        return; // no search if less than 2 character               
    }               
       helper.search( );     
}
});

search.addWidgets([
  instantsearch.widgets.configure({
    hitsPerPage: 1,
  })
]);

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#search-box',
    showSubmit: false,
    autofocus: true,
    searchAsYouType: false,
  })
]);

search.addWidgets([
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: 
      `
<div style="text-align: center;">
<p>
{{#helpers.highlight}}{ "attribute": "status" }{{/helpers.highlight}}
</p>
</div>
`,

      empty: `<em>"{{query}}"</em> not found`,
    },
  })
]);

search.start();
