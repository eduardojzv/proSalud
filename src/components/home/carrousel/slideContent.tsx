interface Props  {
    text:string
    slide__content:string
    otherSlides__text:string
    language:string
}
export default function SlideContent({text,slide__content,otherSlides__text,language}: Props) {
    return (
        <div className={slide__content}>
            <div className={`${otherSlides__text} upperCase`}>
                {language === "es"
                    ? <>
                        <h1>nos importa</h1>
                        <p>{text}</p>
                    </>
                    : <>
                        <h1>{text}</h1>
                        <p>important to us</p>
                    </>}
            </div>
        </div>
    )
}