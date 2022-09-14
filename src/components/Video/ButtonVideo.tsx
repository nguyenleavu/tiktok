import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { VideoType } from '~/config/@type/type';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { modalLogin } from '~/redux/modalLoginSlice';
import * as request from '~/utils/request';
import { CMTIcon, HeartIcon, ShareIcon } from '../Icon/Icon';
import styles from './Video.module.scss';

const cx = classNames.bind(styles);

type Props = {
    data: VideoType;
    liked?: any;
};

const ButtonVideo = ({ data, liked }: Props) => {
    const user = useAppSelector((state) => state.login.login?.user);
    const dispatch = useAppDispatch();

    const handleLike = () => {
        if (user) {
            if (data.is_liked) {
                request.post(`videos/${data.id}/unlike`, data.uuid, {
                    headers: { Authorization: `Bearer ${user.meta.token}` },
                });
            } else {
                request.post(`videos/${data.id}/like`, data.uuid, {
                    headers: { Authorization: `Bearer ${user.meta.token}` },
                });
            }
        }
        liked();
    };
    const handleClick = () => {
        dispatch(modalLogin(true));
        window.location.reload();
    };

    return (
        <div className={cx('btn')}>
            <div className={cx('btn-item')}>
                <span
                    className={data.is_liked ? cx('liked') : cx('icon')}
                    onClick={user ? handleLike : handleClick}
                >
                    <HeartIcon />
                </span>
                <strong>{data.likes_count}</strong>
            </div>
            <div className={cx('btn-item')}>
                {user ? (
                    <Link to={`/videos/${data.uuid}`} className={cx('icon')}>
                        <CMTIcon />
                    </Link>
                ) : (
                    <span className={cx('icon')} onClick={handleClick}>
                        <CMTIcon />
                    </span>
                )}
                <strong>{data.comments_count}</strong>
            </div>
            <div className={cx('btn-item')}>
                <span className={cx('icon')}>
                    <ShareIcon />
                </span>
                <strong>{data.shares_count}</strong>
            </div>
        </div>
    );
};

export default ButtonVideo;
