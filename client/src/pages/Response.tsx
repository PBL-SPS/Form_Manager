import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
  TextField,
} from "@mui/material";
import React from "react";
import Ellipsis from "@quid/react-ellipsis";

const Response = () => {
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
        variant="outlined"
      >
        <div
          style={{ backgroundColor: "#673AB7", height: "5px", width: "100%" }}
        ></div>
        <CardContent>
          <div>
            <Typography variant="h4" component="div">
              Credit Suisse Internship Form
            </Typography>
          </div>
          <Typography sx={{ mt: 3 }} variant="body1" component="div">
            <Ellipsis maxHeight={70}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit
              magni voluptatibus doloribus repudiandae quod, accusamus itaque,
              atque illo maxime eveniet saepe quibusdam ea, nam accusantium quam
              temporibus. Labore, tempore ab.
            </Ellipsis>
          </Typography>
        </CardContent>
      </Card>
      <Card
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
        variant="outlined"
      >
        <CardContent>
          <div>
            <Typography variant="h6" component="div">
              Student Name
            </Typography>
          </div>
          <TextField
            style={{ width: "50%", marginTop: "15px" }}
            id="standard-basic"
            label="Your Answer"
            variant="standard"
          />
        </CardContent>
      </Card>
      <Card
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
        variant="outlined"
      >
        <CardContent>
          <div>
            <Typography variant="h6" component="div">
              College Name
            </Typography>
          </div>
          <TextField
            style={{ width: "50%", marginTop: "15px" }}
            id="standard-basic"
            label="Your Answer"
            variant="standard"
          />
        </CardContent>
      </Card>
      <Card
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
        variant="outlined"
      >
        <CardContent>
          <div>
            <Typography variant="h6" component="div">
              Address
            </Typography>
          </div>
          <TextField
            style={{ width: "50%", marginTop: "15px" }}
            id="standard-basic"
            label="Your Answer"
            variant="standard"
          />
        </CardContent>
      </Card>
      <Card
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
        variant="outlined"
      >
        <CardContent>
          <div>
            <Typography variant="h6" component="div">
              Contact
            </Typography>
          </div>
          <TextField
            style={{ width: "50%", marginTop: "15px" }}
            id="standard-basic"
            label="Your Answer"
            variant="standard"
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default Response;
