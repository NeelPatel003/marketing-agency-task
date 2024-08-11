import FormComponent from './components/FormComponent';
import { Container, Typography } from '@mui/material';
import './App.css';

import ListPage from './components/ListPage';

function App() {
  return (
   
        <Container>
          <Typography variant="h4" component="h1" gutterBottom>
            Customer Data Collection Form
          </Typography>
          <FormComponent />
          <Typography variant="h4" component="h2" gutterBottom>
            Customer Data List
          </Typography>
          <ListPage />
        </Container>
     
  );
}

export default App;
