package com.rentacar.services;

import com.rentacar.entities.concretes.Car;
import com.rentacar.entities.concretes.Model;
import com.rentacar.repositories.CarRepository;
import com.rentacar.repositories.ModelRepository;
import com.rentacar.services.dtos.requests.CreateCarRequest;
import com.rentacar.services.dtos.requests.UpdateCarRequest;
import com.rentacar.services.dtos.responses.GetAllCarsResponse;
import com.rentacar.services.dtos.responses.GetByIdCarResponse;
import com.rentacar.services.rules.CarBusinessRules;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CarServiceImpl implements ICarService{

    private final CarRepository carRepository;
    private final ModelRepository modelRepository;
    private final ModelMapper modelMapper;

    private final CarBusinessRules carBusinessRules;

    @Override
    public List<GetAllCarsResponse> getAll() {
        List<Car> cars = carRepository.findAll();

        return cars.stream()
                .map(car -> modelMapper.map(car, GetAllCarsResponse.class))
                .collect(Collectors.toList());
    }

    @Override
    public void add(CreateCarRequest createCarRequest) {

        carBusinessRules.checkIfCarPlateExists(createCarRequest.getPlate());

        Car car= this.modelMapper.map(createCarRequest, Car.class);
        car.setId(0);

        Model model= this.modelRepository.findById(createCarRequest.getModelId()).
                orElseThrow(()-> new RuntimeException("Böyle bir model bulunamadı."));

        car.setModel(model);
        this.carRepository.save(car);

    }

    @Override
    public GetByIdCarResponse getById(int id) {

        Car car = this.carRepository.findById(id).orElseThrow();

        return this.modelMapper.map(car, GetByIdCarResponse.class);
    }

    @Override
    public void update(UpdateCarRequest updateCarRequest) {

        Car car = this.carRepository.findById(updateCarRequest.getId())
                .orElseThrow(() -> new RuntimeException("Güncellenecek araç bulunamadı!"));

        this.modelMapper.map(updateCarRequest, car);

        Model model = this.modelRepository.findById(updateCarRequest.getModelId())
                .orElseThrow(() -> new RuntimeException("Model bulunamadı."));

        car.setModel(model);
        this.carRepository.save(car);


    }

    @Override
    public void delete(int id) {
        this.carRepository.deleteById(id);
    }

    @Override
    public List<GetAllCarsResponse> getAll(int page, int pageSize) {

        Pageable pageable= PageRequest.of(page, pageSize, Sort.by("dailyPrice").ascending());

        Page<Car> carPage = this.carRepository.findAll(pageable);

        List<GetAllCarsResponse> response = carPage.getContent().stream()
                .map(car -> this.modelMapper.map(car, GetAllCarsResponse.class))
                .toList();

        return response;
    }

}
