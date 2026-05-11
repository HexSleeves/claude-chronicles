import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const all = await getCollection("conversations", ({ data }) => !data.draft);
  const sorted = all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime()).slice(0, 20);
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  return rss({
    title: "claude chronicles",
    description: "A blog of wild conversations with Claude.",
    site: new URL(`${base}/`, context.site!).toString(),
    items: sorted.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: `${base}/conversations/${entry.id.replace(/\.mdx$/, "")}/`,
      categories: entry.data.tags,
    })),
    customData: "<language>en-us</language>",
  });
}
