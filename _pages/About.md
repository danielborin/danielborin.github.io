---
title: "About"
layout: gridlay
sitemap: false
permalink: /about/
years: [2019, 2020, 2021, 2022, 2023, 2024, 2025]
---

<br><br>

For a complete list of publications, check
<a href="https://orcid.org/0000-0002-4098-7730">
  <button class="btn-bib"><i class="ai ai-orcid" aria-hidden="true"></i> ORCID</button>
</a>, or
<a href="https://scholar.google.com/citations?user=qa0TdZwAAAAJ&hl=pt-BR&oi=ao">
  <button class="btn-arxiv"><i class="ai ai-google-scholar" aria-hidden="true"></i> Google Scholar</button>
</a>

---

<ul style="list-style: none; padding: 0; margin: 0; font-size: 1.2em;">
  {% for myyear in page.years %}
    <li style="display: inline-block; width: 12.5%; padding: 6px 0; text-align: center;">
      <a href="#year-{{ myyear }}" style="text-decoration: none;">{{ myyear }}</a>
    </li>
  {% endfor %}
</ul>

{% assign publist_sorted = site.data.publist | sort: "year" | reverse %}

{% for myyear in page.years %}
  {% assign year_has_pubs = false %}
  {% for publi in publist_sorted %}
    {% if publi.year == myyear %}
      {% assign year_has_pubs = true %}
    {% endif %}
  {% endfor %}

  {% if year_has_pubs %}
  <h2 id="year-{{ myyear }}">{{ myyear }}</h2>
  <ol class="publist" style="padding-left: 20px; font-size: 1.05em;">
    {% for publi in publist_sorted %}
      {% if publi.year == myyear %}

      {% assign bibtest = false %}
      {% if publi.url %}
        {% assign bibfile = "/papers/" | append: publi.url | append: ".txt" %}
        {% for file in site.static_files %}
          {% if file.path contains bibfile %}
            {% assign bibtest = true %}
          {% endif %}
        {% endfor %}
      {% endif %}

      <li style="margin-bottom: 20px;">
        <div class="flex-container">
          {% if publi.image %}
            <div class="flex-item1">
              <img src="{{ site.url }}{{ site.baseurl }}/images/pubpic/{{ publi.image }}" class="img-responsive" width="200%" style="float: left;" />
            </div>
          {% endif %}
          <div class="flex-item2">
            <strong>{{ publi.title }}</strong><br />
            <em>{{ publi.authors }}</em><br />
            {{ publi.display }} ({{ publi.year }})<br />

            {% if publi.url %}
              <a href="{{ site.url }}{{ site.baseurl }}/papers/{{ publi.url }}.pdf" target="_blank">
                <button class="btn-pdf">PDF</button>
              </a>
            {% endif %}
            {% if publi.doi %}
              <a href="http://dx.doi.org/{{ publi.doi }}" target="_blank">
                <button class="btn-doi">DOI</button>
              </a>
            {% endif %}
            {% if publi.arxiv %}
              <a href="https://arxiv.org/abs/{{ publi.arxiv }}" target="_blank">
                <button class="btn-arxiv">ARXIV</button>
              </a>
            {% endif %}
            {% if bibtest %}
              <a data-toggle="collapse" href="#{{publi.url}}2" class="btn-bib" role="button">BIB</a>
            {% endif %}
            {% if publi.abstract %}
              <a data-toggle="collapse" href="#{{publi.url}}" class="btn-abstract" role="button">ABSTRACT</a>
            {% endif %}

            {% if publi.abstract %}
            <br/>
            <div class="collapse" id="{{publi.url}}">
              <div class="well-abstract">{{ publi.abstract }}</div>
            </div>
            {% endif %}

            {% if bibtest %}
            <div class="collapse" id="{{publi.url}}2">
              <div class="well-bib">
                <iframe src="{{ site.url }}{{ site.baseurl }}/papers/{{ publi.url }}.txt" scrolling="yes" width="100%" height="210" frameborder="0"></iframe>
              </div>
            </div>
            {% endif %}
          </div>
        </div>
      </li>
      {% endif %}
    {% endfor %}
  </ol>
  {% endif %}
{% endfor %}

