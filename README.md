# Festival Moa App

> 페스티벌 모아 App

### 배포한 사이트 URL

- <a href="http://ec2-13-125-195-205.ap-northeast-2.compute.amazonaws.com/" target="_blank">Festival-Moa 바로가기</a>

### 소개

- 사용자에게 축제일정을 제공합니다. (현재 서울지역만 제공)
- 축제 상세 정보를 제공합니다.
- 해당 정보는 [공공데이터포털](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15101578#/API%20%EB%AA%A9%EB%A1%9D/detailIntro1) ([한국관광공사](https://api.visitkorea.or.kr/#/hubTourSearch))제공 API를 활용하여 축제일정을 받아옵니다.
- 향후 서비스를 계속 업그레이드 할 예정입니다.

### 기술 스택

   <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=nextdotjs&logoColor=#000000">
   <img src="https://img.shields.io/badge/typescript-black?style=for-the-badge&logo=typescript&logoColor=#3178C6">
   <img src="https://img.shields.io/badge/tailwindcss-black?style=for-the-badge&logo=tailwindcss&logoColor=#06B6D4">

### APP 개발 가이드

1. 프로젝트 클론

   ```sh
   git clone https://github.com/wafu-alt/Festival-FE.git
   ```

2. `node_modules` 설치

   ```sh
   npm install
   ```

3. .env 파일 생성

- `../.env.development` 최상단에서 만들어야합니다

  ```sh
  touch .env.development
  ```

- 아래 내용이 들어가야합니다
  ```sh
   KAKAO_JS_KEY=key내용
   NEXT_PUBLIC_BACK_HOST=주소
   NEXT_PUBLIC_BACK_HOST_LOCATION=위치
  ```

4. 실행
   ```sh
   npm run dev
   ```

### 추가돼야 할 서비스

- 이미지 호출 문제
- 웹 화면 성능 테스트 후 Next.JS 14로 버젼 업
- SEO 향상 로직 코드 추가
- 웹 최적화를 위한 코드 수정
- 관리자 로그인 화면 개발
- 관리자 페이지 추가
  - LIST 조회, 수정, 삭제
  - DETAIL 조회, 수정, 삭제
  - TASK 수동 시작 조작 화면
  - LOG 조회 화면
  - CONTENT ID로 LIST, DETAIL 수동 조회 조작 화면
