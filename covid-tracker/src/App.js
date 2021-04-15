import React, { useEffect, useState } from 'react';
import './App.css';
import { Card, CardContent } from '@material-ui/core'

import {
  MenuItem, FormControl, Select
} from "@material-ui/core"
import InfoBox from './InfoBox';
import Map from './Map';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  useEffect(() => {

    const getCountriesData = async () => (
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {

        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2
          }
        ));

        setCountries(countries)
      }))
    
      getCountriesData();
  }, [])

  const onCountryChange = async(event) => {
    const countryCode = event.target.value;

    setCountry(countryCode);
  }

  return (
    <div className="app">

      <div className="app__left">
        {/* Header */}
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select
          variant="outlined"
          value={country}
          onChange={onCountryChange}
          >
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {
              countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        <InfoBox title="Coronavirus Cases" cases={123} total={2000}/>

        <InfoBox title="Recovered" cases={123} total={2000}/>

        <InfoBox title="Deaths" cases={123} total={2000}/>

      </div>
      


      {/* Map */}
      <Map/>
      </div>
      <Card className="app__right">
        <CardContent>
            <h3>Live Cases by Country</h3>
            {/* Table */} 

            <h3>Worldwide new cases</h3>
            {/* Graph */}
        </CardContent>
        
      </Card>
      
    </div>
  );
}

export default App;
