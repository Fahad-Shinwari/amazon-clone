import React from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import data from './data.json'
import Cart from "./components/Cart";
import { Provider } from "react-redux";
import store from "./store";

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      products:data.products,
      size:"",
      sort:"",
      cartItems: 
      localStorage.getItem("cartItems") ?
      JSON.parse(localStorage.getItem("cartItems")) :
      []
    }
  }

  createOrder = order =>{
    alert(order.name)
  }

  removeFromCart = (product) =>{
    const cartItems = this.state.cartItems.slice()
    this.setState({
      cartItems:cartItems.filter(item=>
        item._id !== product._id
      )
    })
    localStorage.setItem("cartItems",JSON.stringify( 
      cartItems.filter(item=>
      item._id !== product._id
    )))
  }

  addToCart = (product) =>{
    console.log(product);
    const cartItems = this.state.cartItems.slice()
    let alreadyExists = false
    cartItems.forEach((item)=>{
      if(item._id === product._id){
        item.count++
        alreadyExists = true
      } 
    })
    if(!alreadyExists){
      cartItems.push({
        ...product,
        count:1
      })
    }
    this.setState({
      cartItems
    })
    localStorage.setItem("cartItems",JSON.stringify(this.state.cartItems))
  }

  render(){
    return (
      <Provider store={store}>
      <div className="App">
          <header>Header</header>
          <main>
            <div className="content">
                <div className="main">
                  <Filter />
                  <Products addToCart={this.addToCart}  /></div>
                <div className="sidebar">
                  <Cart
                   cartItems={this.state.cartItems}
                   removeFromCart={this.removeFromCart}
                   createOrder={this.createOrder}
                   />
                   
                   </div>
            </div>
          </main>
          <footer>Footer try</footer>
      </div>
      </Provider>
    );
  }   
}

export default App;
