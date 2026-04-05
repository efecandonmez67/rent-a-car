package com.rentacar.controllers;

import com.rentacar.core.services.ImageUploadService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/images")
@CrossOrigin
public class ImagesController {

    private final ImageUploadService imageUploadService;

    public ImagesController(ImageUploadService imageUploadService) {
        this.imageUploadService = imageUploadService;
    }



    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String imageUrl= imageUploadService.uploadImage(file);

            return ResponseEntity.ok(imageUrl);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Resim yüklenirken bir hata oluştu: " + e.getMessage());
        }
    }

}
