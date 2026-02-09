# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ranolog는 Next.js 기반의 개인 블로그 프로젝트입니다. TypeScript, React, Emotion을 사용하며, MDX 기반의 정적 블로그 시스템을 제공합니다. Blog, Projects, Resume 세 가지 주요 페이지를 지원합니다.

## Development Commands

### 기본 개발 명령어
- `yarn dev` 또는 `npm run dev` - Next.js 개발 서버 실행
- `yarn build` 또는 `npm run build` - 프로덕션 빌드
- `yarn build:analyze` - 번들 분석과 함께 프로덕션 빌드
- `yarn start` - 프로덕션 서버 실행
- `yarn lint` - ESLint 실행

### 테스트 및 품질 검사
- `jest --config jest.config.js` - Jest 테스트 실행
- `jest --config jest.config.js --passWithNoTests` - 테스트가 없어도 통과

### 문서 작성
- `yarn docsmaker` 또는 `npm run docsmaker` - 문서 frontmatter 생성을 위한 CLI 도구 실행
  - Post, Project, Resume의 frontmatter를 대화형으로 생성

### Storybook
- `yarn storybook` - Storybook 개발 서버 실행 (포트 6006)
- `yarn build-storybook` - Storybook 빌드

### 기타
- `yarn postbuild` - next-sitemap 실행 (빌드 후 sitemap.xml, robots.txt 생성)
- `yarn prepare` - Husky 설치 (Git hooks 설정)

## Architecture

### 디렉토리 구조

```
ranolog/
├── pages/              # Next.js 페이지 (*.page.tsx)
│   ├── index.page.tsx
│   ├── blog/
│   ├── projects/
│   └── resume/
├── src/                # 소스 코드
│   ├── blog/          # 블로그 관련 컴포넌트 및 hooks
│   ├── projects/      # 프로젝트 관련 컴포넌트 및 hooks
│   ├── resume/        # 이력서 관련 컴포넌트 및 hooks
│   ├── main/          # 메인 페이지 관련
│   ├── shared/        # 공유 컴포넌트, 유틸리티, 타입
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── functions/
│   │   ├── styles/
│   │   ├── theme/
│   │   └── types/
│   └── lib/           # 문서 처리 로직 (docs.ts)
├── docs/              # MDX 문서 저장소
│   ├── posts/         # 블로그 글
│   ├── projects/      # 프로젝트 문서
│   └── resumes/       # 이력서 파일
├── .docs-maker/       # 문서 생성 CLI 도구
└── ranolog.config.ts  # 블로그 설정 파일
```

### 핵심 아키텍처

**1. 페이지 라우팅**
- Next.js의 pages directory 방식 사용
- 페이지 파일은 `*.page.tsx` 확장자 사용 (next.config.js에서 설정)
- 동적 라우팅: `[id]` 패턴 사용

**2. 컴포넌트 구조**
- 각 페이지(blog, projects, resume, main)별로 독립적인 폴더 구조
- 각 폴더는 `components/`와 `hooks/`로 구성
- Template 컴포넌트 패턴 사용 (BlogTemplate, ProjectTemplate 등)
- 공유 컴포넌트는 `src/shared/components/`에 위치

**3. 스타일링**
- Emotion (@emotion/react, @emotion/styled) 사용
- styled-system 통합하여 시스템 기반 스타일링 (`src/shared/system/`)
- 테마 시스템: `src/shared/theme/index.ts`
  - breakpoints, mediaQueries, fontSizes, colors 정의
- GlobalStyles: `src/shared/styles/GlobalStyles.tsx`

**4. MDX 문서 처리**
- `docs/` 폴더에 `.md`, `.mdx` 파일 저장
- `src/lib/docs.ts`에서 문서 CRUD 로직 처리
  - `getDocuments()`: 모든 문서 가져오기
  - `getSortedDocuments()`: 날짜순 정렬된 문서
  - `getDocumentByFileName()`: 특정 문서 가져오기
- gray-matter로 frontmatter 파싱
- next-mdx-remote로 MDX 렌더링
- 코드 하이라이팅: mdx-prism 사용

**5. 설정 관리**
- `ranolog.config.ts`: SEO, 댓글(Utterances), 정적 데이터 설정
- `.env.local`: URL, 도메인 환경변수

**6. TypeScript 경로 별칭**
- `@root/*`: 프로젝트 루트
- `@src/*`: src 폴더

## Important Notes

### MDX 컴포넌트
- MDX 파일에서 사용 가능한 컴포넌트: Typography, CustomCode, Divider, MdxImage 등
- 컴포넌트는 Storybook에 문서화되어 있음

### ESLint 규칙
- import order 엄격하게 관리:
  1. react (external, before)
  2. builtin, external
  3. internal (@root/*, @src/*)
  4. sibling, parent, index
- 그룹 간 newline 필수
- 알파벳순 정렬

### Git Hooks
- lint-staged: staged 파일에 대해 prettier, eslint, jest 자동 실행
- husky로 pre-commit hook 관리

### 문서 작성 규칙
- frontmatter에 id, subject, date, summary 등 필수 필드 포함
- date는 string 또는 {start, end?} 객체 형태
- 파일명이 id로 사용됨 (.md, .mdx 확장자 제외)

### Storybook 설정
- tsconfig-paths-webpack-plugin으로 경로 별칭 지원
- emotion의 css prop 사용을 위한 babel 설정
- remark-prism 관련 폴리필 설정 포함
