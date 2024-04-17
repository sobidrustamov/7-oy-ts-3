import { UploadFile } from "antd";

export interface CreateBrandType {
  title: string;
  image: {
    file: File;
    fileList: UploadFile;
  };
}
export interface BrandType {
  id: number;
  title: string;
  image: string;
}
