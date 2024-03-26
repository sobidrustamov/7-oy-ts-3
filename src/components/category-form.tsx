import { Button, Form, Input, Upload, UploadFile, UploadProps } from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { CreateCategoryType } from "../pages/category/types-category";
import { useState } from "react";

interface Props {
  submit: (values: CreateCategoryType) => void;
  isPending: boolean;
  initialValues?: {
    title: string;
    image: string;
  };
}

export const CreateCategoryForm: React.FC<Props> = ({ submit, isPending }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  return (
    <div>
      <Form
        name="basic"
        style={{
          maxWidth: 600,
        }}
        layout="vertical"
        onFinish={submit}
        autoComplete="off"
      >
        <Form.Item<CreateCategoryType>
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input Category Title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<CreateCategoryType>
          label="Image"
          valuePropName="image"
          name={"image"}
        >
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
          
            {isPending ? "Loading..." : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
