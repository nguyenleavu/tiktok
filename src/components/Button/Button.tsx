import classNames from 'classnames/bind';
import { info } from 'console';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
import React from 'react';

const cx = classNames.bind(styles);

type Props = {
    children: React.ReactNode;
    to?: string;
    href?: string;
    primary?: boolean;
    outline?: boolean;
    onClick?: any;
    passProps?: any;
    small?: boolean;
    large?: boolean;
    text?: boolean;
    disable?: boolean;
    rounded?: boolean;
    className?: any;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    black?: boolean;
};

const Button = ({
    to,
    href,
    primary,
    outline,
    children,
    onClick,
    small,
    large,
    text,
    disable,
    rounded,
    className,
    leftIcon,
    rightIcon,
    black,
    ...passProps
}: Props) => {
    let Component: any = 'button';
    const props = {
        to,
        href,
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Component = Link;
    } else if (href) {
        props.href = href;
        Component = 'a';
    }

    const classes: any = cx('wrapper', {
        primary,
        outline,
        small,
        large,
        text,
        disable,
        rounded,
        black,
        [className]: className,
    });

    return (
        <Component className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Component>
    );
};

export default Button;
