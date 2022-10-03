const puppeteer = require("puppeteer");

// /html/body/div[3]/table/tbody/tr[2]/td[2]/main/div[1]/div/div[2]/details[1]/div/details[1]/ul/li/div[3]/strong
// /html/body/div[3]/table/tbody/tr[2]/td[2]/main/div[1]/div/div[2]/details[1]/div/details[1]/ul/li/div[5]/strong
// /html/body/div[3]/table/tbody/tr[2]/td[2]/main/div[1]/div/div[2]/details[1]/div/details[1]/ul/li/div[1]/span[1]

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.interwetten.com/de/sportwetten/live");

  for (let i = 1; i < 10; i++) {
    try {
      await page.waitForXPath(
        "/html/body/div[3]/table/tbody/tr[2]/td[2]/main/div[1]/div/div[2]/details[1]/div/details[" +
          i +
          "]/ul/li/div[1]/span[1]/span[1]"
      );
      let [team1] = await page.$x(
        "/html/body/div[3]/table/tbody/tr[2]/td[2]/main/div[1]/div/div[2]/details[1]/div/details[" +
          i +
          "]/ul/li/div[1]/span[1]/span[1]"
      );

      await page.waitForXPath(
        "/html/body/div[3]/table/tbody/tr[2]/td[2]/main/div[1]/div/div[2]/details[1]/div/details[" +
          i +
          "]/ul/li/div[1]/span[1]/span[2]"
      );
      let [team2] = await page.$x(
        "/html/body/div[3]/table/tbody/tr[2]/td[2]/main/div[1]/div/div[2]/details[1]/div/details[" +
          i +
          "]/ul/li/div[1]/span[1]/span[2]"
      );

      await page.waitForXPath(
        "/html/body/div[3]/table/tbody/tr[2]/td[2]/main/div[1]/div/div[2]/details[1]/div/details[" +
          i +
          "]/ul/li/div[3]/strong"
      );
      let [quote1] = await page.$x(
        "/html/body/div[3]/table/tbody/tr[2]/td[2]/main/div[1]/div/div[2]/details[1]/div/details[" +
          i +
          "]/ul/li/div[3]/strong"
      );

      await page.waitForXPath(
        "/html/body/div[3]/table/tbody/tr[2]/td[2]/main/div[1]/div/div[2]/details[1]/div/details[" +
          i +
          "]/ul/li/div[4]/strong"
      );
      let [quote2] = await page.$x(
        "/html/body/div[3]/table/tbody/tr[2]/td[2]/main/div[1]/div/div[2]/details[1]/div/details[" +
          i +
          "]/ul/li/div[4]/strong"
      );

      await page.waitForXPath(
        "/html/body/div[3]/table/tbody/tr[2]/td[2]/main/div[1]/div/div[2]/details[1]/div/details[" +
          i +
          "]/ul/li/div[5]/strong"
      );
      let [quote3] = await page.$x(
        "/html/body/div[3]/table/tbody/tr[2]/td[2]/main/div[1]/div/div[2]/details[1]/div/details[" +
          i +
          "]/ul/li/div[5]/strong"
      );
      let team1Text = await page.evaluate(
        (element) => element.textContent,
        team1
      );
      let team2Text = await page.evaluate(
        (element) => element.textContent,
        team2
      );
      let quote1Text = await page.evaluate(
        (element) => element.textContent,
        quote1
      );
      let quote2Text = await page.evaluate(
        (element) => element.textContent,
        quote2
      );
      let quote3Text = await page.evaluate(
        (element) => element.textContent,
        quote3
      );

      const match = {
        opponents: team1Text + " - " + team2Text,
        odds_team_1: parseFloat(quote1Text),
        draw: parseFloat(quote2Text),
        odds_team_2: parseFloat(quote3Text),
      };

      const betterQuote =
        match.odds_team_1 < match.odds_team_2
          ? match.odds_team_1
          : match.odds_team_2;

      const sum = 10 / (betterQuote + match.draw);
      const roi = sum * match.draw * betterQuote - 10;
      match["stake-" + betterQuote] = parseFloat((sum * match.draw).toFixed(2));
      match["stake-" + match.draw] = parseFloat((sum * betterQuote).toFixed(2));
      match["ROI"] = roi.toFixed(2) + " €";

      if (roi > 0) console.table(match);
    } catch (e) {
      continue;
    }
  }
  await browser.close();
})();
