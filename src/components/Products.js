import React, { Component } from 'react'
import formatCurrency from '../util'

export class Products extends Component {

    render() {
        return (
            <div>
                <ul className="products">
                    {this.props.products.map((product)=>(
                        <li key={product._id}>
                         <div className="product">  
                          <a href={"#" + product._id}>  
                            <img src={product.image} alt={product.title}></img>
                            <h4>{product.title}</h4>
                            <div>{formatCurrency(product.price)}</div>
                            <button className="button primary">Add To Cart</button>
                          </a> 
                          </div>  
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Products
