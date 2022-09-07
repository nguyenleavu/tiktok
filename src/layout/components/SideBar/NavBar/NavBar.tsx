import React from 'react';

type Props = {
    children: React.ReactNode;
};

const NavBar = ({ children }: Props) => {
    return <nav>{children}</nav>;
};

export default NavBar;
