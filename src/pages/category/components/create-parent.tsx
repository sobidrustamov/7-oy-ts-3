import React from "react";
import { useCreateCategory } from "../service/mutation/useCreateCategory";
import { CategoryForm } from "../../../components/category-form";
import { message } from "antd";
import { CreateCategoryType } from "../types-category";

interface Props {
  setParentId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setActivKey: React.Dispatch<React.SetStateAction<number>>;
}
export const CreateParent: React.FC<Props> = ({ setParentId, setActivKey }) => {
  const { mutate, isPending } = useCreateCategory();
  const submit = (values: CreateCategoryType) => {
    const formData = new FormData();
    formData.append("title", values.title);
    if (values.image) formData.append("image", values.image.file);
    formData.append("parent", "");

    mutate(formData, {
      onSuccess: (res) => {
        message.success("success");

        setParentId(res.data.id);
        setActivKey(2);
      },
    });
  };
  return (
    <div>
      <CategoryForm submit={submit} isPending={isPending} />
    </div>
  );
};
