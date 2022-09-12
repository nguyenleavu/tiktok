import classNames from 'classnames/bind';
import { useState } from 'react';
import { CloseIcon, EditProfileIcon } from '~/components/Icon/Icon';
import Image from '~/components/Image/Image';
import { UserType } from '~/config/@type/type';
import { useAppSelector } from '~/redux/hooks';
import styles from './Profile.module.scss';
import * as request from '~/utils/request';
const cx = classNames.bind(styles);

type Props = {
    onClose: () => void;
    user: UserType;
};

const EditProfile = ({ user, onClose }: Props) => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [file, setFile] = useState<any>('');

    const isValid = !(username !== '' || name !== '' || bio !== '');
    const currentUser = useAppSelector((state) => state.login.login?.user);

    const handleInputFile = (e: any) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = () => {
        const data = {
            avatar: file,
            bio: bio,
            first_name: username,
            last_name: name,
        };
        request.post('auth/me?_method=PATCH', data, {
            headers: {
                'Content-Type': file.type,
                Authorization: `Bearer ${currentUser.meta.token}`,
            },
        });
        onClose();
    };

    return (
        <div className={cx('wrapper-edit')}>
            <div className={cx('edit-title')}>
                <p>Edit profile</p>
                <button onClick={onClose}>
                    <CloseIcon />
                </button>
            </div>
            <div className={cx('edit-profile')}>
                <p className={cx('edit-p')}>Profile photo</p>
                <div className={cx('edit-img')}>
                    {file ? (
                        <Image src={URL.createObjectURL(file)} alt='' />
                    ) : (
                        <Image src={user.avatar} alt='' />
                    )}
                    <button className={cx('edit-btn')}>
                        <EditProfileIcon />
                        <input
                            className={cx('edit-file')}
                            type='file'
                            onChange={handleInputFile}
                        />
                    </button>
                </div>
            </div>
            <div className={cx('edit-profile')}>
                <p className={cx('edit-p')}>Username</p>
                <div>
                    <input
                        className={cx('edit-input')}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <p className={cx('edit-details')}>
                        www.tiktok.com/{user.nickname}
                    </p>
                    <p className={cx('edit-details')}>
                        Usernames can only contain letters, numbers,
                        underscores, and periods. Changing your username will
                        also change your profile link.
                    </p>
                </div>
            </div>
            <div className={cx('edit-profile')}>
                <p className={cx('edit-p')}>Name</p>
                <input
                    className={cx('edit-input')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className={cx('edit-profile')}>
                <p className={cx('edit-p')}>Bio</p>
                <textarea
                    name='body'
                    className={cx('edit-bio')}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
            </div>
            <div className={cx('edit-button')}>
                <button className={cx('edit-button-close')} onClick={onClose}>
                    Cancel
                </button>
                <button
                    disabled={isValid}
                    className={
                        isValid
                            ? cx('edit-button-save-disabled')
                            : cx('edit-button-save')
                    }
                    onClick={handleSubmit}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditProfile;
