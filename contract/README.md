# Contract

## 開発

- `yarn`
- `yarn fix` コードの整形
- `yarn compile` コントラクトのコンパイル
- `yarn dev` ローカル環境に EVM チェーンを起動
- `yarn deploy --network [localhost|goerli]` コントラクトのデプロイ
- `yarn copyAbi` ABI をフロントエンドにコピー
- `yarn hardhat [params]` hardhat を実行

## `Anohito.sol`コントラクト

ERC1155 準拠で、誰でも定額である Token ID を 1 つミントできる。

これを NFT と捉えるので、総供給量が固定され希少性が生まれる状況を期待する。そこでミントできる時間制限を設けた。

ガチャなので、Token ID は疑似ランダムで決定される。
