import axios from 'axios';

export interface CreateRentalRequest {
    carId: number;
    userId: number;
    dateStarted: string;
    rentedForDays: number;
}

export interface RentalResponse {
    id: number;
    carName: string;
    modelBrandName: string;
    dateStarted: string;
    rentedForDays: number;
    totalPrice: number;
}

const API_URL = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : "http://localhost:8080/api";

class RentalService {

    rentCar(request: CreateRentalRequest) {
        const token = localStorage.getItem('token');

        return axios.post(`${API_URL}/rentals`, request, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    getRentalsByUserId(userId: number) {
        const token = localStorage.getItem('token');

        return axios.get(`${API_URL}/rentals/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

}

export default new RentalService();