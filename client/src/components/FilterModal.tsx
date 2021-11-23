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
import React, { useEffect, useState } from "react";
import useGetFilters from "../hooks/useGetFilters";

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

const FilterModal = ({
    open = false,
    handleClose,
    setFilters,
    filters,
}: {
    open: boolean;
    handleClose: () => void;
    setFilters: any;
    filters: {
        departments: String;
        years: String;
        divisions: String;
    };
}) => {
    const [value, setValue] = useState(0);
    const [departmentId, setDepartmentId] = useState(0);
    const [yearId, setYearId] = useState(0);
    const [divisionId, setDivisionId] = useState(0);

    useEffect(() => {
        setDepartmentId(!!filters.departments ? +filters.departments : 0);
        setYearId(!!filters.years ? +filters.years : 0);
        setDivisionId(!!filters.divisions ? +filters.divisions : 0);

        return () => {};
    }, [filters]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const onSubmit = () => {
        console.log("Department values->", departmentId);
        console.log("year values->", yearId);
        console.log("division values->", divisionId);

        setFilters({
            departments: departmentId,
            years: yearId,
            divisions: divisionId,
        });
    };

    const clearAll = () => {
        setFilters({
            departments: "",
            years: "",
            divisions: "",
        });
    };

    const { data } = useGetFilters();

    return (
        <>
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
                            <FormGroup>
                                {data?.departments.map((dept) => (
                                    <FormControlLabel
                                        value={departmentId}
                                        onChange={() =>
                                            setDepartmentId(dept.id)
                                        }
                                        checked={departmentId === dept.id}
                                        control={<Checkbox />}
                                        label={dept.name}
                                        id={JSON.stringify(dept.id)}
                                    />
                                ))}
                            </FormGroup>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <FormGroup>
                                {data?.years.map((year) => (
                                    <FormControlLabel
                                        value={yearId}
                                        onChange={() => setYearId(year.id)}
                                        checked={yearId === year.id}
                                        control={<Checkbox />}
                                        label={year.name}
                                        id={JSON.stringify(year.id)}
                                    />
                                ))}
                            </FormGroup>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <FormGroup>
                                {data?.divisions.map((div) => (
                                    <FormControlLabel
                                        value={divisionId}
                                        checked={divisionId === div.id}
                                        onChange={() => setDivisionId(div.id)}
                                        control={<Checkbox />}
                                        label={div.name}
                                        id={JSON.stringify(div.id)}
                                    />
                                ))}
                            </FormGroup>
                        </TabPanel>
                        <Button
                            onClick={() => {
                                onSubmit();
                                handleClose();
                            }}
                            variant="contained"
                            sx={{ float: "right" }}
                        >
                            Apply
                        </Button>
                        <Button
                            onClick={() => {
                                clearAll();
                                handleClose();
                            }}
                            variant="outlined"
                            sx={{ mr: 2, float: "right" }}
                        >
                            Clear All
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default FilterModal;
