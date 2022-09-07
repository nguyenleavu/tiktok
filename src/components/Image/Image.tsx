import { useState, forwardRef } from 'react';
import images from '~/assets/images/index';
import styles from './Image.module.scss';
import classNames from 'classnames';

type Props = {
    className?: string;
    alt: string;
    src: string;
    onError?: React.DOMAttributes<HTMLImageElement>;
};

const Image = forwardRef(
    (
        { className, src, alt }: Props,
        ref: React.LegacyRef<HTMLImageElement> | undefined
    ) => {
        const [fallback, setFallback] = useState<any>('');

        const handleError = () => {
            setFallback(images.noImg);
        };
        return (
            <img
                className={classNames(styles.wrapper, className)}
                ref={ref}
                src={fallback || src}
                onError={handleError}
                alt={alt}
            />
        );
    }
);

export default Image;
