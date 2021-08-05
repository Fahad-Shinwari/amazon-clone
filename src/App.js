import React from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import data from './data.json'
import Cart from "./components/Cart";

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



  sortProducts = (e) =>{
    const sort = e.target.value
    console.log(e.target.value);
    this.setState({
      sort,
      products: this.state.products.slice().sort((a,b)=>{
        if(sort === "lowest"){
         return a.price > b.price ? 1 : -1
        } else if(sort === "highest"){
         return a.price < b.price ? 1 : -1
        }else if(sort === "latest"){
          return a._id > b._id ? 1 : -1
        }
      })
    })
  }

  filterProducts = (e) =>{
    console.log(e.target.value);
    if(e.target.value === ""){
      this.setState({
        size:e.target.value,
        products:data.products
      })
    }else{
      this.setState({
        size:e.target.value,
        products: data.products.filter((product)=>product.availableSizes.indexOf(e.target.value) >= 0)
      })
    }

  }
  render(){
    console.log(this.state.cartItems);
    return (
      <div className="App">
          <header>Header</header>
          <main>
            <div className="content">
                <div className="main">
                  <Filter
                   count={this.state.products.length}
                   size={this.state.size}
                   sort= {this.state.sort}
                   sortProducts= {this.sortProducts}
                   filterProducts = {this.filterProducts}
                   />
                  <Products products={this.state.products} addToCart={this.addToCart}  /></div>
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
    );
  }   
}

export default App;
