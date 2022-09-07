import classNames from 'classnames/bind';
import { ArrowLeftIcon } from '~/components/Icon/Icon';
import styles from '././Menu.module.scss';

const cx = classNames.bind(styles);

type Props = { title: string; onBack?: any };

const HeaderMenu = ({ title, onBack }: Props) => {
    return (
        <header className={cx('wrapper')}>
            <button className={cx('back-btn')} onClick={onBack}>
                <ArrowLeftIcon />
            </button>
            <h4 className={cx('header-title')}>{title}</h4>
        </header>
    );
};

export default HeaderMenu;
