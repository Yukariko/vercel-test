import Link from "next/link";

export default function NotFound() {
  return (
    <article>
      <header className="article-header">
        <h1>404 — 페이지를 찾을 수 없습니다</h1>
      </header>
      <div className="prose">
        <p>요청하신 페이지가 존재하지 않습니다.</p>
        <p>
          <Link href="/">홈으로 돌아가기</Link>
        </p>
      </div>
    </article>
  );
}
