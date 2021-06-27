export interface Article {
  body: string;
  categories: string;
  downvotes: string;
  guid: string;
  id: string;
  imageurl: string;
  lang: string
  published_on: string;
  source: string;
  source_info: SourceInfo;
  tags: string;
  title: string;
  upvotes: string;
  url: string;
}


export interface SourceInfo {
  img: string;
  lang: string;
  name: string;
}
