import { AxiosError } from "axios";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import useAxios from "./useAxios";
import { Form } from "./useGetForms";

const useCreateForm = () => {
    const queryClient = useQueryClient();
    const AxiosInst = useAxios();
    return useMutation<void, AxiosError, Partial<FormData>>(async (data) => {
        let visibilities = [...data.visibility];
        delete data.visibility;
        let uploadData = {
            title: data.title,
            is_active: data.isActive,
            description: data.description,
            form_data: JSON.stringify(
                data.fields?.reduce(
                    (acc, curr) => {
                        if (curr.required) {
                            acc.required = [...acc.required, curr.name];
                        }
                        acc.properties[curr.fieldName] = {
                            type: "string",
                            title: curr.fieldName,
                        };
                        return acc;
                    },
                    {
                        type: "object",
                        required: [],
                        properties: {},
                    }
                )
            ),
        };
        if (data.deadline) {
            uploadData.deadline = data.deadline;
        }
        let form = await AxiosInst.post(`/forms/create`, uploadData);

        visibilities = visibilities.map((visibility) => {
            visibility.form_id = form.data.data.id;
            Object.entries(visibility).forEach(([key, value]) => {
                if (!!!value) {
                    delete visibility[key];
                } else {
                    if (key !== "form_id") {
                        visibility[key] = +value;
                    }
                }
            });
            return visibility;
        });

        console.log(visibilities);
        await Promise.all(
            visibilities.map((visbility) =>
                AxiosInst.post(`/visibility/create`, visbility)
            )
        );

        queryClient.invalidateQueries("forms");
    });
};

export interface FormData {
    title: String;
    description: String;
    fields: Fields[];
    isActive: Boolean;
    visibility: Visibility[];
    deadline: String;
}

export interface Fields {
    fieldName: String;
    required: Boolean;
}

export interface Visibility {
    year_id: String;
    department_id: String;
    division_id: String;
}

export default useCreateForm;
