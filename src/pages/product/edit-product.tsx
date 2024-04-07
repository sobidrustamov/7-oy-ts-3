import { useNavigate, useParams } from "react-router-dom";
import { ProductForm } from "./components/product-form";
import { useEditProduct } from "./service/mutation/useEditProduct";
import { ProductType } from "./types/product-type";
import { useSingleProduct } from "./service/query/useSingleProduct";
import { message } from "antd";

export const EditProduct: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useSingleProduct(id);
  const { mutate } = useEditProduct(id);

  const onFinish = (data: ProductType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("is_new", `${data.is_new ? true : false}`);
    formData.append("is_available", `${data.is_available ? true : false}`);
    if (typeof data.image !== "string") {
      formData.append("image", data.image.file);
    }
    mutate(formData, {
      onSuccess: () => {
        message.success("success");
        navigate("/app/product-list");
      },
    });
  };
  return (
    <div>
      <ProductForm
        submit={onFinish}
        initialValue={data}
        isLoading={isLoading}
      />
    </div>
  );
};
