document.addEventListener("DOMContentLoaded", function() {
  // Get all dork buttons
  const dorkButtons = document.querySelectorAll(".dork-btn");

  // Add click event listener to each dork button
  dorkButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      const dorkType = this.getAttribute("data-type");
      const targetUrl = document.getElementById("targetUrl").value;
      redirectToSearchWithDorkType(targetUrl, dorkType);
    });
  });
});

function redirectToSearchWithDorkType(targetUrl, dorkType) {
  let searchUrl = "";

  if (dorkType === "securityheaders") {
    searchUrl = "https://securityheaders.com/?q=" + encodeURIComponent(targetUrl);
  } else if (dorkType === "waybackurls") {
    searchUrl = `https://web.archive.org/cdx/search/cdx?url=*.${targetUrl}/*&output=text&fl=original&collapse=urlkey`;
  } else if (dorkType === "githubdork") {
    searchUrl = `https://github.com/search?q="%2A.${targetUrl}"`;
  } else if (dorkType === "subdomains") {
    searchUrl = `https://crt.sh/?q=%.${encodeURIComponent(targetUrl)}`;
  } else if (dorkType === "phpwayback") {
    searchUrl = `https://web.archive.org/cdx/search?url=${encodeURIComponent(targetUrl)}%2F&matchType=domain&collapse=urlkey&output=text&fl=original&filter=urlkey:.*php&limit=100000`;
  } else if (dorkType === "openbugbounty") {
    searchUrl = `https://www.openbugbounty.org/search/?search=${encodeURIComponent(targetUrl)}`;
  } else if (dorkType === "findsubdomains") {
    searchUrl = `https://www.google.com/search?q=site:%2A.${encodeURIComponent(targetUrl)} -site:www`;
  } else {
    const searchQuery = constructSearchQuery(targetUrl, dorkType);
    searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(searchQuery);
  }

  window.open(searchUrl, "_blank");
}

function constructSearchQuery(targetUrl, dorkType) {
  const dorkQueries = {
    directory: "site:" + targetUrl + " intitle:index.of",
    config: "site:" + targetUrl + " ext:xml OR ext:conf OR ext:cnf OR ext:reg OR ext:inf OR ext:rdp OR ext:cfg OR ext:txt OR ext:ora OR ext:ini",
    database: "site:" + targetUrl + " ext:sql",
    wordpress: "site:" + targetUrl + " inurl:wp- OR inurl:wp-content OR inurl:plugins OR inurl:upload OR inurl:themes OR inurl:download",
    log: "site:" + targetUrl + " ext:log",
    backup: "site:" + targetUrl + " ext:bkf OR ext:bak OR ext:backup OR ext:old OR ext:backup OR ext:backup~ OR ext:bck",
    login: "site:" + targetUrl + " inurl:login",
    sqlerror: "site:" + targetUrl + " intext:'sql syntax near'",
    exposeddocs: "site:" + targetUrl + " ext:pdf OR ext:doc OR ext:docx OR ext:xls OR ext:xlsx OR ext:txt",
    phpinfo: "site:" + targetUrl + " ext:php intitle:phpinfo",
    openredirect: "site:" + targetUrl + " inurl:redir OR inurl:url OR inurl:redirect OR inurl:src=http OR inurl:r=http OR inurl:ret OR inurl:r2 OR inurl:page ",
    thirdparty: `site:http://ideone.com | site:http://codebeautify.org | site:http://codeshare.io | site:http://codepen.io | site:http://repl.it | site:http://justpaste.it | site:http://pastebin.com | site:http://jsfiddle.net | site:http://trello.com | site:*.atlassian.net | site:bitbucket.org "${targetUrl}"`,
    subdomains: `site:crt.sh "${targetUrl}"`,
    waybackurls: "site:web.archive.org " + targetUrl,
    phpwayback: `https://web.archive.org/cdx/search?url=${encodeURIComponent(targetUrl)}%2F&matchType=domain&collapse=urlkey&output=text&fl=original&filter=urlkey:.*php&limit=100000`,
    openbugbounty: `https://www.openbugbounty.org/search/?search=${encodeURIComponent(targetUrl)}`,
    findsubdomains: `https://www.google.com/search?q=site:%2A.${encodeURIComponent(targetUrl)}`,
    securityheaders: "site:" + targetUrl,
    xss: "site:" + targetUrl + " inurl:q OR inurl:s OR inurl:search OR inurl:id OR inurl:lang OR inurl:keyword OR inurl:query OR inurl:page OR inurl:view Or inurl:type OR inurl:url ",
    bxss: "site:" + targetUrl + "  intitle:contact OR  inurl:feedback OR inurl:Send Us a Message OR intitle:Send Us a Message OR intitle:support OR intext:Please choose a request type below OR inurl:submit ",
    sqli: "site:" + targetUrl + " inurl:php?id= OR inurl:php ",
  };

  return dorkQueries[dorkType];
}
