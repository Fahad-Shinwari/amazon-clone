import React from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import data from './data.json'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      products:data.products,
      size:"",
      sort:""
    }
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
                  <Products products={this.state.products} /></div>
                <div className="sidebar">Cart Items</div>
            </div>
          </main>
          <footer>Footer try</footer>
      </div>
    );
  }   
}

export default App;
