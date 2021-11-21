import { Add } from "@mui/icons-material";
import { OutlinedInput, Radio, RadioGroup } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Fade from "@mui/material/Fade";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Modal from "@mui/material/Modal";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useFormik } from "formik";
import React, { useState } from "react";
import useCreateFilter from "../hooks/useCreateFilter";
import useGetFilters from "../hooks/useGetFilters";
import FilterInput from "./FilterInput";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const VisibilityModal = ({
    open = false,
    handleClose,
    handleSubmit,
}: {
    open: boolean;
    handleClose: () => void;
    handleSubmit: (values: any) => void;
}) => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const { data } = useGetFilters();

    const formik = useFormik({
        initialValues: {
            department_id: "",
            year_id: "",
            division_id: "",
        },
        onSubmit: (values, helpers) => {
            console.log(values);
            handleSubmit(values);
            helpers.resetForm();
            handleClose();
        },
    });

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                        >
                            <Tab label="Department" {...a11yProps(0)} />
                            <Tab label="Year" {...a11yProps(1)} />
                            <Tab label="Division" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <FilterInput
                            useCreateFilter={useCreateFilter}
                            name="department"
                        />
                        <RadioGroup
                            onChange={formik.handleChange("department_id")}
                        >
                            {data?.departments.map((dept) => (
                                <FormControlLabel
                                    checked={
                                        formik.values.department_id ===
                                        dept.id.toString()
                                    }
                                    value={dept.id}
                                    control={<Radio />}
                                    label={dept.name}
                                />
                            ))}
                        </RadioGroup>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <FilterInput
                            useCreateFilter={useCreateFilter}
                            name="year"
                        />
                        <RadioGroup onChange={formik.handleChange("year_id")}>
                            {data?.years.map((year) => (
                                <FormControlLabel
                                    checked={
                                        formik.values.year_id ===
                                        year.id.toString()
                                    }
                                    disabled={!!!formik.values.department_id}
                                    value={year.id}
                                    control={<Radio />}
                                    label={year.name}
                                />
                            ))}
                        </RadioGroup>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <FilterInput
                            useCreateFilter={useCreateFilter}
                            name="division"
                        />
                        <RadioGroup
                            onChange={formik.handleChange("division_id")}
                        >
                            {data?.divisions.map((div) => (
                                <FormControlLabel
                                    checked={
                                        formik.values.division_id ===
                                        div.id.toString()
                                    }
                                    disabled={!!!formik.values.year_id}
                                    value={div.id}
                                    control={<Radio />}
                                    label={div.name}
                                />
                            ))}
                        </RadioGroup>
                    </TabPanel>
                    <Button
                        variant="contained"
                        sx={{ float: "right" }}
                        onClick={formik.handleSubmit}
                    >
                        Add
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{ mr: 2, float: "right" }}
                        onClick={() => {
                            formik.resetForm();
                            handleClose();
                        }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Fade>
        </Modal>
    );
};

export default VisibilityModal;
