import {
  ArrowForward,
  Check,
  DeleteOutline,
  MoreVert,
  NotInterestedOutlined,
  ScheduleOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Ellipsis from "@quid/react-ellipsis";
import moment from "moment";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useDeleteForm from "../hooks/useDeleteForm";
import useEditForm from "../hooks/useEditForm";
import { Form } from "../hooks/useGetForms";

const FormCard = ({ form }: { form: Form }) => {
  const history = useHistory();
  const {
    mutate: editForm,
    error,
    isLoading: isEditing,
  } = useEditForm({ formId: form.id });
  const { mutate: deleteForm, isLoading: isDeleting } = useDeleteForm({
    formId: form.id,
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { isLoggedIn } = useAuth();
  const isExpired = moment(form.deadline).isSameOrBefore(moment());

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const options = [
    {
      name: form.is_active ? "Disable" : "Activate",
      icon: form.is_active ? <NotInterestedOutlined /> : <Check />,
      onClick: () => editForm({ is_active: !form.is_active }),
    },
    {
      name: "Delete",
      icon: <DeleteOutline />,
      onClick: () => deleteForm(),
    },
  ];
  return (
    <Card
      elevation={2}
      variant="elevation"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <CardContent>
        {isLoggedIn && (
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            mb={1}
            alignItems={"center"}
          >
            {form.is_active ? (
              <Chip
                icon={<Check color="success" />}
                label="Active"
                variant="outlined"
                size="small"
                color="success"
              />
            ) : (
              <Chip
                icon={<NotInterestedOutlined />}
                label="Inactive"
                variant="outlined"
                size="small"
                color="warning"
              />
            )}
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls="long-menu"
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVert />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {options.map((option) => (
                <MenuItem
                  key={option.name}
                  onClick={() => {
                    handleClose();
                    option.onClick();
                  }}
                >
                  <ListItemIcon>{option.icon}</ListItemIcon>
                  <ListItemText>{option.name}</ListItemText>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}
        <Typography variant="h5" component="div" mb={1}>
          {form.title}
        </Typography>

        <Typography variant="body2" component="div">
          <Ellipsis maxHeight={70}>{form.description}</Ellipsis>
        </Typography>
      </CardContent>
      <CardActions>
        <Box
          display="flex"
          justifyContent="space-between"
          width={"100%"}
          px={1}
        >
          <Box display="flex" alignItems="center">
            <Chip
              icon={<ScheduleOutlined color="primary" />}
              label={
                !!form.deadline
                  ? isExpired
                    ? "Expired"
                    : moment(form.deadline).format("DD/MM/YYYY h:mm a")
                  : "No deadline"
              }
              variant="outlined"
              size="small"
              color={isExpired ? "error" : "info"}
            />
          </Box>
          {isLoggedIn ? (
            <Button
              onClick={() => history.push(`/responses/${form.id}`)}
              variant="text"
              endIcon={<ArrowForward />}
              size="small"
            >
              Responses
            </Button>
          ) : (
            <Link to={`/form/${form.id}`}>
              <Button variant="text" endIcon={<ArrowForward />} size="small">
                Respond
              </Button>
            </Link>
          )}
        </Box>
      </CardActions>
      {(isEditing || isDeleting) && (
        <Box
          flexGrow={1}
          width="100%"
          height={"100%"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          position={"absolute"}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Card>
  );
};

export default FormCard;
