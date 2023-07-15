import { React, useState } from 'react';
import { Select, DatePicker, Button, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

function SearchCompo(props) {

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [filteredCities, setFilteredCities] = useState([])
  const [searchText, setSearchText] = useState('')

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(dateString)
  };

  const handleFromCityChange = (value) => {
    console.log(`selected ${value}`);
    setFromCity(value)
    setSearchText('')
    setFilteredCities([])
  };

  const handleToCityChange = (value) => {
    console.log(`selected ${value}`);
    setToCity(value)
    setSearchText('')
    setFilteredCities([])
  };

  const handleSearch = () => {
    setLoading(!loading)
    const payload = {
      doj: date,
      sourceCity: fromCity,
      destinationCity: toCity
    }
    props.searchBusses(payload)
  }

  const handleSearchCity = (value) => {
    setSearchText(value)
    setFilteredCities( props.cities.filter(city => city.value.toUpperCase().includes(value.toUpperCase())) )
  }

  return (
    <div className='search-compo'>
      <label>From:</label>
      <AutoComplete
        options={ searchText ? filteredCities : props.cities}
        style={{ width: '400px' }}
        onSelect={handleFromCityChange}
        onSearch={(text) => handleSearchCity(text)}
        placeholder="From City"
      />
      <label>To:</label>
      <AutoComplete
        options={ searchText ? filteredCities : props.cities}
        style={{ width: '400px' }}
        onSelect={handleToCityChange}
        onSearch={(text) => handleSearchCity(text)}
        placeholder="To City"
      />
      <label>Select Date:</label>
      <DatePicker onChange={onDateChange} />
      <Button type="primary" style={{ backgroundColor: '#1D5B79' }} icon={<SearchOutlined />} onClick={() => handleSearch()}>
        Search
      </Button>
    </div>
  );
}

export default SearchCompo;