import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://rightpayonline.com/bus',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

const get = async (data) => {

  try {

    const response = await axiosInstance.get(data.endPoint, { params: data?.queryParam })
  
    return response
  } catch (e) {
    //we can handle errors here
    throw e
  }
}

const post = async (data) => {
  try {
    const response = await axiosInstance.post(data.endPoint, data?.payLoad)
    
    return response
    
  } catch (e) {
    //we can handle errors here
    throw e
  }
}

const backend_service = { get, post}

export default backend_service;