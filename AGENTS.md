# AGENTS.md

https://efcl.info/ のブログ用のリポジトリです。AIエージェントが記事を書くときのルールをまとめます。

## 記事の日時

- 記事の`date`には、未来の日時を書かない
    - Jekyllの既定では、ビルド時点より未来の日時の記事は出力されません
    - `_config.yml`で`future: true`にしているので公開はされますが、公開した時刻と記事の日時がずれるので、未来の日時は書かない
- `date`を書く前に、現在時刻を`TZ=Asia/Tokyo date`で確認し、それより前の時刻にする
- ファイル名の日付（`_posts/YYYY/YYYY-MM-DD-name.md`）は、`date`の日付に合わせる

## 文章のチェック

- pushする前に、`npx textlint <file>`を通す
