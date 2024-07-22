import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import "./register.css";  // Import the CSS file

const formRules = [
  {
    required: true,
    message: "Required",
  },
];

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await RegisterUser(values);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="register-background"> {/* Apply the background class */}
      <div className="register-box"> {/* Apply the registration box class */}
        <h1 className="register-heading"> {/* Apply the heading class */}
          WEB - <span className="text-secondary"> REGISTER</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Name" name="name" rules={formRules}>
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={formRules}>
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={formRules}>
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block className="submit-button">
            Register
          </Button>
          <div className="link-container">
            <span className="text-muted">
              Already have an account?{" "}
              <Link to="/login" className="text-link">
                Login
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
