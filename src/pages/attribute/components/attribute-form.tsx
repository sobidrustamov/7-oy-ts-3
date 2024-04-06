import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, SelectProps, Space, message } from "antd";
import { useSubCategoryList } from "../../subcategory/service/query/useSubCategoryList";
import { useCreateAttribute } from "../service/mutation/useCreateAttribute";
import { AttrebuteType } from "../types/attribute-type";

const AttributeForm: React.FC = () => {
  const { data } = useSubCategoryList();

  const { mutate } = useCreateAttribute();
  const options: SelectProps["options"] = data?.results.map((item) => {
    return { label: item.title, value: item.id };
  });

  const onFinish = (values: AttrebuteType) => {
    const data = { attr_list: [values] };
    mutate(data, {
      onSuccess: () => {
        message.success("success");
      },
    });
    console.log("Received values of form:", values);
  };

  return (
    <Form
      name="attribute"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item name="category">
        <Select
          mode="multiple"
          placeholder="select one subcategory"
          optionLabelProp="label"
          options={options}
          optionRender={(option) => (
            <Space>
              <span aria-label={option.data.label}>{option.data.label}</span>
            </Space>
          )}
        />
      </Form.Item>
      <Form.Item name="title" label="Title">
        <Input />
      </Form.Item>
      <Form.List name="values">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "value"]}
                  rules={[{ required: true, message: "Missing first name" }]}
                >
                  <Input placeholder="Attribute value" />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AttributeForm;
