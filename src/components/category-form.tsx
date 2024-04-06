import {
  Button,
  Form,
  Input,
  Upload,
  UploadFile,
  UploadProps,
  Image,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { CreateCategoryType } from "../pages/category/types/types-category";
import { useState } from "react";

interface Props {
  submit: (values: CreateCategoryType) => void;
  isPending: boolean;
  initialValues?: {
    title?: string;
    image?: string;
  };
}

export const CategoryForm: React.FC<Props> = ({
  submit,
  isPending,
  initialValues,
}) => {
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
        initialValues={{
          title: initialValues?.title,
        }}
        layout="vertical"
        onFinish={submit}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input Category Title!" }]}
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
        {initialValues && !fileList.length && (
          <Image src={initialValues.image} />
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
