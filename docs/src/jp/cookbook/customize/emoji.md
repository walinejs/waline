---
title: 独自の絵文字プリセットを作成する
icon: emoji
---

このクックブックでは、独自の絵文字プリセットを作成して使用する方法を説明します。

<!-- more -->

## 独自のプリセットを作成する

まずは絵文字の画像をいくつか用意してください。その後、以下の手順に沿ってプリセットを作成します。

### 絵文字に名前を付けてアップロードする

シンプルにするため、Waline は絵文字画像のファイル名をそのまま絵文字のキーとして使用します。つまり、2 つの異なるプリセットを読み込み、どちらにも laugh.png という画像が含まれている場合、両方の絵文字が同じ `:laugh:` に対応してしまいます。

そのため、絵文字プリセットの作成者は、すべての絵文字ファイル名にプリセット名に関連するプレフィックスを付けるのがベストプラクティスです。

適切に名前を付けたら、それらをサーバーにアップロードする必要があります。

### プリセット情報を記述する

絵文字画像を次の場所に配置したとします。 `

```
https://example.com/my-emoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
├─ my_sob.png
└─ info.json
```

この時点で、絵文字プリセットにどの絵文字が含まれているかを Waline に伝えるため、このフォルダーに `info.json` ファイルを作成する必要があります。

まず、絵文字プリセットに名前を設定します（例: `My Emoji`）。画像には `my_` プレフィックスを付け、ファイルは `png` 形式なので、これらを `info.json` に記述する必要があります。

`info.json` は次のように記述できます。

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png"
}
```

次に、`items` にすべての絵文字名を任意の順序で列挙します。その際、`prefix` と `type` で設定したプレフィックスと拡張子は除いて記述することを忘れないでください。

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png",
  "icon": "cute"
}
```

その後、タブに表示するアイコンとして代表的な絵文字を選択してください。

```json
{
  "name": "My Emoji",
  "prefix": "my_",
  "type": "png",
  "icon": "cute",
  "items": ["laugh", "sob", "rage", "cute"]
}
```

これで `info.json` の記述は完了です。同じフォルダーにアップロードしてください。

これで、`https://example.com/my-emoji/'` を使った `my-emoji` プリセットが完成しました。

## タグ付きの GitHub ミラーを使う

通常、独自のドメイン名を用意して画像をアップロードするのは少し面倒ですし、リンクが時間の経過とともに失効する可能性もあります。そこで応用的な方法として、GitHub リポジトリを使い、git のタグ機能で GitHub リポジトリをミラーして絵文字プリセットを提供する方法があります。

上記の手順と同様に、新しい GitHub リポジトリを作成し、絵文字に同じように名前を付け、同じ手順で `info.json` を作成してリポジトリにアップロードします。

次に、このタイミングでリポジトリにタグを作成します。`vx.x.x` の形式（例: `v1.0.0`）で設定することをおすすめします。

タグを追加したら、[cdn.jsdelivr.net](https://www.jsdelivr.com/) のバージョン付き CDN リンクを `https://cdn.jsdelivr.net/gh/user/repo@version/file` の形式でプリセットとして利用できます。

`example/emoji` リポジトリを作成し、絵文字画像と `info.json` を直接アップロードして `v1.0.0` タグを作成したとします。この場合、`https://cdn.jsdelivr.net/gh/example/emoji@v1.0.0/` をプリセットとして使用できます。

::: tip

プリセットを変更することで過去のコメントが参照している画像リンクが無効にならないよう、リンクには必ずタグを指定してください。

公式の絵文字プリセットは、[walinejs/emojis](https://github.com/walinejs/emojis) リポジトリを作成して CDN リンクを使用することで実現しています。現在は `v1.1.0` バージョンを使用しています。

:::

::: warning

中国では cdn.jsdelivr.net へのアクセスが汚染されているため、`cdn.jsdelivr.net` を `gcore.jsdelivr.net` に置き換えて回避してください。

:::

## 設定オブジェクトを使う

前のセクションと同様に、次のようなファイル構成を想定します。

```
https://example.com/my-emoji/
├─ my_laugh.png
├─ my_cute.png
├─ my_rage.png
└─ my_sob.png
```

`info.json` を作成してアップロードし、リンクをプリセットとして使用する方法のほか、次のオブジェクトをそのままプリセットとして使用することもできます。

```js
{
  name: "My Emoji",
  folder: "https://example.com/my-emoji",
  prefix: "my_",
  type: "png",
  icon: "cute",
  items: ["laugh", "sob", "rage", "cute"]
}
```

ここでは、画像の保存場所を Waline に伝えるために `folder` プロパティを追加しています。
