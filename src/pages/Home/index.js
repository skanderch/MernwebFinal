import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetProducts } from "../../apicalls/products";
import { SetLoader } from "../../redux/loadersSlice";
import { Divider, message } from "antd";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";
import "./Home.css";

function Home() {
  const [showFilters, setshowFilters] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const [filters, setFilters] = React.useState({
    category: [],
    searchKeyword: "",
    minPrice: 0,
    maxPrice: Infinity,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(filters);
      dispatch(SetLoader(false));
      if (response.success) {
        // Filter out rejected and blocked products
        const filteredProducts = response.data.filter(
          product => product.status === "approved"
        );
        setProducts(filteredProducts);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [filters]);

  return (
    <div className="flex gap-5 home-container">
      {showFilters && (
        <Filters
          showFilters={showFilters}
          setshowFilters={setshowFilters}
          filters={filters}
          setFilters={setFilters}
        />
      )}
      <div className="flex flex-col gap-5 w-full">
        <div className="flex gap-5 items-center">
          {!showFilters && (
            <i
              className="ri-equalizer-line text-xl cursor-pointer"
              onClick={() => setshowFilters(!showFilters)}
            ></i>
          )}

          <input
            type="text"
            placeholder="Search"
            className="neon-input"
            value={filters.searchKeyword}
            onChange={(e) => setFilters({ ...filters, searchKeyword: e.target.value })}
          />
        </div>
        <div
          className={`
            grid gap-5 ${showFilters ? "grid-cols-4" : "grid-cols-5"}
          `}
        >
          {products.map((product) => (
            <div
              className="product-card"
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="product-image"
              />
              <div className="product-details">
                <h1 className="product-name">{product.name}</h1>
                <p className="product-description">{product.description}</p>
                <Divider />
                <span className="product-price">${product.price}</span>
                <div className="flex justify-between mt-2">
                  <span className="text-xs">
                    {product.age} {product.age === 1 ? "year" : "years"} ago
                  </span>
                  <span className="text-xs">
                    {product.seller.firstName} {product.seller.lastName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
