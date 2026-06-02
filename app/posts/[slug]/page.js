import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getPost } from "@/lib/posts";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  try {
    const post = await getPost(params.slug);
    return { title: `${post.title} · 내 블로그`, description: post.excerpt };
  } catch {
    return { title: "글을 찾을 수 없습니다 · 내 블로그" };
  }
}

export default async function PostPage({ params }) {
  let post;
  try {
    post = await getPost(params.slug);
  } catch {
    notFound();
  }

  return (
    <article>
      <Link href="/" className="back-link">
        ← 목록으로
      </Link>
      <header className="article-header">
        <h1>{post.title}</h1>
        <div className="post-meta">{post.date}</div>
        {post.tags.length > 0 && (
          <div className="tags">
            {post.tags.map((tag) => (
              <span className="tag" key={tag}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
