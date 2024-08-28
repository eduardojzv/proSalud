interface SelectData {
    data: object
    func: (arg: string) => void;
    styles: string;
    defaultVal:string;
}
export default function Select({ data, func, styles,defaultVal}: SelectData) {
    return (
        <select onChange={(e) => func(e.target.value)} className={styles} defaultValue={defaultVal}>
            {
                Object.entries(data).map(([key, val]) => (
                    <option key={key} value={val}>
                        {val}
                    </option>
                ))
            }
        </select>
    )
}