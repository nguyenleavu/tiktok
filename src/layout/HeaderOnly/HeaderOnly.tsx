import Header from '../components/Header/Header';

type Props = {
    children: JSX.Element;
};

const HeaderOnly = ({ children }: Props) => {
    return (
        <div>
            <Header small />
            <div style={{ marginTop: '60px' }}>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default HeaderOnly;
