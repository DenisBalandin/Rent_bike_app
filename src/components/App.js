import React from "react";
import Home from './Home';
import Cart from './Cart';
import Product from './Product';
import {BrowserRouter as Router,Route, Link} from 'react-router-dom';

const App = () =>(
    <>
        <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={Cart}/>
        <Route exact path="/product/:id" component={Product}/>
        {/* <Route exact path="/cart" component={Cart}/> */}
        {/* <Route exact path="/pageitem/:itemid" component={ItemPage} /> */}
        </Router>
    </>
);

export default App;