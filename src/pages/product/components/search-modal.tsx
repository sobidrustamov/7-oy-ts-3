import React, { useState } from "react";
import { Button, Image, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

interface Props {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  data?:
    | {
        category: number;
        id: number;
        image: string;
        is_available: boolean;
        is_new: boolean;
        price: string;
        title: string;
      }[]
    | undefined;
}

export const SearchModal: React.FC<Props> = ({ setSearch, search, data }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button type="primary" icon={<SearchOutlined />} onClick={showModal}>
        Search
      </Button>
      <Modal
        title="Search..."
        open={isModalOpen}
        footer
        width={1100}
        onCancel={handleCancel}
      >
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
        {search?.length > 2 &&
          data?.map((item, i) => (
            <div
              onClick={() => navigate(`/app/edit-product/${item.id}`)}
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
      </Modal>
    </div>
  );
};
