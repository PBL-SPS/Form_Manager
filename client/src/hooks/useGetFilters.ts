import { AxiosError } from "axios";
import { useQuery } from "react-query";
import AxiosInst from "../axios/axios";

const useGetFilters = () => {
  return useQuery<Filter, AxiosError>(
    "filters",
    async () => {
      let data = await Promise.all([
        AxiosInst.get("/department/get").then((res) => res.data.data),
        AxiosInst.get("/year/get").then((res) => res.data.data),
        AxiosInst.get("/division/get").then((res) => res.data.data),
      ]);
      return { divisions: data[2], departments: data[0], years: data[1] };
    },
    { initialData: { divisions: [], departments: [], years: [] } }
  );
};

export default useGetFilters;

export interface FilterItem {
  id: number;
  name: string;
}

export interface Filter {
  divisions: FilterItem[];
  departments: FilterItem[];
  years: FilterItem[];
}
