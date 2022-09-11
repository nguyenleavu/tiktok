import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Video from '~/components/Video/Video';
import * as request from '~/utils/request';
import { useEffect, useState } from 'react';
import Image from '~/components/Image/Image';
import images from '~/assets/images';
import { useAppSelector } from '~/redux/hooks';

const cx = classNames.bind(styles);

type Props = {};

const Home = (props: Props) => {
    const [video, setVideo] = useState<any>([]);
    const [page, setPage] = useState<number>(1);

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
                        const data: any = [];
                        res.data.forEach((item: any) => data.push(item));
                        setVideo((prev: any) => [...prev, ...data]);
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
                        const data: any = [];
                        res.data.forEach((item: any) => data.push(item));
                        setVideo((prev: any) => [...prev, ...data]);
                    })
                    .catch(() => {});
            }
        };
        fetchApi();
        window.addEventListener('scroll', handleScroll);
        document.title='TikTok - Make Your Day'
    }, [page]);

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
                video.map((item: any, index: number) => (
                    <Video key={index} data={item} />
                ))}
        </div>
    );
};

export default Home;
