export interface Currencies {
  currencies: Currency[];
}

export interface Currency {
  imgId: number;
  symbol: string;
  name: string;
  from: string;
  to: string;
}
