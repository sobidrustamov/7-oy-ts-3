import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface AttrebuteType {
  count: number;
  next: string;
  previous: null;
  results: [];
}
export const useAttributeList = () => {
  return useQuery({
    queryKey: ["attribute-list"],
    queryFn: () => request.get<AttrebuteType>("/attribute/").then((res) => res.data),
  });
};
