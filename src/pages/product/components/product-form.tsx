import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  Spin,
  Switch,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useSubCategoryList } from "../../subcategory/service/query/useSubCategoryList";
import { ProductType, ResponseProduct } from "../types/product-type";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

interface Props {
  submit: (values: ProductType) => void;
  initialValue?: ResponseProduct;
  isLoading?: boolean;
}

export const ProductForm: React.FC<Props> = ({
  submit,
  initialValue,
  isLoading,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const { data } = useSubCategoryList();

  return (
    <div>
      {isLoading ? (
        <Spin />
      ) : (
        <Form
          style={{ maxWidth: 600 }}
          layout="vertical"
          onFinish={submit}
          autoComplete="off"
          initialValues={initialValue}
        >
          <Form.Item
            label="Category"
            name="category"
            rules={[
              { required: true, message: "Please select parent Category!" },
            ]}
          >
            <Select>
              {data?.results?.map((option) => (
                <Select.Option key={option.id} value={option.id}>
                  {option.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Form.Item
              label="Is available"
              name="is_available"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item label="Is new" name="is_new" valuePropName="checked">
              <Switch />
            </Form.Item>
          </div>
          <Form.Item
            label="Title product"
            name="title"
            rules={[
              { required: true, message: "Please input your product name!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please input your product price!" },
            ]}
          >
            <InputNumber<number>
              style={{ width: "100%" }}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) =>
                value?.replace(/\$\s?|(,*)/g, "") as unknown as number
              }
            />
          </Form.Item>
          <Form.Item label="Image" name={"image"}>
            <Upload.Dragger
              accept=".jpg,.png,.svg,.jpeg,.webp"
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
            <Image src={initialValue.image} width="150px" />
          )}

          <Form.Item style={{ margin: "2rem 0 0 0" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};
