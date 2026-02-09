package com.rentacar.services;

import com.rentacar.entities.concretes.CarImage;
import com.rentacar.services.dtos.requests.RegisterRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ICarImageService {

    void add(MultipartFile file, int carId) throws IOException;

    List<CarImage> getAll();

    List<CarImage> getImagesByCarId(int carId);
}
