---
title: "Next.js로 블로그 만들기"
date: "2026-06-02"
excerpt: "마크다운 파일을 글로 변환하는 정적 블로그를 Next.js App Router로 구성하는 방법을 정리했습니다."
tags: ["개발", "Next.js"]
---

## 왜 Next.js인가

Next.js는 정적 사이트 생성(SSG)과 서버 렌더링을 모두 지원하고, Vercel과의 통합이
매끄럽습니다. `git push` 한 번이면 배포가 끝납니다.

## 폴더 구조

```text
app/
  layout.js        레이아웃
  page.js          홈(글 목록)
  posts/[slug]/    글 상세 페이지
lib/posts.js       마크다운 로더
posts/*.md         글 본문
```

## 글 추가하기

`posts/` 폴더에 마크다운 파일을 하나 만들고 상단에 메타데이터를 적습니다.

```markdown
---
title: "제목"
date: "2026-06-03"
excerpt: "요약"
tags: ["태그"]
---

본문 내용...
```

이게 전부입니다. 빌드 시점에 `gray-matter`가 메타데이터를, `remark`가 본문을
HTML로 변환합니다.
