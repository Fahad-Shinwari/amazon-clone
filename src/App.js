import React from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import { Provider } from "react-redux";
import store from "./store";

class App extends React.Component {
  render(){
    return (
      <Provider store={store}>
      <div className="App">
          <header>Header</header>
          <main>
            <div className="content">
                <div className="main">
                  <Filter />
                  <Products /></div>
                <div className="sidebar">
                  <Cart />
                   
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
