import { useParams } from "react-router-dom";
import { useSingleSubCategory } from "./service/query/useSingleSubCategory";
import { SubCategoryForm } from "../../components/subcategory-form";
import { useEditSubCategory } from "./service/mutation/useEditSubCategory";
import { CreateSubCategoryType } from "./types/sub-types";
import { Spin, Tabs, TabsProps, message } from "antd";
import { AttrebuteForm } from "./components/subattrebute-form";

export const EditSubcategory: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useSingleSubCategory(id);
  const { mutate, isPending } = useEditSubCategory(id);

  const submit = (values: CreateSubCategoryType) => {
    const formData = new FormData();
    formData.append("title", values.title);
    if (values.image) formData.append("image", values.image.file);
    // formData.append("parent", values.parent);
    mutate(formData, {
      onSuccess: (res) => {
        message.success("success");
        console.log(res);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Edit Subcategory",
      children: (
        <SubCategoryForm
          submit={submit}
          isPending={isPending}
          initialValues={{
            title: data?.title,
            image: data?.image,
            parent: data?.parent,
            attributes: data?.attributes,
          }}
        />
      ),
    },

    {
      key: "2",
      label: "Edit Attrebute",
      children: (
        <AttrebuteForm
          parent={data?.id}
          initialValues={data}
          isLoading={isLoading}
        />
      ),
    },
  ];

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin />
        </div>
      ) : (
        <Tabs defaultActiveKey={`1`} items={items} />
      )}
    </div>
  );
};
