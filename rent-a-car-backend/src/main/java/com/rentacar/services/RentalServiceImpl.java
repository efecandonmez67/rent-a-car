package com.rentacar.services;

import com.rentacar.core.utilities.exceptions.BusinessException;
import com.rentacar.entities.concretes.Car;
import com.rentacar.entities.concretes.Rental;
import com.rentacar.repositories.CarRepository;
import com.rentacar.repositories.RentalRepository;
import com.rentacar.services.dtos.requests.CreateRentalRequest;
import com.rentacar.services.dtos.requests.UpdateRentalRequest;
import com.rentacar.services.dtos.responses.GetAllRentalsResponse;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RentalServiceImpl implements IRentalService {

    private RentalRepository rentalRepository;
    private CarRepository carRepository;
    private ModelMapper modelMapper;


    public void add(CreateRentalRequest createRentalRequest) {
        Car car= this.carRepository.findById(createRentalRequest.getCarId())
                .orElseThrow(() -> new BusinessException("Car not found!"));
        double totalPrice = createRentalRequest.getRentedForDays() * car.getDailyPrice();

        Rental rental = new Rental();
        rental.setDateStarted(createRentalRequest.getDateStarted());
        rental.setRentedForDays(createRentalRequest.getRentedForDays());
        rental.setCar(car);
        rental.setTotalPrice(totalPrice);

        rentalRepository.save(rental);
    }

    @Override
    public List<GetAllRentalsResponse> getAll() {
        List<Rental> rentals = rentalRepository.findAll();

        List<GetAllRentalsResponse> rentalsResponse = rentals.stream()
                .map(rental -> this.modelMapper.map(rental, GetAllRentalsResponse.class))
                .collect(Collectors.toList());

        return rentalsResponse;
    }

    @Override
    public void update(UpdateRentalRequest updateRentalRequest) {

        Rental rental = this.rentalRepository.findById(updateRentalRequest.getId())
                .orElseThrow(() -> new BusinessException("Rental not found!"));

        Car car= this.carRepository.findById(updateRentalRequest.getId())
                .orElseThrow(() -> new BusinessException("Car not found!"));

        double newTotalPrice = updateRentalRequest.getRentedForDays() * car.getDailyPrice();

        rental.setRentedForDays(updateRentalRequest.getRentedForDays());
        rental.setDateStarted(updateRentalRequest.getDateStarted());
        rental.setTotalPrice(newTotalPrice);
        rental.setCar(car);
        this.rentalRepository.save(rental);

    }

    @Override
    public void delete(int id) {
        if(!this.rentalRepository.existsById(id)) {
            throw new BusinessException("Rental not found!");
        }
        this.rentalRepository.deleteById(id);
    }


}
