import { useState, useEffect } from "react"
import { FadeLoader, BeatLoader } from "react-spinners"
import { Img } from "react-image"

const itemStyle = (star) => {
  star = star ? parseInt(star) : 0
  const config = [
    {
      background: "#cdcdcd",
      textColor: "#333333",
    },
    {
      background: "linear-gradient(#5FD98D, #A3FAFF)",
      textColor: "#403111",
    },
    {
      background: "linear-gradient(#F1B434, #E739B5)",
      textColor: "#ffffff",
    },
    {
      background: "linear-gradient(#864152, #231815)",
      textColor: "#B79B5B",
    },
  ]

  return {
    background: config[star]["background"],
    color: config[star]["textColor"],
  }
}

const Stars = ({ star }) => {
  star = star ? parseInt(star) : 0
  return <span className="display-3">{"★".repeat(star)}</span>
}

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
    <div className="card h-100" style={itemStyle(metadata?.properties?.star)}>
      {metadata ? (
        <div className="onchain mb-1">
          <div>
            <Img
              src={metadata.image}
              className="img-fluid"
              loader={<FadeLoader className="mx-auto my-5" color="#cdcdcd" />}
            />
          </div>
          <Stars star={metadata.properties.star} />
          <div className="text-start p-2">
            <h2 className="fs-4">{metadata.name}</h2>
            <p className="mb-0">{metadata.description}</p>
          </div>
        </div>
      ) : (
        <BeatLoader color="#cdcdcd" className="mx-auto my-5" />
      )}
      <div className="onchain p-2 text-start mt-auto">
        {item.balance >= 0 && (
          <p className="mb-0">
            保有量 <span className="fs-1">{item.balance}</span>
          </p>
        )}
        <small>
          総供給量 <span className="fs-3">{item.supply}</span>
        </small>
      </div>
    </div>
  )
}
