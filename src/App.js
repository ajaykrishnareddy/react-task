import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import AllProducts from "./components/AllProducts";
class App extends Component {
  state = {
    products: [],
    filtered: [],
    loading: false,
    stockfilter: false
  };
  getProducts = async () => {
    const res = await axios.get("/products");
    const data = await res.data;
    this.setState({ products: data });
  };
  componentDidMount() {
    this.getProducts();
  }
  handleChange = e => {
    this.setState({ [e.target.name]: !this.state.stockfilter }, () => {
      if (this.state.stockfilter) {
        if (this.state.filtered.length === 0) {
          this.setState({
            filtered: this.state.products.filter(
              product => product.stocked === this.state.stockfilter
            ),
            loading: !this.state.loading
          });
        }
      } else {
        this.setState({ filtered: [], loading: !this.state.loading });
      }
    });
  };
  handleChangeInput = e => {
    if (e.target.value) {
      if (this.state.filtered.length === 0) {
        this.setState({
          products: this.state.products.filter(product => {
            const regex = new RegExp(e.target.value, "gi");
            return product.name.match(regex);
          })
        });
      } else {
        this.setState({
          filtered: this.state.filtered.filter(product => {
            const regex = new RegExp(e.target.value, "gi");
            return product.name.match(regex);
          })
        });
      }
    } else {
      this.getProducts();
    }
  };

  render() {
    const { products, filtered, loading } = this.state;
    return (
      <div>
        <div className="container" style={{ marginTop: "10px" }}>
          <div className="form-group">
            <label htmlFor="search">Search:</label>
            <input
              type="text"
              placeholder="search products"
              className="form-control"
              onChange={this.handleChangeInput}
            />
          </div>
          <input
            type="checkbox"
            name="stockfilter"
            onChange={this.handleChange}
          />
          <AllProducts products={filtered.length === 0 ? products : filtered} />
        </div>
      </div>
    );
  }
}

export default App;
