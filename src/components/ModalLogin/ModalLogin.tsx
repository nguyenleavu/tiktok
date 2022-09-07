import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '~/redux/apiRequest';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { CloseIcon, OffPassword, ShowPassword } from '../Icon/Icon';
import styles from './ModalLogin.module.scss';
import ModalSignUp from './ModalSignUp';

const cx = classNames.bind(styles);

type Props = {
    onClose: any;
};

const ModalLogin = ({ onClose }: Props) => {
    const [signIn, setSignIn] = useState(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPass, setShowPass] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isValid = !(email && password);
    const error = useAppSelector((state) => state.login.login?.error);

    const handleSubmit = (
        e:
            | React.FormEvent<HTMLFormElement>
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        const user = {
            email,
            password,
        };
        loginUser(user, dispatch, navigate, (onClose = onClose));
    };

    return (
        <>
            {signIn ? (
                <div className={cx('wrapper')}>
                    <div className={cx('btn')}>
                        <button className={cx('btn-close')} onClick={onClose}>
                            <CloseIcon />
                        </button>
                    </div>
                    <h1>Log in</h1>
                    <form className={cx('form')} onSubmit={handleSubmit}>
                        <p>Email or username</p>
                        <input
                            className={cx('input')}
                            value={email}
                            type='email'
                            placeholder='Email or username'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className={cx('password')}>
                            <input
                                value={password}
                                type={showPass ? 'text' : 'password'}
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowPass(!showPass);
                                }}
                                className={cx('show-password')}
                            >
                                {showPass ? (
                                    <span>
                                        <OffPassword />
                                    </span>
                                ) : (
                                    <span>
                                        <ShowPassword />
                                    </span>
                                )}
                            </button>
                        </div>

                        <button
                            type='submit'
                            disabled={isValid}
                            className={
                                isValid
                                    ? cx('submit-button-disabled')
                                    : cx('submit-button')
                            }
                        >
                            Log in
                        </button>
                    </form>
                    {error && (
                        <p className={cx('error')}>
                            Invalid account or password
                        </p>
                    )}
                    <p className={cx('link-to')}>
                        Don’t have an account?{' '}
                        <span onClick={() => setSignIn(false)}>Sign up</span>
                    </p>
                </div>
            ) : (
                <ModalSignUp
                    onClose={onClose}
                    setSignIn={() => setSignIn(true)}
                />
            )}
        </>
    );
};

export default ModalLogin;
