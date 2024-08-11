import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Tabs, Tab, TextField, Grid, Card, CardContent, Typography, Divider } from '@mui/material';

const ListPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [domesticCountry, setDomesticCountry] = useState('India');

  const formData = useSelector((state) => state.form.formData);

  console.log("formData", formData)
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredData = formData.filter((item) => {
    const searchText = searchQuery.toLowerCase();
    const matchSearch = Object.values(item).some((val) =>
      typeof val === 'string'
        ? val.toLowerCase().includes(searchText)
        : Array.isArray(val)
        ? val.some((subItem) =>
            Object.values(subItem).some((subVal) =>
              String(subVal).toLowerCase().includes(searchText)
            )
          )
        : false
    );

    if (tabValue === 1) {
      return (
        matchSearch && item.address.some((addr) => addr.addressType === domesticCountry)
      );
    }
    if (tabValue === 2) {
      return (
        matchSearch && item.address.some((addr) => addr.addressType !== domesticCountry)
      );
    }
    return matchSearch;
  });

  return (
    <Container>
      <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
        <Tab label="All" />
        <Tab label="Domestic" />
        <Tab label="International" />
      </Tabs>

      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Grid container spacing={3}>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.firstName} {item.lastName}
                  </Typography>
                  <Divider />
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Phone Numbers:</strong>
                  </Typography>
                  {item.phone.map((phone, i) => (
                    <Typography key={i} variant="body2" color="textSecondary">
                      {phone.personName}: {phone.number}
                    </Typography>
                  ))}
                  <Divider sx={{ marginY: 2 }} />
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Addresses:</strong>
                  </Typography>
                  {item.address.map((address, i) => (
                    <Typography key={i} variant="body2" color="textSecondary">
                      {address.addressType}: {address.address}
                    </Typography>
                  ))}
                  <Divider sx={{ marginY: 2 }} />
                  <Typography variant="body1" gutterBottom>
                    <strong>Remarks:</strong> {item.remarks}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Reference:</strong> {item.reference}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" color="textSecondary" sx={{ marginTop: 2 }}>
            No data available
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default ListPage;
