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
import React, { useState } from "react";

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
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
                <FormControlLabel control={<Checkbox />} label="CS" />
                <FormControlLabel control={<Checkbox />} label="IT" />
                <FormControlLabel control={<Checkbox />} label="EnTC" />
              </FormGroup>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="FE" />
                <FormControlLabel control={<Checkbox />} label="SE" />
                <FormControlLabel control={<Checkbox />} label="TE" />
                <FormControlLabel control={<Checkbox />} label="BE " />
              </FormGroup>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="1" />
                <FormControlLabel control={<Checkbox />} label="2" />
                <FormControlLabel control={<Checkbox />} label="3" />
                <FormControlLabel control={<Checkbox />} label="4" />
              </FormGroup>
            </TabPanel>
            <Button variant="contained" sx={{ float: "right" }}>
              Apply
            </Button>
            <Button variant="outlined" sx={{ mr: 2, float: "right" }}>
              Clear All
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default FilterModal;
