const MockDate = require('mockdate');
const createRssFeed = require('..');

describe('xml', () => {
  beforeEach(() => MockDate.set('August 17, 2019 11:43:02'));
  afterEach(() => MockDate.reset());

  test('minimal', () => {
    const cls = createRssFeed({
      permalink: '/feed.xml',
      feedOptions() {
        return {
          title: 'My Blog',
          feed_url: 'https://myblog.com/feed.xml',
          site_url: 'https://myblog.com'
        };
      },
      items() {
        return [1, 2];
      },
      itemOptions(number) {
        return {
          title: `Item ${number}`,
          description: `This is item ${number}`,
          url: `https://myblog.com/${number}`,
          date: `2019-0${number}-01`
        };
      }
    });

    const xml = renderXml(cls);

    expect(xml).toMatchSnapshot();
  });

  test('everything on', () => {
    const cls = createRssFeed({
      permalink: '/feed.xml',
      feedOptions() {
        return {
          title: 'My Blog',
          description: 'Posts from my blog',
          generator: 'my rss generator',
          feed_url: 'https://myblog.com/feed.xml',
          site_url: 'https://myblog.com',
          image_url: 'https://myblog.com/cover-image.png',
          docs: 'https://myblog.com/feed-docs',
          managingEditor: 'First McName',
          webMaster: 'Name Last',
          copyright: '2019',
          language: 'en-US',
          categories: ['sci-fi', 'technology'],
          pubDate: '2019-08-18',
          ttl: 24 * 60,
          hub: 'https://myblog.com/hub',
          custom_namespaces: {},
          custom_elements: []
        };
      },
      items() {
        return [1, 2];
      },
      itemOptions(number) {
        return {
          title: `Item ${number}`,
          description: `This is item ${number}`,
          url: `https://myblog.com/${number}`,
          guid: `https://myblog.com/guid-${number}`,
          categories: ['poetry', 'music'],
          author: 'Jack Nimble',
          date: `2019-0${number}-01`,
          lat: 30,
          long: 25,
          custom_elements: [],
          enclosure: {
            url: `https://myblog.com/episode-${number}`,
            size: 1024 * number,
            type: 'image/png'
          }
        };
      }
    });

    const xml = renderXml(cls);

    expect(xml).toMatchSnapshot();
  });

  test('normalizes urls in feedOptions', () => {
    const cls = createRssFeed({
      permalink: '/feed.xml',
      feedOptions() {
        // double slash after hostname
        return {
          title: 'My Blog',
          feed_url: 'https://myblog.com//feed.xml',
          site_url: 'https://myblog.com//',
          image_url: 'https://myblog.com//cover-image.png',
          docs: 'https://myblog.com//feed-docs',
          hub: 'https://myblog.com//hub'
        };
      },
      items() {
        return [1, 2];
      },
      itemOptions(number) {
        return {
          title: `Item ${number}`,
          description: `This is item ${number}`,
          url: `https://myblog.com/${number}`,
          date: `2019-0${number}-01`
        };
      }
    });

    const xml = renderXml(cls);

    expect(xml).toMatchSnapshot();
  });

  test('normalizes urls in itemOptions', () => {
    const cls = createRssFeed({
      permalink: '/feed.xml',
      feedOptions() {
        return {
          title: 'My Blog',
          feed_url: 'https://myblog.com/feed.xml',
          site_url: 'https://myblog.com'
        };
      },
      items() {
        return [1, 2];
      },
      itemOptions(number) {
        // double slash after hostname
        return {
          title: `Item ${number}`,
          description: `This is item ${number}`,
          url: `https://myblog.com//${number}`,
          date: `2019-0${number}-01`,
          enclosure: {
            url: `https://myblog.com//episode-${number}`,
            size: 1024 * number,
            type: 'image/png'
          }
        };
      }
    });

    const xml = renderXml(cls);

    expect(xml).toMatchSnapshot();
  });
});

function renderXml(cls) {
  const instance = new cls();
  const data = instance.data();
  return instance.render({
    ...data,
    collections: {
      post: []
    }
  });
}

describe('options error checking', () => {
  test('throws Error when permalink not included', () => {
    expect(() => {
      createRssFeed({
        //permalink: '/feed.xml',
        feedOptions() {
          return {
            title: 'My Blog',
            feed_url: 'https://myblog.com/feed.xml',
            site_url: 'https://myblog.com'
          };
        },
        items() {
          return [1, 2];
        },
        itemOptions(number) {
          return {
            title: `Item ${number}`,
            description: `This is item ${number}`,
            url: `https://myblog.com/${number}`,
            date: `2019-0${number}-01`
          };
        }
      });
    }).toThrow(Error);
  });

  test('throws Error when feedOptions() not included', () => {
    expect(() => {
      createRssFeed({
        permalink: '/feed.xml',
        // feedOptions() {
        //   return {
        //     title: 'My Blog',
        //     feed_url: 'https://myblog.com/feed.xml',
        //     site_url: 'https://myblog.com'
        //   };
        // },
        items() {
          return [1, 2];
        },
        itemOptions(number) {
          return {
            title: `Item ${number}`,
            description: `This is item ${number}`,
            url: `https://myblog.com/${number}`,
            date: `2019-0${number}-01`
          };
        }
      });
    }).toThrow(Error);
  });

  test('throws Error when items() not included', () => {
    expect(() => {
      createRssFeed({
        permalink: '/feed.xml',
        feedOptions() {
          return {
            title: 'My Blog',
            feed_url: 'https://myblog.com/feed.xml',
            site_url: 'https://myblog.com'
          };
        },
        // items() {
        //   return [1, 2];
        // },
        itemOptions(number) {
          return {
            title: `Item ${number}`,
            description: `This is item ${number}`,
            url: `https://myblog.com/${number}`,
            date: `2019-0${number}-01`
          };
        }
      });
    }).toThrow(Error);
  });

  test('throws Error when itemOptions() not included', () => {
    expect(() => {
      createRssFeed({
        permalink: '/feed.xml',
        feedOptions() {
          return {
            title: 'My Blog',
            feed_url: 'https://myblog.com/feed.xml',
            site_url: 'https://myblog.com'
          };
        },
        items() {
          return [1, 2];
        },
        // itemOptions(number) {
        //   return {
        //     title: `Item ${number}`,
        //     description: `This is item ${number}`,
        //     url: `https://myblog.com/${number}`,
        //     date: `2019-0${number}-01`
        //   };
        // }
      });
    }).toThrow(Error);
  });
});

describe('calling user-supplied functions during render()', () => {
  test('passes data object to feedOptions()', () => {
    const mockFeedOptions = jest.fn();
    mockFeedOptions.mockReturnValue({});

    const cls = createRssFeed({
      permalink: '/feed.xml',
      feedOptions: mockFeedOptions,
      items() {
        return [1, 2];
      },
      itemOptions(number) {
        return {
          title: `Item ${number}`,
          description: `This is item ${number}`,
          url: `https://myblog.com/${number}`,
          date: `2019-0${number}-01`
        };
      }
    });

    const instance = new cls();
    const eleventyDataObject = {
      collections: {}
    };

    instance.data();
    instance.render(eleventyDataObject);

    expect(mockFeedOptions).toHaveBeenCalledWith(eleventyDataObject);
  });

  test('passes collections and data object to items()', () => {
    const mockItems = jest.fn();
    mockItems.mockReturnValue([]);

    const cls = createRssFeed({
      permalink: '/feed.xml',
      feedOptions() {
        return {
          title: 'My Blog',
          feed_url: 'https://myblog.com/feed.xml',
          site_url: 'https://myblog.com'
        };
      },
      items: mockItems,
      itemOptions(number) {
        return {
          title: `Item ${number}`,
          description: `This is item ${number}`,
          url: `https://myblog.com/${number}`,
          date: `2019-0${number}-01`
        };
      }
    });

    const instance = new cls();
    const eleventyCollectionsObject = {};
    const eleventyDataObject = {
      collections: eleventyCollectionsObject
    };

    instance.data();
    instance.render(eleventyDataObject);

    expect(mockItems).toHaveBeenCalledWith(eleventyCollectionsObject, eleventyDataObject);
  });

  test('passes items and data object to itemOptions', () => {
    const mockItemOptions = jest.fn();
    mockItemOptions.mockReturnValue({});

    const cls = createRssFeed({
      permalink: '/feed.xml',
      feedOptions() {
        return {
          title: 'My Blog',
          feed_url: 'https://myblog.com/feed.xml',
          site_url: 'https://myblog.com'
        };
      },
      items() {
        return [1, 2];
      },
      itemOptions: mockItemOptions
    });

    const instance = new cls();
    const eleventyDataObject = {
      collections: {}
    };

    instance.data();
    instance.render(eleventyDataObject);

    expect(mockItemOptions).toHaveBeenNthCalledWith(1, 1, eleventyDataObject);
    expect(mockItemOptions).toHaveBeenNthCalledWith(2, 2, eleventyDataObject);
  });
});
