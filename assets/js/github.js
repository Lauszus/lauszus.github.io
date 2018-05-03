// Inspired by http://aboutcode.net/scripts/site.js
jQuery.fn.loadRepositoriesUsers = function(username) {
  var target = this;
  $.githubUser(username,function(response) {
    if(response.meta["X-RateLimit-Remaining"] == 0) {
      console.log("Couldn't load content - You have reached the rate limit for API request to Github. Will be reset at: " + new Date(response.meta["X-RateLimit-Reset"] * 1000));
      return;
    }
    var repo = new Object();
    repo.html_url = 'https://github.com/felis/USB_Host_Shield_2.0';
    repo.name = 'USB_Host_Shield_2.0';
    repo.description = 'Revision 2.0 of USB Host Library for Arduino';
    addToHtml(target,repo); // Include the USB Host Shield library manually
    var repos = response.data;
    $.sortByNumberOfStargazers(repos);
    //console.log(username,response);
    $.printRepos(target, repos);
  });
};

jQuery.fn.loadRepositoriesOrg = function(orgname) {
  var target = this;
  $.githubOrg(orgname,function(response) {
    if(response.meta["X-RateLimit-Remaining"] == 0) {
      console.log("Couldn't load content - You have reached the rate limit for API request to Github. Will be reset at: " + new Date(response.meta["X-RateLimit-Reset"] * 1000));
      return;
    }
    var repos = response.data;
    $.sortByNumberOfStargazers(repos);
    //console.log(orgname,response);
    $.printRepos(target, repos);
  });
};

jQuery.printRepos = function(target, repos) {
  $(repos).each(function() {
    if (!this.fork && this.stargazers_count > 10) { // Only include repositories with more than 10 stars
      var repo = this;
      jQuery.getJSON(this.contributors_url + "?callback=?", function(contributors) {
        $(contributors.data).each(function() {
          if (this.login == 'Lauszus') { // Only include the ones where I am a contributor
            addToHtml(target,repo);
            return false; // break loop
          }
        });
      });
    }
  });
};

function addToHtml(target, repo) {
  target.append('<li><a href="' + repo.html_url +'" target="_blank">' + repo.name + '</a>');
  target.append('<p>' + replaceURLWithHTMLLinks(repo.description) + '</p></li>');
};

function replaceURLWithHTMLLinks(text) { // Source: https://stackoverflow.com/a/6707547
  var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  return text.replace(exp,"<a href='$1' target='_blank'>$1</a>");
};

jQuery.sortByNumberOfStargazers = function(repos) {
  repos.sort(function(a,b) {
    return b.stargazers_count - a.stargazers_count;
  });
};

jQuery.githubUser = function(username, callback) {
  jQuery.getJSON("https://api.github.com/users/" + username + "/repos?callback=?", callback);
};

jQuery.githubOrg = function(organization, callback) {
  jQuery.getJSON("https://api.github.com/orgs/" + organization + "/repos?callback=?", callback);
};
