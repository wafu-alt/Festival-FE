# Festival Moa App

> 페스티벌 모아 App

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
