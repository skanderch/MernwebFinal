import { Button, message, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { GetProducts, UpdateProductStatus } from "../../apicalls/products";
import moment from "moment";
import './products.css'; // Ensure you have the styles imported

function Products() {
  const [products, setProducts] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(null);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(SetLoader(true));
      const response = await UpdateProductStatus(id, status);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        // Remove product from state if it’s blocked or rejected
        if (status === "blocked" || status === "rejected") {
          setProducts(products.filter((product) => product._id !== id));
        } else {
          getData(); // Reload data if status is updated to approved
        }
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Seller",
      dataIndex: "seller",
      key: "seller",
      render: (seller) => seller.name,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "SDK",
      dataIndex: "sdk",
      key: "sdk",
    },
    {
      title: "UnityVersion",
      dataIndex: "unityversion",
      key: "unityversion",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => status.toUpperCase(),
    },
    {
      title: "Added on",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        const { status, _id } = record;
        return (
          <div className="action-buttons">
            {status === "pending" && (
              <>
                <span
                  className="action-link"
                  onClick={() => onStatusUpdate(_id, "approved")}
                >
                  Approve
                </span>
                <span
                  className="action-link"
                  onClick={() => onStatusUpdate(_id, "rejected")}
                >
                  Reject
                </span>
              </>
            )}
            {status === "approved" && (
              <span
                className="action-link"
                onClick={() => onStatusUpdate(_id, "blocked")}
              >
                Block
              </span>
            )}
            {status === "blocked" && (
              <span
                className="action-link"
                onClick={() => onStatusUpdate(_id, "approved")}
              >
                UnBlock
              </span>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="products-table-container">
      <Table columns={columns} dataSource={products} rowKey="_id" />
    </div>
  );
}

export default Products;
