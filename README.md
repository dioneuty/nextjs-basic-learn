https://nextjs.org/learn/dashboard-app/getting-started

```
npm install -g pnpm
```

(참고: npx create-next-app@latest nextjs-dashboard --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example" --use-pnpm)
```
pnpm i
```
```
pnpm dev
```


## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.


* postgre database
```
pnpm i @vercel/postgres
```
https://vercel.com/
https://wontory.gitbook.io/next.js-journey/learn-next.js/docs/chapter-6.-setting-up-your-database
https://nextjs.org/learn/dashboard-app/setting-up-your-database

* env 커밋 예외 설정
.env

* 데이터 설정
localhost:3000/seed

* vercel 배포 시 주의 사항
https://nextjs.org/learn/dashboard-app/setting-up-your-database
수동으로 배포 시 postgre 주소 변수 추가 필요
POSTGRES_URL = *****

* vercel 페이지
https://nextjs-basic-learn-nine.vercel.app/