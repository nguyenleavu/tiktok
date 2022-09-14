import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import {
    DeleteIcon,
    EditComment,
    HeartCmtIcon,
    HeartIcon,
} from '~/components/Icon/Icon';
import Image from '~/components/Image/Image';
import { Wrapper } from '~/components/Popper';
import { useAppSelector } from '~/redux/hooks';
import * as request from '~/utils/request';
import styles from './FullVideo.module.scss';

const cx = classNames.bind(styles);

type Props = {
    id: number;
    cmt?: boolean;

};

const Comments = ({ id, cmt }: Props) => {
    const [comments, setComments] = useState<any>([]);
    const [like, setLike] = useState(false);

    const user = useAppSelector((state) => state.login.login?.user);

    useEffect(() => {
        if (id) {
            request
                .get(`videos/${id}/comments`, {
                    headers: { Authorization: `Bearer ${user.meta.token}` },
                })
                .then((res) => setComments(res.data));
        }
    }, [id, cmt, like]);

    const handleLikeComment = (id: any, liked: boolean) => {
        if (liked) {
            request.post(`comments/${id}/unlike`, id, {
                headers: { Authorization: `Bearer ${user.meta.token}` },
            });
            setLike(!like);
        } else {
            request.post(`comments/${id}/like`, id, {
                headers: { Authorization: `Bearer ${user.meta.token}` },
            });
            setLike(!like);
        }
    };

    const handleDeleteComments = (id: number) => {
        request.del(`comments/${id}`, {
            headers: { Authorization: `Bearer ${user.meta.token}` },
        });
        setLike(!like);

    };

    return comments.map((comment: any) => (
        <div key={comment.id} className={cx('comment-container')}>
            <Image src={comment.user.avatar} alt={comment.user.nickname} />
            <div className={cx('comment-content')}>
                <h4>{comment.user.nickname}</h4>
                <p>{comment.comment}</p>
                <span>{comment.created_at.slice(10, 16)}</span>
            </div>
            <div className={cx('comment-like')}>
                <div>
                    <Tippy
                        interactive
                        placement='bottom'
                        delay={[0, 500]}
                        offset={[-80, 10]}
                        hideOnClick={false}
                        render={(attrs) => (
                            <div tabIndex={-1} {...attrs}>
                                <Wrapper>
                                    <div
                                        className={cx('delete-btn')}
                                        onClick={() =>
                                            handleDeleteComments(comment.id)
                                        }
                                    >
                                        <span>
                                            <DeleteIcon />
                                        </span>
                                        <strong>Delete</strong>
                                    </div>
                                </Wrapper>
                            </div>
                        )}
                    >
                        <button className={cx('edit-btn')}>
                            <EditComment />
                        </button>
                    </Tippy>
                </div>
                <div className={cx('comment-like-box')}>
                    <button
                        className={cx('like-comments-btn')}
                        onClick={(id: any) =>
                            handleLikeComment(comment.id, comment.is_liked)
                        }
                    >
                        {comment.is_liked ? (
                            <span>
                                <HeartIcon />
                            </span>
                        ) : (
                            <HeartCmtIcon />
                        )}
                    </button>
                    <span>{comment.likes_count}</span>
                </div>
            </div>
        </div>
    ));
};

export default Comments;
