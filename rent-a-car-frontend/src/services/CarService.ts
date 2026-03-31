import axios from "axios";

const API_URL = "https://rent-a-car-api-ccen.onrender.com/api/cars";

export const getAllCars = async () => {
    const token = localStorage.getItem("token");

    return await axios.get(`${API_URL}/getall`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};