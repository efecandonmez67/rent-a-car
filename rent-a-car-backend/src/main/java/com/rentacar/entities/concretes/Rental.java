package com.rentacar.entities.concretes;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Table(name = "rentals")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Rental{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "date_started")
    private LocalDate dateStarted;

    @Column(name = "rented_for_days")
    private int rentedForDays;

    private double totalPrice;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;




}
