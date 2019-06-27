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
    searchKey = searchKey.toString().trim();
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
      searchKey = searchKey.toString().trim();
    } else {
      searchKey = '';
    }

    if (searchType == 'Packages') {
      searchType = 'RegistryPackages';
    }

    let searchParameters = getParameters();
    let searchURL = 'https://github.com/search?utf8=%E2%9C%93&q=' + searchKey + searchParameters + '&type=' + searchType + '&ref=advsearch&l=&l=';
    let createProperties = {
      "url": searchURL
    };
    chrome.tabs.create(createProperties, function() {});
  }

  function getParameters() {
    let param = '';
    param += repoParams() + codeParams(); // + issueParams(); + userParams() + wikiParam();
    return param;
  }

  function repoParams() {
    let repoParams = '';
    let users = document.getElementById("user").value;
    let repo = document.getElementById("repo").value;
    let stars = document.getElementById("stars").value;
    let forks = document.getElementById("forks").value;
    let size = document.getElementById("repo_size").value;

    if (!(isEmpty(users))) {
      repoParams += parse('+user%3A', users);
    }
    if (!(isEmpty(repo))) {
      repoParams += parse('+repo%3A', repo);
    }
    if (!(isEmpty(stars))) {
      repoParams += parse('+stars%3A', stars);
    }
    if (!(isEmpty(forks))) {
      repoParams += parse('+forks%3A', forks);
    }
    if (!(isEmpty(size))) {
      repoParams += parse('+size%3A', forks);
    }

    return repoParams;
  }

  function codeParams() {
    let codeParams = '';
    let extension = document.getElementById("extension").value;
    let size = document.getElementById("code_size").value;
    let path = document.getElementById("path").value;
    let filename = document.getElementById("filename").value;

    if (!(isEmpty(extension))) {
      codeParams += parse('+extension%3A', extension);
    }
    if (!(isEmpty(size))) {
      codeParams += parse('+size%3A', extension);
    }
    if (!(isEmpty(path))) {
      codeParams += parse('+path%3A', extension);
    }
    if (!(isEmpty(filename))) {
      codeParams += parse('+filename%3A', extension);
    }

    return codeParams;
  }

  function issueParams() {
    let issueParams = '';
    let comments = document.getElementById("commments").value;
    let label = document.getElementById("label").value;
    let author = document.getElementById("author").value;
    let mentions = document.getElementById("mentions").value;
    let assignee = document.getElementById("assignee").value;

    if (!(isEmpty(comments))) {
      issueParams += parse('+comments%3A', extension);
    }
    if (!(isEmpty(label))) {
      issueParams += parse('+label%3A', extension);
    }
    if (!(isEmpty(author))) {
      issueParams += parse('+author%3A', extension);
    }
    if (!(isEmpty(mentions))) {
      issueParams += parse('+mentions%3A', extension);
    }
    if (!(isEmpty(assignee))) {
      issueParams += parse('+assignee%3A', extension);
    }

    return issueParams;
  }

  function isEmpty(str) {
    return (str == null || (str.toString().trim()).length == 0);
  }

  function getForkOptions() {
    let repo_fork = filterForkOption(document.getElementById("repo_fork").value);
    let code_fork = filterForkOption(document.getElementById("code_fork").value);
    let state = filterState(document.getElementById("state").value);
    return repo_fork + code_fork + state;
  }

  function filterForkOption(str) {
    if (str == 'Yes') {
      return '+fork%3Atrue'
    } else if (str == 'Only including forks') {
      return '+fork%3Aonly'
    } else {
      return '';
    }
  }

  function filterState(str) {
    if (str == 'open') {
      return '+state%3Aopen'
    } else if (str == 'closed') {
      return '+state%3Aclosed'
    } else {
      return '';
    }
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

  function parse(param, str) {
    if (str.includes(',')) {
      let parsedSearch = '';
      var keywords = str.split(',');
      i = 0;
      while (i < keywords.length) {
        parsedSearch += param + (keywords[i].trim());
        i += 1;
      }
      return parsedSearch;
    } else {
      return param + str;
    }

  }
