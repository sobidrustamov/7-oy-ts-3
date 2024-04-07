import { UploadFile } from "antd";

export interface ProductType {
  title: string;
  price: string;
  is_available: boolean;
  category: string;
  is_new: boolean;
  image: { file: File; fileList: UploadFile };
}

export interface ResponseProduct {
  id: number;
  image: string;
  title: string;
  price: string;
  is_available: boolean;
  category: number;
  is_new: boolean;
}
