import BannerContent from "./bannerContent"
interface Props {
  text?:string
  title:string
  banner:string
  banner__img:string
  banner__content:string
  text__content:string
  imgSrc:string
}
export default function Banner({text,title,banner,banner__content,banner__img,text__content,imgSrc}: Props) {
  return (
    <div className={banner}>
      <div className={banner__img}>
        <img src={imgSrc} />
      </div>
      <BannerContent banner__content={banner__content} text__content={text__content} text={text} title={title} />
    </div>
  )
}