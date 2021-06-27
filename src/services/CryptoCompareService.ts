import axios, { AxiosInstance } from 'axios';
import { Article } from '@/models/Articles';

export default class CryptoCompareService {
  private static instance: CryptoCompareService;

  private static readonly ENDPOINT_GET_NEWS = '/news/?lang=EN';

  private readonly baseUrl!: string;
  private readonly client: AxiosInstance;

  private constructor() {
    this.baseUrl = 'https://min-api.cryptocompare.com/data/v2';
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
  }

  public static getInstance(): CryptoCompareService {
    if (!CryptoCompareService.instance) {
      CryptoCompareService.instance = new CryptoCompareService();
    }
    return CryptoCompareService.instance;
  }

  public async getNews(): Promise<Article[]> {
    let news;
    try {
      const response = await this.client.get(CryptoCompareService.ENDPOINT_GET_NEWS);
      if (response && response.data && response.data.Data) {
        news = response.data.Data;
      }
    } catch (err) {
      console.log('Error occurred while getting news: ', err);
    }
    return news;
  }
}
