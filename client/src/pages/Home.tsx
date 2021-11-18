import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Ellipsis from "@quid/react-ellipsis";
import React, { useState } from "react";
import ContainerSpinner from "../components/ContainerSpinner";
import FilterModal from "../components/FilterModal";
import useGetForms, { Form } from "../hooks/useGetForms";
import { Link } from "react-router-dom";

const FormCard = ({ form }: { form: Form }) => {
  return (
    <Card
      variant="outlined"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {form.title}
        </Typography>

        <Typography variant="body2" component="div">
          <Ellipsis maxHeight={70}>{form.description}</Ellipsis>
        </Typography>
      </CardContent>
      <CardActions>
        <Link to="/response" style={{ textDecoration: "none" }}>
          <Button size="small">Respond</Button>
        </Link>
      </CardActions>
    </Card>
  );
};
``;
const Home = () => {
  const { data, isLoading } = useGetForms();
  const [open, setOpen] = useState(false);

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
        <FilterModal open={open} handleClose={handleClose} />
        <Grid container spacing={2}>
          {data &&
            data.map((form) => (
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
