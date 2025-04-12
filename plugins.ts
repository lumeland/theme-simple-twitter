import lightningcss from "lume/plugins/lightningcss.ts";
import basePath from "lume/plugins/base_path.ts";
import metas from "lume/plugins/metas.ts";
import date from "lume/plugins/date.ts";
import { Options as SitemapOptions, sitemap } from "lume/plugins/sitemap.ts";
import { favicon, Options as FaviconOptions } from "lume/plugins/favicon.ts";
import pagefind from "lume/plugins/pagefind.ts";
import icons from "lume/plugins/icons.ts";
import inline from "lume/plugins/inline.ts";
import googleFonts from "lume/plugins/google_fonts.ts";
import { merge } from "lume/core/utils/object.ts";

import "lume/types.ts";

export interface Options {
  sitemap?: Partial<SitemapOptions>;
  favicon?: Partial<FaviconOptions>;
}

export const defaults: Options = {
  favicon: {
    input: "uploads/favicon.svg",
  },
};

/** Configure the site */
export default function (userOptions?: Options) {
  const options = merge(defaults, userOptions);

  return (site: Lume.Site) => {
    site.use(lightningcss())
      .use(basePath())
      .use(metas())
      .use(sitemap(options.sitemap))
      .use(favicon(options.favicon))
      .use(date())
      .use(icons())
      .use(inline())
      .use(pagefind())
      .use(googleFonts({
        cssFile: "style.css",
        fonts: {
          text:
            "https://fonts.google.com/share?selection.family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900",
        },
      }))
      .add([".css"])
      .add("uploads");
  };
}
