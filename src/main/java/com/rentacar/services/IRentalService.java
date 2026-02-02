package com.rentacar.services;

import com.rentacar.entities.concretes.Rental;
import com.rentacar.services.dtos.requests.CreateRentalRequest;
import com.rentacar.services.dtos.responses.GetAllRentalsResponse;

import java.util.List;

public interface IRentalService {

    public void add(CreateRentalRequest createRentalRequest);

    public List<GetAllRentalsResponse> getAll();
}
