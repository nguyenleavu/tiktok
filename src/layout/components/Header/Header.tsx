import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';
import images from '~/assets/images/index';
import Button from '~/components/Button/Button';
import {
    FeedbackIcon,
    GetCoins,
    InboxIcon,
    KeyboardIcon,
    LanguageIcon,
    LogoutIcon,
    MessageIcon,
    MoreIcon,
    ProfileIcon,
    SettingsIcon,
    UploadIcon,
} from '~/components/Icon/Icon';
import Image from '~/components/Image/Image';
import Menu from '~/components/Menu/Menu';
import ModalLogin from '~/components/ModalLogin/ModalLogin';
import config from '~/config';
import { logOutUser } from '~/redux/apiRequest';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { modalLogin } from '~/redux/modalLoginSlice';
import styles from './Header.module.scss';
import Search from './Search/Search';

Modal.setAppElement('#modal-root');
const cx = classNames.bind(styles);

type Props = {
    small?: boolean;
};

const Header = ({ small }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.login.login?.user);

    const handleMenuChange = (menuItem: any) => {
        console.log(menuItem);
        if (menuItem.title === 'Log out') {
            logOutUser(user.id, dispatch, user.meta.token, navigate);
        }
    };
    const login = useAppSelector((state) => state.modalLogin.modalLogin);
    useEffect(() => {
        setIsOpen(login);
    }, [isOpen]);

    const MENU_ITEM = [
        {
            icon: <LanguageIcon />,
            title: 'English',
            children: {
                title: 'Language',
                data: [
                    { type: 'language', code: 'en', title: 'English' },
                    { type: 'language', code: 'vi', title: 'Tiếng Việt' },
                    { type: 'language', code: 'en', title: 'English' },
                    { type: 'language', code: 'vi', title: 'Tiếng Việt' },
                    { type: 'language', code: 'en', title: 'English' },
                    { type: 'language', code: 'vi', title: 'Tiếng Việt' },
                    { type: 'language', code: 'en', title: 'English' },
                    { type: 'language', code: 'vi', title: 'Tiếng Việt' },
                    { type: 'language', code: 'en', title: 'English' },
                    { type: 'language', code: 'vi', title: 'Tiếng Việt' },
                    { type: 'language', code: 'en', title: 'English' },
                    { type: 'language', code: 'vi', title: 'Tiếng Việt' },
                    { type: 'language', code: 'en', title: 'English' },
                    { type: 'language', code: 'vi', title: 'Tiếng Việt' },
                    { type: 'language', code: 'en', title: 'English' },
                    { type: 'language', code: 'vi', title: 'Tiếng Việt' },
                    { type: 'language', code: 'en', title: 'English' },
                    { type: 'language', code: 'vi', title: 'Tiếng Việt' },
                    { type: 'language', code: 'en', title: 'English' },
                    { type: 'language', code: 'vi', title: 'Tiếng Việt' },
                    { type: 'language', code: 'en', title: 'English' },
                    { type: 'language', code: 'vi', title: 'Tiếng Việt' },
                    { type: 'language', code: 'en', title: 'English' },
                    { type: 'language', code: 'vi', title: 'Tiếng Việt' },
                    { type: 'language', code: 'en', title: 'English' },
                    { type: 'language', code: 'vi', title: 'Tiếng Việt' },
                    { type: 'language', code: 'en', title: 'English' },
                    { type: 'language', code: 'vi', title: 'Tiếng Việt' },
                    { type: 'language', code: 'en', title: 'English' },
                    { type: 'language', code: 'vi', title: 'Tiếng Việt' },
                    { type: 'language', code: 'en', title: 'English' },
                    { type: 'language', code: 'vi', title: 'Tiếng Việt' },
                ],
            },
        },
        {
            icon: <FeedbackIcon />,
            title: 'Feedback and help',
            to: '/feedback',
        },
        {
            icon: <KeyboardIcon />,
            title: 'Keyboard shortcuts',
        },
    ];
    const USER_MENU = [
        {
            icon: <ProfileIcon />,
            title: 'View Profile',
            to: `/@${user?.data.nickname}` || '',
        },
        {
            icon: <GetCoins />,
            title: 'Get coins',
            to: '/coins',
        },
        {
            icon: <SettingsIcon />,
            title: 'Settings',
            to: '/setting',
        },
        ...MENU_ITEM,
        {
            icon: <LogoutIcon />,
            title: 'Log out',
            to: '/',
            separate: true,
        },
    ];

    const customStyles = {
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    function openModal() {
        setIsOpen(true);    
        dispatch(modalLogin(true));
    }

    function closeModal() {
        setIsOpen(false);
        dispatch(modalLogin(false));
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        if (performance.navigation.type === 1) {
            scrollToTop();
        }
    }, []);

    return (
        <header className={cx('wrapper')}>
            <div className={small ? cx('container2') : cx('container')}>
                <Link to={config.routes.home} onClick={scrollToTop}>
                    <img src={images.logo} alt='TikTok' />
                </Link>
                <Search />
                <div className={cx('actions')}>
                    {user ? (
                        <>
                            <div className={cx('current-user')}>
                                <Link
                                    to={config.routes.upload}
                                    className={cx('btn-upload')}
                                >
                                    <span>
                                        <UploadIcon />
                                    </span>
                                    Upload
                                </Link>
                                <Tippy
                                    content='Messages'
                                    placement='bottom'
                                    delay={[0, 200]}
                                >
                                    <button className={cx('btn-actions1')}>
                                        <MessageIcon />
                                    </button>
                                </Tippy>
                                <Tippy
                                    content='Inbox'
                                    placement='bottom'
                                    delay={[0, 200]}
                                >
                                    <button className={cx('btn-actions2')}>
                                        <InboxIcon />
                                    </button>
                                </Tippy>
                            </div>
                            <Menu items={USER_MENU} onChange={handleMenuChange}>
                                <Image
                                    className={cx('user-avatar')}
                                    src={user.data.avatar || ''}
                                    alt={user.data.nickname || ''}
                                />
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Button
                                text
                                leftIcon={<UploadIcon />}
                                onClick={openModal}
                            >
                                Upload
                            </Button>

                            <Button primary onClick={openModal}>
                                Log in
                            </Button>
                            <Menu items={MENU_ITEM} onChange={handleMenuChange}>
                                <button className={cx('more-btn')}>
                                    <MoreIcon />
                                </button>
                            </Menu>
                        </>
                    )}
                </div>
            </div>
            <Modal isOpen={isOpen} style={customStyles}>
                <ModalLogin onClose={() => closeModal()} />
            </Modal>
        </header>
    );
};

export default Header;
