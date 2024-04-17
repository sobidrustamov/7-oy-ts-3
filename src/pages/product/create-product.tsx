import { message } from "antd";
import { ProductForm } from "./components/product-form";
import { useCreateProduct } from "./service/mutation/useCreateProduct";
import { ProductType } from "./types/product-type";
import { useNavigate } from "react-router-dom";

export const CreateProduct:React.FC = () => {
  const { mutate } = useCreateProduct();
  const navigate = useNavigate();

  const onFinish = (data: ProductType) => {
    const productData = {
      ...data,
      is_new: data.is_new ? true : false,
      is_available: data.is_available ? true : false,
    };
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("is_new", `${data.is_new ? true : false}`);
    formData.append("is_available", `${data.is_available ? true : false}`);
    if (data.image) {
      formData.append("image", data.image.file);
    }

    mutate(formData, {
      onSuccess: () => {
        message.success("success");
        navigate("/app/product-list");
      },
    });
    console.log(productData);
  };
  return (
    <div>
      <ProductForm submit={onFinish} />
    </div>
  );
};
