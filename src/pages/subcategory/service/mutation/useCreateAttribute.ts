import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface AttrebuteType {
  attributes: {
    attribute_id: null | number;
    title: string;
    values: {
      value: string;
      value_id: null | number;
    }[];
  }[];
  category_id: number | undefined;
}
[];
export const useCreateAttribute = () => {
  return useMutation({
    mutationFn: (data: AttrebuteType) =>
      request
        .patch<AttrebuteType>("api/category_edit/", data)
        .then((res) => res.data),
  });
};
