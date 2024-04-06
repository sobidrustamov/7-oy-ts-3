import { Button, Image, Spin, Table } from "antd";
import { useProductList } from "./service/query/useProductList";
import { useNavigate } from "react-router-dom";
import { CategoryType } from "../category/types/types-category";

interface results {
  id: number;
  image: string;
  category: number;
  title: string;
}
[];
export const ProductList: React.FC = () => {
  const { data, isLoading } = useProductList();

  const navigate = useNavigate();
  console.log(data);

  const columns = [
    {
      title: "Id",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Img",
      key: "img",
      render: (data: CategoryType) => {
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
      render: (data: CategoryType) => {
        return (
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              danger
              // onClick={() => deleteSubCategory(data.id)}
            >
              Delete
            </Button>
            <a href={`edit-subcategory/${data.id}`}>
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
    return {
      key: item?.id,
      parent: item?.category,
      id: item.id,
      image: item.image,
      name: item.title,
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
            onClick={() => navigate("/app/create-product")}
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
