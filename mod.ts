import plugins, { Options } from "./plugins.ts";

import "lume/types.ts";

export type { Options } from "./plugins.ts";

export default function (options: Partial<Options> = {}) {
  return (site: Lume.Site) => {
    // Configure the site
    site.use(plugins(options));

    // Add remote files
    const files = [
      "_includes/css/page.css",
      "_includes/css/tweets.css",
      "_includes/layouts/base.vto",
      "_includes/layouts/tweet.vto",
      "_includes/layouts/tweets.vto",
      "_includes/templates/tweet.vto",
      "uploads/favicon.svg",
      "_data.yml",
      "404.md",
      "pages.page.js",
      "tweets.page.ts",
      "index.vto",
      "styles.css",
    ];

    for (const file of files) {
      site.remoteFile(file, import.meta.resolve(`./src/${file}`));
    }
  };
}
