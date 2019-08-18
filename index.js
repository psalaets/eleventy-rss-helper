const normalizeUrl = require('normalize-url');
const RSS = require('rss');

module.exports = createRssFeed;

function createRssFeed(options) {
  return class {
    data() {
      return {
        permalink: options.permalink
      };
    }

    render(data) {
      let feedOptions = options.feedOptions(data);
      feedOptions = withNormalizedUrl(feedOptions, 'feed_url');
      feedOptions = withNormalizedUrl(feedOptions, 'site_url');
      feedOptions = withNormalizedUrl(feedOptions, 'image_url');
      feedOptions = withNormalizedUrl(feedOptions, 'docs');
      feedOptions = withNormalizedUrl(feedOptions, 'hub');

      const feed = new RSS(feedOptions);

      options.items(data.collections, data)
        .map(item => options.itemOptions(item, data))
        .forEach(itemOptions => {
          itemOptions = withNormalizedUrl(itemOptions, 'url');
          feed.item(itemOptions)
        });

      return feed.xml();
    }
  };
}

function withNormalizedUrl(object, propertyName) {
  if (propertyName in object) {
    return {
      ...object,
      [propertyName]: normalizeUrl(object[propertyName], { removeTrailingSlash: false })
    };
  } else {
    return object;
  }
}
