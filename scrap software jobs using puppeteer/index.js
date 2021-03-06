const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const scrapingResults = [
  {
    title: "Entry Level Software Engineer - C or C++",
    datePosted: new Date("2019-07-26 12:00:00"),
    neighborhood: "(palo alto)",
    url: "https://sfbay.craigslist.org/pen/sof/d/palo-alto-entry-level-software-engineer/6943135190.html",
    jobDescription:
      "Major Technology company is seeking an Entry Level software Engineer. The ideal candidate will have extensive school project experience with C or C++. Under general supervision...",
    compensation: "Up to US$0.00 per year",
  },
];
async function grapListings(page) {
  await page.goto("https://sfbay.craigslist.org/search/sof");
  const html = await page.content();
  const $ = cheerio.load(html);
  const results = $(".result-info")
    .map((index, element) => {
      const titleElement = $(element).find("a.result-title");
      const dateElement = $(element).find("time.result-date");
      const title = titleElement.text();
      const url = $(titleElement).attr("href");
      const datePosted = new Date(dateElement.attr("datetime"));
      const neighborhood = $(element).find("span.result-hood").text();
      return { title, url, datePosted, neighborhood };
    })
    .get();
  return results;
}

async function scrapJobDescription(page, listings) {
  for (let i = 0; i < listings.length; i++) {
    const listing = listings[i];
    await page.goto(listing.url);
    const html = await page.content();
    const $ = cheerio.load(html);
    
  }

}
async function main() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  const listings = await grapListings(page);
  const listingForJobDescription = await scrapJobDescription(page, listings);
}
main();
