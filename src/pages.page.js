import { posix } from "lume/deps/path.ts";
export const layout = "layouts/tweet.vto";

export default async function* ({ tweets, account }) {
  for (const { tweet } of tweets) {
    yield createPage(tweet, account);
  }
}

function createPage(tweet, account) {
  let content = tweet.full_text;

  const page = {
    url: `/tweet/${tweet.id}/`,
    type: "tweet",
    date: new Date(tweet.created_at),
    likes: tweet.favorite_count,
    retweets: tweet.retweet_count,
    lang: tweet.lang,
    external_url: `https://x.com/${account.username}/status/${tweet.id}`,
    media: tweet.extended_entities?.media?.map((media) => {
      switch (media.type) {
        case "photo": {
          const last = posix.basename(new URL(media.media_url_https).pathname);
          return {
            src: `/uploads/tweets_media/${tweet.id}-${last}`,
            type: "image",
          };
        }
        case "video":
        case "animated_gif": {
          const variants = media.video_info.variants;
          const last = posix.basename(
            new URL(variants[variants.length - 1].url).pathname,
          );
          return {
            src: `/uploads/tweets_media/${tweet.id}-${last}`,
            type: "video",
          };
        }
      }
    }),
    tweet,
  };

  const image = page.media?.find((media) => media.type === "image");
  if (image) {
    page.metas = {
      image: image.src,
    };
  }

  const retweet = tweet.full_text.match(/^RT @(\w+): /);
  if (retweet) {
    page.retweet_of = retweet[1];
    content = content.slice(retweet[0].length);
  }

  if (tweet.in_reply_to_status_id) {
    page.reply_to = tweet.in_reply_to_screen_name;
    page.reply_to_url =
      `https://x.com/${tweet.in_reply_to_screen_name}/status/${tweet.in_reply_to_status_id}`;

    if (content.startsWith(`@${page.reply_to}`)) {
      content = content.slice(page.reply_to.length + 1);
    }
  }

  page.title = content;
  page.content = content
    .replaceAll(/(https?:\/\/\S+)/g, (_, url) => {
      return url.endsWith("…") ? url : `<a href="${url}">${url}</a>`;
    })
    .replaceAll(/@(\w+)/g, (_, username) => {
      return `<a href="https://x.com/${username}/">@${username}</a>`;
    })
    .replaceAll(/#(\w+)/g, (_, hashtag) => {
      return `<a href="https://x.com/hashtag/${hashtag}/">#${hashtag}</a>`;
    })
    .replaceAll("\n", "<br>");

  return page;
}
