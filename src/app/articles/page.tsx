import { ArticleList } from "~/components/article-list";
import { getArticles } from "~/lib/mdx";

export default async function ArticlesPage() {
  "use cache";
  const articles = await getArticles();

  return (
    <main
      className="flex min-h-screen w-full justify-center py-12 md:py-24 lg:py-32 lg:pt-24"
      style={{
        backgroundColor: "#f8f9fa",
        backgroundImage: `
          linear-gradient(to right, #e5e7eb 1px, transparent 1px),
          linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      <div className="container px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Articles
            </h1>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Thoughts, tutorials, and insights on web development, design, and
              technology.
            </p>
          </div>
        </div>
        <ArticleList articles={articles} />
      </div>
    </main>
  );
}
