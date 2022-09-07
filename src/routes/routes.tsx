import { HeaderOnly, FullView } from '~/layout';

import config from '~/config';

import Home from '~/pages/Home/Home';
import Following from '~/pages/Following/Following';
import Upload from '~/pages/Upload/Upload';
import Profile from '~/pages/Profile/Profile';
import Live from '~/pages/Live/Live';

const publicRoutes: any = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.profile, component: Profile, layout: FullView },
    { path: config.routes.live, component: Live },
];

const privateRoutes: any = [];

export { publicRoutes, privateRoutes };
