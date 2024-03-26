import { Button, Image, Table } from "antd";
import { useCategoryList } from "./service/query/useGetCategoryList";
import { Children } from "./types-category";
import { useNavigate } from "react-router-dom";

export const CategoryList = () => {
  const navigate = useNavigate();
  const { data } = useCategoryList();
  console.log(data);
  const dataSource = data?.map((item: Children) => {
    return { key: item.id, image: item.image, name: item.title };
  });

  const deleteCategory = (id: string) => {};

  const columns = [
    {
      title: "Id",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Img",
      key: "img",
      render: (data: Children) => {
        return <Image width={"100px"} height={"100px"} src={data.image} />;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (data: Children) => {
        return (
          <div style={{ display: "flex", gap: "8px" }}>
            <Button danger onClick={() => deleteCategory(data.id)}>
              Delete
            </Button>
            <Button type="primary" ghost>
              Edit
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => navigate("/app/create-category")}>
        Create
      </Button>{" "}
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};
