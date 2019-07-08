import React from 'react';
import { HashRouter,BrowserRouter, Route,Switch } from 'react-router-dom';
import Loadable from "loadable-components";//异步加载组件模块
const Home = Loadable(()=> import("@/pages/home/home"))
const RouteConfig=(
    <HashRouter>
        <div>
            <Route path="/" exact component={Home} />
        </div>
    </HashRouter>
)
export default RouteConfig;