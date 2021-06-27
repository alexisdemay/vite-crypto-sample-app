export interface Streams {
  depth(symbol: string): string;
  depthLevel(symbol: string, level: number): string;
  kline(symbol: string, interval: number): string;
  aggTrade(symbol: string): string;
  trade(symbol: string): string;
  ticker(symbol: string): string;
  miniTicker(symbol: string): string;
  allMiniTicker(): string;
  allTickers(): string;
}
