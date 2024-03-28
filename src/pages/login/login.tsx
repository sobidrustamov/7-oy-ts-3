import { Button, Form, type FormProps, Input, message } from "antd";
import { useLogin } from "./service/mutation/useLogin";
import "./style.scss";
import { FieldType } from "./types";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login: React.FC<FormProps> = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  useEffect(() => {
    if (token) {
      return navigate("/app");
    }
  });
  const { mutate, isPending } = useLogin();

  const onFinish = (values: FieldType) => {
    mutate(values, {
      onSuccess: (res) => {
        message.success("login success");
        Cookies.set("token", res.token, { expires: 7 });
        navigate("/app");
      },
      onError: (error) => {
        console.log(error);
        
        message.error("You are not a staff user!");
      },
    });
  };

  return (
    <div className="login">
      <Form
        className="form "
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        // style={}
        layout="vertical"
        initialValues={{ phone_number: +998977109944, password: 87654321 }}
        onFinish={onFinish}
      >
        <h2 className="title">Sign In</h2>
        <Form.Item<FieldType>
          label="Phone number"
          name="phone_number"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input style={{ width: "350px" }} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password style={{ width: "350px" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
