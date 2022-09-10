import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '~/components/Button/Button';
import {
    CloseIcon,
    CMTIcon,
    HeartIcon,
    MusicIcon,
    OffVolumeIcon,
    ShareIcon,

    VolumeIcon
} from '~/components/Icon/Icon';
import Image from '~/components/Image/Image';
import { useAppSelector } from '~/redux/hooks';
import * as request from '~/utils/request';
import Comments from './Comments';
import styles from './FullVideo.module.scss';

const cx = classNames.bind(styles);
type Props = {};

const FullVideo = (props: Props) => {
    const [video, setVideo] = useState<any>([]);
    const [playing, setPlaying] = useState(false);
    const [textInput, setTextInput] = useState<string>('');
    const [cmt, setCmt] = useState(false);
    const [offVolume, setOffVolume] = useState(false);

    const inputRef = useRef<any>();
    const videoRef = useRef<any>();
    const volumeRef = useRef<any>();

    const { uuid } = useParams();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.login.login?.user);

    useEffect(() => {
        const fetchApi = async () => {
            await request
                .get(`videos/${uuid}`)
                .then((res) => setVideo(res.data));
        };
        fetchApi();
    }, [cmt]);

    const handleVideos = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(false);
        } else {
            videoRef.current.play();
            setPlaying(true);
        }
    };

    const handleComments = () => {
        const commentPost = {
            comment: textInput,
        };
        request.post(`videos/${uuid}/comments`, commentPost, {
            headers: { Authorization: `Bearer ${user.meta.token}` },
        });
        setCmt(!cmt);
        setTextInput('');
        inputRef.current.focus();
    };

    const handleLike = () => {
        if (video.is_liked) {
            request.post(`videos/${video.id}/unlike`, uuid, {
                headers: { Authorization: `Bearer ${user.meta.token}` },
            });
        } else {
            request.post(`videos/${video.id}/like`, uuid, {
                headers: { Authorization: `Bearer ${user.meta.token}` },
            });
        }
        setCmt(!cmt);
    };

    useEffect(() => {
        if (offVolume) {
            videoRef.current.volume = 0;
            volumeRef.current.value = 0;
        } else {
            videoRef.current.volume = 1;
            volumeRef.current.value = 100;
        }
    }, [offVolume]);

    const changeRange = (e: any) => {
        videoRef.current.volume = e.target.value / 100;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div
                    className={cx('blur')}
                    style={{ backgroundImage: `url(${video.thumb_url})` }}
                ></div>
                <button className={cx('btn')} onClick={() => navigate(-1)}>
                    <CloseIcon />
                </button>
                <video
                    className={cx('video')}
                    loop
                    preload='auto'
                    ref={videoRef}
                    poster={video.thumb_url}
                    autoPlay
                    onClick={handleVideos}
                    src={video.file_url}
                />
                <div className={cx('volume-wrapper')}>
                    <div className={cx('volume')}>
                        <input
                            className={cx('range')}
                            type='range'
                            ref={volumeRef}
                            defaultValue='100'
                            onChange={changeRange}
                        />
                    </div>
                    <button
                        className={cx('volume-icon')}
                        onClick={() => setOffVolume(!offVolume)}
                    >
                        {offVolume ? <OffVolumeIcon /> : <VolumeIcon />}
                    </button>
                </div>
            </div>
            <div className={cx('info')}>
                <div className={cx('info-user')}>
                    {video.user && (
                        <>
                            <div className={cx('user')}>
                                <Link to={`/@${video.user.nickname}`}>
                                    <Image
                                        src={video.user.avatar}
                                        alt={video.user.nickname}
                                    />
                                </Link>
                                <div className={cx('user-preview')}>
                                    <Link to={`/@${video.user.nickname}`}>
                                        <h4>{video.user.nickname}</h4>
                                    </Link>
                                    <p>
                                        {`${video.user.first_name} ${video.user.last_name} `}
                                        <span>
                                            {'. '}
                                            {video.created_at.slice(10, 16)}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <Button outline>Follow</Button>
                        </>
                    )}
                </div>
                {video.user && (
                    <div className={cx('caption-place')}>
                        <p className={cx('caption')}>{video.description}</p>
                        <span className={cx('music')}>
                            <MusicIcon />{' '}
                            <strong>
                                {video.music ||
                                    `original sound - ${video.user.nickname}`}
                            </strong>
                        </span>
                        <div className={cx('subscriber')}>
                            <div className={cx('btn-subscriber')}>
                                <div className={cx('like-cmt')}>
                                    <button
                                        className={
                                            video.is_liked
                                                ? cx('like-btn')
                                                : cx('unlike-btn')
                                        }
                                        onClick={handleLike}
                                    >
                                        <HeartIcon />
                                    </button>
                                    <strong>{video.likes_count}</strong>
                                    <button>
                                        <CMTIcon />
                                    </button>
                                    <strong>{video.comments_count}</strong>
                                </div>
                                <button className={cx('share')}>
                                    <ShareIcon />
                                </button>
                            </div>
                            <div className={cx('link')}>
                                <p>{video.user.website_url}</p>
                                <button>Copy link</button>
                            </div>
                        </div>
                    </div>
                )}
                <div className={cx('comments')}>
                    <Comments id={video.id} cmt={cmt} />
                </div>
                <div className={cx('input-cmt')}>
                    <input
                        placeholder='Add a comment...'
                        value={textInput}
                        ref={inputRef}
                        onChange={(e) => setTextInput(e.target.value)}
                    />
                    <button
                        className={
                            textInput.length < 1
                                ? cx('disabled')
                                : cx('no-disabled')
                        }
                        disabled={textInput.length < 1}
                        onClick={handleComments}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FullVideo;
