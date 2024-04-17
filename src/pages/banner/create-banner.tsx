import { message } from "antd";
import { BannerForm } from "./components/banner-form";
import { useCreateBanner } from "./service/mutation/useCreateBanner";
import { CreateBannerType } from "./types/type";
import { useNavigate } from "react-router-dom";

export const CreateBanner: React.FC = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useCreateBanner();

  const submit = (values: CreateBannerType) => {
    const formData = new FormData();
    formData.append("title", values.title);
    if (values.image) formData.append("image", values.image.file);
    formData.append("description", values.description);
    mutate(formData, {
      onSuccess: () => {
        message.success("success");
        navigate("/app/banner-list");
      },
    });
  };
  return (
    <div>
      <BannerForm submit={submit} isPending={isPending} />
    </div>
  );
};
