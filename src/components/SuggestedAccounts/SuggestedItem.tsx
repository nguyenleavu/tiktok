import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import Button from '../Button/Button';
import { CheckIcon } from '../Icon/Icon';
import Image from '../Image/Image';
import { Wrapper } from '../Popper';
import styles from './SuggestedAccounts.module.scss';

const cx = classNames.bind(styles);

export type suggestedProps = {
    avatar: string;
    tick: boolean;
    name: string;
    nickname: string;
    likes: number;
    follower: number;
    small?: boolean;
};

const SuggestedItem = ({
    avatar,
    tick,
    nickname,
    name,
    follower,
    likes,
    small,
}: suggestedProps) => {
    return (
        <div className={cx('box')}>
            <Tippy
                interactive
                delay={[800, 0]}
                offset={[-8, 0]}
                placement='bottom'
                render={(attrs) => (
                    <div tabIndex={-1} {...attrs}>
                        <Wrapper>
                            <div className={cx('preview')}>
                                <header className={cx('preview-header')}>
                                    <Image
                                        className={cx('preview-avatar')}
                                        src={avatar}
                                        alt={nickname}
                                    />
                                    <Button primary>Follow</Button>
                                </header>
                                <section className={cx('preview-info')}>
                                    <p className={cx('preview-nickname')}>
                                        <strong>{nickname}</strong>
                                        {tick && (
                                            <span>
                                                <CheckIcon />
                                            </span>
                                        )}
                                    </p>
                                    <span className={cx('preview-name')}>
                                        {name}
                                    </span>
                                    <p className={cx('preview-popular')}>
                                        <strong>{follower}</strong>
                                        <span>Followers</span>
                                        <strong>{likes}</strong>
                                        <span>Likes</span>
                                    </p>
                                </section>
                            </div>
                        </Wrapper>
                    </div>
                )}
            >
                <div className={cx('account-item')}>
                    <Image
                        className={cx('avatar')}
                        src={avatar}
                        alt={nickname}
                    />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>{nickname}</strong>
                            {tick && (
                                <span>
                                    <CheckIcon />
                                </span>
                            )}
                        </p>
                        <span className={cx('name')}>{name}</span>
                    </div>
                </div>
            </Tippy>
        </div>
    );
};

export default SuggestedItem;
