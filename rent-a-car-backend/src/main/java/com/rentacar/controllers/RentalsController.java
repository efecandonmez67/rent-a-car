package com.rentacar.controllers;

import com.rentacar.services.IRentalService;
import com.rentacar.services.dtos.requests.CreateRentalRequest;
import com.rentacar.services.dtos.requests.UpdateRentalRequest;
import com.rentacar.services.dtos.responses.GetAllRentalsResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
@RequestMapping("/api/rentals")
public class RentalsController {

    private final IRentalService rentalService;

    @GetMapping
    public List<GetAllRentalsResponse> getAllRentals() {
        return rentalService.getAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void add(@RequestBody @Valid CreateRentalRequest createRentalRequest) {
        rentalService.add(createRentalRequest);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public void update(@RequestBody @Valid UpdateRentalRequest updateRentalRequest) {
        this.rentalService.update(updateRentalRequest);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable int id) {
        this.rentalService.delete(id);
    }
}
