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
<p><a href="{{url}}">
{{#helpers.highlight}}{ "attribute": "status" }{{/helpers.highlight}}
</a> <span style="text-align: right"><a target="_blank" href="https://www.discogs.com/search/?sort=year%2Cdesc&q={{artist}}&type=release" style="text-decoration:none"><i class="material-icons"> library_music</i></a>
</span>
</p>
</div>
`,

      empty: `<em>"{{query}}"</em> not found`,
    },
  })
]);

search.start();