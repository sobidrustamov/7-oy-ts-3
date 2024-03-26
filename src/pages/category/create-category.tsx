import { CreateCategoryForm } from "./../../components/category-form";
import { useCreateCategory } from "./service/mutation/useCreateCategory";
import { CreateCategoryType } from "./types-category";

export const CreateCategory = () => {
  const { mutate, isPending } = useCreateCategory();

  const submit = (values: CreateCategoryType) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("image", values.image.file);
    formData.append("parent", "");

    mutate(formData, {
      onSuccess: (data) => {
        console.log(data);
      },
    });
    console.log("Success:", values);
  };
  return (
    <div>
      <CreateCategoryForm submit={submit} isPending={isPending} />
    </div>
  );
};
