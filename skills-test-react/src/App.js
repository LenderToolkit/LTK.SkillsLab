import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccountMenu from './AccountMenu';
import TodoList from './TodoList'
import {Route, Routes} from "react-router-dom";
import {Container} from "@mui/material";

//@TODO host on github pages
export default function App() {
	const [openForm, setOpenForm] = React.useState(false);
	const handleOnClick = (page) => {
		console.log('open');
		if(!openForm) { 
			setOpenForm(true)
		} else {
			setOpenForm(false)
		}
	};
  return (
    <Container maxWidth="sm">
		<Routes>
			<Route path="/" element={<AccountMenu openForm={openForm} onClick={handleOnClick}/>}/>
		<Route path="/todo" element={<TodoList/>} />
		</Routes>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          React Skills test
        </Typography>
      </Box>
    </Container>
  );
}
