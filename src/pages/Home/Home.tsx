import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Video from '~/components/Video/Video';
import { useAppSelector } from '~/redux/hooks';
import * as request from '~/utils/request';
import styles from './Home.module.scss';
import { VideoType } from '~/config/@type/type';
import InfiniteScroll from 'react-infinite-scroll-component';

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
                        setVideo((prev: VideoType[]) => [...prev, ...res.data]);
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
                        setVideo((prev: VideoType[]) => [...prev, ...res.data]);
                    })
                    .catch(() => {});
            }
        };
        fetchApi();
        document.title = 'TikTok - Make Your Day';
    }, [page, like]);

    return (
        <div className={cx('wrapper')}>
            <InfiniteScroll
                dataLength={video.length}
                next={() => setPage(page + 1)}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                {video &&
                    video.map((item: VideoType, index: number) => (
                        <Video
                            key={index}
                            data={item}
                            liked={() => setLike(!like)}
                        />
                    ))}
            </InfiniteScroll>
        </div>
    );
};

export default Home;
