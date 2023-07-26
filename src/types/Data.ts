export interface ICategory {
  name: "stirng";
}

export interface ICollection {
  category: number;
  name: string;
  photos: string[];
}

export interface IResponse {
  categories: ICategory[];
  collections: ICollection[];
}
