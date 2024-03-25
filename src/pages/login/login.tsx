import { Button, Form, type FormProps, Input } from "antd";
import { useLogin } from "./service/mutation/useLogin";
import "./style.scss";
import { FieldType } from "./types";
import Cookies from "js-cookie";

const Login: React.FC = () => {
  const { mutate } = useLogin();

  const onFinish = (values: FieldType) => {
    mutate(values, {
      onSuccess: (res) => {
        Cookies.set("token", res.token, { expires: 7 });
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
        style={{ width: 400 }}
        layout="vertical"
        initialValues={{ remember: true }}
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
