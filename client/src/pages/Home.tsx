import { Button, Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useState } from "react";
import ContainerSpinner from "../components/ContainerSpinner";
import FilterModal from "../components/FilterModal";
import FormCard from "../components/FormCard";
import useAuth from "../hooks/useAuth";
import useGetForms from "../hooks/useGetForms";

const Home = () => {
  const { data, isLoading } = useGetForms();
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    departments: "",
    years: "",
    divisions: "",
  });
  const { isLoggedIn } = useAuth();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container fixed>
      <Box py={5}>
        {isLoading && <ContainerSpinner />}
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          sx={{ mb: 3 }}
        >
          Filter
        </Button>
        <FilterModal
          open={open}
          handleClose={handleClose}
          setFilters={setFilters}
        />
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
              .filter((form) =>
                form?.visibilities?.some((visibility) => {
                  console.log("Filters->", filters);
                  console.log("Dept Visibility->", visibility?.department_id);
                  console.log("Year Visibility->", visibility?.year_id);
                  console.log("Div Visibility->", visibility?.division_id);
                  let found = false;
                  if (
                    filters.years === "" ||
                    filters.departments === "" ||
                    filters.divisions === ""
                  ) {
                    found = true;
                  }
                  if (!!filters.years) {
                    found =
                      visibility?.year_id.toString() ===
                      filters.years.toString();
                  }
                  if (!!filters.departments) {
                    found =
                      visibility?.department_id.toString() ===
                      filters.departments.toString();
                  }
                  if (!!filters.divisions) {
                    found =
                      visibility?.division_id.toString() ===
                      filters.divisions.toString();
                  }
                  console.log("Found", found);
                  return found;
                })
              )
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
