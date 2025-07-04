import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { articlesSchema, type Article } from "~/types/types";

const articlesDirectory = path.resolve(process.cwd(), "content");

const fsp = fs.promises;

export async function getArticles(): Promise<Article[]> {
  "use cache";

  const fileNames = fs.readdirSync(articlesDirectory);
  const promises = [];
  for (const name of fileNames) {
    const fullPath = path.join(articlesDirectory, name);
    promises.push(fsp.readFile(fullPath, "utf8"));
  }

  const result = await Promise.all(promises);

  const articles = result.map((c) => {
    const frontMatter = matter(c);
    return frontMatter.data;
  }) as Article[];
  const a = articlesSchema.safeParse(articles);

  if (a.error) {
    return [];
  }

  return a.data;
}

type ReadedArticle = {
  meta: Article;
  slug: string;
  content: string;
};

export async function getArticleBySlug(slug: string): Promise<ReadedArticle> {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(articlesDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const frontMatter = matter(fileContents);
  const meta = frontMatter.data as Article;
  return {
    meta,
    slug: realSlug,
    content: frontMatter.content,
  };
}
