import { React, useEffect, useState } from 'react';
import SearchCompo from '../../CommonComponents/SearchCompo';
import backend_service from '../../services';
import Loader from '../../CommonComponents/Loader/Loader'

function BussesList() {

  const [cities, setCities] = useState([])
  const [busses, setBusses] = useState([])
  const [searchData, setSearchData] = useState({})
  const [loading, setLoading] = useState(false)
  const [bookingBusDetails, setBookingBusDetails] = useState({})
  const [showSeats, setShowSeats] = useState(false)
  const [rows, setRows] = useState(0)
  const [columns, setColumns] = useState(0)

  const fetchCities = async () => {
    try {
      const payload = {
        endPoint: '/cityList'
      }

      const response = await backend_service.get(payload)
      if (response && response.status === 200 && response.data.length > 0) {
        setCities(response.data.map(city => {
          return { value: city.city_name, label: city.city_name.toUpperCase() }
        }))
      }

      console.log('Response>>>', response)
    } catch (e) {

    }
  }

  useEffect(() => {
    fetchCities();
  }, [])

  const searchBusses = async (data) => {
    setLoading(true)
    console.log('PAYLOAD>>>', data)
    setSearchData(data)
    try {
      const payload = {
        endPoint: '/srchBus',
        payLoad: data
      }

      const response = await backend_service.post(payload)
      if (response && response.status === 200 && response?.data.apiAvailableBuses?.length > 0) {
        setBusses(response?.data.apiAvailableBuses)
      }

    } catch (e) {
      console.log('ERROR>>>>', e)
    } finally {
      setLoading(false)
    }
  }

  const handleBookNow = async (index) => {
    setLoading(true)
    setBookingBusDetails({})
    setShowSeats(false)
    try {
      const payload = {
        endPoint: '/seatLayout',
        payLoad: {
          sourceCity: searchData.sourceCity,
          destinationCity: searchData.destinationCity,
          doj: searchData.doj,
          inventoryType: busses[index].inventoryType,
          routeScheduleId: busses[index].routeScheduleId
        }
      }

      const response = await backend_service.post(payload)
      if (response && response.status === 200 && response?.data) {
        console.log('PAYLOAD>>> response', response)
        setBookingBusDetails(response?.data)
        let maxRow = 0;
        let maxColumn = 0;
        response?.data?.seats?.forEach(bus => {
          if (bus.row > maxRow) maxRow = bus.row
          if (bus.column > maxColumn) maxColumn = bus.column
        })
        console.log('Rows-', maxRow, ' Columns-', maxColumn)
        setColumns(maxColumn)
        setRows(maxRow)
        setShowSeats(true)
      }
      console.log('PAYLOAD>>> response response', response)
    } catch (e) {
      console.log('ERROR>>>>', e)
    } finally {
      setLoading(false)
    }
  }

  const renderBusses = () => {
    return busses.map((bus, index) => {
      return (
        <div key={index} className="buslist">
          <span>Brand - {bus.operatorName}</span>
          <span>From - {searchData.sourceCity}</span>
          <span>To - {searchData.destinationCity}</span>
          <span>Price - {bus.fare.split(',')[0]}</span>
          <button onClick={() => handleBookNow(index)}>Book Now</button>
          {showSeats ?
            <div className='seating'>

            </div>
            : null}
        </div >
      )
    })

  }

  return (
    <div>
      <SearchCompo cities={cities} searchBusses={searchBusses} />
      {loading ? <Loader /> : null}
      <div style={{ padding: '50px' }}>{renderBusses()}</div>
    </div>
  );
}

export default BussesList;