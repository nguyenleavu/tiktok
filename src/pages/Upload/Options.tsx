import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { SelectIcon } from '~/components/Icon/Icon';
import styles from './Upload.module.scss';

const cx = classNames.bind(styles);
type Props = {
    option: string;
    setOption: React.Dispatch<React.SetStateAction<string>>;
};
const Options = ({ option, setOption }: Props) => {
    return (
        <div className={cx('options')}>
            <p>Who can view this video</p>
            <Tippy
                placement='bottom'
                offset={[0, 8]}
                trigger='click'
                interactive
                render={(attrs) => (
                    <div className={cx('choose')} tabIndex={-1} {...attrs}>
                        <span
                            className={
                                option === 'Followers' ? cx('active') : ''
                            }
                            onClick={() => setOption('Public')}
                        >
                            Public
                        </span>
                        <span
                            className={option === 'Friends' ? cx('active') : ''}
                            onClick={() => setOption('Friends')}
                        >
                            Friends
                        </span>
                        <span
                            className={option === 'Private' ? cx('active') : ''}
                            onClick={() => setOption('Private')}
                        >
                            Private
                        </span>
                    </div>
                )}
            >
                <p className={cx('title')}>
                    {option}
                    <span>
                        <SelectIcon />
                    </span>
                </p>
            </Tippy>
        </div>
    );
};

export default Options;
