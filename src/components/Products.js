import React, { Component } from 'react'
import formatCurrency from '../util'
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'

export class Products extends Component {
    constructor(props){
        super(props);
        this.state={
            product:null
        }
    }

    openModal = product =>{
        this.setState({
            product
        })
    }

    closeModal = () =>{
        this.setState({
            product:null
        })
    }

    render() {
        const {product} =this.state
        return (
            <div>
                <Fade bottom cascade>
                <ul className="products">
                    {this.props.products.map((product)=>(
                        <li key={product._id}>
                         <div className="product">  
                          <a href={"#" + product._id} onClick={()=>this.openModal(product)}>  
                            <img src={product.image} alt={product.title}></img>
                            <h4>{product.title}</h4>
                            <div>{formatCurrency(product.price)}</div>
                            </a>  
                            <button onClick={()=>this.props.addToCart(product)} className="button primary">Add To Cart</button>
                          
                          </div>  
                        </li>
                    ))}
                </ul>
                </Fade>
                {product && (
                    <Modal isOpen={true} onRequestClose={this.closeModal}>
                        <Zoom>
                            <button className="close-modal" onClick={this.closeModal}>x</button>
                            <div className="product-details">
                                <img src={product.image} alt={product.title} /> 
                                <div className = "product-details-description">
                                   <strong> <p>{product.title}</p> </strong> 
                                   {product.description}  
                                   {product.availableSizes.map((availblesize)=>(
                                       <button className="button">{availblesize}</button>
                                   ))}
                                   <div>{formatCurrency(product.price)}</div>
                                   <button className="button primary"
                                    onClick={() => {
                                       this.props.addToCart(product)
                                       this.closeModal()
                                       }}>Add to Cart</button>
                            </div> 
                            </div>
                            
                        </Zoom>
                    </Modal>
                )}
            </div>
        )
    }
}

export default Products
