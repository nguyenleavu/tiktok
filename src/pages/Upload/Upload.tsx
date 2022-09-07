import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button/Button';
import { MusicIcon } from '~/components/Icon/Icon';
import { postVideo } from '~/redux/apiRequest';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import Options from './Options';
import styles from './Upload.module.scss';

const cx = classNames.bind(styles);

type Props = {};

const Upload = (props: Props) => {
    const [file, setFile] = useState<any>('');
    const [checked, setChecked] = useState(true);
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [option, setOption] = useState('Public');
    const inputRef = useRef<any>();
    const videoRef = useRef<any>();

    const user = useAppSelector((state) => state.login.login?.user);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const changeHandler = (e: any) => {
        setFile(e.target.files[0]);
        setIsFilePicked(true);
    };

    const handleReset = () => {
        setFile('');
        setIsFilePicked(false);
    };

    const handleSubmit = () => {
        const post = {
            description: inputRef.current.value,
            upload_file: file,
            thumbnail_time: 1,
            music: 'Nhạc xinh quá',
            viewable: option.toLowerCase(),
            allows: ['comment', 'duet', 'stitch'],
        };
        postVideo(post, dispatch, user.meta.token, navigate);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2>Upload video</h2>
                <p className={cx('title-post')}>Post a video to your account</p>
                <div className={cx('content')}>
                    <div className={cx('up-video')}>
                        {isFilePicked ? (
                            <div className={cx('video-content')}>
                                <div className={cx('video-title')}>
                                    <span>Following</span>
                                    <span>For You</span>
                                </div>
                                <video
                                    autoPlay
                                    className={cx('video-picked')}
                                    src={URL.createObjectURL(file)}
                                />
                                <div className={cx('video-icon')}>
                                    <img src={user.data.avatar} alt='' />
                                    <img
                                        className={cx('img-icon')}
                                        src='https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/iconbar_right.8fa90e26.svg'
                                        alt=''
                                    />
                                    <div className={cx('img-music')}>
                                        <img src={user.data.avatar} alt='' />
                                    </div>
                                </div>
                                <div className={cx('user-info')}>
                                    <h4>{`@${user.data.first_name} ${user.data.last_name}`}</h4>
                                    <p>{file?.name}</p>
                                    <div className={cx('run-music')}>
                                        <span>
                                            <MusicIcon />
                                        </span>
                                        <div className={cx('run-music-title')}>
                                            <p
                                                className={cx('run')}
                                            >{`${user.data.first_name} ${user.data.last_name} original sound - ${user.data.first_name} ${user.data.last_name} original sound`}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={cx('select-video')}>
                                <img
                                    src='https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/cloud-icon1.ecf0bf2b.svg'
                                    alt=''
                                />
                                <p className='css-1q42136'>
                                    Select video to upload
                                </p>
                                <span className={cx('span1')}>
                                    Or drag and drop a file
                                </span>
                                <span className={cx('span2')}>MP4 or WebM</span>
                                <span className={cx('span2')}>
                                    720x1280 resolution or higher
                                </span>
                                <span className={cx('span2')}>
                                    Up to 10 minutes
                                </span>
                                <span className={cx('span3')}>
                                    Less than 2 GB
                                </span>
                                <Button primary className={cx('btn-select')}>
                                    Select file
                                </Button>
                                <input
                                    ref={videoRef}
                                    type='file'
                                    name='photo'
                                    id='upload-photo'
                                    onChange={changeHandler}
                                />
                            </div>
                        )}
                    </div>
                    <div className={cx('video-details')}>
                        <p>Caption</p>
                        <div className={cx('captions')}>
                            <input type='text' ref={inputRef} />
                        </div>
                        <Options option={option} setOption={setOption} />
                        <div className={cx('allows-users')}>
                            <p>Allow users to:</p>
                            <input
                                type='checkbox'
                                defaultChecked={checked}
                                onChange={() => setChecked(!checked)}
                            />
                            <span>Comment</span>
                            <input
                                type='checkbox'
                                defaultChecked={checked}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setChecked(!checked);
                                }}
                            />
                            <span>Duet</span>
                            <input
                                type='checkbox'
                                defaultChecked={checked}
                                onChange={() => setChecked(!checked)}
                            />
                            <span>Stitch</span>
                        </div>
                        <div className={cx('btns')}>
                            <button
                                className={cx('btn-discard')}
                                onClick={handleReset}
                            >
                                Discard
                            </button>
                            <button
                                disabled={!isFilePicked}
                                className={
                                    isFilePicked
                                        ? cx('btn-post')
                                        : cx('btn-disabled')
                                }
                                onClick={handleSubmit}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;
