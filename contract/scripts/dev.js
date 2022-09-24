const hre = require("hardhat")
require("dotenv").config()

async function main() {
  const factory = await hre.ethers.getContractFactory("Anohito")
  const uri = "http://localhost:8001"
  const drawPrice = hre.ethers.utils.parseEther("0.01")
  const drawPeriod = 7 * 86400
  const params = [uri, drawPrice, drawPeriod]
  const contract = await factory.deploy(...params)
  await contract.deployed()
  console.log(`contract deployed to ${contract.address}`)

  // Send ETH to specified addresses
  const sender = (await hre.ethers.getSigners())[0]
  const sendAmount = hre.ethers.utils.parseEther("1")
  let devAddressNum = 1
  while (process.env[`DEV_ADDRESS_${devAddressNum}`]) {
    const receiverAddress = process.env[`DEV_ADDRESS_${devAddressNum}`]
    const tx = { to: receiverAddress, value: sendAmount }
    await sender.sendTransaction(tx)
    devAddressNum++
  }
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
