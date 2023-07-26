# React学習リポジトリ
## やりたいこと
- 公式Tutorialの実施
- 環境構築の手順確立
- React開発でのDevopsの確立
- TypeScriptの習得
- Drupalを通してAPI通信を身につける

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

## API通信
### 前提条件
#### Drupal側の設定
1. JSONAPI の設定
   - **JSON API**モジュールのインストール
   - （必要であれば... [JSON:API Extras](https://www.drupal.org/project/jsonapi_extras)のインストール）
2. CORSの設定
   - **services.yml**
  ```
  cors.config:
    enabled: true
    # Specify allowed headers, like 'x-allowed-header'.
    allowedHeaders: ['x-csrf-token','authorization','content-type','accept','origin','x-requested-with', 'access-control-allow-origin','x-allowed-header','*']
    # Specify allowed request methods, specify ['*'] to allow all possible ones.
    allowedMethods: ['*']
    # Configure requests allowed from specific origins.
    allowedOrigins: ['http://localhost/','http://localhost:5173','http://localhost:5173','http://localhost:5173','*']
    # Sets the Access-Control-Expose-Headers header.
    exposedHeaders: false
    # Sets the Access-Control-Max-Age header.
    maxAge: false
    # Sets the Access-Control-Allow-Credentials header.
    supportsCredentials: true
    ```
3. 権限の設定
     - 匿名ユーザーでのエンティティの GET,POST,PATCH,DELETE 権限付与を行う。（ユーザー認証機能未実装のため）
### POSTについて
FormをReact-Hook-Formにて実装。
[Issue:React-PoC-Training/issues/9](https://github.com/kazuya-u/React-PoC-Training/issues/9)にて実装方法記載。
