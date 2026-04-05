# 残響探偵・雨乃町奇譚

横画面対応の分岐型ノベルホラーゲームです。  
主人公は私立探偵・九条アキラ。旧家の洋館で起きた密室殺人を調べながら、選択肢によって結末が変わります。

## 仕様

- ブラウザで動くHTML / CSS / JavaScript構成
- 横画面前提のUI
- スマホでも読みやすいレスポンシブ調整
- 3スロットのセーブ / ロード
- ローカル保存対応（localStorage）
- 分岐エンディング5種
- 証拠リスト表示
- 会話ログ表示
- 凝ったドット絵調背景PNG
- 強化版キャラクター立ち絵PNG

## ファイル構成

- `index.html` : 画面本体
- `styles.css` : UIデザイン
- `game-data.js` : シナリオ、分岐、証拠データ
- `main.js` : ゲーム制御、セーブ / ロード、ログ、UI更新
- `assets/` : 背景 / キャラクター画像（PNG）

## まずどれをGitHubに入れるのか

**ZIPそのものは入れなくて大丈夫です。**  
**ZIPを解凍したあと、中に入っているファイルとフォルダをそのまま全部GitHubリポジトリの直下に入れてください。**

GitHubに入れる中身はこの6つです。

- `index.html`
- `styles.css`
- `main.js`
- `game-data.js`
- `README.md`
- `assets` フォルダ

イメージとしては、GitHub上でこう並んでいればOKです。

```text
あなたのリポジトリ/
  ├─ index.html
  ├─ styles.css
  ├─ main.js
  ├─ game-data.js
  ├─ README.md
  └─ assets/
```

## ローカルで動かす方法

### そのまま開く方法
`index.html` をブラウザで開くだけでも動きます。

### ローカルサーバーで開く方法
VS Code の Live Server か、以下の簡易サーバーで開けます。

```bash
python -m http.server 8000
```

その後、ブラウザで以下を開いてください。

```text
http://localhost:8000
```

## GitHubに上げる手順

### すでにGitHubで空リポジトリを作ってある場合
このフォルダの中で以下を実行します。

```bash
git init
git add .
git commit -m "feat: horror novel game build"
git branch -M main
git remote add origin あなたのGitHubリポジトリURL
git push -u origin main
```

## GitHub Pagesで公開する場合

1. GitHubにpushする
2. リポジトリの `Settings` を開く
3. `Pages` を開く
4. `Deploy from a branch` を選ぶ
5. `main` ブランチ / `/root` を選ぶ
6. 保存する

数分後に公開URLが発行されます。

## 今後の拡張向きポイント

- BGM / 効果音追加
- 立ち絵差分（怒り / 恐怖 / 微笑 / 狂気）追加
- テキスト量を1時間級へ増量
- イベントCG追加
- 推理パートをミニゲーム化
- true end解放条件の多段化
- タイトル画面にエンディング回収率表示


## 今回のアート方針

- 商用作品の見た目をそのまま複製するのではなく、**青系の陰影・高密度背景・イラスト寄りのピクセルADV**という方向で、オリジナルの雰囲気に寄せて再設計しています。
- 背景はすべてPNG差し替え済みです。
- 立ち絵もすべてPNG差し替え済みです。
- さらに本格化する場合は、今の構図をベースにして表情差分・瞬き差分・口パク差分を追加すると、作品感が一段上がります。

## 動作前チェック

公開前にこの3点だけ確認してください。

- `index.html` がリポジトリ直下にあるか
- `assets` フォルダが同じ階層にあるか
- GitHub Pages の公開元が `main / root` になっているか

## ライセンス

個人制作向けのたたき台として自由に改造可能です。  
商用利用時は、画像や文言をあなたの作品用に差し替えて使う想定です。
