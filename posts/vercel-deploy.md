---
title: "Vercel로 자동 배포하기"
date: "2026-06-01"
excerpt: "GitHub에 push 하면 Vercel이 자동으로 빌드하고 배포합니다. 설정 방법을 정리합니다."
tags: ["개발", "Vercel", "배포"]
---

## 자동 배포의 흐름

1. 코드를 수정하고 GitHub에 `git push`
2. Vercel이 변경을 감지해 자동으로 빌드
3. 빌드가 끝나면 프로덕션 URL에 반영

별도의 배포 명령 없이 `git push`만으로 사이트가 갱신됩니다.

## 프레임워크 자동 인식

Vercel은 저장소에 `package.json`이 있고 `next` 의존성이 보이면 Next.js
프로젝트로 인식해 알맞은 빌드 설정을 자동 적용합니다. 추가 설정은 필요 없습니다.

## 정적 파일

`public/` 폴더에 둔 파일은 루트 경로에서 그대로 서빙됩니다. 예를 들어
`public/game.html` 은 `/game.html` 로 접속할 수 있습니다.
