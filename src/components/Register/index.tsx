import React from "react";
import {Link, useNavigate} from "react-router-dom";
import { Form, Input, Select, Button } from "antd";
import { axios } from "services";
import apiRoutes from "configs/apiRoutes";

import "./style.scss";

const { Option } = Select;

export default function Index() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  async function onFinish(values: any) {
    const body = JSON.stringify({
      username: values.username,
      email: values.email,
      password: values.password,
    });
    const res = await axios.post(apiRoutes.APP_AUTH_REGISTER.url, body, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });

    if (res.status) {
      navigate("/auth/auth");
    }
  }

  return (
    <div className="register-container">
      <Form
        form={form}
        name="register"
        layout="vertical"
        onFinish={onFinish}
        scrollToFirstError
        autoComplete="off"
      >
        <Form.Item
          name="email"
          label="E-mail"
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
          <Input />
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select gender!" }]}
        >
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: "10px" }}>
            Register
          </Button>
          or <Link to="/auth/login">Login</Link>
        </Form.Item>
      </Form>
    </div>
  );
}
