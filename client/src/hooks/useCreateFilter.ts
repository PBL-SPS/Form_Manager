import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import useAxios from "./useAxios";
import { FilterItem } from "./useGetFilters";

const useCreateFilter = ({
    type,
}: {
    type: "department" | "year" | "division";
}) => {
    const queryClient = useQueryClient();
    const AxiosInst = useAxios();
    return useMutation<void, AxiosError, Partial<FilterItem>>(async (name) => {
        return AxiosInst.post(`/${type}/create`, { name }).then(() =>
            queryClient.invalidateQueries("filters")
        );
    });
};

export default useCreateFilter;
