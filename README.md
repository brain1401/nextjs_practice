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

## - **Root Layout**

```tsx
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

## - **Nesting Layouts**

```tsx
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
