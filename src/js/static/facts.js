function getFacts() {
  return [
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;Use Advanced for constructing powerful search queries",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;52% of the Fortune 50 companies use Github Enterprise to develop software",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;Search GitHub is an Open Source project, created with &#x2764; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Contribute <a href=\"https://github.com/abircb/search-github-crx\" target=\"_blank\">here</a>",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;On March 2017, Github became the biggest Open Source host in history",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;Github has over 800 employees, of which 65% are remote",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;Github Desktop makes life easy",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;Let&apos;s say you&apos;re creating a pull request that fixes issue #1337. Then, entering the text &#34;fixes #1337&#34; in the description of your PR automagically closes that issue. Neat.",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;GitHub&apos;s mascot is a female cat with 5 octopus-like arms. It was created by Simon Oxley, who also designed Twitter&apos;s bird",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;GitHub has users in over 200 countries",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;Open Source projects on GitHub are written in over 337 programming languages, of which JavaScript is most popular",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;Sometimes emojis are worth a thousand words. The <i>thumbs up</i> emoji has been used more than 7.2 million times on Github",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;On February 28, 2018, GitHub fell victim to the second largest DDoS attack in history, with incoming traffic reaching a peak of about 1.35 terabits per second",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;Search GitHub is an Open Source project, created with &#x2764; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Contribute <a href=\"https://github.com/abircb/search-github-crx\" target=\"_blank\">here</a>",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;On June 4, 2018, Micorsoft acquired GitHub for $7.5 billion",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;GitHub offers unlimited private repositories to all plans, including free accounts!",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;GitHub was developed by Chris Wanstrath, P. J. Hyett, Tom Preston-Werner and Scott Chacon using Ruby on Rails",
    "<i class=\"fab fa-github-alt fa-lg\"></i>&nbsp;Check out <a href=\"https://gist.github.com/\" target=\"_blank\">Gist</a> by GitHub, a pastebin-style site used for hosting code snippets"
  ]
}

export function displayFact() {
  let facts = getFacts();
  let min = 0;
  let max = facts.length - 1;
  let n = Math.floor(Math.random() * (+max - +min)) + +min;
  document.getElementById("fact").innerHTML = facts[n];
}
