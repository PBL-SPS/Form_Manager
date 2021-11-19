import {
    Container,
    Grid
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React from "react";
import ContainerSpinner from "../components/ContainerSpinner";
import FormCard from "../components/FormCard";
import useAuth from "../hooks/useAuth";
import useGetForms from "../hooks/useGetForms";

const Home = () => {
    const { data, isLoading } = useGetForms();
    const { isLoggedIn } = useAuth();
    return (
        <Container fixed>
            <Box py={5}>
                {isLoading && <ContainerSpinner />}
                <Grid container spacing={3}>
                    {data &&
                        data.filter(form => {
                            if (isLoggedIn) return true;
                            return !!form.deadline ? !moment(form.deadline).isSameOrBefore(moment()) : true;
                        }).map((form) => (
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
