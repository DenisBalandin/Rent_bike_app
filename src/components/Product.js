import React,{Component} from 'react';
import SearchResults from 'react-filter-search';
import {connect} from "react-redux";
import {addTitle} from "../actions/index";
import {cartItems} from "../actions/index";
import {changeItems} from "../actions/index";
import {fullPrace} from "../actions/index";
import {BrowserRouter as Router,Route, Link} from 'react-router-dom';

class Product extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }
    componentWillMount(){
        this.getAllItems();
    }
    getAllItems = () =>{
        const id = this.props.match.params.id; 
        console.log(id);
        var url = `http://bikeshop/public/getitem/${id}`;
        fetch(url)
        .then(response=>response.json())
        .then(data=>
            this.setState({
                data: data
            })
        );
    }
    render(){
        console.log(this.state.data);
        return(
            <>
                <div id="category_block_bg">
                    <div className="category_block">
                        <Link to={`/`}>
                            <div className="go_back">
                                Go back
                            </div>
                        </Link>
                        <div className="cart">
                       
                            <div className="total_price">
                            <span>TOTAL </span> <p> {this.props.price}</p>
                            </div>
                            <Link to={`/cart`}>
                            <div className="check_out_button">
                                CHECK OUT 
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div id="product_page">
                    <h1>{this.state.data.name}</h1>
                    <div className="product_page_content">
                        <div className="product_image">
                            <img src={this.state.data.image}/>
                        </div>
                        <div className="product_text">
                            <div>Price {this.state.data.price}</div>
                            <div>Type {this.state.data.product_type}</div>
                            <div className="product_button">BUY</div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
      addTitle: titles => dispatch(addTitle(titles)),
      cartItems: items => dispatch(cartItems(items)),
      changeItems: items => dispatch(changeItems(items)),
      fullPrace: price => dispatch(fullPrace(price))
    };
  }
const mapStateToProps = state =>{
    return {
        titles:state.titles,
        price:state.price
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);