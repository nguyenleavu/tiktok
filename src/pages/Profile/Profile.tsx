import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Image from '~/components/Image/Image';
import Button from '~/components/Button/Button';
import { CheckIcon, LinkIcon } from '~/components/Icon/Icon';
import { useEffect, useRef, useState } from 'react';
import * as request from '~/utils/request';
import { useAppSelector } from '~/redux/hooks';

const cx = classNames.bind(styles);

type Props = {};

const Profile = (props: Props) => {
    const { nickname } = useParams();
    const videoRef = useRef<any>();
    const [user, setUser] = useState<any>([]);
    const currentUser = useAppSelector(
        (state) => state.login.login?.currentUser
    );

    useEffect(() => {
        const fetchApi = async () => {
            request
                .get(`users/@${nickname}`)
                .then((res) => {
                    setUser(res.data);
                })
                .catch(() => {});
        };
        fetchApi();
    }, [nickname]);

    const handleOnHover = (e: any) => {
        e.target.play();
    };
    const handleOnLeave = (e: any) => {
        e.target.pause();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <div className={cx('info-thumb')}>
                    <Image className={cx('avatar')} src={user.avatar} alt='' />
                    <div className={cx('info-state')}>
                        <h2>
                            {user.nickname}{' '}
                            {user.tick && (
                                <span>
                                    <CheckIcon />
                                </span>
                            )}
                        </h2>
                        <h1>{`${user.first_name} ${user.last_name}`}</h1>
                        {user.is_followed ? (
                            <Button outline className={cx('btn')}>
                                Messenger
                            </Button>
                        ) : (
                            <Button primary className={cx('btn')}>
                                Follow
                            </Button>
                        )}
                    </div>
                </div>
                <div className={cx('info-famuos-count')}>
                    <strong>{user.followings_count}</strong>
                    <span>Following</span>
                    <strong>{user.followers_count}</strong>
                    <span>Followers</span>
                    <strong>{user.likes_count}</strong>
                    <span>Likes</span>
                </div>
                <div className={cx('info-description')}>
                    <p>{user.bio}</p>
                </div>
                {user.instagram_url ||
                    user.twitter_url ||
                    (user.youtube_url && (
                        <p className={cx('info-link')}>
                            <span>
                                <LinkIcon />
                            </span>
                            {user.instagram_url && <p>user.instagram_url</p>}
                            {user.twitter_url && <p>user.instagram_url</p>}
                            {user.youtube_url && <p>user.instagram_url</p>}
                        </p>
                    ))}
            </div>
            <div className={cx('container')}>
                <p>Videos</p>
                <div className={cx('video-list')}>
                    {user.videos &&
                        user.videos.map((video: any) => (
                            <div key={video.id} className={cx('video-box')}>
                                <video
                                    loop
                                    muted
                                    preload='auto'
                                    poster={video.thumb_url}
                                    className={cx('video')}
                                    onMouseOver={handleOnHover}
                                    onMouseLeave={handleOnLeave}
                                >
                                    <source
                                        src={video.file_url}
                                        type='video/mp4'
                                    />
                                </video>
                                <span className={cx('description')}>
                                    {video.description}
                                </span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
