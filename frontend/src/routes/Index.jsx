import indexStyles from "../styles/index.module.scss"

export const Index = () => {
  return (
    <div className="d-flex">
      <ul className={indexStyles.words}>
        <li>
          <p></p>
          <p>YOU</p>
        </li>
        <li>
          <p>YOU</p>
          <p>KNOW</p>
        </li>
        <li>
          <p>KNOW</p>
          <p>WHO</p>
        </li>
        <li>
          <p>WHO</p>
          <p>あの人</p>
        </li>
        <li>
          <p>あの人</p>
          <p>ガチャ</p>
        </li>
        <li>
          <p>ガチャ</p>
          <p></p>
        </li>
      </ul>
    </div>
  )
}
