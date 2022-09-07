import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/routes';
import { DefaultLayout } from '~/layout';
import { Fragment } from 'react';

function App() {
    return (
        <BrowserRouter>
            <div className='App'>
                <Routes>
                    {publicRoutes.map((route: any, index: number) => {
                        const Page = route.component;

                        let Layout: any = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
