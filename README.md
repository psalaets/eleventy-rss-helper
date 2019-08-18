# eleventy-rss-helper

Create RSS 2.0 feeds for an Eleventy site.

This is a wrapper around the [rss module](https://github.com/dylang/node-rss).

## Install

`npm install eleventy-rss-helper`

## Usage

### 1. Create feed file

Create a feed file (e.g. `feed.11ty.js`) in a directory that Eleventy will process.

Paste this into the file:

```js
const createRssFeed = require('eleventy-rss-helper');

module.exports = createRssFeed({
  permalink: '/feed.xml',
  feedOptions(data) {
    return {

    }
  },
  items(collections, data) {

  },
  itemOptions(item, data) {
    return {

    };
  }
});
```

### 2. Fill in the empty functions

**feedOptions(data)**

Receives

- Eleventy data object

Returns object to be used as [feedOptions with the rss module](https://github.com/dylang/node-rss#feedoptions).

**items(collections, data)**

Receives

- [Eleventy collections](https://www.11ty.io/docs/collections/) object
- Eleventy data object

Returns array of items to include in the feed.

**itemOptions(item, data)**

Receives

- One item from the array returned by your `items` function
- Eleventy data object

Returns object to be used as [itemOptions with the rss module](https://github.com/dylang/node-rss#itemoptions).

## Example

```js
const createRssFeed = require('eleventy-rss-helper');

const permalink = '/feed.xml';
const baseUrl = 'https://mysite.com';

module.exports = createRssFeed({
  permalink,
  feedOptions(data) {
    return {
      title: 'mysite.com',
      description: 'Latest posts from mysite.com',
      pubDate: new Date(),
      feed_url: `${baseUrl}${permalink}`,
      site_url: baseUrl,
      language: 'en-us'
    };
  },
  items(collections, data) {
    // last 20 posts, newest first
    return collections.post
      .slice(-20)
      .reverse();
  },
  itemOptions(item, data) {
    return {
      title: item.data.title,
      description: '...',
      url: `${baseUrl}${item.url}`,
      date: item.date
    };
  }
});

```

## License

MIT
