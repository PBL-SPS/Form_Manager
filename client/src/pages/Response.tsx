import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    TextField,
    Typography,
} from "@mui/material";
import { FieldTemplateProps, utils, WidgetProps, withTheme } from "@rjsf/core";
import React from "react";
import { useHistory, useParams } from "react-router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
import ContainerSpinner from "../components/ContainerSpinner";
import ObjectFieldTemplate from "../components/ObjectFieldTemplate";
import useAddResponse from "../hooks/useAddResponse";
import useGetFormDetail from "../hooks/useGetFormDetail";
const { getDisplayLabel } = utils;
function CustomFieldTemplate(props: FieldTemplateProps) {
    const {
        id,
        classNames,
        label,
        help,
        required,
        description,
        errors,
        children,
    } = props;
    return (
        <div className={classNames}>
            {/* <label htmlFor={id}>
                {label}
                {required ? "*" : null}
            </label> */}
            {description}
            {children}
            {errors}
            {help}
        </div>
    );
}
const Form = withTheme({
    ObjectFieldTemplate: ObjectFieldTemplate,
    FieldTemplate: CustomFieldTemplate,
});

const CustomInput = function ({
    id,
    placeholder,
    required,
    readonly,
    disabled,
    type,
    label,
    value,
    onChange,
    onBlur,
    onFocus,
    autofocus,
    options,
    schema,
    uiSchema,
    rawErrors = [],
    formContext,
    registry, // pull out the registry so it doesn't end up in the textFieldProps
    ...textFieldProps
}: WidgetProps) {
    const _onChange = ({
        target: { value },
    }: React.ChangeEvent<HTMLInputElement>) =>
        onChange(value === "" ? options.emptyValue : value);
    const _onBlur = ({
        target: { value },
    }: React.FocusEvent<HTMLInputElement>) => onBlur(id, value);
    const _onFocus = ({
        target: { value },
    }: React.FocusEvent<HTMLInputElement>) => onFocus(id, value);

    const displayLabel = getDisplayLabel(
        schema,
        uiSchema
        /* TODO: , rootSchema */
    );
    const inputType =
        (type || schema.type) === "string" ? "text" : `${type || schema.type}`;

    return (
        <Card
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
            variant="elevation"
            elevation={2}
        >
            <CardContent>
                <Box display="flex" alignItems="center">
                    <Typography variant="h6" component="div">
                        {schema.title}
                    </Typography>
                    {required ? (
                        <Typography color="error" ml={1}>
                            *
                        </Typography>
                    ) : null}
                </Box>
                <TextField
                    style={{ marginTop: "15px" }}
                    fullWidth
                    variant="standard"
                    id={id}
                    placeholder={placeholder}
                    autoFocus={autofocus}
                    required={required}
                    disabled={disabled || readonly}
                    type={inputType as string}
                    value={value || value === 0 ? value : ""}
                    error={rawErrors.length > 0}
                    onChange={_onChange}
                    onBlur={_onBlur}
                    onFocus={_onFocus}
                    {...textFieldProps}
                />
            </CardContent>
        </Card>
    );
};

const widgets = {
    TextInput: CustomInput,
};

const Response = () => {
    const { formId } = useParams();
    const { data, isLoading } = useGetFormDetail(formId);
    const { isLoading: submitting, mutateAsync } = useAddResponse(formId);
    const history = useHistory();

    const DefaultChilren = () => (
        <Box width="100%" display="flex" justifyContent="center" my={3}>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={submitting}
            >
                Submit
            </Button>
        </Box>
    );

    if (isLoading || !data) {
        return <ContainerSpinner />;
    }

    return (
        <Container>
            <Card
                style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    marginTop: "20px",
                    overflow: "hidden",
                }}
                variant="elevation"
                elevation={2}
            >
                <div
                    style={{
                        backgroundColor: "#673AB7",
                        height: "5px",
                        width: "100%",
                    }}
                ></div>
                <CardContent>
                    <div>
                        <Typography variant="h4" component="div">
                            {data?.title}
                        </Typography>
                    </div>
                    <Typography sx={{ mt: 3 }} variant="body1" component="div">
                        {data?.description}
                    </Typography>
                </CardContent>
            </Card>
            <Form
                schema={JSON.parse(data?.form_data)}
                widgets={widgets}
                children={<DefaultChilren />}
                onSubmit={async (data) => {
                    await mutateAsync(data.formData);
                    MySwal.fire(
                        "Success",
                        "Form submitted successfully",
                        "success"
                    ).then(() => history.push("/"));
                }}
                uiSchema={
                    JSON.parse(data?.form_data)?.properties
                        ? Object.keys(
                              JSON.parse(data?.form_data)?.properties
                          ).reduce((acc, curr) => {
                              acc[curr] = { "ui:widget": "TextInput" };
                              return acc;
                          }, {})
                        : {}
                }
            />
        </Container>
    );
};

export default Response;
