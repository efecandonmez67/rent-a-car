package com.rentacar.services.rules;


import com.rentacar.core.utilities.exceptions.BusinessException;
import com.rentacar.repositories.CarRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CarBusinessRules {

    private final CarRepository carRepository;

    public void checkIfCarPlateExists(String plate) {

        if(this.carRepository.existsByPlate(plate)) {
            throw new BusinessException("Bu plakaya ait bir araç zaten var. "+"("+plate+")");
        }
    }


}
