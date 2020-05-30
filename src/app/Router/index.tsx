import React, {lazy, Suspense} from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from 'app/Router/NotFound';
import Loading from 'app/Router/Loading';
import Login from 'app/Login';
import Register from 'app/Register';

const ChatApp = lazy(() => import('app/ChatApp'));

export default () => (
    <Suspense fallback={<Loading />}>
        <Switch>
            <Route exact path='/' component={ChatApp} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route component={NotFound} />
        </Switch>
    </Suspense>
);
