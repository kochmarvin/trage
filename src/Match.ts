import Quote from "./quote";

class Match {
  public row: number;
  public column: number;
  public quote1: Quote;
  public quoteX: Quote;
  public quote2: Quote;
  public balance: number;

  public constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
    this.balance = 100;
  }

  public perform() {}

  public calculate(): boolean {
    //WK, dass Ereigniss eintritt

    const quote1Av = this.average(this.quote1.quotes);
    const quote2Av = this.average(this.quote2.quotes);
    const quoteXAv = this.average(this.quoteX.quotes);

    const sum: number = quote1Av + quote2Av + quoteXAv;
    let sum2: number =
      (1 / quote1Av) * 100 + (1 / quote2Av) * 100 + (1 / quoteXAv) * 100;
    let wkmw1: number = (((1 / quote1Av) * 100) / sum2) * 100; //WK Win Team 1
    let wkmw2: number = (((1 / quote2Av) * 100) / sum2) * 100; //WK Win Team 2
    let wkmwX: number = (((1 / quoteXAv) * 100) / sum2) * 100; //WK Unentschieden

    //Ermittlung auf welches Team gesetzt wird
    let final1: number = 0;
    let wkmw12: number = 0;
    if (Math.max(...this.quote1.quotes) > Math.max(...this.quote2.quotes)) {
      final1 = Math.max(...this.quote2.quotes);
      wkmw12 = wkmw2;
    } else {
      final1 = Math.max(...this.quote1.quotes);
      wkmw12 = wkmw1;
    }

    //WK Win
    const gesamtwk: number = wkmwX + wkmw12;
    //WK Lose = GegenWk

    //Arbitrage Calculator

    //Diese Variablen werden eigentlich für True/False ausgabe nicht gebraucht!
    const tmp: number =
      this.balance / (final1 + Math.max(...this.quoteX.quotes)); //Geldbetrag für 1.0er quote
    const amount1: number = tmp * final1; //Geldbetrag Team 1
    const amount2: number = tmp * Math.max(...this.quoteX.quotes); //Geldbetrag Team 2 / Unentschieden
    const winningamount: number = amount1 * Math.max(...this.quoteX.quotes);

    const arbipercent: number = (winningamount / this.balance) * 100;
    const finalpercent: number = arbipercent - (100 - gesamtwk) - 100;

    if (finalpercent > 1) {
      console.log("You need to bet " + amount1.toFixed(2) + "€ on " + final1);
      console.log(
        "You need to bet " +
          amount2.toFixed(2) +
          "€ on " +
          Math.max(...this.quoteX.quotes)
      );
      console.log(
        "Your profit is " + arbipercent + " percent which is " + winningamount
      );
      return true;
    } else {
      return false;
    }
  }

  private average(array: number[]): number {
    let sum = 0;
    array.forEach((element) => {
      sum += element;
    });
    return sum / array.length;
  }
}
export default Match;
