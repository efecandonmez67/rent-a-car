package com.rentacar.controllers;

import com.rentacar.entities.concretes.CarImage;
import com.rentacar.services.ICarImageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/car-images")
public class CarImagesController {

    private ICarImageService carImageService;


    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)    @ResponseStatus(HttpStatus.CREATED)
    public void add(@RequestParam("file") MultipartFile file, @RequestParam int carId) throws IOException {
        carImageService.add(file, carId);
    }

    @GetMapping("/getAll")
    public List<CarImage> getAll() {
        return carImageService.getAll();
    }

    @GetMapping("/getImagesByCarId")
    public List<CarImage> getImagesByCarId(@RequestParam int carId) {
        return carImageService.getImagesByCarId(carId);
    }


}
