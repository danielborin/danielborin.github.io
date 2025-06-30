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

  {% if member.number_educ == 1 %}
  <li><i class="fa fa-graduation-cap"></i> {{ member.education1 }} </li>
  {% endif %}

  {% if member.number_educ == 2 %}
  <li><i class="fa fa-graduation-cap"></i> {{ member.education1 }} </li>
  <li><i class="fa fa-graduation-cap"></i> {{ member.education2 }} </li>
  {% endif %}

  {% if member.number_educ == 3 %}
  <li><i class="fa fa-graduation-cap"></i> {{ member.education1 }} </li>
  <li><i class="fa fa-graduation-cap"></i> {{ member.education2 }} </li>
  <li><i class="fa fa-graduation-cap"></i> {{ member.education3 }} </li>
  {% endif %}

  {% if member.number_educ == 4 %}
  <li><i class="fa fa-graduation-cap"></i> {{ member.education1 }} </li>
  <li><i class="fa fa-graduation-cap"></i> {{ member.education2 }} </li>
  <li><i class="fa fa-graduation-cap"></i> {{ member.education3 }} </li>
  <li><i class="fa fa-graduation-cap"></i> {{ member.education4 }} </li>
  {% endif %}

  {% if member.number_educ == 5 %}
  <li><i class="fa fa-graduation-cap"></i> {{ member.education1 }} </li>
  <li><i class="fa fa-graduation-cap"></i> {{ member.education2 }} </li>
  <li><i class="fa fa-graduation-cap"></i> {{ member.education3 }} </li>
  <li><i class="fa fa-graduation-cap"></i> {{ member.education4 }} </li>
  <li><i class="fa fa-graduation-cap"></i> {{ member.education5 }} </li>
  {% endif %}

  {% if member.number_educ == 6 %}
  <li><i class="fa fa-graduation-cap"></i> {{ member.education1 }} </li>
  <li><i class="fa fa-graduation-cap"></i> {{ member.education2 }} </li>
  <li><i class="fa fa-graduation-cap"></i> {{ member.education3 }} </li>
  <li><i class="fa fa-graduation-cap"></i> {{ member.education4 }} </li>
  <li><i class="fa fa-graduation-cap"></i> {{ member.education5 }} </li>
  <li><i class="fa fa-graduation-cap"></i> {{ member.education6 }} </li>
  {% endif %}

  {% if member.number_educ == 7 %}
  <li><i class="fa fa-graduation-cap"></i> {{ member.education1 }} </li>
  <li><i class="fa fa-graduation-cap"></i> {{ member.education2 }} </li>
  <li><i class="fa fa-graduation-cap"></i> {{ member.education3 }} </li>
  <li><i class="fa fa-graduation-cap"></i> {{ member.education4 }} </li>
  <li><i class="fa fa-graduation-cap"></i> {{ member.education5 }} </li>
  <li><i class="fa fa-graduation-cap"></i> {{ member.education6 }} </li>
  <li><i class="fa fa-graduation-cap"></i> {{ member.education7 }} </li>
  {% endif %}  

</ul>

### Areas of Interest:

<div style="display: flex; flex-wrap: wrap; max-width: 600px;">
  <div style="flex: 1 1 50%; box-sizing: border-box; padding-right: 10px;">
    Nonlinear dynamics and chaos<br>
    Hamiltonian systems<br>
    Mechanism of transport and diffusion
  </div>
  <div style="flex: 1 1 50%; box-sizing: border-box; padding-left: 10px;">
    Classical billiards<br>
    Complex system<br>
    Ecological/Biological Models
  </div>
</div>


</div>
