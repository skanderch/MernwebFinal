import React, { useEffect } from "react";
import { Modal, Tabs, Form, Input, Row, Col, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { AddProduct, EditProduct } from "../../../apicalls/products";
import { SetLoader } from "../../../redux/loadersSlice";
import Images from "./Images";
import "./ProductsForm.css"; // Ensure this is imported

const additionalThings = [
  {
    label: "Quest",
    name: "quest",
  },
  {
    label: "PC only",
    name: "pc",
  },
  {
    label: "Nsfw",
    name: "nsfw",
  },
  {
    label: "Full body",
    name: "fullbody",
  },
  {
    label: "DPS",
    name: "dps",
  },
];

const rules = [
  {
    required: true,
    message: "Required",
  },
];

function ProductsForm({
  showProductForm,
  setShowProductForm,
  selectedProduct,
  getData,
}) {
  const [selectedTab = "1", setSelectedTab] = React.useState("1");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      let response = null;
      if (selectedProduct) {
        response = await EditProduct(selectedProduct._id, values);
      } else {
        values.seller = user._id;
        values.status = "pending";
        response = await AddProduct(values);
      }

      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
        setShowProductForm(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const formRef = React.useRef(null);

  useEffect(() => {
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct]);

  return (
    <Modal
      title="Product Form"
      open={showProductForm}
      onCancel={() => setShowProductForm(false)}
      centered
      width={1000}
      okText="Save"
      onOk={() => {
        formRef.current.submit();
      }}
      className="modal-custom"
      {...(selectedTab === "2" && { footer: false })}
    >
      <div>
        <h1 className="text-primary text-2xl text-center font-semibold uppercase">
          {selectedProduct ? "Edit Product" : "Add Product"}
        </h1>
        <Tabs
          defaultActiveKey="1"
          activeKey={selectedTab}
          onChange={(key) => setSelectedTab(key)}
        >
          <Tabs.TabPane tab="General" key="1">
            <Form layout="vertical" ref={formRef} onFinish={onFinish}>
              <Form.Item label="Name" name="name" rules={rules}>
                <Input />
              </Form.Item>

              <Form.Item label="Description" name="description" rules={rules}>
                <TextArea />
              </Form.Item>

              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item label="Price" name="price" rules={rules}>
                    <Input type="number" />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Category" name="category" rules={rules}>
                    <select id="category">
                      <option value="">Select category</option>
                      <option value="Avatars">Avatars</option>
                      <option value="Assets">Assets</option>
                      <option value="Animations">Animations</option>
                      <option value="Textures">Textures</option>
                    </select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="SDK" name="sdk" rules={rules}>
                    <select id="sdk">
                      <option value="">Select SDK Version</option>
                      <option value="3.0">3.0</option>
                      <option value="2.0">2.0</option>
                    </select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="UnityVersion"
                    name="unityversion"
                    rules={rules}
                  >
                    <select id="unityversion">
                      <option value="">Select Unity Version</option>
                      <option value="2019">2019</option>
                      <option value="2022">2022</option>
                    </select>
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex gap-10">
                {additionalThings.map((item) => (
                  <Form.Item
                    label={item.label}
                    name={item.name}
                    valuePropName="checked"
                    key={item.name}
                  >
                    <Input
                      type="Checkbox"
                      value={item.name}
                      onChange={(e) => {
                        formRef.current.setFieldsValue({
                          [item.name]: e.target.checked,
                        });
                      }}
                      checked={formRef.current?.getFieldValue(item.name)}
                    />
                  </Form.Item>
                ))}
              </div>
              <Form.Item
                label="Show Bids on Product page"
                name="showBidsOnProductPage"
                valuePropName="checked"
              >
                <Input
                  type="Checkbox"
                  onChange={(e) => {
                    formRef.current.setFieldsValue({
                      showBidsOnProductPage: e.target.checked,
                    });
                  }}
                  checked={formRef.current?.getFieldValue(
                    "showBidsOnProductPage"
                  )}
                  style={{ width: 50, marginLeft: 20 }}
                />
              </Form.Item>
            </Form>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Images" key="2" disabled={!selectedProduct}>
            <Images
              selectedProduct={selectedProduct}
              setShowProductForm={setShowProductForm}
              getData={getData}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
}

export default ProductsForm;
