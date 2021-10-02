import React from "react";
import { useQuery } from "react-query";
import { Button, Paper, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
const Test = () => {
    const { isLoading, error, data, refetch }: any = useQuery("repoData", () =>
        fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
            (res) => res.json()
        )
    );

    if (isLoading)
        return (
            <Paper
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    borderRadius: 0,
                }}
            >
                <Paper elevation={3}>
                    <Box p={"5rem"}>
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />

                        <Box mt={3}>
                            <Button variant="contained" onClick={refetch}>
                                Reload
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Paper>
        );

    if (error) return <div>An error has occurred: {error.message}</div>;

    return (
        <Paper
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                borderRadius: 0,
            }}
        >
            <Paper elevation={3}>
                <Box p={"5rem"}>
                    <h1>{data.name}</h1>
                    <p>{data.description}</p>
                    <strong>👀 {data.subscribers_count}</strong>{" "}
                    <strong>✨ {data.stargazers_count}</strong>{" "}
                    <strong>🍴 {data.forks_count}</strong>
                    <Box mt={3}>
                        <Button variant="contained" onClick={refetch}>
                            Reload
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Paper>
    );
};

export default Test;
