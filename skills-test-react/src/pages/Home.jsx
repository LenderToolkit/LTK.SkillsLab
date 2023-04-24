import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import Link from '@mui/material/Link';
import AccountMenu from "../features/AccountMenu";
import BasicForm from "./BasicForm";

function Home() {
  const [openForm, setOpenForm] = React.useState(false);
  const handleOnClick = (page) => {
    console.log("open");
    if (!openForm) {
      setOpenForm(true);
    } else {
      setOpenForm(false);
    }
  };
  return (
    <Container maxWidth="sm">
      <AccountMenu onClick={handleOnClick} />
      {openForm && <BasicForm />}
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          React Skills test
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;
