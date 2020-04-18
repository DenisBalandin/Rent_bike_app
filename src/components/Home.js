import React,{Component} from 'react';
import Bike from "./Bike";
import {BrowserRouter as Router,Route, Link} from 'react-router-dom';

class Home extends Component{
    render(){
        return(
            <div>
            
                <Bike/>
                {/* <div>
                    <Cart />
                </div> */}
                {/* <div>
                    <h2>Articles</h2>
                    <List />
                </div>
                <div>
                    <h2>Add a new article</h2>
                    <Form/>
                </div> */}
            </div>
        );
    }
}
export default Home;