import SideBar from '../components/SideBar/SideBar';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '../components/Header/Header';
import { useAppSelector } from '~/redux/hooks';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

type Props = {
    children: React.ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <SideBar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
};

export default DefaultLayout;
