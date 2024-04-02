import { Button, Image, Spin, Table, message } from "antd";
import { useCategoryList } from "./service/query/useGetCategoryList";
import { CategoryType } from "./types-category";
import { useNavigate } from "react-router-dom";
import { useDeleteCategory } from "./service/mutation/useDeleteCategory";

interface results {
  id: string;
  title: string;
  image: string;
  children: [];
}
[];

export const CategoryList: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useCategoryList();
  const { mutate, isPending } = useDeleteCategory();

  const dataSource = data?.map((item: results) => {
    return { key: item.id, id: item.id, image: item.image, name: item.title };
  });

  const deleteCategory = (data: CategoryType) => {
    mutate(data.id, {
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
            <Button danger onClick={() => deleteCategory(data)}>
              Delete
            </Button>
            <a href={`/app/edit-category/${data.id}`}>
              <Button type="primary" ghost>
                Edit
              </Button>
            </a>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      {isPending || isLoading ? (
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
            onClick={() => navigate("/app/create-category")}
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
