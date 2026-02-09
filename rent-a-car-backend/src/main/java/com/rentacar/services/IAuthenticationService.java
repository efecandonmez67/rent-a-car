package com.rentacar.services;

import com.rentacar.services.dtos.requests.LoginRequest;
import com.rentacar.services.dtos.requests.RegisterRequest;
import com.rentacar.services.dtos.responses.AuthenticationResponse;

public interface IAuthenticationService {

    void register(RegisterRequest registerRequest);

    AuthenticationResponse login(LoginRequest loginRequest);
}
