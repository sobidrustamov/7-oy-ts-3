import { CategoryType } from "../category/types/types-category";
import {
  Button,
  Image,
  Table,
  Spin,
  message,
  Pagination,
  PaginationProps,
  Popconfirm,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useDeleteSubCategory } from "./service/mutation/useDeleteSubCategory";
import { useState } from "react";
import { usePagination } from "./service/query/usePagination";

interface results {
  id: number;
  image: string;
  parent: { id: number; title: string };
  title: string;
}
[];

export const SubCategoryList: React.FC = () => {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(1);
  const [pages, setPages] = useState(0);

  const { data, isLoading } = usePagination(pages);
  const { mutate } = useDeleteSubCategory();

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
    setPages((page - 1) * 5);
  };

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
            <Popconfirm
              title="Delete data"
              onConfirm={() => deleteSubCategory(data.id)}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
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

  const dataSource = data?.data.results?.map((item: results) => {
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
            style={{ height: "70vh", marginTop: "1rem", overflowY: "scroll" }}
          >
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
            />
            <div style={{ textAlign: "center" }}>
              <Pagination
                pageSize={5}
                current={current}
                onChange={onChange}
                total={data?.size}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
