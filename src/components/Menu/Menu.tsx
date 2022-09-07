import Tippy from '@tippyjs/react/headless';
import { Wrapper } from '../Popper';
import styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import MenuItem from './MenuItem';
import HeaderMenu from './HeaderMenu';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

type Props = {
    items: any;
    onChange?: any;
    children: React.ReactElement;
    hideOnClick?: boolean;
};
export interface itemProps {
    icon: React.ReactNode;
    title: string;
    to?: string;
    children?: any;
    separate?: true;
}

const Menu = ({ items, children, onChange, hideOnClick = false }: Props) => {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1].data;

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const renderItem = () => {
        return current.map((item: itemProps, index: number) => {
            const isParent: boolean = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };
    return (
        <div>
            <Tippy
                interactive
                offset={[16, 10]}
                delay={[0, 700]}
                hideOnClick={hideOnClick}
                placement='bottom-end'
                render={(attrs) => (
                    <div className={cx('menu')} tabIndex={-1} {...attrs}>
                        <Wrapper>
                            {history.length > 1 && (
                                <HeaderMenu
                                    title='Language'
                                    onBack={handleBack}
                                />
                            )}
                            <div className={cx('sub-menu')}>{renderItem()}</div>
                        </Wrapper>
                    </div>
                )}
                onHide={() => setHistory((prev) => prev.slice(0, 1))}
            >
                {children}
            </Tippy>
        </div>
    );
};

export default Menu;
