const IS_DEV = process.env.NODE_ENV == 'development';

export default class AppConfig {
  static IS_DEV = IS_DEV;
}
