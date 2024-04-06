import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, Spin, message } from "antd";
import { useCreateAttribute } from "../service/mutation/useCreateAttribute";
import { useDeleteAttributeValue } from "../service/mutation/useDeleteAttributeValue";
import { useDeleteAttribute } from "../service/mutation/useDeleteAttribute";
import { useNavigate } from "react-router-dom";

interface Props {
  isLoading?: boolean;
  parent?: number | undefined;
  initialValues?: {
    attributes: {
      id: number;
      title: string;
      values: { value: string; id: number }[];
    }[];
  };
}

interface AttrebuteData {
  items: [{ title: string; values: [{ value: string }] }];
}
export const AttrebuteForm: React.FC<Props> = ({
  isLoading,
  parent,
  initialValues,
}) => {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const { mutate: createAttrebute } = useCreateAttribute();
  const { mutate: deleteAttribute } = useDeleteAttribute();
  const { mutate: deleteAttributeValue } = useDeleteAttributeValue();

  const submit = (values: AttrebuteData) => {
    const attributes = values?.items?.map((i, index) => {
      if (initialValues?.attributes[index]) {
        return {
          attribute_id: initialValues?.attributes[index].id,
          title: i.title,
          values: i.values?.map((i2, index2) => {
            if (initialValues.attributes[index].values[index2]) {
              return {
                value: i2.value,
                value_id: initialValues.attributes[index].values[index2].id,
              };
            } else {
              return {
                value: i2.value,
                value_id: null,
              };
            }
          }),
        };
      } else {
        return {
          attribute_id: null,
          title: i.title,
          values: i.values?.map((item) => {
            return { value: item.value, value_id: null };
          }),
        };
      }
    });
    const data = { attributes, category_id: parent };
    createAttrebute(data, {
      onSuccess: () => {
        message.success("success");
        navigate("/app/subcategory-list", { replace: true });
      },
    });
  };

  const removeAttribute = (id: number | undefined) => {
    deleteAttribute(id, {
      onSuccess: () => {
        message.success("success");
      },
    });
  };
  const removeAttributeValue = (id: number | undefined) => {
    deleteAttributeValue(id, {
      onSuccess: () => {
        message.success("success");
      },
    });
  };
  return (
    <div>
      {isLoading ? (
        <Spin />
      ) : (
        <Form
          form={form}
          layout="vertical"
          style={{ maxWidth: 600 }}
          onFinish={submit}
        >
          <Form.List name="items" initialValue={initialValues?.attributes}>
            {(fields, { add, remove }) => (
              <div
                style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
              >
                {fields.map((field) => {
                  return (
                    <Card
                      size="small"
                      title={`Item ${field.name + 1}`}
                      key={field.key}
                      extra={
                        initialValues?.attributes[field.key]?.values?.length ? (
                          <p></p>
                        ) : (
                          <CloseOutlined
                            onClick={() => {
                              remove(field.name);
                              removeAttribute(
                                initialValues?.attributes[field.key].id
                              );
                            }}
                          />
                        )
                      }
                    >
                      <Form.Item
                        label="Title"
                        name={[field.name, "title"]}
                        required
                      >
                        <Input />
                      </Form.Item>

                      {/* Nest Form.List */}
                      <Form.Item label="Value">
                        <Form.List name={[field.name, "values"]}>
                          {(subFields, subOpt) => (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                rowGap: 16,
                              }}
                            >
                              {subFields.map((subField) => {
                                console.log(subField);

                                return (
                                  <Space key={subField.key}>
                                    <Form.Item
                                      noStyle
                                      name={[subField.name, "value"]}
                                    >
                                      <Input />
                                    </Form.Item>
                                    <CloseOutlined
                                      onClick={() => {
                                        removeAttributeValue(
                                          initialValues?.attributes[field.key]
                                            .values[subField.key].id
                                        );

                                        subOpt.remove(subField.name);
                                      }}
                                    />
                                  </Space>
                                );
                              })}
                              <Button
                                type="dashed"
                                onClick={() => subOpt.add()}
                                block
                              >
                                + Add Sub Item
                              </Button>
                            </div>
                          )}
                        </Form.List>
                      </Form.Item>
                    </Card>
                  );
                })}

                <div>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    block
                  >
                    + Add Item
                  </Button>
                </div>
              </div>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};
