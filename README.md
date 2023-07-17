# React学習リポジトリ
## やりたいこと
- [x] 公式Tutorialの実施
- [x] 環境構築の手順確立
- [ ] React開発でのDevopsの確立
- [ ] TypeScriptの習得
- [x] Axios を使って Drupal から記事の取得
- [x] Loader関数 を使って Drupal から記事の取得
- [ ] Axios を使って Drupal へ記事投稿
- [ ] ReactRouterの機能のみで Drupal へ記事投稿

## 環境構築
1. `git clone`
2. `npm install`
※Viteでの環境を推奨。

### Scripts
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`
- `npm upgrade-interactive`

## Drupalからデータの取得について
### React側の設定
1. axios の導入
2. axios の get メソッドでJSONを取得できる

### Drupal側の設定
1. Rest の設定
     - 「Rest UI」モジュールにて、JSON出力したい項目を「リソース」で設定
2. CORSの設定
   - **core.services.yml**より。
  ```
  cors.config:
    enabled: true
    # Specify allowed headers, like 'x-allowed-header'.
    allowedHeaders: ['content-type', 'authorization', 'x-csrf-token', 'access-control-allow-origin', 'access-control-allow-creedntials', 'content-disposition']
    # Specify allowed request methods, specify ['*'] to allow all possible ones.
    allowedMethods: ['*']
    # Configure requests allowed from specific origins.
    allowedOrigins: ['*']
    # Sets the Access-Control-Expose-Headers header.
    exposedHeaders: false
    # Sets the Access-Control-Max-Age header.
    maxAge: false
    # Sets the Access-Control-Allow-Credentials header.
    supportsCredentials: true
    ```