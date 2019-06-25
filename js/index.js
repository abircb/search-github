  $(document).ready(function() {
      displaySearchHistory();
  });

  var previousSearches = [];
  var input = document.getElementById("searchKey");

  if(input) {
    input.addEventListener("keydown", function (e) {
      if (e.keyCode === 13) {
        basicSearch(e);
      }
    });
  }

  function basicSearch(e) {
    let searchKey = document.getElementById("searchKey").value;
    storeSearches(searchKey)
    searchKey = (searchKey.toString().toLowerCase()).trim();
    var searchURL = 'https://github.com/search?q=' + searchKey;
    var createProperties = {
      "url": searchURL
    };
    chrome.tabs.create(createProperties, function(){});
  }

  function displaySearchHistory() {
    if(localStorage["previousSearches"]) {
      previousSearches = JSON.parse(localStorage["previousSearches"]);
    }
    else {
      previousSearches = ['octokit/rest.js', 'atom', 'search-github-crx', 'antirez/redis']
    }

    $("#searchKey").autocomplete({
      source: function(request, response) {
        var results = $.ui.autocomplete.filter(previousSearches, request.term);
        response(results.slice(0, 5));
      },
      messages: {
        noResults: ''
      },
      maxShowItems: 5
    });
  }

  function storeSearches(search) {
    if(previousSearches.indexOf(search) == -1) {
      previousSearches.unshift(search);
      if(previousSearches.length > 100) {
        previousSearches.pop();
      }
      localStorage["previousSearches"] = JSON.stringify(previousSearches);
    }
  }
