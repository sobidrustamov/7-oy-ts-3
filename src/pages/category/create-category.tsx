import { useNavigate } from "react-router-dom";
import { CategoryForm } from "./../../components/category-form";
import { useCreateCategory } from "./service/mutation/useCreateCategory";
import { CreateCategoryType } from "./types-category";
import { Tabs, message } from "antd";
import type { TabsProps } from "antd";

export const CreateCategory: React.FC = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useCreateCategory();

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
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Create",
      children: <CategoryForm submit={submit} isPending={isPending} />,
    },
    {
      key: "2",
      label: "Sub Category",
      children: "Sub Category Items",
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};
