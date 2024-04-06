export interface AttrebuteType {
  attr_list: {
    category: [];
    title: string;
    values: [];
  }[];
}

export interface CreateAttributeType {
  attr_list: AttrebuteType[];
}
