import React, { Component } from 'react'
import formatCurrency from '../util';

export default class Cart extends Component {
    render() {
        console.log(this.props.cartItems);
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
            </div>
            <div className="cart">
                <div className="total">
                    Total: {formatCurrency(this.props.cartItems.reduce((a,c)=>a+(c.price*c.count),0))}
                    <button className="button primary">Proceed</button>
                </div>
            </div>
            </>
        )
    }
}
