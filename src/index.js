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
                const index = this.state.cart.indexOf(item);
                const copy = [...this.state.cart];

                return this.state.cart.includes(item)
                  ? (copy[index].quantity++,
                    this.setState({
                      cart: copy,
                      paymentTemp: [
                        ...this.state.paymentTemp,
                        Number.parseInt(item.price, 10)
                      ]
                    }))
                  : this.setState({
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
                const paymentCopy = [...this.state.paymentTemp];
                const priceIndex = paymentCopy.indexOf(
                  Number.parseInt(item.price, 10)
                );
                const newSubtotal =
                  this.state.subtotal - Number.parseInt(item.price, 10);
                return item.quantity > 1
                  ? (array[index].quantity--,
                    paymentCopy.splice(priceIndex, 1),
                    this.setState({
                      cart: array,
                      paymentTemp: paymentCopy,
                      subtotal: newSubtotal
                    }))
                  : index !== -1
                  ? (array.splice(index, 1),
                    paymentCopy.splice(priceIndex, 1),
                    this.setState({
                      cart: array,
                      paymentTemp: paymentCopy,
                      subtotal: newSubtotal
                    }))
                  : "";
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
