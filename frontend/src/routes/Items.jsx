import { ethers } from "ethers"
import { useNetwork, useProvider, useAccount } from "wagmi"
import contractAddress from "../../constants/contractAddress"
import { abi } from "../../constants/Anohito.json"
import { BeatLoader } from "react-spinners/"
import { BsAlert } from "../components/BsAlert"
import { Item } from "../components/items/Item"
import { useEffect, useState } from "react"
const defaultChain = import.meta.env.VITE_DEFAULT_CHAIN

export const Items = () => {
  const { chain } = useNetwork()
  const provider = useProvider()
  const { address: connectedAddress } = useAccount()

  const [items, setItems] = useState(undefined)

  useEffect(() => {
    ;(async () => {
      try {
        const contract = new ethers.Contract(contractAddress[chain?.network || defaultChain], abi, provider)
        const supplies = await contract.totalSupplyAll()
        const balances = connectedAddress ? await contract.balanceOfAll(connectedAddress) : undefined
        const uri = await contract.uri("1")
        setItems(
          supplies.map((supply, idx) => {
            return {
              tokenId: idx,
              uri: uri,
              supply: supply.toNumber(),
              balance: balances ? balances[idx].toNumber() : undefined,
            }
          })
        )
      } catch (error) {
        console.error(error)
      }
    })()
  }, [chain, connectedAddress])

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
