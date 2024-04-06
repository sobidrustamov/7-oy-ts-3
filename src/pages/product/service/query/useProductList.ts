import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

// interface ResponceType {
//   count: number;
//   next: string;
//   previous: string;
//   results: [{}];
// }

export const useProductList = () => {
  return useQuery({
    queryKey: ["product-list"],
    queryFn: () =>
      request.get("product/").then((res) => res.data),
  });
};
