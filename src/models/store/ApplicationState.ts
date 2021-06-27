import { Currencies, Currency } from "@/models/Currencies";
import { Tickers } from "@/models/Tickers";
import { Article } from "@/models/Articles";

export interface ApplicationState {
  tickers: Tickers;
  currencies: Currency[];
  articles: Article[];
}
