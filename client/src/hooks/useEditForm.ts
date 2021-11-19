import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import useAxios from "./useAxios";
import { Form } from "./useGetForms";

const useEditForm = ({ formId }: { formId: String }) => {
    const queryClient = useQueryClient();
    const AxiosInst = useAxios();
    return useMutation<void, AxiosError, Partial<Form>>(async (newData) => {
        return AxiosInst.post(`/forms/${formId}/edit`, newData).then(() =>
            queryClient.invalidateQueries("forms")
        );
    });
};

export default useEditForm;
