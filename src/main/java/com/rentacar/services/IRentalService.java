package com.rentacar.services;

import com.rentacar.entities.concretes.Rental;
import com.rentacar.services.dtos.requests.CreateRentalRequest;
import com.rentacar.services.dtos.requests.UpdateRentalRequest;
import com.rentacar.services.dtos.responses.GetAllRentalsResponse;

import java.util.List;

public interface IRentalService {

     void add(CreateRentalRequest createRentalRequest);

     List<GetAllRentalsResponse> getAll();

     void update(UpdateRentalRequest updateRentalRequest);

     void delete(int id);

}
