import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AxiosResponse } from "axios";
import { Alert } from "antd";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { axios } from "services";
import apiRoutes from "configs/apiRoutes";
import useAuth from "hooks/useAuth";
import "./style.scss";

export default function Index() {
  const { setAuth, persist } = useAuth();
  const [errorMessage, setErrorrMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  async function onFinish(values: any) {
    const data = JSON.stringify({
      email: values.email,
      password: values.password,
    });

    try {
      const response: AxiosResponse = await axios.post(
        apiRoutes.APP_AUTH_LOGIN.url,
        data,
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      const responseInfo = response?.data;
      const responseData = responseInfo?.data;

      if (responseInfo && responseInfo.success) {
        setAuth({
          id: responseData.id,
          email: responseData.email,
          username: responseData.username,
          accessToken: responseData.accessToken,
          persist: values.remember,
          isLogged: true,
          roles: [],
        });

        localStorage.setItem("persist", values.remember.toString());

        navigate(from, { replace: true });
      }
    } catch (error: any) {
      const errResponse = error?.response || {};

      if (errResponse.status === 400) {
        setErrorrMessage(errResponse.data.message);
      } else if (errResponse.status === 401) {
        setErrorrMessage("Unauthorized");
      } else if (!error?.response || error?.message) {
        setErrorrMessage(error?.message || "No server response");
      }
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        {errorMessage && (
          <Alert
            message="Error"
            description={errorMessage}
            type="error"
            showIcon
          />
        )}
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="E-mail"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox checked={persist}>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ marginRight: "10px" }}
            >
              Log in
            </Button>
            Or <Link to="/auth/register">register now!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
