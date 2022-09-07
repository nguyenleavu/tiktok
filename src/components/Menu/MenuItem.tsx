import Button from '../Button/Button';
import { itemProps } from './Menu';
import styles from './Menu.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type Props = {
    data: itemProps;
    onClick?: any;
};

const MenuItem = ({ data, onClick }: Props) => {
    const classes = cx('menu-item', { separate: data.separate });
    return (
        <Button
            className={classes}
            leftIcon={data.icon}
            to={data.to}
            onClick={onClick}
        >
            {data.title}
        </Button>
    );
};

export default MenuItem;
