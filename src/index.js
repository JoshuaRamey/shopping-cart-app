import React from "react";
import ReactDOM from "react-dom";

import ItemCards from "./ItemCards";
import CartCards from "./CartCards";
import AppBar from "./AppBar";
import PaymentInfo from "./PaymentInfo";

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
          <PaymentInfo subtotal={this.state.subtotal} />
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
                const ptemp = [...this.state.paymentTemp];
                const priceIndex = ptemp.indexOf(
                  Number.parseInt(item.price, 10)
                );
                const newSubtotal =
                  this.state.subtotal - Number.parseInt(item.price, 10);
                if (index !== -1) {
                  array.splice(index, 1);
                  ptemp.splice(priceIndex, 1);
                  this.setState({
                    cart: array,
                    paymentTemp: ptemp,
                    subtotal: newSubtotal
                  });
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
