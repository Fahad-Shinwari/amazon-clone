import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade'
import { connect } from 'react-redux';
import { removeFromCart } from '../actions/cartActions';

class Cart extends Component {
    constructor(props){
        super(props);
        this.state={
            showCheckOut:false,
            name:"",
            email:"",
            address:""
        }
    }

    handleInput = e =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    createOrder = e =>{
        e.preventDefault()
        const order ={
            name:this.state.name,
            email:this.state.email,
            address:this.state.address,
            cartItems:this.props.cartItems
        }
        this.props.createOrder(order)

    }
    render() {
        return (
            <>
            <div>
                {this.props.cartItems.length === 0 ? (
                <div>
                    No Items in the Cart
                </div>):(
                <div>
                    There are {this.props.cartItems.length} in the cart
                </div>) }
            </div>
            <div className="cart">
                <Fade left cascade>
                <ul className="cart-items">
                    {this.props.cartItems.map((item)=>(
                        <li key={item._id}>
                            <div>
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div>
                                {item.title}
                            </div>
                            <div className="right">
                                {formatCurrency(item.price)} x {item.count} {" "}
                                <button onClick={()=>this.props.removeFromCart(item)} >Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
                </Fade>
            </div>
            { this.props.cartItems.length === 0 ? " " :
            <>
            <div className="cart">
                <div className="total">
                    Total: {formatCurrency(this.props.cartItems.reduce((a,c)=>a+(c.price*c.count),0))}
                    <button className="button primary" onClick={()=>this.setState({showCheckOut:true})}>Proceed</button>
                </div>
            </div>
            <div className="cart">
            <Fade left cascade>
                  {this.state.showCheckOut && (
                      <div>
                          <form onSubmit={this.createOrder}>
                              <li>
                                <label>Email</label>
                                <input type="email" name="email" onChange={this.handleInput}></input>
                              </li>
                             
                              <li>
                                <label>Name</label>
                                <input type="text" name="name" onChange={this.handleInput}></input>
                              </li>  
                              
                              <li>
                                <label>Address</label>
                                <input type="text" name="address" onChange={this.handleInput}></input>
                              </li>  
                              <li>
                                  <button type="submit">Order</button>
                              </li>
                              
                          </form>
                      </div>
                  )} 
               </Fade>        
            </div>
            </>
    }
            </>
        )
    }
}

export default connect((state)=>({
    cartItems:state.cart.cartItems
}),
 {removeFromCart}
)(Cart)