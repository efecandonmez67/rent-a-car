import axios from "axios";

const API_URL = "http://localhost:8080/api/cars";

export const getAllCars = async () => {
    return await axios.get(API_URL);
};