# Metadata

IPFS にメタデータをアップロードするためのツール

- `images`を IPFS にアップロードし、ディレクトリの CID を取得する
- `pre_json`以下に image フィールド以外のメタデータを保存する
- `node main.js`を実行すると、image フィールドに実際の IPFS の URL を挿入したものが`json`以下に保存される
- `json`を IPFS にアップロードし、その CID をコントラクトの uri に登録する
