import {
  Button,
  Image,
  Input,
  Pagination,
  PaginationProps,
  Spin,
  Table,
  message,
} from "antd";
import { CategoryType } from "./types/types-category";
import { useNavigate } from "react-router-dom";
import { useDeleteCategory } from "./service/mutation/useDeleteCategory";
import { useState } from "react";
import { useSearchedCategoryList } from "./service/query/useSearchedCategoryList";
import { usePagination } from "./service/query/usePagination";

interface results {
  id: string;
  title: string;
  image: string;
  children: [];
}
[];

export const CategoryList: React.FC = () => {
  const [search, setSearch] = useState("");
  const [current, setCurrent] = useState(1);

  const navigate = useNavigate();
  const { data, isLoading } = usePagination(current);
  const { data: searchedData } = useSearchedCategoryList(search);
  const { mutate, isPending } = useDeleteCategory();

  console.log(current);
  const onChange: PaginationProps["onChange"] = (page) => {
    console.log(page);
    setCurrent(page);
  };
  const dataSource = data?.results.map((item: results) => {
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
          <div style={{ width: "77%", display: "flex", gap: "1rem" }}>
            <Button
              type="primary"
              onClick={() => navigate("/app/create-category")}
            >
              Create
            </Button>
            <Input
              onChange={(e) =>
                e.target.value.length > 2
                  ? setSearch(e.target.value)
                  : setSearch("")
              }
              placeholder="Search"
              allowClear
              style={{}}
            />
          </div>
          <div
            hidden={searchedData && search ? false : true}
            style={{ width: "77%", position: "relative", zIndex: "99" }}
          >
            {searchedData?.map((item, i) => (
              <div
                onClick={() => navigate(`/app/edit-category/${item.id}`)}
                style={{
                  padding: "1rem",
                  backgroundColor: `${i % 2 == 0 ? "#f2f4f7" : "#e1e5eb"}`,
                  cursor: "pointer",
                  display: "flex",
                  gap: "3rem",
                  alignItems: "center",
                }}
                key={item.id}
              >
                <span>Id: {item.id}</span>
                <Image
                  src={item.image}
                  style={{ width: "50px", height: "50px" }}
                />
                <span>{item.title}</span>
              </div>
            ))}
          </div>
          <div
            style={{
              height: "78vh",
              marginTop: "1rem",
              overflow: "scroll",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Table
              pagination={false}
              dataSource={dataSource}
              columns={columns}
            />
            <div style={{ textAlign: "center" }}>
              <Pagination
                pageSize={1}
                current={current}
                onChange={onChange}
                total={data?.count}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
