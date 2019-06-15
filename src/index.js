import React from "react";
import ReactDOM from "react-dom";

import ItemCards from "./ItemCards";
import AppBar from "./AppBar";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "shirts",
      cart: []
    };
  }

  render() {
    console.log(this.state.cart);

    return (
      <div className="App">
        <AppBar
          category={this.state.category}
          onUserChoice={option => this.setState({ category: option })}
          cart={this.state.cart}
        />
        <div className="content">
          <ItemCards
            addToCart={item => {
              this.setState({ cart: [...this.state.cart, item] });
            }}
            categoryToDisplay={this.state.category}
          />
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
