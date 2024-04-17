import {
  Button,
  Image,
  Pagination,
  PaginationProps,
  Popconfirm,
  Select,
  Spin,
  Table,
  message,
} from "antd";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { useDeleteBanner } from "./service/mutation/useDeleteBanner";
import { CategoryType } from "../category/types/types-category";
import { useState } from "react";
import { useFilterBanner } from "./service/query/useFilterBanner";

interface results {
  id: string;
  title: string;
  image: string;
  children: [];
}
[];

export const Banner: React.FC = () => {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(1);
  const [pages, setPages] = useState(0);
  const [filter, setFilter] = useState("");

  const { data, isLoading } = useFilterBanner(filter, pages);
  const { mutate, isPending } = useDeleteBanner();

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
    setPages((page - 1) * 5);
  };

  const dataSource = data?.data?.results.map((item: results) => {
    return {
      key: item.id,
      id: item.id,
      image: item.image,
      name: item.title,
    };
  });

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
            <Popconfirm
              title="Delete data"
              onConfirm={() => deleteBanner(data)}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
            <a href={`/app/edit-banner/${data.id}`}>
              <Button type="primary" ghost>
                Edit
              </Button>
            </a>
          </div>
        );
      },
    },
  ];

  const deleteBanner = (data: CategoryType) => {
    mutate(data.id, {
      onSuccess: () => {
        message.success("success");
      },
    });
  };

  const handleChange = (value: string) => {
    setFilter(value);
  };

  return (
    <div>
      {isPending ? (
        <Spin fullscreen />
      ) : (
        <>
          <div
            style={{
              width: "98%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="primary"
              onClick={() => navigate("/app/create-banner")}
            >
              Create
            </Button>
            <Select
              onChange={handleChange}
              defaultValue="Filter"
              style={{ width: 120 }}
              options={[
                { value: "id", label: "Id" },
                { value: "-id", label: "Reverse Id" },
                { value: "title", label: "Title" },
                { value: "-title", label: "Reverse Title" },
                { value: "description", label: "Description" },
                { value: "-description", label: "Description Reverse" },
                { value: "image", label: "Image" },
                { value: "-image", label: "Image Reverse" },
                { value: "updated_at", label: "Updated at" },
                { value: "-updated_at", label: "Updated at Reverse" },
                { value: "created_at", label: "Created at" },
                { value: "-created_at", label: "Created at Reverse" },
              ]}
            />
          </div>

          <div
            style={{
              height: "73vh",
              marginTop: "1rem",
              overflowY: "scroll",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {isLoading ? (
              <Spin />
            ) : (
              <Table
                pagination={false}
                dataSource={dataSource}
                columns={columns}
              />
            )}
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
