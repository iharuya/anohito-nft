import { ethers } from "ethers"
import { useNetwork, useContractRead, useProvider, useAccount } from "wagmi"
import contractAddress from "../../constants/contractAddress"
import { abi } from "../../constants/Anohito.json"
import BeatLoader from "react-spinners/BeatLoader"
import { BsAlert } from "../components/BsAlert"
import { useEffect, useState } from "react"
const defaultChain = import.meta.env.VITE_DEFAULT_CHAIN

export const Items = () => {
  const { chain } = useNetwork()
  const provider = useProvider()
  const { address: connectedAddress } = useAccount()

  const { data: uri } = useContractRead({
    addressOrName: contractAddress[chain?.network || defaultChain],
    contractInterface: abi,
    functionName: "uri",
    args: "1", // can be anything
  })
  const getUri = (tokenId) => {
    return uri?.replaceAll("{id}", tokenId)
  }

  const [items, setItems] = useState(undefined)

  useEffect(() => {
    ; (async () => {
      try {
        const contract = new ethers.Contract(contractAddress[chain?.network || defaultChain], abi, provider)
        const supplies = await contract.totalSupplyAll()
        const balances = connectedAddress ? await contract.balanceOfAll(connectedAddress) : undefined
        setItems(
          supplies.map((supply, idx) => {
            return {
              tokenId: idx,
              uri: getUri(idx),
              supply: supply.toNumber(),
              balance: balances ? balances[idx].toNumber() : undefined,
            }
          })
        )
      } catch (error) {
        console.error(error)
      }
    })()
  }, [chain, connectedAddress, uri])

  return (
    <div className="text-center mt-5">
      <h1 className="mb-5">あの人たち</h1>
      {!connectedAddress && (
        <div className="mb-5">
          <BsAlert>ウォレットを接続して自分の保有量をチェックしよう</BsAlert>
        </div>
      )}
      {!items ? (
        <BeatLoader color="#ffffff" size={16} />
      ) : (
        <div className="row">
          {items.map((item) => (
            <div key={item.tokenId} className="col col-12 col-md-6 col-lg-4 mb-4">
              <Item item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const Item = ({ item }) => {
  const [metadata, setMetadata] = useState(undefined)
  useEffect(() => {
    ; (async () => {
      try {
        const metadata = await fetch(item.uri).then((res) => res.json())
        setMetadata(metadata)
      } catch (error) {
        console.warn(error)
      }
    })()
  }, [])
  return (
    <div className="card text-dark px-2 py-4">
      {metadata ? (
        <div>
          <img src={metadata.image} alt={`${metadata.name}のイラスト`} className="img-fluid" />
        </div>
      ) : (
        <div className="py-5">
          <BeatLoader color="#cdcdcd" size={16} />
        </div>
      )}
      <p>ID #{item.tokenId}</p>
      <p>総発行量 {item.supply} 個</p>
      {item.balance >= 0 && <p>あなたの保有量 {item.balance} 個</p>}
    </div>
  )
}
