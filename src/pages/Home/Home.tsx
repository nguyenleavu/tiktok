import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Video from '~/components/Video/Video';
import * as request from '~/utils/request';
import { useEffect, useState } from 'react';
import Image from '~/components/Image/Image';
import images from '~/assets/images';

const cx = classNames.bind(styles);

type Props = {};

const Home = (props: Props) => {
    const [video, setVideo] = useState<any>([]);
    const [page, setPage] = useState<number>(1);
    const [modal, setModal] = useState(true);

    const fetchApi = async () => {
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
            {modal && (
                <>
                    <div className={cx('quang-cao')}>
                        <div className={cx('quang-cao-content')}>
                            <button
                                onClick={(e) => {
                                    setModal(false);
                                }}
                            >
                                X
                            </button>
                            <h2>Sorry !</h2>
                            <span>
                                Vì trình duyệt không cho âm thanh với autoplay
                                của video chạy chung với nhau khi vào trang
                            </span>
                            <span>
                                Nên mình làm cái này để fix cái bug đó, hơi khó
                                chịu xíu mòng bạn thông cảm!
                            </span>
                            <Image src={images.sorryImg} alt='' />
                        </div>
                    </div>
                </>
            )}
            {video &&
                video.map((item: any) => (
                    <Video
                        key={item.id}
                        data={item}
                    />
                ))}
        </div>
    );
};

export default Home;
