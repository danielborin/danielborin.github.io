---
title: "About"
layout: gridlay
sitemap: false
permalink: /about/
years: [2019, 2020, 2021, 2022, 2023, 2024, 2025]
---

{% assign total_pubs = site.data.publist | size %}
{% assign countdown = total_pubs %}

{% assign me = "D. Borin" %}

<div style="margin-bottom: 20px;"></div>

For a complete list of publications, check
<a href="https://orcid.org/0000-0002-4098-7730"><button class="btn-bib"><i class="ai ai-orcid" aria-hidden="true"></i> ORCID </button></a>, or
<a href="https://scholar.google.com/citations?user=qa0TdZwAAAAJ&hl=pt-BR&oi=ao"><button class="btn-arxiv"><i class="ai ai-google-scholar" aria-hidden="true"></i> Google Scholar </button></a>

---

<!-- {% assign yeartest = true %}
{% for publi in site.data.publist %}
  {% if publi.year %}{% else %}
   {% assign yeartest = false %}
  {% endif %}
{% endfor %} -->

<!-- {% if site.group_pub_by_year == true %}{% else %}
## Journal Papers and Proceedings 
{% endif %} -->


<!-- {% for myyear in page.years %}[{{ myyear }}](#year-{{ myyear }}) {% endfor %} -->


<div style="margin-bottom: -20px;"></div>

<ul style="list-style: none; padding: 0; margin: 0; font-size: 1.2em;">
  {% for myyear in page.years %}
    <li style="display: inline-block; width: 12.5%; padding: 6px 0; text-align: center;">
      <a href="#year-{{ myyear }}" style="text-decoration: none;">{{ myyear }}</a>
    </li>
  {% endfor %}
</ul>


{% for myyear in site.data.years %}

{% assign yeartest = false %}
{% for publi in site.data.publist %}
  {% if publi.year == myyear.year %}
   {% assign yeartest = true %}
  {% endif %}
{% endfor %}

{% if site.group_pub_by_year == true %}
  {% if yeartest == true %}
## {{ myyear.year }} {#year-{{ myyear.year }}}
  {% endif %}
{% endif %}

{% for publi in site.data.publist %}
{% if publi.year == myyear.year %}


{% assign bibtest = false %}
{% if publi.url %}
{% assign bibfile = "/papers/" | append:  publi.url  | append: ".txt" %}
{% for file in site.static_files %}
  {% if file.path contains bibfile %}
   {% assign bibtest = true %}
  {% endif %}
{% endfor %}
{% endif %}

{% assign highlighted_authors = publi.authors | replace: me, '<span style="color: #2a9fd6; font-weight: bold;">' | append: me | append: '</span>' %}

<div class="jumbotron">
<div class="well-sm">
<ul class="flex-container" style="list-style: none; padding-left: 0;">
<!-- <li class="flex-item1">
  {% if publi.image %}
   <img src="{{ site.url }}{{ site.baseurl }}/images/pubpic/{{ publi.image }}" class="img-responsive" width="200%" style="float: left" />
  {% endif %}
</li> -->
<li class="flex-item1" style="position: relative; padding-left: 45px; margin-bottom: -10px;">
<span style="position: absolute; left: 0; top: 0; font-weight:bold; font-size: 1.1em;">[{{ countdown }}]</span>

  <strong> {{ publi.title }}</strong> <br />
  <em>{{ highlighted_authors }}</em><br />
  {{ publi.display }} {% if publi.year %}({{publi.year}}){% endif %}<br/>
  {% if publi.url %}<a href="{{ site.url }}{{ site.baseurl }}/papers/{{ publi.url }}.pdf" target="_blank"><button class="btn-pdf">PDF</button></a>{% endif %}
  {% if publi.doi %}<a href="http://dx.doi.org/{{ publi.doi }}" target="_blank"><button class="btn-doi">DOI</button></a> {% endif %}
  {% if publi.arxiv %}<a href="https://arxiv.org/abs/{{ publi.arxiv }}" target="_blank"><button class="btn-arxiv">ARXIV</button></a> {% endif %}
  {% if bibtest == true %} <a data-toggle="collapse" href="#{{publi.url}}2" class="btn-bib" style="text-decoration:none; color:#ebebeb; hover:#ebebeb;" role="button" aria-expanded="false" aria-controls="{{publi.url}}2">BIB</a> {% endif %}
  {% if publi.abstract %} <a data-toggle="collapse" href="#{{publi.url}}" class="btn-abstract" style="text-decoration:none; color:#ebebeb; hover:#ebebeb;" role="button" aria-expanded="false" aria-controls="{{publi.url}}">ABSTRACT</a>{% endif %}

<!-- {% if publi.abstract %}
<br/>
<div class="collapse" id="{{publi.url}}"><div class="well-abstract">
 {{publi.abstract}}
</div></div>
{% endif %}

{% if bibtest == true %}
<div class="collapse" id="{{publi.url}}2"><div class="well-bib">
<iframe src='{{site.url}}{{site.baseurl}}/papers/{{publi.url}}.txt' scrolling='yes' width="100%" height="210" frameborder='0'></iframe>
</div></div> -->

{% endif %}


</li>
{% assign countdown = countdown | minus: 1 %}
</ul>

</div>
</div>
{% endif %}
{% endfor %}

{% endfor %}
