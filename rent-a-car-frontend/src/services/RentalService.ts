import axios from 'axios';

export interface CreateRentalRequest {
    carId: number;
    userId: number;
    dateStarted: string; // Örn: '2026-04-15'
    rentedForDays: number;
}

const API_URL = 'http://localhost:8080/api/rentals';

class RentalService {

    rentCar(request: CreateRentalRequest) {
        const token = localStorage.getItem('token');

        return axios.post(API_URL, request, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

}

export default new RentalService();