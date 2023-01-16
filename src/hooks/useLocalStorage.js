import { useEffect, useState } from 'react';

const PREFIX = 'codepen-'

export default function useLocalStorage( key, initialValue) {
    const PrefixKey = PREFIX + key;

    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(PrefixKey)
        if (jsonValue === "undefined") return;
        if (jsonValue != null) return JSON.parse(jsonValue);

        if (typeof initialValue === 'function') {
            return initialValue();
        }
        else {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(PrefixKey, JSON.stringify(value))
    }, [PrefixKey, value])

    return [value, setValue]
}
