import CMS from "lume/cms/mod.ts";

const cms = CMS();

cms.document({
  name: "Site settings",
  description: "Default settings for the site",
  store: "src:_data.yml",
  fields: [
    "lang: text",
    {
      name: "account",
      type: "object",
      fields: [
        "username: text",
        "displayName: text",
        {
          name: "avatar",
          type: "file",
        },
        {
          name: "header",
          type: "file",
        },
      ],
    },
    {
      name: "metas",
      type: "object",
      fields: [
        "site: text",
        "twitter: text",
        "fediverse: text",
        "icon: file",
        "lang: hidden",
        "generator: checkbox",
      ],
    },
  ],
});

cms.upload("uploads: Uploaded files", "src:uploads");

export default cms;
