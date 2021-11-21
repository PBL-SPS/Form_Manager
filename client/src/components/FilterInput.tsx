import { Box, OutlinedInput, Button } from "@mui/material";
import { useFormik } from "formik";
import React from "react";

const FilterInput = ({
    useCreateFilter,
    name,
}: {
    useCreateFilter: any;
    name: "department" | "year" | "division";
}) => {
    const { mutate } = useCreateFilter({ type: name });
    const formik = useFormik({
        initialValues: { value: "" },
        onSubmit: (values, helpers) => {
            mutate(values.value);
            helpers.resetForm();
        },
    });
    return (
        <Box my={2} display="flex" alignItems="center">
            <Box flexGrow={1}>
                <OutlinedInput
                    fullWidth
                    size="small"
                    value={formik.values.value}
                    placeholder={`Enter ${name} name`}
                    onChange={formik.handleChange("value")}
                />
            </Box>
            <Box>
                <Button size="small" onClick={formik.handleSubmit}>
                    Add
                </Button>
            </Box>
        </Box>
    );
};

export default FilterInput;
