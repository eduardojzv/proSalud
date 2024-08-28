interface Props {
    title: string
    banner__content: string
    text: string
    text__content:string
}
export default function BannerContent({ title,banner__content, text,text__content}: Props) {
    return (
        <div className={banner__content}>
            <div className={`${text__content} upperCase`}>
                <h1>{title}</h1>
                <p>{text}</p>
            </div>
        </div>
    )
}