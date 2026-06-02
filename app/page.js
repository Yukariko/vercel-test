import PostList from "@/components/PostList";
import { getSortedPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getSortedPosts();

  return (
    <>
      <section className="intro">
        <h1>안녕하세요, 블로그에 오신 걸 환영합니다 👋</h1>
        <p>개발, 투자, 그리고 일상의 기록을 남기는 공간입니다.</p>
      </section>

      <PostList initialPosts={posts} />
    </>
  );
}
