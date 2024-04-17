import { Spin, message } from "antd";
import { BannerForm } from "./components/banner-form";
import { CreateBannerType } from "./types/type";
import { useEditBanner } from "./service/mutation/useEditBanner";
import { useNavigate, useParams } from "react-router-dom";
import { useBanner } from "./service/query/useBanner";

export const EditBanner: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useBanner(id);

  const { mutate } = useEditBanner(id);
  const submit = (values: CreateBannerType) => {
    const formData = new FormData();
    formData.append("title", values.title);
    if (typeof values.image !== "string") {
      formData.append("image", values.image.file);
    }
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
      {isLoading ? (
        <Spin />
      ) : (
        <BannerForm submit={submit} initialValue={data} />
      )}
    </div>
  );
};
