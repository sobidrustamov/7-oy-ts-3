import { message } from "antd";
import { BrandForm } from "./components/brand-form";
import { CreateBrandType } from "./types/type";
import { useCreateBrand } from "./service/mutation/useCreateBrand";

export const CreateBrand:React.FC = () => {
  const { mutate } = useCreateBrand();
  const submit = (values: CreateBrandType) => {
    const formData = new FormData();
    formData.append("title", values.title);
    if (values.image) formData.append("image", values.image.file);
    mutate(formData, {
      onSuccess: () => {
        message.success("success");
      },
    });
  };
  return (
    <div>
      <BrandForm submit={submit} />
    </div>
  );
};
