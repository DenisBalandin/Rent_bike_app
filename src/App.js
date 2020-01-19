import React,{Component} from 'react';
 import Bikerental from './bikerentals';
import SearchResults from 'react-filter-search';

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
          data:Bikerental.products,
          productCart:[],
          itemCount:[],
          value: '',
          bike:'',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleChange = event => {
        const { value } = event.target;
        this.setState({ value });
    };
    addProduct = (id,e) =>{
        const rows = this.state.data;
        const row = rows.find(row => row.id === id);
        const index = rows.indexOf(row);

        const rowsCart = this.state.productCart;
        const rowc = rowsCart.find(rowc => rowc.id === id);
        const indexCart = rowsCart.indexOf(rowc);

        const itemCounts = this.state.itemCount;
        const item = itemCounts.find(item => item.id === id);
        const indexItemCount = itemCounts.indexOf(item);
        var countItem = 1;
        this.setState({
            bike: ''
        }); 
        if(typeof item !== 'undefined'){
            countItem = parseInt(itemCounts[indexItemCount]['value']);
        }
        if(indexCart === -1){
            this.setState({
                productCart:[...this.state.productCart, { 
                    id:id,
                    price:rows[index]['price'],
                    number:countItem,
                    type:rows[index]['product_type'],
                }],
                itemCount:[...this.state.itemCount, { id:id,value:countItem}],
            });
        }else{
            if(countItem != rowsCart[indexCart]['number']){
                rowsCart[indexCart]['number'] = countItem;
            }else{
                rowsCart[indexCart]['number'] = rowsCart[indexCart]['number']+1;
                itemCounts[indexItemCount]['value'] = countItem +1;
                this.setState({
                    itemCount: itemCounts
                }); 
            }
            
            this.setState({
                productCart: rowsCart
            }); 
        }
    }
    handleInputChange(event){
        const target = event.target;
        const rows = this.state.itemCount;
        const row = rows.find(row => row.id === parseInt(target.name));
        const index = rows.indexOf(row);
        if(index == -1){
            this.setState({
                itemCount:[...this.state.itemCount, { id:parseInt(target.name),value:target.value}],
            });
        }else{
            rows[index]['value'] = target.value;
            this.setState({
                itemCount: rows
            });
        }
    }
    countProduct = () =>{
        let fullPrice = 0;
        this.state.productCart.map((item, index) => {
            let price = item.price*item.number;
            fullPrice = fullPrice+price;
        });
        return ` $${fullPrice}`;
    }
    inputNumber = (id) => {
        const itemCounts = this.state.itemCount;
        const item = itemCounts.find(item => item.id === id);
        const indexItemCount = itemCounts.indexOf(item);
        var countItem = 1;
        if(typeof item !== 'undefined'){
            countItem = parseInt(itemCounts[indexItemCount]['value']);
        }
        return countItem;
    }
    checkOut = (e) =>{
        const rows = this.state.productCart;
        const row = rows.find(row => row.type === "bike");
        const index = rows.indexOf(row);
        if(typeof row !== 'undefined'){
            this.setState({
                productCart:[],
                itemCount:[],
                bike:"Thanks for your order"
            });
        
        }else{
            this.setState({
                bike:"You have to take a bike to finish the order."
            });
        }
    }
    render(){
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
                              <option value="accessory">accessory</option>
                              <option value="addon">addon</option>
                          </select>
                      </div>
                      
                      <div className="cart">
                          <div className="total_price">
                          <span>TOTAL </span> <p> {this.countProduct()}</p>
                          </div>
                          <div className="check_out_button"  onClick={this.checkOut.bind(this)}>
                              CHECK OUT 
                          </div>
                      </div>
                  </div>
              </div>
              
              <div id="body">
                  <div className="finish_order">{this.state.bike}</div>
                  <h1>Bike Rental in Central Park</h1>

                  <SearchResults value={value} data={data} renderResults={results => (
                      <div id="products">
                          {results.map(product => (
                              <div className="product">
                                  <img src={product.image}/>
                                  <div className="product_name">
                                      {product.name}
                                  </div> 
                                  <div className="product_description">
                                      <div className="price">${product.price}</div>
                                      <input max={100} min={1} name={product.id}type="number"value={this.inputNumber(product.id)} onChange={this.handleInputChange} />
                                      <div className="cart_button" onClick={this.addProduct.bind(this, product.id)}>Add to cart</div>
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
export default App;
