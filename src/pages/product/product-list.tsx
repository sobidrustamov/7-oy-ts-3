import {
  Button,
  Image,
  Pagination,
  PaginationProps,
  Spin,
  Table,
  message,
} from "antd";
import { useProductList } from "./service/query/useProductList";
import { useNavigate } from "react-router-dom";
import { CategoryType } from "../category/types/types-category";
import { useDeleteProduct } from "./service/mutation/useDeleteProduct";
import { useState } from "react";
import { useSearchedProductList } from "./service/query/useSearchedProductList";
import { SearchModal } from "./components/search-modal";

interface results {
  id: number;
  image: string;
  category: number;
  title: string;
}
[];
export const ProductList: React.FC = () => {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(1);
  const [pages, setPages] = useState(0);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useProductList(pages);
  const { data: searchedData } = useSearchedProductList(search);
  console.log(searchedData);

  const { mutate } = useDeleteProduct();

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
    setPages((page - 1) * 5);
  };

  const deleteProduct = (id: number) => {
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
            <Button danger onClick={() => deleteProduct(data.id)}>
              Delete
            </Button>
            <a href={`edit-product/${data.id}`}>
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="primary"
              onClick={() => navigate("/app/create-product")}
            >
              Create
            </Button>
            <SearchModal
              search={search}
              setSearch={setSearch}
              data={searchedData?.results}
            />
          </div>
          <div
            style={{ height: "80vh", marginTop: "1rem", overflow: "scroll" }}
          >
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
                total={data?.count}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
