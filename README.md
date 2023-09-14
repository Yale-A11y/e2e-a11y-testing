# e2e-a11y-testing

Recommended end-to-end accessibility testing for web projects

## Requirements

* [nodejs: >= 16](https://nodejs.org/en)
* [npm](https://www.npmjs.com)
* [xmllint](https://gitlab.gnome.org/GNOME/libxml2/-/wikis/home)

## Installation

To install, you'll need to clone the repository locally and change to the root
directory of it.  Then run the following commands:

### For `npm`

```bash
npm install
npx playwright install
```

## Running tests

To run axe tests on a remote site containing a sitemap.xml file:

```bash
npm run a11y <base_url>
```

`base_url`: The url of the site containing the sitemap.xml file (i.e.
https://www.example.com)

To retrieve the sitemap links into a file called `sitemap.links`:
```bash
npm run sitemap <base_url>
```

`base_url`: The url of the site containing the sitemap.xml file (i.e.
https://www.example.com)

To manually run all tests:

```bash
npx playwright test
```

To manually run a specific test file:

```bash
npx playwright test <relative_path_to_file>
```

