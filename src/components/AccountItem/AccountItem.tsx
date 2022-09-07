import styles from './AccountItem.module.scss';
import classNames from 'classnames/bind';
import { CheckIcon } from '../Icon/Icon';
import Image from '../Image/Image';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

export type dataProps = {
    avatar: string;
    bio?: string;
    created_at?: string;
    facebook_url?: string;
    first_name: string;
    followers_count?: number;
    followings_count?: number;
    full_name: string;
    id?: number;
    instagram_url?: string;
    last_name: string;
    likes_count?: number;
    nickname: string;
    tick: boolean;
    twitter_url?: string;
    updated_at?: string;
    website_url?: string;
    youtube_url?: string;
};

export type Props = {
    data: any;
    setSearchResult: React.Dispatch<React.SetStateAction<dataProps[]>>;
};

const AccountItem = ({ data, setSearchResult }: Props) => {
    return (
        <Link
            to={`/@${data.nickname}`}
            className={cx('wrapper')}
            onClick={() => setSearchResult([])}
        >
            <Image
                className={cx('avatar')}
                src={data.avatar}
                alt={data.full_name}
            />
            <div className={cx('info')}>
                <h4 className={cx('user-name')}>
                    {data.nickname}
                    {data.tick && (
                        <span>
                            <CheckIcon />
                        </span>
                    )}
                </h4>
                <span
                    className={cx('name')}
                >{`${data.first_name} ${data.last_name}`}</span>
            </div>
        </Link>
    );
};

export default AccountItem;
