import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';
import Button from '~/components/Button/Button';
import { CheckIcon, LinkIcon, UnFollowIcon } from '~/components/Icon/Icon';
import Image from '~/components/Image/Image';
import { follow, unFollow } from '~/redux/apiRequest';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { modalLogin } from '~/redux/modalLoginSlice';
import * as request from '~/utils/request';
import styles from './Profile.module.scss';
import { UserType, VideoType } from '~/config/@type/type';

const cx = classNames.bind(styles);

type Props = {};

const Profile = (props: Props) => {
    const { nickname } = useParams();

    const [user, setUser] = useState<UserType | any>({});
    const [followed, setFollowed] = useState(false);

    console.log(user);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((state) => state.login.login?.user);

    useEffect(() => {
        if (currentUser) {
            const fetchApi = async () => {
                request
                    .get(`users/@${nickname}`, {
                        headers: {
                            Authorization: `Bearer ${currentUser.meta.token}`,
                        },
                    })
                    .then((res) => {
                        setUser(res.data);
                    })
                    .catch(() => {});
            };

            fetchApi();
        } else {
            const fetchApi = async () => {
                request
                    .get(`users/@${nickname}`)
                    .then((res) => {
                        setUser(res.data);
                    })
                    .catch(() => {});
            };

            fetchApi();
        }
    }, [nickname, followed]);
    useEffect(() => {
        document.title = `TikTok - ${nickname}`;
    }, [nickname]);

    const handleOnHover = (e: any) => {
        e.target.play();
    };
    const handleOnLeave = (e: any) => {
        e.target.pause();
    };
    const handleFollow = () => {
        follow(user.id, currentUser.meta.token);
        setFollowed(!followed);
    };
    const handleUnFollow = () => {
        unFollow(user.id, currentUser.meta.token);
        setFollowed(!followed);
    };
    const handleClick = () => {
        dispatch(modalLogin(true));
        window.location.reload();
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
                        {currentUser ? (
                            <div>
                                {nickname === currentUser.data.nickname ? (
                                    <Button text className={cx('btn')}>
                                        Edit profile
                                    </Button>
                                ) : user.is_followed ? (
                                    <div className={cx('follow-btn')}>
                                        <Button outline className={cx('btn')}>
                                            Messenger
                                        </Button>

                                        <Tippy
                                            content='Unfollow'
                                            placement='bottom'
                                        >
                                            <button
                                                className={cx('unfollow')}
                                                onClick={handleUnFollow}
                                            >
                                                <span>
                                                    <UnFollowIcon />
                                                </span>
                                            </button>
                                        </Tippy>
                                    </div>
                                ) : (
                                    <Button
                                        primary
                                        className={cx('btn')}
                                        onClick={handleFollow}
                                    >
                                        Follow
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <Button
                                primary
                                className={cx('btn')}
                                onClick={handleClick}
                            >
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
                        user.videos.map((video: VideoType) => (
                            <div key={video.id} className={cx('video-box')}>
                                <video
                                    loop
                                    muted
                                    preload='auto'
                                    poster={video.thumb_url}
                                    className={cx('video')}
                                    onMouseOver={handleOnHover}
                                    onMouseLeave={handleOnLeave}
                                    onClick={
                                        currentUser
                                            ? () =>
                                                  navigate(
                                                      `/videos/${video.uuid}`
                                                  )
                                            : handleClick
                                    }
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
