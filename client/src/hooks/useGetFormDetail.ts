import { AxiosError } from "axios";
import React from "react";
import { useQuery } from "react-query";
import AxiosInst from "../axios/axios";
import { Form, FormsResponse } from "./useGetForms";

const useGetFormDetail = (formId: string) => {
    return useQuery<Form, AxiosError>(
        `forms/${formId}`,
        async () => {
            return AxiosInst.get<FormsResponse>(`/forms/${formId}`).then(
                (res) => res.data.data[0]
            );
        },
        {
            refetchOnWindowFocus: false,
        }
    );
};

export default useGetFormDetail;
