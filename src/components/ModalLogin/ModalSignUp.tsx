import classNames from 'classnames/bind';
import { useState } from 'react';
import { registerUser } from '~/redux/apiRequest';
import { useAppDispatch } from '~/redux/hooks';
import { CloseIcon, OffPassword, ShowPassword } from '../Icon/Icon';
import styles from './ModalLogin.module.scss';

const cx = classNames.bind(styles);

type Props = {
    onClose: any;
    setSignIn: any;
};

const ModalSignUp = ({ onClose, setSignIn }: Props) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [showPass, setShowPass] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const isValid = !(email && password);

    const handleSubmit = (
        e:
            | React.FormEvent<HTMLFormElement>
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        const user = {
            type: 'email',
            email,
            password,
        };
        registerUser(user, dispatch);
        setSignIn(true);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('btn')}>
                <button className={cx('btn-close')} onClick={onClose}>
                    <CloseIcon />
                </button>
            </div>
            <h1>Sign up</h1>
            <form className={cx('form')} onSubmit={handleSubmit}>
                <p>Email</p>
                <input
                    className={cx('input')}
                    value={email}
                    type='email'
                    placeholder='Enter address'
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
                    Sign up
                </button>
            </form>
            {error && (
                <p className={cx('error')}>That username is already in used</p>
            )}
            <p className={cx('link-to')}>
                Don’t have an account? <span onClick={setSignIn}>Sign in</span>
            </p>
        </div>
    );
};

export default ModalSignUp;
