import {
  Button,
  Image,
  Pagination,
  PaginationProps,
  Popconfirm,
  Spin,
  Table,
  message,
} from "antd";
import { CategoryType } from "./types/types-category";
import { useNavigate } from "react-router-dom";
import { useDeleteCategory } from "./service/mutation/useDeleteCategory";
import { useState } from "react";
import { useSearchedCategoryList } from "./service/query/useSearchedCategoryList";
import { SearchModal } from "./components/search-modal";
import { useCategoryList } from "./service/query/useGetCategoryList";

interface results {
  id: string;
  title: string;
  image: string;
  children: [];
}
[];

export const CategoryList: React.FC = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [current, setCurrent] = useState(1);
  const [pages, setPages] = useState(1);

  const { data, isLoading } = useCategoryList(pages);
  const { data: searchedData } = useSearchedCategoryList(search);
  const { mutate, isPending } = useDeleteCategory();

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
    setPages(page === 1 ? 1 : (page - 1) * 5);
  };

  const deleteCategory = (data: CategoryType) => {
    mutate(data.id, {
      onSuccess: () => {
        message.success("success");
      },
    });
  };

  const dataSource = data?.results.map((item: results) => {
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
              onConfirm={() => deleteCategory(data)}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
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
          <div
            style={{
              width: "98%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="primary"
              onClick={() => navigate("/app/create-category")}
            >
              Create
            </Button>

            <SearchModal
              search={search}
              setSearch={setSearch}
              data={searchedData}
            />
          </div>
          <div
            hidden={searchedData && search ? false : true}
            style={{ width: "77%", position: "relative", zIndex: "99" }}
          ></div>
          <div
            style={{
              height: "78vh",
              marginTop: "1rem",
              overflowY: "scroll",
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
                pageSize={5}
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
