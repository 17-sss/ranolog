![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=200&section=header&text=Ranolog%20π¦&fontSize=72&animation=fadeIn)

## π Introduce

μ μ°©μ΄ κ°λ λΈλ‘κ·Έλ₯Ό λ§λ€μ΄λ³΄κ³  μΆμ΄μ μμνκ² λ νλ‘μ νΈμλλ€.  
π μ΄λμλ μλ λλ§μ λΈλ‘κ·Έ!

<br/>

## π οΈ Tech Stack

<p>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/Storybook-FF4785?style=flat-square&logo=Storybook&logoColor=white"/>
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"/>
</p>

<br/>

## β¨ Features

**Common**

- Blog, Projects, Resume νμ΄μ§ μ§μ
  - **Blog**: λ€μν κΈμ μμ±νλ κ³΅κ°
  - Projects: μμν νλ‘μ νΈλ₯Ό μμ½νλ κ³΅κ°
  - Resume: μμ μ κ°λ¨ν μ λ³΄ (~~μ΄λ ₯μ~~)λ₯Ό λ³΄μ¬μ£Όλ κ³΅κ°
- `ranolog.config.ts`λ₯Ό μμ νμ¬ μΈλΆ μ€μ  κ°λ₯
  - seo κ΄λ ¨ λ°μ΄ν°, λκΈ μ€μ , κ° νμ΄μ§μμ μ°μ΄λ μΌλΆ μ λ³΄λ€ μ½κ² μ€μ  κ°λ₯
- λ°°ν¬ μ `sitemap.xml`, `robots.txt` μλ μμ±

**Markdown**

- `md`, `mdx` μ§μ
- `mdx` μμ± μ, μΌλΆ μ»΄ν¬λνΈ μ§μ ([Typography](https://ranolog-storybook.vercel.app/?path=/story/components-shared-typography--all-variant), [CustomCode](https://ranolog-storybook.vercel.app/?path=/story/components-shared-customcode--all-colors), [Divider](https://ranolog-storybook.vercel.app/?path=/story/components-shared-divider--default) λ±..)
- λ¬Έμ μμ± νΈμλ₯Ό μν CLI μ§μ (docs-maker)

**Blog**

- κ²μκΈ κ²μ μ§μ
- μ½λ νμ΄λΌμ΄ν μ§μ
- λκΈ κΈ°λ₯ μ§μ ([Utterances](https://utteranc.es/))
- κΈ λͺ©μ°¨ μλ μμ± μ§μ

<br/>

## π€ How to use

### π κΈ°λ³Έ μ λ³΄ μλ ₯

**`.env.local` μμ± & μμ±**

- `.env.local`
  ```
  NEXT_PUBLIC_URL="URL μλ ₯"
  NEXT_PUBLIC_DOMAIN="λλ©μΈλͺ μλ ₯"
  ```
  - **Vercel**μ λ°°ν¬νκ³ , Vercelμ νκ²½λ³μλ₯Ό μ€μ νμμ κ²½μ°  
    [κΈ: Next.js νκ²½λ³μ, κ·Έλ¦¬κ³  Vercel - Vercelμμμ νκ²½λ³μ](http://hoyoung.dev/blog/2022-12-21-nextjs_env)λ₯Ό μ°Έκ³ νμ¬ λ‘μ»¬ μ μ₯μλ‘ κ°μ Έμμ£ΌμΈμ!

**SEOλ₯Ό μν κΈ°λ³Έ λ°μ΄ν° μλ ₯**

- `ranolog.config.ts`μ `metadata` μμ 
  ```ts
  export const metadata: DefaultSeoMeta = {
    title: 'νμ΄μ§ νμ΄ν',
    description: 'νμ΄μ§ μ€λͺ',
    image: 'νμλλ λν μ΄λ―Έμ§ URL',
    url: 'νμ΄μ§ URL',
    siteName: 'μ¬μ΄νΈ μ΄λ¦',
    author: 'νμ΄μ§ μμ±μ',
    canonical: 'νμ΄μ§ URL (μ€λ³΅λ νμ΄μ§ μ€ κ°μ₯ λνμ μΌλ‘ μ¬μ©λλ URL)',
  };
  ```

**μμ κΆ νμΈ λ°μ΄ν° μλ ₯**

> νμ¬ μΉ λ§μ€ν° λκ΅¬μ λ±λ‘νμ§ μμ κ²μ΄λΌλ©΄, μ΄ λΆλΆμ λμ€μ μλ ₯ν΄λ λ¬΄λ°©ν©λλ€!  
> μλ ₯νμ§ μμ κ²½μ°, `{}`λ₯Ό λμν΄μ£ΌμΈμ!

- `ranolog.config.ts`μ `siteVerificationData` μμ 
  ```ts
  export const siteVerificationData: SiteVerification = {
    naver: '[content value]',
    google: '[content value]',
  };
  ```

**Utterancs (λκΈ) μ€μ **

- [GitHub App: utterances](https://github.com/apps/utterances)μμ νμ¬ μμνκ³  μλ μ μ₯μλ₯Ό μ€μ ν΄μ£ΌμΈμ!
  - μ μ₯μλ κ³΅κ°(Public) μ μ₯μμ¬μΌ ν©λλ€!
  - λμ± μμΈν μ€λͺμ ([Utterances](https://utteranc.es/))λ₯Ό μ°Έκ³ ν΄μ£ΌμΈμ!
- `ranolog.config.ts`μ `utterancAttrs.repo` νλ‘νΌν° μμ 
  ```ts
  export const utterancAttrs: UtterancAttributes = {
    repo: 'κ³μ /μ μ₯μμ΄λ¦',
    /* .. λλ¨Έμ§ μ€μ λ€ */
  };
  ```

**κΈμ΄μ΄ μ λ³΄ (μ μ  λ°μ΄ν° μλ ₯)**

- `ranolog.config.ts`μ `staticDataInfo` μμ   
  πββοΈ _**μ£Όμ** μ°Έκ³  λΆνλλ¦½λλ€!_
  ```ts
  export const staticDataInfo: StaticDataInfo = {
    layout: {
      /** header.profileImage
       *  - Header μ»΄ν¬λνΈ μ°μΈ‘μ νμλλ νλ‘ν μ΄λ―Έμ§
       *  - public ν΄λλ΄μ μλ μ΄λ―Έμ§ νμΌ μμ±
       */
      header: {
        profileImage: './profile_image.jpg',
      },
      /** footer: νλ¨ Footer μ»΄ν¬λνΈμ νμλ  μ΄λ¦κ³Ό μμ΄μ½μ Link μ λ³΄ */
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
       * - Home(MainPage)μ μμ μ κ°λ¨ν μκ°νλ μμ­μμ μ¬μ©
       * - bannerImageμ κ²½μ°, public ν΄λλ΄μ μλ μ΄λ―Έμ§ νμΌ μμ±
       */
      main: {
        introduce: {
          title: 'Hoyoung Son',
          description: 'Frontend Engineer who create convenient value.',
          bannerImage: '/banner.jpg',
        },
      },
      /** resume.resumeFileName
       * - Resume(ResumePage)μμ κΈ°λ³Έ μ΄λ ₯μκ° λ  νμΌ μμ±
       * - docs/resumes ν΄λλ΄μ μλ νμΌ μμ±
       */
      resume: {resumeFileName: 'default.mdx'},
    },
  };
  ```

<br/>

### π μ€ννκΈ°

**Next.js: Development mode μ€ν**

```sh
$ yarn dev
## OR
$ npm run dev
```

<br/>

### π λ¬Έμ μμ±

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

- Post, Project, Resumeμ frontmatterλ₯Ό μμ±ν΄μ£Όλ CLIμλλ€.  
  μ΄λ₯Ό νμ©νμ¬ λ¬Έμλ₯Ό μμ±ν ν, λ΄μ©μ μμ±ν΄μ£ΌμΈμ!
- λ¬Έμκ° μ μ₯λλ ν΄λ
  - Post: `/docs/posts`
  - Project: `/docs/projects`
  - Resume: `/docs/resumes`

---

λ²κ·Έλ μ μνκ³  μΆμ κΈ°λ₯μ΄ μμΌμλ€λ©΄, μ΄μ λ¨κ²¨μ£Όμλ©΄ κ°μ¬νκ² μ΅λλ€!  
μλλ©΄ [μ¬κΈ°](https://hoyoung.dev/blog/2022-12-09-firstpost)μ λκΈλ‘!!
