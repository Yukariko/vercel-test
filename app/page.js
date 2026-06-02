import Link from "next/link";
import { getSortedPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getSortedPosts();

  return (
    <>
      <section className="intro">
        <h1>안녕하세요, 블로그에 오신 걸 환영합니다 👋</h1>
        <p>개발, 투자, 그리고 일상의 기록을 남기는 공간입니다.</p>
      </section>

      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`} className="post-card">
              <div className="post-meta">{post.date}</div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              {post.tags.length > 0 && (
                <div className="tags">
                  {post.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
