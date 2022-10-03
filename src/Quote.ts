import Site from "./Site";

class Quote {
  public quotes: number[] = [];

  public addQuote(quote: number) {
    this.quotes.push(quote);
  }
}
export default Quote;
