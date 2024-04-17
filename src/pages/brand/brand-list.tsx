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
import { useBrandList } from "./service/query/useBrandList";
import { CategoryType } from "../category/types/types-category";
import { useNavigate } from "react-router-dom";
import { useDeleteBrand } from "./service/mutation/useDeleteBrand";
import { useState } from "react";

interface results {
  id: number;
  image: string;
  title: string;
}
[];

export const BrandList: React.FC = () => {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(1);
  const [pages, setPages] = useState(0);
  const [filter, setFilter] = useState("");

  const { data, isLoading } = useBrandList(filter, pages);
  const { mutate } = useDeleteBrand();

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
    setPages((page - 1) * 5);
  };

  const deleteBrand = (id: number) => {
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
              onConfirm={() => deleteBrand(data.id)}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
            <a href={`edit-brand/${data.id}`}>
              <Button type="primary" ghost>
                Edit
              </Button>
            </a>
          </div>
        );
      },
    },
  ];

  const dataSource = data?.data.results.map((item: results) => {
    return {
      key: item?.id,
      id: item.id,
      image: item.image,
      name: item.title,
    };
  });

  const handleChange = (value: string) => {
    setFilter(value);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button type="primary" onClick={() => navigate("/app/create-brand")}>
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
          ]}
        />
      </div>
      <div style={{ height: "80vh", marginTop: "1rem", overflowY: "scroll" }}>
        {isLoading ? (
          <Spin fullscreen />
        ) : (
          <div>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
            />
            <div style={{ textAlign: "center", margin: "1rem 0" }}>
              <Pagination
                pageSize={5}
                current={current}
                onChange={onChange}
                total={data?.size}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
