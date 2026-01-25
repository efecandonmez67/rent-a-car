package com.rentacar.repositories;

import com.rentacar.entities.concretes.CarImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarImageRepository extends JpaRepository<CarImage, Integer> {
    List<CarImage> findByCarId(int carId);
}
