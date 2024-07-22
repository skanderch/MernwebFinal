import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetAllBids,
  GetProductById,
} from "../../apicalls/products";
import { SetLoader } from "../../redux/loadersSlice";
import { Button, message } from "antd";
import Divider from "../../components/Divider";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import BidModal from "./BidModal";
import './product-info.css';


function ProductInfo() {
  const { user } = useSelector((state) => state.users);
  const [showAddNewBid, setShowAddNewBid] = React.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [product, setProduct] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProductById(id);
      dispatch(SetLoader(false));
      if (response.success) {
        const bidsResponse = await GetAllBids({ product: id });
        setProduct({
          ...response.data,
          bids: bidsResponse.data,
        });
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    product && (
      <div className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Images */}
          <div className="flex flex-col gap-4">
            <img
              src={product.images[selectedImageIndex]}
              alt=""
              className="w-60 h-72 object-cover rounded-lg shadow-lg"
            />
            <div className="flex gap-4 overflow-x-auto">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  className={
                    "w-20 h-20 object-cover rounded-md cursor-pointer" +
                    (selectedImageIndex === index
                      ? " border-2 border-purple-700 border-dashed p-2"
                      : "")
                  }
                  onClick={() => setSelectedImageIndex(index)}
                  src={image}
                  alt=""
                />
              ))}
            </div>
            <Divider />
            
            <div className="flex gap-4 items-center">
              
              <h1 className="text-gray-700 font-semibold">Added On</h1>
              <span className="text-gray-600">
                {moment(product.createdAt).format("MMM D, YYYY hh:mm A")}
                
              </span>
              {product.showBidsOnProductPage && (
                  <div className="max-h-80 overflow-y-auto">
                    {product.bids.map((bid, index) => (
                      <div
                        key={index}
                        className="border border-gray-300 p-4 rounded-lg mb-4"
                      >
                        <div className="flex justify-between text-gray-700">
                          <span>Name</span>
                          <span>{bid.buyer.name}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Bid Amount</span>
                          <span>${bid.bidAmount}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Bid Placed On</span>
                          <span>
                            {moment(bid.createdAt).format("MMM D, YYYY hh:mm A")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold text-orange-900">
                {product.name}
              </h1>
              <p className="text-gray-700">{product.description}</p>
            </div>
            <Divider />
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-orange-900">
                Product Details
              </h1>
              {[
                { label: "Price", value: `$ ${product.price}` },
                { label: "Category", value: product.category.toUpperCase() },
                { label: "SDK", value: product.sdk },
                { label: "UnityVersion", value: product.unityversion },
                { label: "Quest Compatible", value: product.quest ? "Yes" : "No" },
                { label: "PC Only", value: product.pc ? "Yes" : "No" },
                { label: "NSFW", value: product.nsfw ? "Yes" : "No" },
                { label: "Full Body", value: product.fullbody ? "Yes" : "No" },
                { label: "DPS", value: product.dps ? "Yes" : "No" }
              ].map(({ label, value }, index) => (
                <div key={index} className="flex justify-between mt-2 text-gray-700">
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
            <Divider />
            <div className="flex flex-col">
              <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-semibold text-orange-900">Seller Details</h1>
              </div>
              <div className="flex flex-col mb-4">
                <div className="flex justify-between mt-2 text-gray-700">
                  <span>Seller Name</span>
                  <span>{product.seller.name}</span>
                </div>
                <div className="flex justify-between mt-2 text-gray-600">
                  <span>Email</span>
                  <span className="uppercase">{product.seller.email}</span>
                </div>
              </div>
              <Divider />
              <div className="flex flex-col">
                <div className="flex justify-between mb-4">
                  <h1 className="text-2xl font-semibold text-orange-900">Bids</h1>
                  <Button
                    onClick={() => setShowAddNewBid(!showAddNewBid)}
                    disabled={user._id === product.seller._id}
                  >
                    New Bid
                  </Button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        {showAddNewBid && (
          <BidModal
            product={product}
            reloadData={getData}
            showBidModal={showAddNewBid}
            setShowBidModal={setShowAddNewBid}
          />
        )}
      </div>
    )
  );
}

export default ProductInfo;
