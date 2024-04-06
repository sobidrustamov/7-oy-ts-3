import { CategoryType } from "../category/types/types-category";
import { Button, Image, Table, Spin, message } from "antd";
import { useSubCategoryList } from "./service/query/useSubCategoryList";
import { useNavigate } from "react-router-dom";
import { useDeleteSubCategory } from "./service/mutation/useDeleteSubCategory";

interface results {
  id: number;
  image: string;
  parent: { id: number; title: string };
  title: string;
}
[];

export const SubCategoryList: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useSubCategoryList();
  console.log(data);

  const { mutate } = useDeleteSubCategory();

  const deleteSubCategory = (id: number) => {
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
      dataIndex: "parent",
      key: "parent",
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
            <Button danger onClick={() => deleteSubCategory(data.id)}>
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

  const dataSource = data?.results?.map((item: results) => {
    return {
      key: item?.id,
      parent: item?.parent?.title,
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
            onClick={() => navigate("/app/create-subcategory")}
          >
            Create
          </Button>
          <div
            style={{ height: "70vh", marginTop: "1rem", overflow: "scroll" }}
          >
            <Table dataSource={dataSource} columns={columns} />
          </div>
        </>
      )}
    </div>
  );
};
