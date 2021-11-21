import { CardContent, FormLabel, Typography } from "@material-ui/core";
import { Add, ArrowDownward, ArrowUpward, Clear } from "@mui/icons-material";
import {
    Box,
    Checkbox,
    FormControl,
    Grid,
    Input,
    InputLabel,
    Paper,
    Button,
    Container,
    FormGroup,
    FormControlLabel,
    Card,
    Chip,
} from "@mui/material";
import { FieldArray, FormikProvider, useFormik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { useHistory } from "react-router";
import * as Yup from "yup";
import VisibilityModal from "../components/VisibilityModal";
import useCreateForm from "../hooks/useCreateForm";
import useGetFilters from "../hooks/useGetFilters";

const schema = {
    title: "Todo",
    type: "object",
    required: ["title"],
    properties: {
        title: { type: "string", title: "Title", default: "A new task" },
        done: { type: "boolean", title: "Done?", default: false },
        hi: { type: "string", enum: ["hi", "hello"] },
    },
};

const uiSchema = {
    hi: {
        "ui:widget": "radio",
    },
};

let defaultFieldObj = {
    fieldName: "",
    required: false,
};

const Form = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const { data: filters } = useGetFilters();
    const { mutateAsync } = useCreateForm();
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            fields: [{ ...defaultFieldObj }],
            isActive: true,
            visibility: [],
            deadline: "",
        },
        validationSchema: Yup.object().shape({
            fields: Yup.array()
                .of(
                    Yup.object().shape({
                        fieldName: Yup.string().required(),
                        required: Yup.boolean(),
                    })
                )
                .min(1),
            title: Yup.string().required(),
            description: Yup.string().required(),
        }),
        isInitialValid: false,
        onSubmit: async (values) => {
            await mutateAsync({...values});
            history.push("/");
        },
    });
    return (
        <Grid container>
            <FormikProvider value={formik}>
                <Grid item xs={12} md={9}>
                    <Container fixed>
                        <Box my={2} width="100%">
                            <Paper elevation={3}>
                                <Box px={3} py={2}>
                                    <Typography variant="h5">Title</Typography>
                                    <Input
                                        fullWidth
                                        onChange={formik.handleChange("title")}
                                    />
                                </Box>
                            </Paper>
                        </Box>
                        <Box my={2} width="100%">
                            <Paper elevation={3}>
                                <Box px={3} py={2}>
                                    <Typography variant="h5">
                                        Description
                                    </Typography>
                                    <Input
                                        fullWidth
                                        onChange={formik.handleChange(
                                            "description"
                                        )}
                                    />
                                </Box>
                            </Paper>
                        </Box>
                    </Container>
                    <FieldArray
                        name="fields"
                        render={(arrayHelpers) => (
                            <Container fixed>
                                {formik.values.fields &&
                                formik.values.fields.length > 0 ? (
                                    formik.values.fields.map((field, index) => (
                                        <Box my={2} key={index} width="100%">
                                            <Paper elevation={3}>
                                                <Box px={3} py={2}>
                                                    <FormControl fullWidth>
                                                        <InputLabel htmlFor="my-input">
                                                            Enter your field
                                                            question
                                                        </InputLabel>
                                                        <Input
                                                            style={{
                                                                width: "100%",
                                                            }}
                                                            fullWidth
                                                            value={
                                                                formik.values
                                                                    .fields[
                                                                    index
                                                                ]?.fieldName
                                                            }
                                                            name={`fields.${index}.fieldName`}
                                                            onChange={formik.handleChange(
                                                                `fields.${index}.fieldName`
                                                            )}
                                                        />
                                                    </FormControl>
                                                    <Box
                                                        display="flex"
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                        mt={3}
                                                    >
                                                        <Box>
                                                            <FormGroup>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            defaultChecked
                                                                        />
                                                                    }
                                                                    checked={
                                                                        formik
                                                                            .values
                                                                            .fields[
                                                                            index
                                                                        ]
                                                                            ?.required
                                                                    }
                                                                    name={`fields.${index}.required`}
                                                                    onChange={formik.handleChange(
                                                                        `fields.${index}.required`
                                                                    )}
                                                                    label="Required"
                                                                />
                                                            </FormGroup>
                                                        </Box>
                                                        <Box>
                                                            <Button
                                                                size="small"
                                                                color="primary"
                                                                variant="text"
                                                                startIcon={
                                                                    <ArrowUpward />
                                                                }
                                                                onClick={() => {
                                                                    arrayHelpers.insert(
                                                                        index,
                                                                        {
                                                                            ...defaultFieldObj,
                                                                        }
                                                                    );
                                                                }}
                                                                style={{
                                                                    margin: "0rem .5rem",
                                                                }}
                                                            >
                                                                ADD BEFORE
                                                            </Button>
                                                            <Button
                                                                size="small"
                                                                color="primary"
                                                                variant="text"
                                                                startIcon={
                                                                    <ArrowDownward />
                                                                }
                                                                style={{
                                                                    margin: "0rem .5rem",
                                                                }}
                                                                onClick={() =>
                                                                    arrayHelpers.insert(
                                                                        index +
                                                                            1,
                                                                        {
                                                                            ...defaultFieldObj,
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                ADD AFTER
                                                            </Button>
                                                            <Button
                                                                size="small"
                                                                color="primary"
                                                                variant="text"
                                                                startIcon={
                                                                    <Clear />
                                                                }
                                                                style={{
                                                                    margin: "0rem .5rem",
                                                                }}
                                                                onClick={() =>
                                                                    arrayHelpers.remove(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                REMOVE
                                                            </Button>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Paper>
                                        </Box>
                                    ))
                                ) : (
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        mt={3}
                                    >
                                        <Button
                                            type="button"
                                            onClick={() =>
                                                arrayHelpers.push({
                                                    ...defaultFieldObj,
                                                })
                                            }
                                            color="primary"
                                            variant="contained"
                                        >
                                            {/* show this when user has removed all friends from the list */}
                                            Add a Field
                                        </Button>
                                    </Box>
                                )}

                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    mt={3}
                                >
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        disabled={
                                            !formik.isValid ||
                                            formik.isSubmitting
                                        }
                                        onClick={formik.handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </Container>
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={3} pt={2}>
                    <Card>
                        <Box px={3} py={3}>
                            <Box>
                                <FormControlLabel
                                    checked={formik.values.isActive}
                                    onChange={formik.handleChange("isActive")}
                                    control={<Checkbox />}
                                    label="Active"
                                />
                            </Box>
                            <Box mt={2} width="100%">
                                <Typography variant="body2">
                                    Deadline
                                </Typography>
                                <Input
                                    type="datetime-local"
                                    onChange={(e) =>
                                        formik.setFieldValue(
                                            "deadline",
                                            moment(e.target.value).toISOString()
                                        )
                                    }
                                    fullWidth
                                />
                            </Box>
                            <Box mt={2} width="100%">
                                <Typography variant="body2">Filters</Typography>
                                <FieldArray
                                    name="visibility"
                                    render={(arrayHelpers) => {
                                        return (
                                            <>
                                                {formik.values.visibility
                                                    .length > 0 &&
                                                    formik.values.visibility.map(
                                                        (visibility, index) => (
                                                            <Chip
                                                                label={Object.entries(
                                                                    visibility
                                                                )
                                                                    .map(
                                                                        ([
                                                                            key,
                                                                            value,
                                                                        ]) => {
                                                                            if (
                                                                                !!value
                                                                            ) {
                                                                                if (
                                                                                    key ===
                                                                                    "year_id"
                                                                                ) {
                                                                                    return filters?.years.find(
                                                                                        (
                                                                                            year
                                                                                        ) =>
                                                                                            year.id ===
                                                                                            +value
                                                                                    )
                                                                                        ?.name;
                                                                                } else if (
                                                                                    key ===
                                                                                    "department_id"
                                                                                ) {
                                                                                    return filters?.departments.find(
                                                                                        (
                                                                                            department
                                                                                        ) =>
                                                                                            department.id ===
                                                                                            +value
                                                                                    )
                                                                                        ?.name;
                                                                                } else {
                                                                                    return filters?.divisions.find(
                                                                                        (
                                                                                            division
                                                                                        ) =>
                                                                                            division.id ===
                                                                                            +value
                                                                                    )
                                                                                        ?.name;
                                                                                }
                                                                            }
                                                                            return null;
                                                                        }
                                                                    )
                                                                    .filter(
                                                                        (
                                                                            data
                                                                        ) =>
                                                                            !!data
                                                                    )
                                                                    .join("-")}
                                                                variant="outlined"
                                                                onDelete={() =>
                                                                    arrayHelpers.remove(
                                                                        index
                                                                    )
                                                                }
                                                            />
                                                        )
                                                    )}
                                                <VisibilityModal
                                                    open={modalOpen}
                                                    handleClose={() =>
                                                        setModalOpen(false)
                                                    }
                                                    handleSubmit={(values) => {
                                                        arrayHelpers.push(
                                                            values
                                                        );
                                                    }}
                                                />
                                            </>
                                        );
                                    }}
                                />

                                <Button
                                    endIcon={<Add />}
                                    onClick={() => setModalOpen(true)}
                                >
                                    Add
                                </Button>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            </FormikProvider>
        </Grid>
    );
};

export default Form;
