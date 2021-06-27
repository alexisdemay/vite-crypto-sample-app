import { WebsocketBuilder, Websocket } from 'websocket-ts';
import { Streams } from '@/models/Streams';
import { Ticker } from '@/models/Tickers';
import { Store, useStore } from 'vuex';
import { RootState } from '@/models/store/RootState';

export default class BinanceService {
  private static instance: BinanceService;

  private readonly baseUrl!: string;
  private readonly streams!: Streams;
  private readonly subscriptions!: { [url: string]: Websocket };
  private readonly store!: Store<RootState>;

  private constructor() {
    this.subscriptions = {};
    this.baseUrl = 'wss://stream.binance.com:9443/ws';
    this.streams = {
      depth: symbol => `${symbol.toLowerCase()}@depth`,
      depthLevel: (symbol, level) => `${symbol.toLowerCase()}@depth${level}`,
      kline: (symbol, interval) => `${symbol.toLowerCase()}@kline_${interval}`,
      aggTrade: symbol => `${symbol.toLowerCase()}@aggTrade`,
      trade: symbol => `${symbol.toLowerCase()}@trade`,
      ticker: symbol => `${symbol.toLowerCase()}@ticker`,
      miniTicker: symbol => `${symbol.toLowerCase()}@miniTicker`,
      allMiniTicker: () => `!miniTicker@arr`,
      allTickers: () => '!ticker@arr',
    };
    this.store = useStore();
  }

  public static getInstance(): BinanceService {
    if (!BinanceService.instance) {
      BinanceService.instance = new BinanceService();
    }
    return BinanceService.instance;
  }

  public subscribeSymbol(symbol: string, handler: (ticker: Ticker) => void) {
    try {
      const url = `${this.baseUrl}/${this.streams.ticker(symbol)}`;
      if (this.subscriptions[url]) {
        return;
      }
      this.subscriptions[url] = new WebsocketBuilder(url)
        .onMessage((i, ev) => {
          const eventData = JSON.parse(ev.data);
          const ticker: Ticker = {
            price: parseFloat(eventData.c),
            vol: parseFloat(eventData.q).toFixed(2),
            percent: parseFloat(eventData.P).toFixed(2),
            chg: eventData.p,
            high: eventData.h,
            low: eventData.l,
            open: eventData.o,
            time: eventData.E,
            symbol: symbol,
          };
          handler(ticker);
        })
        .onClose((i, ev) => this.removeSubscription(url))
        .build();
    } catch (error) {
      console.log(`Error while subscribing to ${symbol}: ${error}`);
    }
  }

  public unsubscribeSymbol(symbol: string) {
    try {
      const url = `${this.baseUrl}/${this.streams.ticker(symbol)}`;
      const webSocket: Websocket = this.subscriptions[url];
      if (webSocket) {
        webSocket.close();
      }
    } catch (error) {
      console.log(`Error while unsubscribing to ${symbol}: ${error}`);
    }
  }

  public unsubscribeAll() {
    try {
      Object.keys(this.subscriptions).forEach(url => {
        this.subscriptions[url].close();
      });
    } catch (error) {
      console.log(`Error while unsubscribing all channels: ${error}`);
    }
  }

  public removeSubscription(url: string) {
    if (this.subscriptions[url]) {
      delete this.subscriptions[url];
    }
  }
}
