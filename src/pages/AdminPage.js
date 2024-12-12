import React, { useState } from 'react';
import { Container, Box, Grid } from '@mui/material';
import Sidebar from '../components/admin/Sidebar';
import Form from '../components/admin/Form';
import AdminMealsItem from '../components/admin/AdminMealsItem';
import { useItems } from '../store/items-context';

const AdminPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { meals } = useItems();

  const openFormHandler = () => {
    setIsFormOpen(true);
  };

  const closeFormHandler = () => {
    setIsFormOpen(false);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Sidebar onOpenForm={openFormHandler} />
        </Grid>
        <Grid item xs={12} md={9}>
          {isFormOpen && <Form onClose={closeFormHandler} />}
          <Box 
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
              gap: 3 
            }}
          >
            {meals.map((meal) => (
              <AdminMealsItem 
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
                image={meal.image}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminPage;