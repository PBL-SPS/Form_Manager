import React from "react";
import { useQuery } from "react-query";
import AxiosInst from "../axios/axios";

const useGetForms = () => {
    return useQuery("forms", async () => {
        return AxiosInst.get<FormsResponse>("/forms").then(
            (res) => res.data.data
        );
    });
};

export default useGetForms;

export interface FormsResponse {
    message: string;
    data?: Form[] | null;
}
export interface Form {
    id: string;
    title: string;
    description: string;
    is_active: number;
    form_data: string;
    created_by: string;
    created_at: string;
    updated_at: string;
    deadline: string;
    visibilities?: null[] | null;
}
