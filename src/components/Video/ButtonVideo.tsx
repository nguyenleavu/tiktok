import classNames from 'classnames/bind';
import { CMTIcon, HeartIcon, ShareIcon } from '../Icon/Icon';
import styles from './Video.module.scss';
import * as request from '~/utils/request';
import { useAppSelector } from '~/redux/hooks';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

type Props = {
    data: any;
};

const ButtonVideo = ({ data }: Props) => {
    const [like, setLike] = useState(false);
    const user = useAppSelector((state) => state.login.login?.user);

    const handleLike = () => {
        if (user) {
            setLike(!like);
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
    };
    return (
        <div className={cx('btn')}>
            <div className={cx('btn-item')}>
                <span
                    className={like ? cx('liked') : cx('icon')}
                    onClick={handleLike}
                >
                    <HeartIcon />
                </span>
                <strong>
                    {like ? data.likes_count + 1 : data.likes_count}
                </strong>
            </div>
            <div className={cx('btn-item')}>
                <Link to={`/videos/${data.uuid}`} className={cx('icon')}>
                    <CMTIcon />
                </Link>
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
