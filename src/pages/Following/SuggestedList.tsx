import { useEffect, useRef, useState } from 'react';
import * as request from '~/utils/request';
import styles from './Following.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button/Button';
import Image from '~/components/Image/Image';


const cx = classNames.bind(styles);

type Props = {};

const SuggestedList = (props: Props) => {
    const [suggested, setSuggested] = useState<any>([]);
    const [page, setPage] = useState<number>(1);


    const fetchApi = async () => {
        request
            .get('users/suggested', {
                params: {
                    page: page,
                    per_page: '12',
                },
            })
            .then((res) => {
                const data: any = [];
                res.data.forEach((item: any) => data.push(item));
                setSuggested((prev: any) => [...prev, ...data]);
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

    const handleOnHover = (e: any) => {
        e.target.play();
    };
    const handleOnLeave = (e: any) => {
        e.target.pause();
    };

    const handleClick = () => {
        
    };

    return (
        <div className={cx('wrapper-suggested')}>
            {suggested.map((item: any) => (
                <div key={item.popular_video.id} className={cx('container')}>
                    <video
                        id='video'
                        loop
                        muted
                        preload='auto'
                        className={cx('video')}
                        poster={item.popular_video.thumb_url || 0}
                        onMouseOver={handleOnHover}
                        onMouseLeave={handleOnLeave}
                    >
                        <source
                            src={item.popular_video.file_url}
                            type='video/mp4'
                        />
                    </video>
                    <div className={cx('content')}>
                        <Image src={item.avatar} alt={item.nickname} />
                        <h3>{`${item.first_name} ${item.last_name}`}</h3>
                        <p>{item.nickname}</p>
                        <Button
                            primary
                            className={cx('btn')}
                            onClick={handleClick}
                        >
                            Following
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SuggestedList;
