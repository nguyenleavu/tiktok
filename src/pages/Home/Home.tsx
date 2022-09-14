import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Video from '~/components/Video/Video';
import { useAppSelector } from '~/redux/hooks';
import * as request from '~/utils/request';
import styles from './Home.module.scss';
import { VideoType } from '~/config/@type/type';

const cx = classNames.bind(styles);

type Props = {};
const PAGE = 1;

const Home = (props: Props) => {
    const [video, setVideo] = useState<VideoType[]>([]);
    const [page, setPage] = useState<number>(PAGE);
    const [like, setLike] = useState(false);

    const user = useAppSelector((state) => state.login.login?.user);
    useEffect(() => {
        const fetchApi = async () => {
            if (user) {
                request
                    .get('videos', {
                        params: {
                            type: 'for-you',
                            page: page,
                        },
                        headers: {
                            Authorization: `Bearer ${user.meta.token}`,
                        },
                    })
                    .then((res) => {
                        const data: VideoType[] = [];
                        res.data.forEach((item: VideoType) => data.push(item));
                        setVideo((prev: VideoType[]) => [...prev, ...data]);
                    })
                    .catch(() => {});
            } else {
                request
                    .get('videos', {
                        params: {
                            type: 'for-you',
                            page: page,
                        },
                    })
                    .then((res) => {
                        const data: VideoType[] = [];
                        res.data.forEach((item: VideoType) => data.push(item));
                        setVideo((prev: VideoType[]) => [...prev, ...data]);
                    })
                    .catch(() => {});
            }
        };
        fetchApi();
        window.addEventListener('scroll', (e) => handleScroll(e));
        document.title = 'TikTok - Make Your Day';
    }, [page, like]);

    const handleScroll = (e: any) => {
        if (
            window.innerHeight + e.target.documentElement.scrollTop + 1 >=
            e.target.documentElement.scrollHeight
        ) {
            setPage(page + 1);
        }
    };

    return (
        <div className={cx('wrapper')}>
            {video &&
                video.map((item: VideoType, index: number) => (
                    <Video
                        key={index}
                        data={item}
                        liked={() => setLike(!like)}
                    />
                ))}
        </div>
    );
};

export default Home;
