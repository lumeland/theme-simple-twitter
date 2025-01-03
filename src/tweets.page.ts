export const layout = "layouts/tweets.vto";
export const renderOrder = 1;

export default function* ({ search, paginate }: Lume.Data) {
  const tweets = search.pages("type=tweet", "date=desc");
  const pagination = paginate(tweets, {
    size: 100,
    url: (page) => page === 1 ? "/" : `/${page}/`,
    each(data, page) {
      data.title = page === 1 ? "Homepage" : `Page ${page}`;
    },
  });

  for (const page of pagination) {
    yield page;
  }
}
