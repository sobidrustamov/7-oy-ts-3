import { Tabs, message } from "antd";
import type { TabsProps } from "antd";
import { useState } from "react";
import { CategoryForm } from "../../components/category-form";
import { CreateCategoryType } from "./types/types-category";
import { useCreateCategory } from "./service/mutation/useCreateCategory";
import { useNavigate } from "react-router-dom";
import { CreateParent } from "./components/create-parent";

export const CreateCategory: React.FC = () => {
  const navigate = useNavigate();

  const [activeKey, setActivKey] = useState(1);
  const [parentId, setParentId] = useState<number | undefined>(undefined);

  const { mutate, isPending } = useCreateCategory();

  const submit = (values: CreateCategoryType) => {
    const formData = new FormData();
    formData.append("title", values.title);
    if (values.image) formData.append("image", values.image.file);
    formData.append("parent", `${parentId}`);

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
      children: (
        <CreateParent setParentId={setParentId} setActivKey={setActivKey} />
      ),
    },

    {
      key: "2",
      label: "Sub Category",
      children: <CategoryForm submit={submit} isPending={isPending} />,
    },
  ];
  console.log(activeKey, parentId);

  return (
    <div>
      <Tabs
        // defaultActiveKey={`${activeKey}`}
        activeKey={`${activeKey}`}
        items={items}
      />
    </div>
  );
};
