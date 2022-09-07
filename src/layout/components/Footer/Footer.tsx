import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

type Props = {};

const Footer = (props: Props) => {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('title')}>
                <span>About</span>
                <span> TikTok</span> <span>Browse</span> <span>Newsroom</span>{' '}
                <span>Contact</span> <span>Careers</span> <span>Byte</span>{' '}
                <span>Dance</span>
            </div>
            <div className={cx('title')}>
                <span>TikTok for Good</span>
                <span>Advertise</span>
                <span>Developers</span>
                <span>Transparency</span>
                <span>TikTok</span>
                <span>Rewards</span>
            </div>
            <div className={cx('title')}>
                <span>Help</span> <span>Safety</span> <span>Terms</span>{' '}
                <span>Privacy</span> <span>Creator</span> <span>Portal</span>{' '}
                <span>Community</span> <span>Guidelines</span>
            </div>
            <span>© 2022 TikTok</span>
        </footer>
    );
};

export default Footer;
