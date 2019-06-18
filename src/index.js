import React from "react";
import ReactDOM from "react-dom";

import ItemCards from "./ItemCards";
import CartCards from "./CartCards";
import AppBar from "./AppBar";

import "./styles.css";

function getSum(total, num) {
  return total + Math.round(num);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "products",
      category: "shirts",
      cart: [],
      paymentTemp: [],
      subtotal: 0
    };
  }

  render() {
    console.log(this.state.cart);
    console.log(this.state.paymentTemp);

    return (
      <div className="App">
        <AppBar
          category={this.state.category}
          onUserChoice={option =>
            this.setState({ category: option, view: "products" })
          }
          cart={this.state.cart}
          viewCart={() => {
            this.setState({
              view: "shoppingCart",
              subtotal: this.state.paymentTemp.reduce(getSum, 0)
            });
          }}
        />
        {this.state.view === "shoppingCart" ? (
          <div>
            <p>Subtotal: ${this.state.subtotal.toFixed(2)}</p>
            <p>tax: ${(this.state.subtotal * 0.1).toFixed(2)}</p>
            <p>
              Total: $
              {(this.state.subtotal * 0.1 + this.state.subtotal).toFixed(2)}
            </p>
          </div>
        ) : (
          ""
        )}
        <div className="content">
          {this.state.view === "products" ? (
            <ItemCards
              addToCart={item => {
                this.setState({
                  cart: [...this.state.cart, item],
                  paymentTemp: [
                    ...this.state.paymentTemp,
                    Number.parseInt(item.price, 10)
                  ]
                });
              }}
              categoryToDisplay={this.state.category}
            />
          ) : (
            <CartCards
              shoppingCart={this.state.cart}
              removeFromCart={item => {
                const array = [...this.state.cart];
                const index = array.indexOf(item);
                if (index !== -1) {
                  array.splice(index, 1);
                  this.setState({ cart: array });
                }
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
