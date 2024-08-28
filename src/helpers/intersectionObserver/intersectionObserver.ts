import { useEffect, useRef, useState, MutableRefObject } from 'react';

interface IntersectionObserverOptions extends IntersectionObserverInit {}

export default function useIntersectionObserver(options: IntersectionObserverOptions = {}): [MutableRefObject<HTMLDivElement | null>, boolean] {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);
    useEffect(() => {
        const element = elementRef.current;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    if (element) {
                        observer.unobserve(element);
                    }
                }
            });
        }, options);

        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [options]);

    return [elementRef, isIntersecting];
}