const fs = require("fs")

async function main() {
  const preJsons = fs.readdirSync("./data/pre_json")
  const imageCid = "QmUu4uamayUiSXo2CbTS9mZD1qiBgu7fgqHGdmQSJMrH84"
  for (const name of preJsons) {
    let data = fs.readFileSync(`./data/pre_json/${name}`)
    data = JSON.parse(data)
    data.image = `ipfs://${imageCid}/${data.id}.png`
    data = JSON.stringify(data)
    fs.writeFileSync(`./data/json/${name}`, data)
  }
}
main()
