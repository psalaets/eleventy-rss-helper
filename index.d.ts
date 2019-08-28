export = createRssFeed;

declare function createRssFeed(options: createRssFeed.Options): any;

declare namespace createRssFeed {
  export interface Options {
    permalink: string;
    items: (collections: Collections, data: any) => any[];
    feedOptions: (data: any) => FeedOptions;
    itemOptions: (item: CollectionItem | any, data: any) => ItemOptions;
  }

  export interface FeedOptions {
    title: string;
    description?: string;
    generator?: string;

    feed_url?: string;
    site_url?: string;
    image_url?: string;

    docs?: string;
    managingEditor?: string;
    webMaster?: string;
    copyright?: string;
    language?: string;
    categories?: string[];
    pubDate?: Date | string;

    ttl?: number;
    hub?: string;
    custom_namespaces?: string;
    custom_elements?: Array<any>;
  }

  export interface EnclosureObject {
    url: string;
    file?: string;
    size?: number;
    type?: string;
  }

  export interface ItemOptions {
    title: string;
    description: string;
    url: string;
    guid?: string;
    categories?: string[];
    author?: string;
    date?: Date;
    lat?: number;
    long?: number;
    enclosure?: EnclosureObject
    custom_elements?: any[]
  }

  export interface CollectionItem {
    url: string;
    date: Date;
    template: string;
    inputPath: string;
    fileSlug: string;
    data: any;
    outputPath: string;
    templateContent: string;
  }

  export interface Collections {
    all: any[];
    [collectionKey: string]: any[];
  }
}
