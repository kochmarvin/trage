import { MATCHES, WATCH_MATCHES } from "./DATA";
import puppeteer from "puppeteer";
import Match from "./Match";
import Quote from "./quote";
var stringSimilarity = require("string-similarity");
// import ora from "ora";

class Site {
  public quoteOneSelector: string;
  public quoteTwoSelector: string;

  public quoteDrawSelector: string;

  public playerOneSelector: string;
  public playerTwoSelector: string;

  public URL: string;

  public name: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.URL = url;
  }

  public async fetchMatches() {
    console.log(`========[${this.name}]========`);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(this.URL, { waitUntil: "load", timeout: 0 });
    page.setDefaultTimeout(500);
    console.log(page.getDefaultTimeout());

    let key: string = "";
    let team1String: string = "";
    let team2String: string = "";
    for (let i = 1; i < WATCH_MATCHES; i++) {
      try {
        //   console.log(this.playerOneSelector.replace("$row", `${i}`));
        await page.waitForXPath(this.playerOneSelector.replace("$row", `${i}`));
        const [team1] = await page.$x(
          this.playerOneSelector.replace("$row", `${i}`)
        );

        await page.waitForXPath(this.playerTwoSelector.replace("$row", `${i}`));
        const [team2] = await page.$x(
          this.playerTwoSelector.replace("$row", `${i}`)
        );

        team1String = await page.evaluate(
          (element) => element.textContent,
          team1
        );

        team2String = await page.evaluate(
          (element) => element.textContent,
          team2
        );

        key =
          team1String.toLowerCase().replaceAll(" ", "") +
          team2String.toLowerCase().replaceAll(" ", "");
        console.log("Fetching " + key);

        MATCHES.forEach((value, oldKey) => {
            if(stringSimilarity.compareTwoStrings(oldKey, key) >= 0.7) {
                key = oldKey.toString();
            }
        })

        let match = MATCHES.get(key) || new Match(1, 1);
        if (!MATCHES.has(key)) {
          match.quote1 = new Quote();
          match.quoteX = new Quote();
          match.quote2 = new Quote();
          MATCHES.set(key, match);
        }

        await page.waitForXPath(this.quoteOneSelector.replace("$row", `${i}`));
        const [quote1] = await page.$x(
          this.quoteOneSelector.replace("$row", `${i}`)
        );

        await page.waitForXPath(this.quoteDrawSelector.replace("$row", `${i}`));
        const [quoteX] = await page.$x(
          this.quoteDrawSelector.replace("$row", `${i}`)
        );

        await page.waitForXPath(this.quoteTwoSelector.replace("$row", `${i}`));
        const [quote2] = await page.$x(
          this.quoteTwoSelector.replace("$row", `${i}`)
        );

        let quote1String = await page.evaluate(
          (element) => element.textContent,
          quote1
        );

        let quoteXString = await page.evaluate(
          (element) => element.textContent,
          quoteX
        );

        let quote2String = await page.evaluate(
          (element) => element.textContent,
          quote2
        );

        match.quote1.addQuote(parseFloat(parseFloat(quote1String).toFixed(2)));
        match.quoteX.addQuote(parseFloat(parseFloat(quoteXString).toFixed(2)));
        match.quote2.addQuote(parseFloat(parseFloat(quote2String).toFixed(2)));
        console.log(
          "Fetched " +
            key +
            "[" +
            quote1String +
            ", " +
            quoteXString +
            ", " +
            quote2String +
            "]"
        );
      } catch (e) {
      }
    }
  }
}

export default Site;
