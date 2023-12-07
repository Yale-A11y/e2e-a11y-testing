import * as fs from "fs";

/*
 * Given a filename, encoding, and a filter callback, return an array of links
 * from the sitemap xml
 *
 * @param filename - The filename of the sitemap
 * @param encoding - The encoding of the sitemap (defaults to UTF-8)
 * @param filterCallback - A callback to filter the links (defaults to exclude
 *                         empty lines)
 *
 * @returns An array of links from the sitemap
 */
export default function getSitemapLinks(
  filename: string,
  encoding: BufferEncoding = "utf-8",
  filterCallback: (link: string) => boolean = (link: string) => link !== "",
) {
  try {
    return fs
      .readFileSync(filename, encoding)
      .split("\n")
      .filter(filterCallback);
  } catch (err) {
    console.log(err);
    return null;
  }
}

