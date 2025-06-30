---
title: "About"
layout: gridlay
sitemap: false
permalink: /about/
---

<!-- Font Awesome (caso ainda não esteja no layout) -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<style>
.jumbotron {
  padding: 3%;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-top: 10px;
  margin-bottom: 30px;
}

.about-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.about-photo {
  flex: 0 0 350px;
  max-width: 100%;
}

.about-photo img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

.about-text {
  flex: 1;
  text-align: justify;
}

.education-list {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.education-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.education-item i {
  margin-right: 10px;
  font-size: 18px;
  color: #333;
}
</style>

<div class="about-container">
  <!-- Imagem à esquerda -->
  <div class="about-photo">
    <img src="{{ site.url }}{{ site.baseurl }}/images/headshot.jpg" alt="Foto de Daniel Borin">
  </div>

  <!-- Texto à direita -->
  <div class="about-text">
  ## Daniel Borin

  {% assign member = site.data.pi[0] %}

  <ul class="education-list">
    {% for i in (1..member.number_educ) %}
      {% assign educ = member["education" | append: i ] %}
      {% if educ %}
        <li class="education-item">
          <i class="fa fa-graduation-cap" aria-hidden="true"></i>
          <span>{{ educ | replace: "-", "&#8211;" }}</span>
        </li>
      {% endif %}
    {% endfor %}
  </ul>

  I'm Daniel Borin, a PhD student at [São Paulo State University (UNESP)](https://www2.unesp.br/), working at the intersection of physics, mathematics, and computational modeling. My research focuses on the development of efficient techniques for solving complex physical problems, with applications in astrophysics and theoretical physics.

  My previous research has involved mathematical modeling of physical systems, including radiative transfer in 3D fluid dynamics and tidal dissipation in binary star systems. I also collaborate with researchers from USP, CEA Paris-Saclay, and other institutions.

  Beyond my academic interests, I'm passionate about science communication and teaching. I have experience as a teaching assistant, tutor in mathematics and physics, and supervisor of undergraduate theses.

  When I'm not working, I enjoy cycling, cooking, and exploring the natural beauty of Brazil.

  Thank you for visiting my website — feel free to get in touch!
  </div>
</div>
