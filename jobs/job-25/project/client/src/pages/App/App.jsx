import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { Coins, History } from '../';

const App = () => {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={Coins} />
                <Route path="/coins" exact component={Coins} />
                <Route path="/history/:id" exact component={History} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
};

export default App;