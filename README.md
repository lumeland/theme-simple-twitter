# Simple twitter archive

Lume theme to host your twitter/X archive.

## Instructions

- Download your account data from X.
  [How to download an archive of your Twitter data](https://www.theverge.com/23453703/twitter-archive-download-how-to-tweets)
- Copy the content of `tweets.js` file in `_data/tweets.js`, and replace the
  first line:
  ```diff
  - window.YTD.tweets.part0 = [
  + export default [
  ```
- Copy the folder `tweets_media` to `/uploads/tweets_media`.
- Copy the folder `profile_media` to `/uploads/profile_media`.
- Edit the `_data.yml` file with your account data.
- That's all. Run `deno task serve` to see the site.
