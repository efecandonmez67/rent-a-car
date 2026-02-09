package com.rentacar.controllers;

import com.rentacar.services.IAuthenticationService;
import com.rentacar.services.dtos.requests.LoginRequest;
import com.rentacar.services.dtos.requests.RegisterRequest;
import com.rentacar.services.dtos.responses.AuthenticationResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
@AllArgsConstructor
public class AuthenticationController {

    private final IAuthenticationService authenticationService;

    @PostMapping("register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody @Valid RegisterRequest registerRequest) {
        this.authenticationService.register(registerRequest);
    }

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody LoginRequest loginRequest) {
        return this.authenticationService.login(loginRequest);
    }
}
