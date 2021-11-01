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
});

search.addWidgets([
  instantsearch.widgets.configure({
    hitsPerPage: 1000,
  })
]);

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#search-box',
    showSubmit: true,
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
{{#helpers.highlight}}{ "attribute": "status" }{{/helpers.highlight}}
</p>
</div>
`,

      empty: `<em>"{{query}}"</em> not found`,
    },
  })
]);

search.start();