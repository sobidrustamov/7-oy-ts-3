import { useNavigate } from "react-router-dom";
import { useCreateSubCategory } from "./service/mutation/useCreateSubCategory";
import { Tabs, message } from "antd";
import type { TabsProps } from "antd";
import { CreateSubCategoryType } from "./types/sub-types";
import { SubCategoryForm } from "../../components/subcategory-form";

export const CreateSubCategory: React.FC = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useCreateSubCategory();

  const submit = (values: CreateSubCategoryType) => {
    const formData = new FormData();
    formData.append("title", values.title);
    if (values.image) formData.append("image", values.image.file);
    formData.append("parent", values.parent);

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
      label: "Sub Category",
      children: <SubCategoryForm submit={submit} isPending={isPending} />,
    },
    {
      key: "2",
      label: "Attrebute",
      children: "Sub Category Attrebute",
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};
