import { useState, useEffect } from "react"
import { FadeLoader, BeatLoader } from "react-spinners"
import { Img } from "react-image"

export const Item = ({ item }) => {
  const [metadata, setMetadata] = useState(undefined)
  useEffect(() => {
    ;(async () => {
      try {
        let url = item.uri.replaceAll("{id}", item.tokenId)
        // change from ipfs to https gateway
        // ipfs://[cid]/0.json -> https://[gateway]/[cid].json
        if (url.startsWith("ipfs")) {
          url = url.replace("ipfs://", "https://ipfs.io/ipfs/")
        }
        const metadata = await fetch(url).then((res) => res.json())
        const imageUrl = metadata.image
        if (imageUrl.startsWith("ipfs")) {
          metadata.image = imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/")
        }
        setMetadata(metadata)
      } catch (error) {
        console.warn(error)
      }
    })()
  }, [])

  return (
    <div className="card text-dark px-4 py-4">
      {metadata ? (
        <div className="mb-3">
          <div className="mb-4">
            <Img
              src={metadata.image}
              className="img-fluid"
              loader={<FadeLoader className="mx-auto my-5" color="#cdcdcd" />}
            />
          </div>
          <div className="text-start">
            <h2 className="fs-4">{metadata.name}</h2>
            <p>{metadata.description}</p>
            <p>★{metadata.properties.star}</p>
          </div>
        </div>
      ) : (
        <BeatLoader color="#cdcdcd" className="mx-auto my-5" />
      )}
      <div>
        <p>ID #{item.tokenId}</p>
        <p>総発行量 {item.supply} 個</p>
        {item.balance >= 0 && <p>あなたの保有量 {item.balance} 個</p>}
      </div>
    </div>
  )
}
