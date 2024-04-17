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
import ReactQuill from "react-quill";
import { PlusOutlined } from "@ant-design/icons";
import { BannerType, CreateBannerType } from "../types/type";

interface Props {
  submit: (values: CreateBannerType) => void;
  initialValue?: BannerType;
  isPending?: boolean;
}
export const BannerForm: React.FC<Props> = ({
  submit,
  initialValue,
  isPending,
}) => {
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
          rules={[{ required: true, message: "Please input Banner Title!" }]}
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
          <Image style={{ maxWidth: 300 }} src={initialValue.image} />
        )}
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input Banner description!" },
          ]}
        >
          <ReactQuill />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
