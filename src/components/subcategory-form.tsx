import {
  Button,
  Form,
  Input,
  Upload,
  UploadFile,
  UploadProps,
  Image,
  Select,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CreateSubCategoryType } from "../pages/subcategory/types/sub-types";
import { useCategoryList } from "../pages/category/service/query/useGetCategoryList";

interface Props {
  submit: (values: CreateSubCategoryType) => void;
  isPending: boolean;
  initialValues?: {
    title?: string;
    image?: string;
    parent?: {
      id: number;
      title: string;
    };
    attributes?: [];
  };
}

export const SubCategoryForm: React.FC<Props> = ({
  submit,
  isPending,
  initialValues,
}) => {
  const { data } = useCategoryList();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <div>
      <Form
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          title: initialValues?.title,
          parent: initialValues?.parent,
        }}
        layout="vertical"
        onFinish={submit}
        autoComplete="off"
      >
        {initialValues ? (
          <p></p>
        ) : (
          <Form.Item
            label="Category"
            name="parent"
            rules={[
              { required: true, message: "Please select parent Category!" },
            ]}
          >
            <Select>
              {data?.results.map((option) => (
                <Select.Option key={option.id} value={option.id}>
                  {option.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}
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
          <Image src={initialValues.image} style={{ maxWidth: 300 }} />
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
