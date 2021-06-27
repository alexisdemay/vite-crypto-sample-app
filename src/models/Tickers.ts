export interface Tickers {
  [key: string]: Ticker;
}

export interface Ticker {
  price: number;
  vol: string;
  percent: string;
  chg: string;
  high: string;
  low: string;
  open: string;
  time: string;
  symbol: string;
  pchg?: number;
}
