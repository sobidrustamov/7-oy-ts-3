import { UploadFile } from "antd";

export interface CreateBannerType {
  // id: number;
  title: string;
  description: string;
  image: {
    file: File;
    fileList: UploadFile;
  };
}
export interface BannerType {
  id: number;
  title: string;
  image: string;
  description: string;
  created_at: string;
  updated_at: string;
}
