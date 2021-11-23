import React from "react";
import { useMutation } from "react-query";
import AxiosInst from "../axios/axios";

const useAddResponse = (formId: String) => {
    return useMutation(async (data) => {
        let uploadData = {
            form_id: formId,
            response_data: JSON.stringify(data),
        };
        return AxiosInst.post("/response/create", uploadData);
    });
};

export default useAddResponse;
