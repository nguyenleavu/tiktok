import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useElementOnScreen } from '~/hook';
import {
    MusicIcon,
    OffVolumeIcon,
    PlayIcon,
    StopIcon,
    VolumeIcon,
} from '../Icon/Icon';
import Image from '../Image/Image';
import styles from './Video.module.scss';

import ButtonVideo from './ButtonVideo';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { modalLogin } from '~/redux/modalLoginSlice';

const cx = classNames.bind(styles);

type Props = {
    data: any;
};

const Video = ({ data = [] }: Props) => {
    const videoRef = useRef<any>();
    const volumeRef = useRef<any>();

    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(true);
    const [offVolume, setOffVolume] = useState(false);

    const navigate = useNavigate();
    const user = useAppSelector((state) => state.login.login?.user);
    const dispatch = useAppDispatch();

    const handleVideos = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(false);
        } else {
            videoRef.current.play();
            setPlaying(true);
        }
    };
    //
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1,
    };
    const isVisibile = useElementOnScreen(options, videoRef);

    const handleScroll = () => {
        if (window.screenY >= 500) {
            setMuted(false);
            videoRef.current.play();
            setPlaying(true);
        }
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

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isVisibile]);

    useEffect(() => {
        if (isVisibile) {
            setMuted(false);
            videoRef.current.play();
            setPlaying(true);
        } else {
            videoRef.current.pause();
            setPlaying(false);
            setMuted(false);
        }
    }, [isVisibile]);

    const changeRange = (e: any) => {
        videoRef.current.volume = e.target.value / 100;
    };
    const handleClick = () => {
        dispatch(modalLogin(true));
        window.location.reload();
    };

    return (
        <div className={cx('wrapper-all')}>
            <div className={cx('wrapper')}>
                <Link to={`/@${data.user.nickname}`}>
                    <Image
                        className={cx('avatar')}
                        src={data.user.avatar}
                        alt={data.user.nickname}
                    />
                </Link>
                <div className={cx('content')}>
                    <div className={cx('info')}>
                        <Link to={`/@${data.user.nickname}`}>
                            <h3>{data.user.nickname}</h3>
                        </Link>
                        <h4>{`${data.user.first_name} ${data.user.last_name}`}</h4>
                    </div>
                    <div className={cx('description')}>
                        <p className={cx('caption')}>{data.description}</p>
                        <p className={cx('music-name')}>
                            <span>
                                <MusicIcon />
                            </span>
                            <strong>{data.music}</strong>
                        </p>
                    </div>
                </div>
            </div>
            <div className={cx('video-item')}>
                <div className={cx('video-box')}>
                    <video
                        loop
                        muted={muted}
                        preload='auto'
                        ref={videoRef}
                        className={cx('video')}
                        poster={data.thumb_url || 0}
                        onClick={handleVideos}
                        onDoubleClick={
                            user
                                ? () => navigate(`/videos/${data.uuid}`)
                                : handleClick
                        }
                    >
                        <source src={data.file_url} type='video/mp4' />
                    </video>
                    <div className={cx('controls')}>
                        <button
                            onClick={handleVideos}
                            className={cx('btn-play-stop')}
                        >
                            {playing ? <PlayIcon /> : <StopIcon />}
                        </button>
                        <div className={cx('volume-wrapper')}>
                            <div className={cx('volume')}>
                                <input
                                    className={cx('range')}
                                    type='range'
                                    min='1'
                                    max='100'
                                    ref={volumeRef}
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
                </div>
                <ButtonVideo data={data} />
            </div>
        </div>
    );
};

export default Video;
