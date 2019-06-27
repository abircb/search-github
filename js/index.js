  $(document).ready(function() {
    displaySearchHistory();
  });

  var previousSearches = [];
  var basicSearch_input = document.getElementById("searchKey");

  if (basicSearch_input) {
    basicSearch_input.addEventListener("keydown", function(e) {
      if (e.keyCode === 13) {
        basicSearch(e);
      }
    });
  }

  function basicSearch(e) {
    let searchKey = document.getElementById("searchKey").value;
    storeSearches(searchKey)
    searchKey = (searchKey.toString().toLowerCase()).trim();
    let searchURL = 'https://github.com/search?q=' + searchKey;
    let createProperties = {
      "url": searchURL
    };
    chrome.tabs.create(createProperties, function() {});
  }

  var searchBtn = document.getElementById("advanced_btn");
  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      advancedSearch();
    });
  }

  function advancedSearch() {
    let searchKey = document.getElementById("advanced_search").value;
    let searchType = document.getElementById("search_type").value
    if (searchKey) {
      searchKey = (searchKey.toString().toLowerCase()).trim();
    }
    if (searchType == 'Packages') {
      searchType = 'RegistryPackages';
    }
    let searchURL = 'https://github.com/search?utf8=%E2%9C%93&q=' + searchKey + '&type=' + searchType + '&ref=advsearch&l=&l=';
    let createProperties = {
      "url": searchURL
    };
    chrome.tabs.create(createProperties, function() {});
  }

  function displaySearchHistory() {
    if (localStorage["previousSearches"]) {
      previousSearches = JSON.parse(localStorage["previousSearches"]);
    } else {
      previousSearches = ['octokit/rest.js', 'atom', 'search-github-crx', 'antirez/redis', 'electron'];
    }

    $("#searchKey").autocomplete({
      source: function(request, response) {
        var results = $.ui.autocomplete.filter(previousSearches, request.term);
        response(results.slice(0, 5));
      },
      messages: {
        noResults: ''
      }
    });
  }

  function storeSearches(search) {
    if (previousSearches.indexOf(search) == -1) {
      previousSearches.unshift(search);
      if (previousSearches.length > 100) {
        previousSearches.pop();
      }
      localStorage["previousSearches"] = JSON.stringify(previousSearches);
    }
  }
