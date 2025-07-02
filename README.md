# Academic Website of Daniel Borin

This is the source file that generates the academic website for Daniel Borin. Below are some instructions to update the site when necessary.

## 1. Updating the Publications Page

When starting a new year, the first thing to do is go to the `Publication.md` and `Publicacoes.md` files located in the `_pages` folder. Edit the `years: [2023, 2024, ...]` list and add the new year.

To add a new paper, first upload the PDF file to the `papers` folder, then add the paper's details to the `publist` file. Preferably, insert new information at the top of the document. The page automatically pulls the data from the `publist` file.

## 2. Adding a New Teaching Material

To add a new course, follow these steps:
1. Upload a background image and a course logo image in the `images/Teaching` folder.
2. Upload lecture notes (in PDF format) to the `lectures_notes` folder.
3. Then, add the course information in the `Teaching.md` and `Ensino.md` files located in the `_pages` folder, following the same format used for the other courses.

## 3. Adding a New Page to the Website

To add a new page:
1. Create two `.md` files: one for the English version and one for the Portuguese version. Place them in the `_pages` folder.
2. The Portuguese version must include `lang: pt` in its front matter.
3. After creating the pages, edit the `header.html` file. Insert the English and Portuguese page names in the placeholder section:
   - Find the comment `<!-- Insert here -->` and add the English and Portuguese page links, following the example of the existing `<a class=...><a/>` object.
   - Also, edit the comments `<!-- Edit here 1 -->` and `<!-- Edit here 2 -->`. Replace `| replace: '/namept', '/nameenglish'` and `| replace: '/nameenglish', '/namept'`, respectively.
   
Now your new page should appear on the website!
