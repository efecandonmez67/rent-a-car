package com.rentacar.services;

import com.rentacar.entities.concretes.Car;
import com.rentacar.entities.concretes.CarImage;
import com.rentacar.repositories.CarImageRepository;
import com.rentacar.repositories.CarRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class CarImageServiceImpl implements ICarImageService {

    private CarImageRepository carImageRepository;
    private CarRepository carRepository;

    private final String UPLOAD_DIR = System.getProperty("user.dir") + "\\uploads\\";

    @Override
    public void add(MultipartFile file, int carId) throws IOException {

        Car car= carRepository.findById(carId).orElseThrow(() -> new RuntimeException("Araba bulunamadı!"));

        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        Path filePath = Paths.get(UPLOAD_DIR + fileName);
        Files.write(filePath, file.getBytes());

        CarImage carImage = new CarImage();
        carImage.setImagePath(filePath.toString());
        carImage.setDate(LocalDateTime.now());
        carImage.setCar(car);

        this.carImageRepository.save(carImage);

    }

    @Override
    public List<CarImage> getAll() {
        return carImageRepository.findAll();
    }

    @Override
    public List<CarImage> getImagesByCarId(int carId) {
        return carImageRepository.findByCarId(carId);
    }
}
