# Mateo Albrecht — Engineering Portfolio

A personal portfolio focused on digital design, embedded systems, and software engineering. Built for a quick recruiter overview, with detailed project pages for a deeper technical look.

**Website:** https://mateojalbrecht.github.io

## Local development

Requires Node.js 18 or newer. No packages need to be installed.

```sh
npm run build
npm run check
npm run dev
```

Open http://127.0.0.1:4173. The preview server serves the generated files directly. Run the build again after changing source content, then refresh the browser. CSS and browser JavaScript edits do not need a rebuild.

## Repository structure

```text
src/
  projects.json           Project descriptions, roles, tools, and case studies
scripts/
  build.mjs               Generates HTML pages, legacy redirects, and sitemap
  check.mjs               Checks local links, images, headings, and metadata
  serve.mjs               Local static preview server
assets/
  css/site.css            Responsive design and print styles
  js/site.js              Accessible mobile navigation and project filters
  images/                 Portrait, project photos, and original SVG diagrams
  resume/                 Current downloadable resume
projects/                 Generated project archive and case study pages
index.html                Generated homepage
404.html                  Generated custom error page
.nojekyll                 Serve this as a plain static GitHub Pages website
```

Generated HTML is checked into the repository so GitHub Pages can serve the site directly. Do not edit generated pages by hand; edit `scripts/build.mjs` or `src/projects.json`, then rebuild.

## Updating content

- **Bio, experience, education, links, and contact:** edit the homepage markup in `scripts/build.mjs`.
- **Projects:** edit `src/projects.json`. Each project includes a stable slug, summary, personal contribution, tools, image, and case study sections. Rebuild after editing.
- **Add a project:** add an entry to `src/projects.json` and its image to `assets/images/`. The archive, case study page, and sitemap are generated automatically.
- **Portrait:** replace `assets/images/headshot.jpg`; update its dimensions in the build template if the aspect ratio changes.
- **Resume:** replace `assets/resume/Mateo-Albrecht-Resume.pdf`. Keep that filename to preserve existing links.
- **Visual design:** adjust the design tokens and component styles in `assets/css/site.css`.
- **Project status:** the processor capstone is explicitly ongoing. Update its status and outcomes only when there are results to report.

The four earlier projects are retained and rewritten, with two resume projects added. The analog project is presented as waveform shaping and oscillator experiments. Original project photos and the traffic-controller state diagram are preserved. The processor project uses original pipeline, ALU implementation, and data-memory images extracted from the supplied team status presentation. The other SVG diagrams are explanatory illustrations, not measurements or hardware photographs.

## GitHub Pages

This site uses plain HTML, CSS, and JavaScript. Jekyll, Ruby, a theme, and a package installation are not required.

1. Run `npm run build` and `npm run check`.
2. Commit the source files and generated HTML together.
3. Push the changes to the branch configured for GitHub Pages.
4. In the repository's Pages settings, use **Deploy from a branch**, selecting that branch and **/ (root)**.

If the repository uses a custom GitHub Actions deployment, configure it to upload the static root files instead of running Jekyll. This rebuild does not change remote repository settings or publish automatically.

The `.nojekyll` file bypasses Jekyll processing. Legacy `/projects.html`, the prior project `/index/` URLs, and the old analog project path have redirects to their current pages. Unknown URLs use `404.html`.

## Accessibility and privacy

- Semantic HTML, keyboard focus states, skip navigation, descriptive image alternatives, and reduced-motion support.
- Native links to email, LinkedIn, GitHub, and the resume; no unconfigured contact form.
- Project content and navigation remain available without JavaScript; JavaScript adds filtering and the collapsible mobile menu.
- No analytics, cookies, or tracking scripts. Google Fonts provides DM Sans and Instrument Serif; local system fallbacks keep the site readable if that service is unavailable.
- The downloadable resume is the supplied PDF, including its existing contact details.

## Content and attribution

Biographical information is based on the supplied updated resume and the earlier portfolio project notes. No performance metrics, employment claims, project repositories, or publication links have been invented. Review and refresh the content as projects progress.

The original repository's CC0 `LICENSE` is retained. The old template layouts, documentation screenshots, stale generated `_site` directory, Ruby dependency files, and unused assets have been removed from the working tree; their history remains in Git.

### Capstone image sources

`LLM Tiny Tapeout 403 State Update Template 2026SP.pptx` supplied the following images:

- `capstone-pipeline.png`: slide 3, team pipeline datapath diagram.
- `capstone-alu-openroad.png`: slide 9, ALU placement-density and timing screenshot.
- `capstone-data-memory.png`: slide 11, data-memory module diagram.

These are development-stage project artifacts. The site does not present them as a completed chip or claim full-processor timing closure. NASA RASC-AL is omitted from the website's employment experience section; the supplied resume PDF remains unchanged.
