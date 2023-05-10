# Next.js 13 타입스크립트 연습

<br/>

<br/>

## 라우팅

src/app 폴더 내에 **page.tsx** 파일은 처음 홈페이지에 들어갔을 때 보여줄 내용이 담겨져 있다.

또한 src/app 폴더 내에 특정한 이름으로 폴더를 만든 다음 그 안에 **page.tsx** 파일을 만들면 홈페이지 주소/폴더이름 으로 접속했을 때 해당 폴더 내의 **page.tsx**의 내용이 보여진다.

<br/>

## 다이나믹 라우트

폴더명을  ```[slug]``` 로 감싸고 해당 폴더 내에 **page.tsx**파일을 만든다.

만든 파일의 컴포넌트에서 ```props```로 받아진 값 중 ```params```안에 사용자가 입력한 글자가 들어있다.

이를 바탕으로 다이나믹 라우트를 할 수 있다.

<br/>

## not-found 설정
App폴더 내에 not-found.tsx를 생성하고 컴포넌트를 만들어 주면 사용자가 비정상적인 경로로 접근할 시 해당 컴포넌트를 보여줌.

<br/>

## Root Layout과 Lested Layout

<br/>

### - **Root Layout**
---

```tsx
/* app/layout.tsx */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

App디렉토리는 **무조건** **root layout**이 존재해야 한다.

Loot Layout은 앱 디렉터리의 최상위 레벨에 정의되며 모든 경로에 적용된다.

이 레이아웃을 사용하면 서버에서 반환된 초기 HTML을 수정할 수 있다.

Loot Layout은 기본적으로 **서버 컴포넌트**이며 클라이언트 컴포넌트로 설정할 수 없다.

Next.js는 기본적으로 ```<html>```과 ```<body>``` 태그를 자동으로 생성하지 않기 때문에 root layout은 ```<html>```과 ```<body>``` 태그를 포함해야 한다.

기본 제공 SEO 지원 기능을 사용하여 ```<head>``` HTML 요소(예: ```<title>``` 요소)를 관리할 수 있다.

``` {children} ``` 안에 page.tsx가 들어간다.

그러니까 RootLayout이 app/page.tsx를 감싸고 있는 것이다.

따라서 네비게이션 바 같은 기능을 손쉽게 만들 수 있다.

<br/>

### - **Nesting Layouts**
---

```tsx
/* app/products/layout.tsx */ 

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return <section>{children}</section>;
}
```

App디렉토리를 제외한 특정한 폴더에 layout.tsx라는 이름으로 파일을 만들어 Layout을 사용할 수 있다.

<br/>

예를 들어,

app/products/page.tsx

app/products/layout.tsx

파일이 있고

app/products/pants/page.tsx

가 존재할 경우

<br/>

감싸는 구조는 다음과 같다.

    app/layout.tsx

            ↓

    app/products/layout.tsx

            ↓

    app/products/pants/page.tsx

RootLayout은 반드시 필요하기 때문에 RootLayout이 맨 위에 온다.

<br/>

## Link 컴포넌트

<br/>

```tsx
import Link from 'next/link';
 
export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>;
}
```

```<Link>```는 HTML ```<a>``` 요소를 확장하여 경로 간 프리페칭 및 클라이언트 측 탐색을 제공하는 React 컴포넌트이다.

Next.js에서 **경로 사이를 탐색하는 기본 방법**이다.

<br/>

```<Link>``` 컴포넌트에 사용할 수 있는 Props에 대한 요약은 다음과 같다.

| Prop     | Example           | Type             | Required |
| :------- | :---------------- | :--------------- | :------- |
| href     | href="/dashboard" | String or Object | Yes      |
| replace  | replace={false}   | Boolean          | -        |
| prefetch | prefetch={false}  | Boolean          | -        |

<br/>

className 또는 target="_blank"와 같은 ```<a>``` 태그의 속성은 ```<Link>```에 Props로 추가할 수 있으며 기본 ```<a>``` element로 전달된다.

## SEO

Next.js 13에서 SEO는 기본적으로 ```Metadata``` 객체를 사용한다.

```tsx
{
  title: 'Home',
  description: 'Welcome to Next.js',
}
```

<br/>

metadata 객체는 위와 같이 구성되어 있다.

또한 상황에 따라 정적, 동적으로 SEO를 할 수 있다.

<br/>

### - 정적 SEO ( Static Metadata )
---

```tsx
/* app/page.tsx */
import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
};
 
export default function Page() {
  return '...';
}
```

원하는 page.tsx나 layout.tsx파일에 위와 같이 코드를 작성하여 SEO ( Static Metadata )를 적용할 수 있다.

<br/>

### - 동적 SEO ( Dynamic Metadata )
---

```tsx
/* app/products/[id]/page.tsx */
import type { Metadata } from 'next';
 
// 'fetch' 응답이 캐시되어 아래의 두 함수 간에 재사용되므로 Single API Request가 된다. 
// 'fetch'를 직접 사용할 수 없는 경우 'cache'를 사용할 수 있다. 
// 자세히 알아보기: https://beta.nextjs.org/docs/data-fetching/caching

async function getProduct(id) {
  const res = await fetch(`https://.../api/products/${id}`);
  return res.json();
}
 
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.id);
  return { title: product.title };
}
 
export default async function Page({ params }) {
  const product = await getProduct(params.id);
  // ...
}
```

```generateMetadata```를 사용하여 동적 값이 필요한 메타데이터를 설정할 수 있다.

Next.js는 ```generateMetadata``` 내부의 데이터 가져오기가 완료될 때까지 기다렸다가 클라이언트로 UI를 스트리밍합니다. 이렇게 하면 스트리밍된 응답의 첫 부분에 ```<head>``` 태그가 포함되도록 보장합니다.

<br/>

### - JSON-LD
---

JSON-LD는 검색 엔진이 콘텐츠를 이해하는 데 사용할 수 있는 구조화된 데이터 형식이다. 예를 들어 사람, 이벤트, 조직, 영화, 책, 레시피 및 기타 여러 유형의 엔티티를 설명하는 데 사용할 수 있다.


```tsx
/* app/products/[id]/page.tsx */
export default async function Page({ params }) {
  const product = await getProduct(params.id);
 
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
  };
 
  return (
    <section>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ... */}
    </section>
  );
}
```

현재 학습중인 **Next.js 13.4** 버전에서 JSON-LD에 대한 **권장 사항**은 위와 같이 ```layout.tsx``` 또는 ```page.tsx``` 컴포넌트에서 구조화된 데이터를 ```<script>``` 태그로 렌더링하는 것이다.

또한 Google용 **Rich Results Test** 또는 **General Schema Markup Validator**를 사용하여 구조화된 데이터의 유효성을 검사하고 테스트할 수 있다.

```schema-dts```와 같은 커뮤니티 패키지를 사용하여 ```TypeScript```로 JSON-LD를 입력할 수 있다.

```tsx
import { Product, WithContext } from 'schema-dts';
 
const jsonLd: WithContext<Product> = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Next.js Sticker',
  image: 'https://nextjs.org/imgs/sticker.png',
  description: 'Dynamic at the speed of static.',
};
```

<br/>

## next.js의 이점

```<Link>``` 컴포넌트와 ```<Image>``` 컴포넌트 등 Next.js에서 제공하는 유용한 기능들이 일반 리액트를 사용했을 때 보다 최적화를 쉽게 해 준다.

<br/>

## 서버/클라이언트 컴포넌트

### - 서버 컴포넌트
---

1. 서버 컴포넌트는 **서버에서 실행**된다.<br/><br/>

2. 코드는 **서버에서 실행**되어서 **pre-rendering 된 HTML형태**로 만들어서 브라우저에 전송함. 
   
   따라서 컴포넌트에서 **Return된 jsx를 제외**하고 ```console.log()``` 등  **서버컴포넌트 안에서 사용한 코드**는 사용자 브라우저가 아니라 **서버의 NodeJS에서 실행**됨. <br/><br/>
      
3. 서버 상에서 동작하기 때문에 아래와 같은 것들 등이 **불가능**하다.
  
  
   >- 브라우저 상에서 상태를 기억하거나 컴포넌트가 브라우저에 보여지는지 여부 확인

   >- 브라우저에서 동작하는데 필요한 상태 관련된 것

   >- 메모리 저장하는 것

   >- 브라우저 로컬호스트에 저장하고 읽고 쓰는 것

   >- 브라우저에서 제공하는 API는 사용할 수 없음 ( onClick이벤트 등 )
  
    <br/><br/>
   
4.  서버 상에서 동작하기 떄문에 아래와 같은 것들이 **가능**하다.

   >-  NodeAPI들을 사용할 수 있다.
  
   >- Node에서 동작하는 코드이기 때문에 Node에서 할 수 있는 것들은 다 가능하다.

   >- 서버 컴포넌트에서 서버상에 있는 파일시스템에 있는 파일에 접근이 가능하다.

   >- 서버 상에 있는 파일을 읽고 쓸 수 있다.

   >- 서버 상에 있는 데이터베이스 입출력을 할 수 있다.

   
   <br/><br/>
