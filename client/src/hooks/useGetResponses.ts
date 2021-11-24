import { AxiosError } from "axios";
import React from "react";
import { useQuery } from "react-query";
import AxiosInst from "../axios/axios";
import { FormsResponse } from "./useGetForms";

export interface ResponseItem {
  id: String;
  form_id: String;
  response_data: String;
  created_at: String;
  updated_at: String;
}

export interface Response {
  responses: ResponseItem[];
}

const useGetResponses = (formId: string) => {
  return useQuery(
    `response/getResponses/${formId}`,
    async () => {
      let data = await Promise.all([
        AxiosInst.get<Response>(`response/getResponses/${formId}`).then(
          (res) => res.data.data
        ),
        AxiosInst.get<FormsResponse>(`/forms/${formId}`).then(
          (res) => res.data.data
        ),
      ]);
      return { responseData: data[0], formData: data[1] };
    },
    {
      refetchOnWindowFocus: true,
    }
  );
};

export default useGetResponses;
