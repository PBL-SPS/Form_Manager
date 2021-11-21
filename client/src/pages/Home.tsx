import { Button, Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useState } from "react";
import ContainerSpinner from "../components/ContainerSpinner";
import FilterModal from "../components/FilterModal";
import FormCard from "../components/FormCard";
import useAuth from "../hooks/useAuth";
import useGetForms from "../hooks/useGetForms";
import {useHistory} from "react-router-dom"

const Home = () => {
  const { data, isLoading } = useGetForms();
  const [open, setOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container fixed>
      <Box py={5}>
        {isLoading && <ContainerSpinner />}
        <Box display="flex" width="100%" justifyContent="space-between" alignItems="center" pb={4}>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          sx={{ mb: 3 }}
        >
          Filter
        </Button>
        <Button
          onClick={() => history.push("/new")}
          variant="contained"
          sx={{ mb: 3 }}
        >
          Create Form
        </Button>
        </Box>
        <FilterModal open={open} handleClose={handleClose} />
        <Grid container spacing={3}>
          {data &&
            data
              .filter((form) => {
                if (isLoggedIn) return true;
                return (
                  form.is_active &&
                  (!!form.deadline
                    ? !moment(form.deadline).isSameOrBefore(moment())
                    : true)
                );
              })
              .map((form) => (
                <Grid item xs={12} md={6} key={form.id.toString()}>
                  <FormCard form={form} />
                </Grid>
              ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
