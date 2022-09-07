import { MusicIcon, TagIcon } from '../Icon/Icon';
import classNames from 'classnames/bind';
import styles from './Discover.module.scss';

const cx = classNames.bind(styles);

const Discover = () => {
    const fakeData: any = [
        { icon: <TagIcon />, title: 'suthatla' },
        { icon: <TagIcon />, title: 'mackedoi' },
        { icon: <TagIcon />, title: 'sansangthaydoi' },
        {
            icon: <MusicIcon />,
            title: 'Về Nghe Mẹ Ru - NSND Bach Tuyet &amp; Hứa Kim Tuyền &amp; 14 Casper &amp; Hoàng Dũng',
        },
        {
            icon: <MusicIcon />,
            title: 'Yêu Đơn Phương Là Gì (MEE Remix) - Mee Media &amp; h0n',
        },
        {
            icon: <MusicIcon />,
            title: 'Thiên Thần Tình Yêu - RICKY STAR',
        },
        { icon: <TagIcon />, title: '7749hieuung' },
        { icon: <TagIcon />, title: 'genzlife' },
        {
            icon: <MusicIcon />,
            title: 'Tình Đã Đầy Một Tim - Huyền Tâm Môn',
        },
        {
            icon: <MusicIcon />,
            title: 'Thằng Hầu (Thái Hoàng Remix) [Short Version] - Dunghoangpham',
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <h3>Discover</h3>
            <div className={cx('content')}>
                {fakeData.map((item: any, index: number) => (
                    <p key={index}>
                        <span>{item.icon}</span>
                        <strong>{item.title}</strong>
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Discover;
