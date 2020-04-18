import React,{Component} from 'react';
import {connect} from "react-redux";
import {addTitle} from "../actions/index";
import {cartItems} from "../actions/index";
import {removItems} from "../actions/index";
import {fullPrace} from "../actions/index";
import Request from 'react-http-request';
import {BrowserRouter as Router,Route, Link} from 'react-router-dom';

class Cart extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            productCart:[],
            itemCount:[],
            totalPrice:0,
            value: '',
            bike:'',
            finish:false
        };
    }
    finishOrder = () => {
        let phone = document.getElementsByClassName('phone_form')[0].value;
        let email = document.getElementsByClassName('email_form')[0].value;
        let adress = document.getElementsByClassName('adress_form')[0].value;
        
        var url = `http://bikeshop/public/getorder/${phone}/${adress}/${email}/${this.props.price}/${this.props.items}`;
        fetch(url)
        

        this.props.removItems({items1:[]});  
        this.props.fullPrace({price:0}); 
        this.setState({
            finish:true
        });
    }

    render(){
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
                            <Link to={`/`}>
                            <div className="check_out_button">
                                CHECK OUT 
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div id="finish_order" className={ this.state.finish? "finish_off": "finish_on" }>
                    <h1>Thanks for your order</h1>
                    <Link to={`/`}>
                        <div>Go Back</div>
                    </Link>
                </div>
                
                <div id="body"  className={ this.state.finish? "finish_on" : "finish_off" }>
                    <div className="finish_order">{this.state.bike}</div>
                    <h1>Cart finish order</h1>
                    <div className="cart_order">
                        {this.props.items.map(el=>(
                            <div className="cart_item">
                                <div>{el.name}</div>
                                <div>{el.value}</div>
                            </div>
                        ))}
                    </div>
                    <div className="form_order">
                        <input className="phone_form" type="text" name="phone" placeholder="Phone" required/>
                        <input className="email_form" type="text" name="email" placeholder="Email" required/>
                        <input className="adress_form" type="text" name="adress" placeholder="Adress" required/>
                    </div>
                    <div className="finish_order_button" onClick={this.finishOrder}>
                        Finish order
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
      removItems: items => dispatch(removItems(items)),
      fullPrace:price=>dispatch(fullPrace(price)),
    };
  }
const mapStateToProps = state =>{
    return {
        titles:state.titles,
        items:state.items,
        price:state.price
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);


// export default connect(
 
//     mapStateToProps
//   )(Test);