import * as fs from "fs";

export interface SitemapConfig {
  filename?: string;
  encoding?: BufferEncoding;
  filterCallback?: (link: string) => boolean;
  validateUrls?: boolean;
  maxLinks?: number;
}

/**
 * Default filter callback that excludes empty lines and common non-page URLs
 */
const defaultFilter = (link: string): boolean => {
  if (!link || link.trim() === "") return false;
  
  // Skip common non-page URLs
  const skipPatterns = [
    /\.(pdf|jpg|jpeg|png|gif|svg|ico|zip|exe|dmg)$/i,
    /\/feed\/?$/i,
    /\/rss\/?$/i,
    /sitemap.*\.xml$/i,
  ];
  
  return !skipPatterns.some(pattern => pattern.test(link));
};

/**
 * Validates if a string is a valid URL
 */
function isValidUrl(urlString: string): boolean {
  try {
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
}

/**
 * Given a filename, encoding, and configuration, return an array of links
 * from the sitemap file
 *
 * @param filename - The filename of the sitemap (defaults to 'sitemap.links')
 * @param config - Configuration options
 *
 * @returns An array of links from the sitemap or null if error
 */
export default function getSitemapLinks(
  filename: string = "sitemap.links",
  config: SitemapConfig = {}
): string[] | null {
  const {
    encoding = "utf-8",
    filterCallback = defaultFilter,
    validateUrls = true,
    maxLinks = 1000, // Prevent processing too many links
  } = config;

  try {
    // Check if file exists
    if (!fs.existsSync(filename)) {
      console.error(`Sitemap file not found: ${filename}`);
      console.error(`Please run 'npm run sitemap <url>' first to generate the sitemap.`);
      return null;
    }

    // Get file stats for validation
    const stats = fs.statSync(filename);
    if (stats.size === 0) {
      console.error(`Sitemap file is empty: ${filename}`);
      return null;
    }

    // Read and process the file
    const fileContent = fs.readFileSync(filename, encoding);
    let links = fileContent
      .split("\n")
      .map(link => link.trim())
      .filter(filterCallback);

    // Validate URLs if requested
    if (validateUrls) {
      const originalCount = links.length;
      links = links.filter((link, index) => {
        if (!isValidUrl(link)) {
          console.warn(`Invalid URL at line ${index + 1}: ${link}`);
          return false;
        }
        return true;
      });
      
      if (links.length < originalCount) {
        console.log(`Filtered out ${originalCount - links.length} invalid URLs`);
      }
    }

    // Limit number of links for performance
    if (links.length > maxLinks) {
      console.warn(`Too many links (${links.length}). Limiting to first ${maxLinks}.`);
      links = links.slice(0, maxLinks);
    }

    if (links.length === 0) {
      console.error("No valid links found in sitemap file");
      return null;
    }

    console.log(`Loaded ${links.length} links from ${filename}`);
    return links;

  } catch (err) {
    console.error(`Error reading sitemap file ${filename}:`, err);
    return null;
  }
}

/**
 * Create a sitemap links file from an array of URLs
 */
export function createSitemapFile(
  urls: string[],
  filename: string = "sitemap.links"
): boolean {
  try {
    const content = urls.join("\n");
    fs.writeFileSync(filename, content, "utf-8");
    console.log(`Created sitemap file: ${filename} with ${urls.length} URLs`);
    return true;
  } catch (err) {
    console.error(`Error creating sitemap file ${filename}:`, err);
    return false;
  }
}

/**
 * Merge multiple sitemap files into one
 */
export function mergeSitemapFiles(
  filenames: string[],
  outputFilename: string = "merged-sitemap.links"
): string[] | null {
  try {
    const allLinks = new Set<string>(); // Use Set to avoid duplicates
    
    for (const filename of filenames) {
      const links = getSitemapLinks(filename, { validateUrls: false });
      if (links) {
        links.forEach(link => allLinks.add(link));
      }
    }
    
    const mergedLinks = Array.from(allLinks);
    
    if (createSitemapFile(mergedLinks, outputFilename)) {
      return mergedLinks;
    }
    
    return null;
  } catch (err) {
    console.error("Error merging sitemap files:", err);
    return null;
  }
}
