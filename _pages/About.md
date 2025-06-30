---
title: "About"
layout: gridlay
sitemap: false
permalink: /about/
---

<style>
.jumbotron{
    padding:3%;
    padding-bottom:10px;
    padding-top:10px;
    margin-top:10px;
    margin-bottom:30px;
}
</style>


<div id="homeid" class="col-sm-12 col-xs-12">
<figure>
  <img src="{{site.url}}{{site.baseurl}}/images/headshot.jpg" style="width:350px; min-width:30%; max-width:100%; margin-left:0px; margin-right:20px; margin-bottom:0px; margin-top:0px;" align="left">
</figure>

<div style="text-align:justify">
# Daniel Borin
I'm Mats Esseldeurs, a PhD student at [KU Leuven](https://www.kuleuven.be/kuleuven/)'s [Institute of Astronomy](https://fys.kuleuven.be/ster), in the team of [Prof. Dr. Leen Decin](https://fys.kuleuven.be/ster/staff/senior-staff/leen-decin). My research lies at the intersection of math, physics, and computer science, where I explore some of the most complex phenomena in the universe.


<ul>
{% set educations = [
    member.education1,
    member.education2,
    member.education3,
    member.education4,
    member.education5,
    member.education6,
    member.education7
] %}

{% for education in educations[:member.number_educ] %}
  <li><i class="fas fa-graduation-cap"></i> {{ education }}</li>
{% endfor %}
</ul>



</div>
