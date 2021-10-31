import {
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import AxiosInst from "../axios/axios";
import useGetForms, { Form } from "../hooks/useGetForms";
import Ellipsis from "@quid/react-ellipsis";
import ContainerSpinner from "../components/ContainerSpinner";
import { Box } from "@mui/system";

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
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
};

const Home = () => {
    const { data, isLoading } = useGetForms();
    return (
        <Container fixed>
            <Box py={5}>
                {isLoading && <ContainerSpinner />}
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
