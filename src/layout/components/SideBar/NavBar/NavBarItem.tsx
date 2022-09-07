import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './NavBar.module.scss';

const cx = classNames.bind(styles);

type Props = {
    title: string;
    to: string;
    icon: JSX.Element;
    activeIcon: JSX.Element;
};

const NavBarItem = ({ title, to, icon, activeIcon }: Props) => {
    return (
        <NavLink
            className={(nav) => cx('nav-item', { active: nav.isActive })}
            to={to}
        >
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('active-icon')}>{activeIcon}</span>
            <span className={cx('nav-title')}>{title}</span>
        </NavLink>
    );
};

export default NavBarItem;
