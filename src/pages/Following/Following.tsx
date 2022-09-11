import { useEffect, useState } from 'react';
import Video from '~/components/Video/Video';
import * as request from '~/utils/request';
import styles from './Following.module.scss';
import classNames from 'classnames/bind';
import { useAppSelector } from '~/redux/hooks';
import SuggestedList from './SuggestedList';

const cx = classNames.bind(styles);

const Following = () => {
    const [video, setVideo] = useState<any>([]);
    const [page, setPage] = useState<number>(1);

    const user = useAppSelector((state) => state.login.login?.user);

    const fetchApi = async () => {
        if (user) {
            request
                .get('videos', {
                    params: {
                        type: 'following',
                        page: page,
                    },
                    headers: { Authorization: `Bearer ${user.meta.token}` },
                })
                .then((res) => {
                    const data: any = [];
                    res.data.forEach((item: any) => data.push(item));
                    setVideo((prev: any) => [...prev, ...data]);
                })
                .catch(() => {});
        }
    };

    const handleScroll = (e: any) => {
        if (
            window.innerHeight + e.target.documentElement.scrollTop + 1 >=
            e.target.documentElement.scrollHeight
        ) {
            setPage(page + 1);
        }
    };
    useEffect(() => {
        fetchApi();
        window.addEventListener('scroll', handleScroll);
    }, [page]);

    return (
        <div className={cx('wrapper')}>
            {user ? (
                <div>
                    {video &&
                        video.map((item: any) => (
                            <Video key={item.id} data={item} />
                        ))}
                </div>
            ) : (
                <SuggestedList />
            )}
        </div>
    );
};

export default Following;
