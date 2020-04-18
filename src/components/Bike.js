import React,{Component} from 'react';
import SearchResults from 'react-filter-search';
import Bikerental from '../bikerentals';
import {connect} from "react-redux";
import {cartItems} from "../actions/index";
import {changeItems} from "../actions/index";
import {fullPrace} from "../actions/index";
import {BrowserRouter as Router,Route, Link} from 'react-router-dom';

class Bike extends Component{
    constructor(props) {
        super(props);
        this.state = {
          data:Bikerental.products,
          items:[],
          selectData:[],
          value: '',
          count:0,
          name:'',
          fullPrice:0,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    countProduct = () =>{
        if(this.props.price === 0){
            return this.state.fullPrice;
        }else{
            return this.props.price;
        }
    }
    handleChange = event => {
        const { value } = event.target;
        this.setState({ value });
    };
    handleInputChange(event){
        const itemsst = this.state.items;
        const item = itemsst.find(item => item.id === parseInt(event.target.name));
        const itemIndex = itemsst.indexOf(item);
        if(typeof item !== 'undefined'){
            itemsst[itemIndex]['count'] = parseInt(event.target.value);
            this.setState({
                items: itemsst
            }); 
        }else{
            this.setState({
                items:[...this.state.items,{count: parseInt(event.target.value), id: parseInt(event.target.name),buy:false}]
            });
        }
    }
    submitItem = (id) =>{
        const datap = this.state.data;
        const itemp = datap.find(ite => ite.id === id);
        const itemsst = this.state.items;
        const item = itemsst.find(item => item.id === id);
        const itemIndex = itemsst.indexOf(item);
        if(typeof item !== 'undefined'){
            itemsst[itemIndex]['count'] = parseInt(itemsst[itemIndex]['count'])+ 1;
            this.setState({
                items: itemsst
            });
            this.props.changeItems({id:id,value:parseInt(itemsst[itemIndex]['count'])});  
        }else{
            this.setState({
                items:[...this.state.items,{count: 1, id:id}]
            });
            this.props.cartItems({id:id,value:1,name:itemp.name});  
        }
        let fullPr = itemp.price + this.state.fullPrice;
        this.setState({
            fullPrice:fullPr
        });
        this.props.fullPrace({price:fullPr}); 
    }
    render(){
        console.log(this.props.items);
        const { data, value } = this.state; 
        return(
            <>
              <div id="category_block_bg">
                  <div className="category_block">
                      <div className="category">
                          <h3>Category</h3>
                          <select value={value}  onChange={this.handleChange}>
                              <option value="">All</option>
                              <option value="Bike">Bike</option>
                              <option value="accessory">Accessory</option>
                              <option value="addon">Addon</option>
                          </select>
                      </div>
                      <div className="cart">
                          <div className="total_price">
                          <span>TOTAL </span> <p> {this.countProduct()}</p>
                          </div>
                          <Link to={`/cart`}>
                            <div className="check_out_button">
                                CHECK OUT 
                            </div>
                          </Link>
                      </div>
                  </div>
              </div>
              
              <div id="body">
                  <div className="finish_order">{this.state.bike}</div>
                  <h1>Bike Rental in Central Park</h1>
                  <SearchResults value={value} data={data} renderResults={results => (
                      <div id="products">
                          {results.map(product => (
                            <div className="product" key={product.id}>
                                <Link to={`/product/${product.id}`}>
                                    <img src={product.image}/>
                                </Link>
                                <div className="product_name">
                                <Link to={`/product/${product.id}`}>
                                    {product.name}
                                </Link>
                                </div> 
                                <div className="product_description">
                                    <div className="price">${product.price}</div>                                    
                                    <div className="cart_button" onClick={this.submitItem.bind(this,product.id)}>Add to cart</div>
                                </div>
                            </div>
                          ))}
                      </div>
                    )}
                />
              </div>
            </>
        )
    }
}
// export default App;
function mapDispatchToProps(dispatch) {
    return {
      cartItems: items => dispatch(cartItems(items)),
      changeItems: items => dispatch(changeItems(items)),
      fullPrace: price => dispatch(fullPrace(price))
    };
  }
const mapStateToProps = state =>{
    return {
        price:state.price
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Bike);
