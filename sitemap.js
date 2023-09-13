const https = require('https');
const fs = require('fs');

const site = process.argv[2];
const sitemapURL = `${site}/sitemap.xml`;
const outputFile = 'sitemap.links';

function fetchData(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Request failed with status code ${res.statusCode}`));
        return;
      }

      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(data);
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

async function parseSitemap() {
  try {
    const sitemapData = await fetchData(sitemapURL);
    const locs = [];

    // Parse the XML content manually
    const locStart = '<loc>';
    const locEnd = '</loc>';

    let startIndex = 0;
    while (startIndex !== -1) {
      startIndex = sitemapData.indexOf(locStart, startIndex);
      if (startIndex !== -1) {
        const endIndex = sitemapData.indexOf(locEnd, startIndex);
        if (endIndex !== -1) {
          const locValue = sitemapData.substring(startIndex + locStart.length, endIndex);
          locs.push(locValue);
          startIndex = endIndex + locEnd.length;
        }
      }
    }

    fs.writeFileSync(outputFile, locs.join('\n'));
    console.log(`Sitemap urls written to ${outputFile}`);
  } catch (error) {
    console.error('Error fetching or parsing sitemap:', error.message);
  }
}

// Call the function to start the process
parseSitemap();
