import { useNavigate, useParams } from "react-router-dom";
import { useSingleCategory } from "./service/query/useSingleCategory";
import { Spin, message, TabsProps, Tabs, Button, Table, Image } from "antd";
import { useEditCategory } from "./service/mutation/useEditCategory";
import { CategoryType, CreateCategoryType } from "./types-category";
import { CategoryForm } from "../../components/category-form";

export const EditCategory: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useSingleCategory(id);
  console.log(data);

  const dataSource = data?.children?.map((item: CategoryType) => {
    return { key: item.id, id: item.id, image: item.image, name: item.title };
  });

  const { mutate, isPending } = useEditCategory(id);

  const submit = (values: CreateCategoryType) => {
    const formData = new FormData();
    formData.append("title", values.title);
    if (values.image) formData.append("image", values.image.file);
    formData.append("parent", "");
    mutate(formData, {
      onSuccess: () => {
        message.success("success");
        navigate("/app/category-list");
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
            <Button danger>Delete</Button>
              <Button
                type="primary"
                ghost
                onClick={() => navigate(`/app/edit-subcategory/${data.id}`)}
              >
                Edit
              </Button>
          </div>
        );
      },
    },
  ];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Edit Category",
      children: (
        <CategoryForm
          submit={submit}
          isPending={isPending}
          initialValues={{ title: data?.title, image: data?.image }}
        />
      ),
    },
    {
      key: "2",
      label: "Sub Category",
      children: <Table dataSource={dataSource} columns={columns} />,
    },
  ];

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
        <div>
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      )}
    </div>
  );
};
