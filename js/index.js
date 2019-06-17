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
    searchKey = (searchKey.toString().toLowerCase()).trim();
    var searchURL = 'https://github.com/search?q=' + searchKey;
    var createProperties = {
      "url": searchURL
    };
    chrome.tabs.create(createProperties, function(){});
  }
