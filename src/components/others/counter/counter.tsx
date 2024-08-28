import { useState, useEffect } from 'react';
interface Props {
    targetNumber: number
}
export default function Counter({ targetNumber}: Props) {
    const [count, setCount] = useState<number>(0);
    useEffect(() => {
        if (count < targetNumber) {
            const timer = setTimeout(() => {
                setCount(count + 1);
            }, 1/(targetNumber - count)*200);

            // Limpia el temporizador cuando el componente se desmonta o cuando el contador cambia
            return () => clearTimeout(timer);
        }
    }, [count,targetNumber]);

    return <span>{count.toLocaleString()}</span>
}