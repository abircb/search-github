  $(document).ready(function() {
    displaySearchHistory();
    displayTip();
  });

  var previousSearches = [];
  var basicSearch_input = document.getElementById("searchKey");
  var tips = [
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;Use Advanced for constructing powerful search queries",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;52% of the Fortune 50 companies use Github Enterprise to develop software",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;Search GitHub is an Open Source project, created with ❤️  Check it out <a href=\"https://github.com/abircb/search-github-crx\">here</a>",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;On March 2017, Github broke the record and become the world&apos;s biggest Open Source host of all time",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;Github has over 800 employees, of which 65% are remote",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;Github Desktop makes life easy",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;GitHub&apos;s mascot is a female cat with 5 octopus-like arms. It was created by Simon Oxley, who also designed Twitter&apos;s bird",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;Open Source projects on GitHub are written in over 337 programming languages, of which JavaScript is most popular",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;Sometimes emojis are worth a thousand words. The <i>thumbs up</i> emoji has been used more than 7.2 million times on Github",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;GitHub was affected by DDOS attack in 2015, which lasted for around 5 days",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;Search GitHub is an Open Source project, created with ❤️  Check it out <a href=\"https://github.com/abircb/search-github-crx\">here</a>"
  ];

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
    let fokeOptions = getForkOptions();
    let searchURL = 'https://github.com/search?utf8=%E2%9C%93&q=' + searchKey + searchParameters + fokeOptions + '&type=' + searchType + '&ref=advsearch&l=&l=';
    let createProperties = {
      "url": searchURL
    };
    chrome.tabs.create(createProperties, function() {});
  }

  function getParameters() {
    let param = '';
    param += repoParameters() + codeParameters() + issueParameters() + userParameters() + wikiParameter();
    return param;
  }

  function repoParameters() {
    let repoParameters = '';
    let users = document.getElementById("user").value;
    let repo = document.getElementById("repo").value;
    let stars = document.getElementById("stars").value;
    let forks = document.getElementById("forks").value;
    let size = document.getElementById("repo_size").value;

    if (!(isEmpty(users))) {
      repoParameters += parse('+user%3A', users);
    }
    if (!(isEmpty(repo))) {
      repoParameters += parse('+repo%3A', repo);
    }
    if (!(isEmpty(stars))) {
      repoParameters += parse('+stars%3A', stars);
    }
    if (!(isEmpty(forks))) {
      repoParameters += parse('+forks%3A', forks);
    }
    if (!(isEmpty(size))) {
      repoParameters += parse('+size%3A', size);
    }

    return repoParameters;
  }

  function codeParameters() {
    let codeParameters = '';
    let extension = document.getElementById("extension").value;
    let size = document.getElementById("code_size").value;
    let path = document.getElementById("path").value;
    let filename = document.getElementById("filename").value;

    if (!(isEmpty(extension))) {
      codeParameters += parse('+extension%3A', extension);
    }
    if (!(isEmpty(size))) {
      codeParameters += parse('+size%3A', size);
    }
    if (!(isEmpty(path))) {
      codeParameters += parse('+path%3A', path);
    }
    if (!(isEmpty(filename))) {
      codeParameters += parse('+filename%3A', filename);
    }

    return codeParameters;
  }

  function issueParameters() {
    let issueParameters = '';
    let comments = document.getElementById("commments").value;
    let label = document.getElementById("label").value;
    let author = document.getElementById("author").value;
    let mentions = document.getElementById("mentions").value;
    let assignee = document.getElementById("assignee").value;

    if (!(isEmpty(comments))) {
      issueParameters += parse('+comments%3A', comments);
    }
    if (!(isEmpty(label))) {
      issueParameters += parse('+label%3A', label);
    }
    if (!(isEmpty(author))) {
      issueParameters += parse('+author%3A', author);
    }
    if (!(isEmpty(mentions))) {
      issueParameters += parse('+mentions%3A', mentions);
    }
    if (!(isEmpty(assignee))) {
      issueParameters += parse('+assignee%3A', assignee);
    }

    return issueParameters;
  }

  function userParameters() {
    let userParameters = '';
    let fullname = document.getElementById("fullname").value;
    let location = document.getElementById("location").value;
    let followers = document.getElementById("followers").value;
    let public_repos = document.getElementById("repos").value;

    if (!(isEmpty(fullname))) {
      userParameters += parse('+fullname%3A', fullname);
    }
    if (!(isEmpty(location))) {
      userParameters += parse('+location%3A', location);
    }
    if (!(isEmpty(followers))) {
      userParameters += parse('+followers%3A', followers);
    }
    if (!(isEmpty(public_repos))) {
      userParameters += parse('+repos%3A', public_repos);
    }

    return userParameters;
  }

  function wikiParameter() {
    let wikiParameter = '';
    let updated = document.getElementById("updated").value;

    if (!(isEmpty(updated))) {
      wikiParameter += parse('+updated%3A', updated);
    }

    return wikiParameter;
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
      let keywords = str.split(',');
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

  function displayTip() {
    let min = 0;
    let max = tips.length - 1;
    let n = Math.floor(Math.random() * (+max - +min)) + +min;
    document.getElementById("tip").innerHTML = tips[n];
  }
