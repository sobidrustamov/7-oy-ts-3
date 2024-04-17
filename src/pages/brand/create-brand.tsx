import { message } from "antd";
import { BrandForm } from "./components/brand-form";
import { CreateBrandType } from "./types/type";
import { useCreateBrand } from "./service/mutation/useCreateBrand";
import { useNavigate } from "react-router-dom";

export const CreateBrand: React.FC = () => {
  const navigate = useNavigate();
  const { mutate } = useCreateBrand();
  const submit = (values: CreateBrandType) => {
    const formData = new FormData();
    formData.append("title", values.title);
    if (values.image) formData.append("image", values.image.file);
    mutate(formData, {
      onSuccess: () => {
        message.success("success");
        navigate("/app/brand-list");
      },
    });
  };
  return (
    <div>
      <BrandForm submit={submit} />
    </div>
  );
};
