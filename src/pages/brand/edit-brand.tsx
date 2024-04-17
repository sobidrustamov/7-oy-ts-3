import { Spin, message } from "antd";
import { BrandForm } from "./components/brand-form";
import { CreateBrandType } from "./types/type";
import { useEditBrand } from "./service/mutation/useEditBrand";
import { useParams } from "react-router-dom";
import { useBrand } from "./service/query/useBrand";

export const EditBrand:React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useBrand(id);
  console.log(data);

  const { mutate } = useEditBrand(id);
  const submit = (values: CreateBrandType) => {
    const formData = new FormData();
    formData.append("title", values.title);
    if (typeof values.image !== "string") {
      formData.append("image", values.image.file);
    }
    mutate(formData, {
      onSuccess: () => {
        message.success("success");
      },
    });
  };
  return (
    <div>
      {isLoading ? <Spin /> : <BrandForm submit={submit} initialValue={data} />}
    </div>
  );
};
