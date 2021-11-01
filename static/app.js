// Replace with your own values
const searchClient = algoliasearch(
  'XNSMX45307',
  '62a336bc347a141c6182094f05edfcbe' // search only API key, not admin API key
);

const search = instantsearch({
  indexName: 'CD',
  searchClient,
  routing: true,
});


search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#q',
    placeholder: 'Search for products',
    autofocus: false,
    poweredBy: true,
    reset: true,
    loadingIndicator: false
  })
);

search.addWidgets([
  instantsearch.widgets.configure({
    hitsPerPage: 1000,
  })
]);

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#search-box',
    showSubmit: false,
    autofocus: true,
    searchOnEnterKeyPressOnly: true,
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
{{#helpers.highlight}}{ "attribute": "artist" }{{/helpers.highlight}}
</a> <span style="text-align: right"><a target="_blank" href="https://www.discogs.com/search/?sort=year%2Cdesc&q={{artist}}&type=release" style="text-decoration:none"><i class="material-icons"> library_music</i></a>
</span>
</p>
<p>
{{#helpers.highlight}}{ "attribute": "album" }{{/helpers.highlight}} {{#helpers.highlight}}{ "attribute": "year" }{{/helpers.highlight}}
</p>
</div>
`,

      empty: `<em>"{{query}}"</em> not found`,
    },
  })
]);

search.start();