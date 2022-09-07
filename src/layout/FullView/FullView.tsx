import SideBar from '../components/SideBar/SideBar';
import classNames from 'classnames/bind';
import styles from './FullView.module.scss';
import Header from '../components/Header/Header';

const cx = classNames.bind(styles);

type Props = {
    children: React.ReactNode;
};

const FullView = ({ children }: Props) => {
    return (
        <div className={cx('wrapper')}>
            <Header small />
            <div className={cx('container')}>
                <SideBar small />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
};

export default FullView;
