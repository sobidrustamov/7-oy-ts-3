import {
  Button,
  Form,
  Image,
  Input,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { BrandType, CreateBrandType } from "../types/type";

interface Props {
  submit: (values: CreateBrandType) => void;
  initialValue?: BrandType;
}
export const BrandForm: React.FC<Props> = ({ submit, initialValue }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <div>
      <Form
        style={{ maxWidth: 600 }}
        layout="vertical"
        onFinish={submit}
        initialValues={initialValue}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input Brand Title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Image" name={"image"}>
          <Upload.Dragger
            maxCount={1}
            multiple={false}
            listType="picture-card"
            beforeUpload={() => false}
            fileList={fileList}
            onChange={onChange}
          >
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload.Dragger>
        </Form.Item>
        {initialValue && !fileList.length && (
          <Image style={{ maxWidth: 200 }} src={initialValue.image} />
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
