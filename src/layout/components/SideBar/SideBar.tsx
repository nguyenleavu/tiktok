import classNames from 'classnames/bind';
import {
    FollowingPageActiveIcon,
    FollowingPageIcon,
    HomePageActiveIcon,
    HomePageIcon,
    LivePageActiveIcon,
    LivePageIcon,
} from '~/components/Icon/Icon';
import SuggestedAccounts from '~/components/SuggestedAccounts/SuggestedAccounts';
import config from '~/config';
import Footer from '../Footer/Footer';
import { NavBar, NavBarItem } from './NavBar';
import styles from './Sidebar.module.scss';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import Discover from '~/components/Discover/Discover';
import Button from '~/components/Button/Button';
import { useAppSelector } from '~/redux/hooks';

const cx = classNames.bind(styles);

type Props = {
    small?: boolean;
};

const SideBar = ({ small }: Props) => {
    const user = useAppSelector((state) => state.login.login?.user);
    return (
        <aside className={small ? cx('wrapper2') : cx('wrapper')}>
            <SimpleBar className={small ? cx('simple2') : cx('simple')}>
                <NavBar>
                    <NavBarItem
                        title='For You'
                        to={config.routes.home}
                        icon={<HomePageIcon />}
                        activeIcon={<HomePageActiveIcon />}
                    />
                    <NavBarItem
                        title='Following'
                        to={config.routes.following}
                        icon={<FollowingPageIcon />}
                        activeIcon={<FollowingPageActiveIcon />}
                    />
                    <NavBarItem
                        title='LIVE'
                        to={config.routes.live}
                        icon={<LivePageIcon />}
                        activeIcon={<LivePageActiveIcon />}
                    />
                </NavBar>
                <SuggestedAccounts label='Suggested accounts' />
                {user && <SuggestedAccounts label='Following accounts' />}
                <Discover />
                <Footer />
            </SimpleBar>
        </aside>
    );
};

export default SideBar;
