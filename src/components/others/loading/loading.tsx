import styles from './loading.module.css'
const {loading__container,loading__title,spinner}=styles
export default function Loading() {
    return (
        <div className={loading__container}>
            <h1 className={loading__title}>Alimentos Pro Salud</h1>
            <div className={spinner}></div>
        </div>
    )
}