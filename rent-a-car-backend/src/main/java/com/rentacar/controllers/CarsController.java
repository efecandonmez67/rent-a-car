package com.rentacar.controllers;

import com.rentacar.services.ICarService;
import com.rentacar.services.dtos.requests.CreateCarRequest;
import com.rentacar.services.dtos.requests.UpdateCarRequest;
import com.rentacar.services.dtos.responses.GetAllCarsResponse;
import com.rentacar.services.dtos.responses.GetByIdCarResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/cars")
public class CarsController {

    private final ICarService carService;

    @GetMapping
    public List<GetAllCarsResponse> getAll() {
        return carService.getAll();
    }

    @GetMapping("/getAllByPage")
    public List<GetAllCarsResponse> getAllByPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int pageSize
    ) {
        return carService.getAll(page, pageSize);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void add(@RequestBody @Valid CreateCarRequest request) {
        this.carService.add(request);
    }

    @GetMapping("/{id}")
    public GetByIdCarResponse getById(@PathVariable int id) {
        return carService.getById(id);
    }

    @PutMapping
    public void update(@RequestBody UpdateCarRequest updateCarRequest) {
        this.carService.update(updateCarRequest);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        this.carService.delete(id);
    }
}
