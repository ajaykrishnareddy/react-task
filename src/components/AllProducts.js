import React from "react";

const AllProducts = ({ products, filtered }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr
              key={product.name}
              style={product.stocked ? null : applyStockOut}
            >
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const applyStockOut = {
  color: "red"
};

export default AllProducts;
