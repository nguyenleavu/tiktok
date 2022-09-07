import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handleDebounce = setTimeout(
            () => setDebouncedValue(value),
            delay
        );

        return () => clearTimeout(handleDebounce);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    return debouncedValue;
};

export default useDebounce;
