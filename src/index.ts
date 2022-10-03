import Match from "./Match";
import Quote from "./Quote";
import Site from "./Site";
import { MATCHES } from "./DATA";

async function main() {
  const admiral = new Site(
    "admiral",
    "https://sports.admiral.at/de/livewetten/fussball?filter=all"
  );
  admiral.playerOneSelector =
    "/html/body/asw-root/asw-main/div/asw-view-wrapper/div/main/div[1]/asw-live-container/div/asw-live-page/asw-live-betting/asw-sports-grid-group-set/asw-sports-grid-expandable[$row]/asw-sports-grid-row-event/a/asw-mini-scoreboard/div[1]/asw-mini-scoreboard-competitors/div[1]";
  admiral.playerTwoSelector =
    "/html/body/asw-root/asw-main/div/asw-view-wrapper/div/main/div[1]/asw-live-container/div/asw-live-page/asw-live-betting/asw-sports-grid-group-set/asw-sports-grid-expandable[$row]/asw-sports-grid-row-event/a/asw-mini-scoreboard/div[1]/asw-mini-scoreboard-competitors/div[2]";
  admiral.quoteOneSelector =
    "/html/body/asw-root/asw-main/div/asw-view-wrapper/div/main/div[1]/asw-live-container/div/asw-live-page/asw-live-betting/asw-sports-grid-group-set/asw-sports-grid-expandable[$row]/asw-sports-grid-row-event/asw-sports-grid-row-market[1]/asw-sports-grid-row-selection[1]/button/div/span[2]";
  admiral.quoteDrawSelector =
    "/html/body/asw-root/asw-main/div/asw-view-wrapper/div/main/div[1]/asw-live-container/div/asw-live-page/asw-live-betting/asw-sports-grid-group-set/asw-sports-grid-expandable[$row]/asw-sports-grid-row-event/asw-sports-grid-row-market[1]/asw-sports-grid-row-selection[2]/button/div/span[2]";
  admiral.quoteTwoSelector =
    "/html/body/asw-root/asw-main/div/asw-view-wrapper/div/main/div[1]/asw-live-container/div/asw-live-page/asw-live-betting/asw-sports-grid-group-set/asw-sports-grid-expandable[$row]/asw-sports-grid-row-event/asw-sports-grid-row-market[1]/asw-sports-grid-row-selection[3]/button/div/span[2]";

  const bwin = new Site(
    "bwin",
    "https://sports.bwin.com/de-at/sports/fu%C3%9Fball-4"
  );

  bwin.playerOneSelector =
    "/html/body/vn-app/vn-dynamic-layout-single-slot[4]/vn-main/main/div/ms-main/ng-scrollbar[1]/div/div/div/div/ms-main-column/div/ms-widget-layout/ms-widget-slot[3]/ms-tabbed-grid-widget/ms-grid/div/ms-event-group/ms-event[$row]/div/a/ms-event-detail/ms-event-name/ms-inline-tooltip/div/div[1]/div/div/text()";
  bwin.playerTwoSelector =
    "/html/body/vn-app/vn-dynamic-layout-single-slot[4]/vn-main/main/div/ms-main/ng-scrollbar[1]/div/div/div/div/ms-main-column/div/ms-widget-layout/ms-widget-slot[3]/ms-tabbed-grid-widget/ms-grid/div/ms-event-group/ms-event[$row]/div/a/ms-event-detail/ms-event-name/ms-inline-tooltip/div/div[2]/div/div/text()";
  bwin.quoteOneSelector =
    "/html/body/vn-app/vn-dynamic-layout-single-slot[4]/vn-main/main/div/ms-main/ng-scrollbar[1]/div/div/div/div/ms-main-column/div/ms-widget-layout/ms-widget-slot[3]/ms-tabbed-grid-widget/ms-grid/div/ms-event-group/ms-event[$row]/div/div/ms-option-group[1]/ms-option[1]/ms-event-pick/div/div[2]/ms-font-resizer";
  bwin.quoteDrawSelector =
    "/html/body/vn-app/vn-dynamic-layout-single-slot[4]/vn-main/main/div/ms-main/ng-scrollbar[1]/div/div/div/div/ms-main-column/div/ms-widget-layout/ms-widget-slot[3]/ms-tabbed-grid-widget/ms-grid/div/ms-event-group/ms-event[$row]/div/div/ms-option-group[1]/ms-option[2]/ms-event-pick/div/div[2]/ms-font-resizer";
  bwin.quoteTwoSelector =
    "/html/body/vn-app/vn-dynamic-layout-single-slot[4]/vn-main/main/div/ms-main/ng-scrollbar[1]/div/div/div/div/ms-main-column/div/ms-widget-layout/ms-widget-slot[3]/ms-tabbed-grid-widget/ms-grid/div/ms-event-group/ms-event[$row]/div/div/ms-option-group[1]/ms-option[3]/ms-event-pick/div/div[2]/ms-font-resizer";

  const interwetten = new Site(
    "interwetten",
    "https://www.interwetten.com/de/sportwetten/live"
  );

  interwetten.playerOneSelector =
    "/html/body/div[3]/table/tbody/tr[2]/td[2]/main/div[1]/div/div[2]/details[1]/div/details[$row]/ul/li/div[1]/span[1]/span[1]";
  interwetten.playerTwoSelector =
    "/html/body/div[3]/table/tbody/tr[2]/td[2]/main/div[1]/div/div[2]/details[1]/div/details[$row]/ul/li/div[1]/span[1]/span[2]";
  interwetten.quoteOneSelector =
    "/html/body/div[3]/table/tbody/tr[2]/td[2]/main/div[1]/div/div[2]/details[1]/div/details[$row]/ul/li/div[3]/strong";
  interwetten.quoteDrawSelector =
    "/html/body/div[3]/table/tbody/tr[2]/td[2]/main/div[1]/div/div[2]/details[1]/div/details[$row]/ul/li/div[4]/strong";
  interwetten.quoteTwoSelector =
    "/html/body/div[3]/table/tbody/tr[2]/td[2]/main/div[1]/div/div[2]/details[1]/div/details[$row]/ul/li/div[5]/strong";

  await admiral.fetchMatches();
  //   await bwin.fetchMatches();
  await interwetten.fetchMatches();

  MATCHES.forEach((value: Match, key: string) => {
    console.log(value.quote1.quotes, value.quoteX.quotes, value.quote2.quotes);
    value.calculate();
  });

  return 0;
}

//hapoelpetachtikvaironitiberias
//hapoelpetahtikvafcironitiberias
main();
