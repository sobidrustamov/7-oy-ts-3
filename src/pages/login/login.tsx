import { Button, Form, type FormProps, Input } from "antd";
import { useLogin } from "./service/mutation/useLogin";
import "./style.scss";
import { FieldType } from "./types";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login: React.FC = () => {
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
        Cookies.set("token", res.token, { expires: 7 });
        navigate("/app");
      },
    });
  };
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login">
      <Form
        name="basic"
        className="form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{
          width: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          padding: "1rem",
          backgroundColor: "#fff",
          borderRadius: "1rem",
        }}
        layout="vertical"
        initialValues={{ phone_number: +998977109944, password: 87654321 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
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
          <Button type="primary" htmlType="submit">
            {isPending ? "Loading..." : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
