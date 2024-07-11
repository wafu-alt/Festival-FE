/**
 * @link https://pm2.keymetrics.io/docs/usage/quick-start/
 * @기본시작
 * $ pm2 start ecosystem.config.js
 * @배포시작
 * $ pm2 start ecosystem.config.js --env production
 * @상태확인
 * $ pm2 status
 * @로그보기
 * $ pm2 logs , pm2 logs --lines 200
 * @애플리케이션 재시작
 * $ pm2 restart FesMoa-app
 * @애플리케이션 중지
 * $ pm2 stop FesMoa-app
 * @애플리케이션 삭제
 * $ pm2 delete FesMoa-app
 * @update
 * $ pm2 update
 */

module.exports = {
  apps: [
    {
      name: 'FesMoa-app', // 애플리케이션 이름
      cwd: './', // 현재 디렉토리
      script: 'node_modules/next/dist/bin/next', // Next.js 실행 스크립트 경로
      args: 'start -p 3000', // 실행 인수 (포트 번호 포함)
      env: {
        NODE_ENV: 'development', // 개발 환경 설정
        TZ: 'Asia/Seoul', // 개발 환경 타임존 설정
      },
      env_production: {
        NODE_ENV: 'production', // 프로덕션 환경 설정
        TZ: 'Asia/Seoul', // 프로덕션 환경 타임존 설정
      },
      time: true, // 로그에 타임스탬프 추가
      // max_memory_restart: '1G', // 메모리 사용량이 1GB를 초과하면 애플리케이션 재시작
      // watch: false, // 파일 변경 시 자동 재시작 비활성화 (개발 환경에서는 true로 설정 가능)
      // error_file: './logs/pm2_error.log', // 에러 로그 파일 경로
      // out_file: './logs/pm2_out.log', // 일반 로그 파일 경로
      // log_file: './logs/pm2_combined.log', // 통합 로그 파일 경로
    },
  ],
};
