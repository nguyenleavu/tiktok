import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as request from '~/utils/request';
import styles from './SuggestedAccounts.module.scss';
import SuggestedItem from './SuggestedItem';

const cx = classNames.bind(styles);

type Props = {
    label: string;
};

const SuggestedAccounts = ({ label}: Props) => {
    const [suggestedAccounts, setSuggestedAccounts] = useState<any>([]);
    const [showMore, setShowMore] = useState<number>(5);
    const [showLess, setShowLess] = useState(false);

    useEffect(() => {
        if (label === 'Suggested accounts') {
            const fetchApi = async () => {
                request
                    .get('users/suggested', {
                        params: {
                            page: 1,
                            per_page: showMore,
                        },
                    })
                    .then((res) => {
                        setSuggestedAccounts(res.data);
                    })
                    .catch(() => {});
            };
            fetchApi();
        } else if (label === 'Following accounts') {
            setSuggestedAccounts([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showMore]);

    const handleShowItems = () => {
        if (showLess) {
            setShowMore(5);
            setShowLess(false);
        } else {
            setShowMore((prev) => prev + 15);
            setShowLess(true);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            {suggestedAccounts.map((item: any) => (
                <Link to={`/@${item.nickname}`} key={item.id}>
                    <SuggestedItem
                        avatar={item.avatar}
                        tick={item.tick}
                        name={`${item.first_name} ${item.last_name}`}
                        nickname={item.nickname}
                        likes={item.likes_count}
                        follower={item.followers_count}
                    />
                </Link>
            ))}

            {showLess ? (
                <p className={cx('more-item')} onClick={handleShowItems}>
                    See less
                </p>
            ) : (
                <p className={cx('more-item')} onClick={handleShowItems}>
                    See all
                </p>
            )}
        </div>
    );
};

export default SuggestedAccounts;
