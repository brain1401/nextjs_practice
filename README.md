# Next.js 13 연습

- 라우터 연습

src/app 폴더 내에 page.tsx 파일은 처음 홈페이지에 들어갔을 때 보여줄 내용이 담겨져 있다.
또한 src/app 폴더 내에 특정한 이름으로 폴더를 만든 다음 그 안에 page.tsx 파일을 만들면 홈페이지 주소/폴더이름 으로 접속했을 때 해당 폴더 내의 page.tsx의 내용이 보여진다.

- 다이나믹 라우트

폴더명을 [slug] 로 감싸고 해당 폴더 내에 page.tsx파일을 만든다.
만든 파일의 컴포넌트에서 props로 받아진 값 중 params안에 사용자가 입력한 글자가 들어있다.
이를 바탕으로 다이나믹 라우트를 할 수 있다.

- not-found 설정

App폴더 내에 not-found.tsx를 생성하고 컴포넌트를 만들어 주면 사용자가 비정상적인 경로로 접근할 시 해당 컴포넌트를 보여줌.
