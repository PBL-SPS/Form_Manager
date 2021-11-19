import { useMutation, useQueryClient } from "react-query";
import useAxios from "./useAxios";

const useDeleteForm = ({ formId }: { formId: String }) => {
    const queryClient = useQueryClient();
    const AxiosInst = useAxios();
    return useMutation(async () => {
        return AxiosInst.delete(`/forms/${formId}/delete`).then(() =>
            queryClient.invalidateQueries("forms")
        );
    });
};

export default useDeleteForm;
