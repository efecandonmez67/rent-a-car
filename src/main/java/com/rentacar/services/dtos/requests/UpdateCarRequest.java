package com.rentacar.services.dtos.requests;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateCarRequest {
    @NotNull
    private int id;
    @NotNull
    private int modelId;
    @Min(0)
    private double dailyPrice;
    @Min(2000)
    private int modelYear;
    @NotBlank
    private String plate;
    @Min(1) @jakarta.validation.constraints.Max(3)
    private int state;
}