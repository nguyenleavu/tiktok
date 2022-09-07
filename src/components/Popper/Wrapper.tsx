import styles from './Popper.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type Props = {
    children: React.ReactNode;
};

const Wrapper = ({ children }: Props) => {
    return <div className={cx('wrapper')}>{children}</div>;
};

export default Wrapper;
