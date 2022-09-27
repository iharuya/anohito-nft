import styles from "../styles/gacha.module.scss"
import { ethers } from "ethers"
import { useNetwork, useSigner, useContractRead } from "wagmi"
import contractAddress from "../../constants/contractAddress"
import { abi } from "../../constants/Anohito.json"
import ClipLoader from "react-spinners/ClipLoader"
import Countdown from "react-countdown"
import { toast } from "react-toastify"
import { BsAlert } from "../components/BsAlert"
const defaultChain = import.meta.env.VITE_DEFAULT_CHAIN

export const Gacha = () => {
  const { chain } = useNetwork()
  const { data: signer } = useSigner()

  const { data: deadline } = useContractRead({
    addressOrName: contractAddress[chain?.network || defaultChain],
    contractInterface: abi,
    functionName: "deadline",
  })
  const { data: rollPrice } = useContractRead({
    addressOrName: contractAddress[chain?.network || defaultChain],
    contractInterface: abi,
    functionName: "rollPrice",
  })
  const isWritable = signer && contractAddress[chain?.network] && rollPrice

  const inlineRollPrice = () => {
    if (rollPrice) {
      const price = ethers.utils.formatEther(rollPrice.toString())
      return `${price} ETH`
    }
    return <ClipLoader color="#cdcdcd" size={16} className="mx-2" />
  }

  const roll = async () => {
    if (!isWritable) return
    const contract = new ethers.Contract(contractAddress[chain.network], abi, signer)
    const toastId = toast.info("トランザクションを送って下さい")
    try {
      const tx = await contract.roll({ value: rollPrice })
      toast.update(toastId, {
        render: "ガラガラガラ...",
      })
      const receipt = await tx.wait()
      const rolledEvent = receipt.events.find((event) => event.event === "Rolled")
      const { roller, tokenId } = rolledEvent.args
      toast.update(toastId, {
        render: `${tokenId.toString()}が当たりました！`,
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
      })
    } catch (error) {
      if (error.code == "ACTION_REJECTED") {
        toast.update(toastId, {
          render: "やっぱりやめとこう...",
          type: toast.TYPE.INFO,
          autoClose: 3000,
        })
      } else {
        console.error(error)
        toast.update(toastId, {
          render: "エラーが発生しました",
          type: toast.TYPE.ERROR,
          autoClose: 5000,
        })
      }
    }
  }

  return (
    <div className="text-center mt-5">
      <h1 className="mb-5 display-2">誰に会えるかな？</h1>
      <div className="mb-5">
        <ClipLoader loading={!deadline} color="#cdcdcd" />
        {deadline && (
          <Countdown renderer={Counter} date={deadline.toNumber() * 1000} />
        )}
      </div>
      <div className="mb-4">
        {!signer && <BsAlert>ウォレットを接続して下さい</BsAlert>}
        {signer && !contractAddress[chain?.network] && (
          <BsAlert type="warning">
            <p>接続しているブロックチェーンにコントラクトが対応していません。</p>
            <p>他のネットワークに接続して下さい。</p>
          </BsAlert>
        )}
        <button onClick={roll} className={styles.button} disabled={!isWritable}>
          ガチャを回す ({inlineRollPrice()})
        </button>
      </div>
    </div>
  )
}

const Counter = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) return (
    <BsAlert>
      <p className="text-center mb-0 display-5">ガチャは終了しました</p>
    </BsAlert>
  )
  return (
    <div>
      <p className="display-3">締切まであと</p>
      <div className="container position-relative" style={{ maxWidth: "580px" }}>
        <div className="row">
          <div className="col">
            <div className={styles.card}>
              <div className={styles.countdownValue}>{days}</div>
              <div className={styles.couUnit}>Days</div>
            </div>
          </div>
          <div className="col">
            <div className={styles.card}>
              <div className={styles.countdownValue}>{hours}</div>
              <div className={styles.couUnit}>Hours</div>
            </div>
          </div>
          <div className="col">
            <div className={styles.card}>
              <div className={styles.countdownValue}>{minutes}</div>
              <div className={styles.couUnit}>Mins</div>
            </div>
          </div>
          <div className="col">
            <div className={styles.card}>
              <div className={styles.countdownValue}>{seconds}</div>
              <div className={styles.couUnit}>Secs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}