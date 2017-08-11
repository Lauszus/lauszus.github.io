---
layout: page
title: Home
---

{% assign github_username = site.author.github | split: '/' | last %}
{% avatar {{ github_username }} size=200 %}

Hi, I'm <strong class="author-name" itemprop="name">{{ site.author.name }}</strong>, an <em itemprop="jobTitle">{{ site.author.job }}</em>.

I have a passion, drive and skill set in the field of Electrical Engineering. I am currently employed at [Candela Speed Boat](http://candelaspeedboat.com).

My main interests are embedded devices and control systems. I also have some experience in computer vision. I am strong at mathematics, solving complex problems and computer programming. I got advanced skills in C and C++ and competent with Python, Java including Android development, Matlab, C#, Bash, Perl, Verilog, VHDL and various others.

Some of my project are presented on the <a href="{{ '/projects' | prepend: site.baseurl }}">projects page</a>.

Below is a list of some of my most popular Github repositories:

<ul style="margin-left: 30px; list-style-type: disc;">
  <li>
    <a href="https://github.com/felis/USB_Host_Shield_2.0" target="_blank">USB_Host_Shield_2.0</a>
    <p>Revision 2.0 of USB Host Library for Arduino</p>
  </li>
{% assign repositories = site.github.public_repositories | sort: 'stargazers_count' | reverse %}
{% for repository in repositories %}
  {% if repository.fork == false and repository.stargazers_count > 7 %}
  <li>
    <a href="{{ repository.html_url }}" target="_blank">{{ repository.name }}</a>
    <p><script type="text/javascript">document.write(replaceURLWithHTMLLinks("{{ repository.description }}"))</script></p>
  </li>
  {% endif %}
{% endfor %}

<!-- Load the Github organisation repositories -->
<div id="github-org-projects"></div>
<script type="text/javascript">
$(function() {
  $("#github-org-projects").loadRepositoriesOrg("TKJElectronics");
});
</script>
</ul>

For more information send me an email at <lauszus@gmail.com>.
