import { Button, Spin, Table, message } from "antd";
import { CategoryType } from "../category/types/types-category";
import { useNavigate } from "react-router-dom";
import { useAttributeList } from "./service/query/useAttributeList";
import { useDeleteAttribute } from "./service/mutation/useDeleteAttribute";

interface results {
  category: [];
  category_title: [{ title: string }];
  id: number;
  title: string;
  values: [{ id: number; value: string }];
}
export const AttributeList:React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useAttributeList();
  const { mutate } = useDeleteAttribute();
  const deleteAttribute = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        message.success("success");
      },
    });
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "key",
      key: "key",
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (data: CategoryType) => {
        return (
          <div style={{ display: "flex", gap: "8px" }}>
            <Button danger onClick={() => deleteAttribute(data.id)}>
              Delete
            </Button>
            <a href={`edit-attribute/${data.id}`}>
              <Button type="primary" ghost>
                Edit
              </Button>
            </a>
          </div>
        );
      },
    },
  ];

  const dataSource = data?.results.map((item: results) => {
    const categories = item.category_title?.map((item) => item.title);
    return {
      key: item?.id,
      id: item.id,
      name: item.title,
      category: categories.join(", "),
    };
  });

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin />
        </div>
      ) : (
        <>
          <Button
            type="primary"
            onClick={() => navigate("/app/create-attribute")}
          >
            Create
          </Button>
          <div
            style={{ height: "80vh", marginTop: "1rem", overflow: "scroll" }}
          >
            <Table dataSource={dataSource} columns={columns} />
          </div>
        </>
      )}
    </div>
  );
};
