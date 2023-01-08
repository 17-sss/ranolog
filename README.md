![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=200&section=header&text=Ranolog%20🦖&fontSize=72&animation=fadeIn)

## 👋 Introduce

애착이 가는 블로그를 만들어보고 싶어서 시작하게 된 프로젝트입니다.  
😄 어디에도 없는 나만의 블로그!

<br/>

## 🛠️ Tech Stack

<p>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/Storybook-FF4785?style=flat-square&logo=Storybook&logoColor=white"/>
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"/>
</p>

<br/>

## ✨ Features

**Common**

- Blog, Projects, Resume 페이지 지원
  - **Blog**: 다양한 글을 작성하는 공간
  - Projects: 작업한 프로젝트를 요약하는 공간
  - Resume: 자신의 간단한 정보 (~~이력서~~)를 보여주는 공간
- `ranolog.config.ts`를 수정하여 세부 설정 가능
  - seo 관련 데이터, 댓글 설정, 각 페이지에서 쓰이는 일부 정보들 쉽게 설정 가능
- 배포 시 `sitemap.xml`, `robots.txt` 자동 생성

**Markdown**

- `md`, `mdx` 지원
- `mdx` 작성 시, 일부 컴포넌트 지원 ([Typography](https://ranolog-storybook.vercel.app/?path=/story/components-shared-typography--all-variant), [CustomCode](https://ranolog-storybook.vercel.app/?path=/story/components-shared-customcode--all-colors), [Divider](https://ranolog-storybook.vercel.app/?path=/story/components-shared-divider--default) 등..)
- 문서 작성 편의를 위한 CLI 지원 (docs-maker)

**Blog**

- 게시글 검색 지원
- 코드 하이라이팅 지원
- 댓글 기능 지원 ([Utterances](https://utteranc.es/))
- 글 목차 자동 생성 지원

<br/>

## 🤔 How to use

### 📝 기본 정보 입력

**`.env.local` 생성 & 작성**

- `.env.local`
  ```
  NEXT_PUBLIC_URL="URL 입력"
  NEXT_PUBLIC_DOMAIN="도메인명 입력"
  ```
  - **Vercel**에 배포하고, Vercel에 환경변수를 설정하였을 경우  
    [글: Next.js 환경변수, 그리고 Vercel - Vercel에서의 환경변수](http://hoyoung.dev/blog/2022-12-21-nextjs_env)를 참고하여 로컬 저장소로 가져와주세요!

**SEO를 위한 기본 데이터 입력**

- `ranolog.config.ts`의 `metadata` 수정
  ```ts
  export const metadata: DefaultSeoMeta = {
    title: '페이지 타이틀',
    description: '페이지 설명',
    image: '표시되는 대표 이미지 URL',
    url: '페이지 URL',
    siteName: '사이트 이름',
    author: '페이지 작성자',
    canonical: '페이지 URL (중복된 페이지 중 가장 대표적으로 사용되는 URL)',
  };
  ```

**소유권 확인 데이터 입력**

> 현재 웹 마스터 도구에 등록하지 않을 것이라면, 이 부분은 나중에 입력해도 무방합니다!  
> 입력하지 않을 경우, `{}`를 대입해주세요!

- `ranolog.config.ts`의 `siteVerificationData` 수정
  ```ts
  export const siteVerificationData: SiteVerification = {
    naver: '[content value]',
    google: '[content value]',
  };
  ```

**Utterancs (댓글) 설정**

- [GitHub App: utterances](https://github.com/apps/utterances)에서 현재 작업하고 있는 저장소를 설정해주세요!
  - 저장소는 공개(Public) 저장소여야 합니다!
  - 더욱 자세한 설명은 ([Utterances](https://utteranc.es/))를 참고해주세요!
- `ranolog.config.ts`의 `utterancAttrs.repo` 프로퍼티 수정
  ```ts
  export const utterancAttrs: UtterancAttributes = {
    repo: '계정/저장소이름',
    /* .. 나머지 설정들 */
  };
  ```

**글쓴이 정보 (정적 데이터 입력)**

- `ranolog.config.ts`의 `staticDataInfo` 수정  
  🙇‍♂️ _**주석** 참고 부탁드립니다!_
  ```ts
  export const staticDataInfo: StaticDataInfo = {
    layout: {
      /** header.profileImage
       *  - Header 컴포넌트 우측에 표시되는 프로필 이미지
       *  - public 폴더내에 있는 이미지 파일 작성
       */
      header: {
        profileImage: './profile_image.jpg',
      },
      /** footer: 하단 Footer 컴포넌트에 표시될 이름과 아이콘의 Link 정보 */
      footer: {
        author: 'Hoyoung Son',
        contact: {
          github: 'https://github.com/17-sss',
          email: 'mailto:xzxking17@gmail.com',
        },
      },
    },
    pages: {
      /** main.introduce
       * - Home(MainPage)의 자신을 간단히 소개하는 영역에서 사용
       * - bannerImage의 경우, public 폴더내에 있는 이미지 파일 작성
       */
      main: {
        introduce: {
          title: 'Hoyoung Son',
          description: 'Frontend Engineer who create convenient value.',
          bannerImage: '/banner.jpg',
        },
      },
      /** resume.resumeFileName
       * - Resume(ResumePage)에서 기본 이력서가 될 파일 작성
       * - docs/resumes 폴더내에 있는 파일 작성
       */
      resume: {resumeFileName: 'default.mdx'},
    },
  };
  ```

<br/>

### 🏃 실행하기

**Next.js: Development mode 실행**

```sh
$ yarn dev
## OR
$ npm run dev
```

<br/>

### 📄 문서 작성

**Docs Maker**

```sh
$ yarn docsmaker
## OR
$ npm run docsmaker
```

<p>
  <img height="250" src="https://user-images.githubusercontent.com/33610315/208958946-3b7f630a-547a-4d14-992d-fc4b3e4265ad.gif" alt="docs maker: execute" />
  <img height="250" src="https://user-images.githubusercontent.com/33610315/208958981-4a8095c7-1ef0-4f5a-86b1-25403695235f.png" alt="docs maker: result" >
</p>

- Post, Project, Resume의 frontmatter를 생성해주는 CLI입니다.  
  이를 활용하여 문서를 생성한 후, 내용을 작성해주세요!
- 문서가 저장되는 폴더
  - Post: `/docs/posts`
  - Project: `/docs/projects`
  - Resume: `/docs/resumes`

---

버그나 제안하고 싶은 기능이 있으시다면, 이슈 남겨주시면 감사하겠습니다!  
아니면 [여기](https://hoyoung.dev/blog/2022-12-09-firstpost)에 댓글로!!
