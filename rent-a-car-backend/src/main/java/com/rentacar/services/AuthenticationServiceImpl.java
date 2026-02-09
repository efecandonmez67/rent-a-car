package com.rentacar.services;

import com.rentacar.core.services.JwtService;
import com.rentacar.core.utilities.exceptions.BusinessException;
import com.rentacar.entities.concretes.Role;
import com.rentacar.entities.concretes.User;
import com.rentacar.repositories.RoleRepository;
import com.rentacar.repositories.UserRepository;
import com.rentacar.services.dtos.requests.LoginRequest;
import com.rentacar.services.dtos.requests.RegisterRequest;
import com.rentacar.services.dtos.responses.AuthenticationResponse;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthenticationServiceImpl implements IAuthenticationService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthenticationServiceImpl(UserRepository userRepository,
                                     RoleRepository roleRepository,
                                     PasswordEncoder passwordEncoder,
                                     JwtService jwtService,
                                     @Lazy AuthenticationManager authenticationManager) { // <-- SİHİRLİ DOKUNUŞ BURADA
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }


    @Override
    public void register(RegisterRequest registerRequest) {

        if(userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new BusinessException("Email already exists");
        }

        String encodedPassword = passwordEncoder.encode(registerRequest.getPassword());

        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setPassword(encodedPassword);

        Role userRole= roleRepository.findByName("USER");
        if(userRole == null) {
            throw new BusinessException("User role not found in database!");
        }

        user.setRoles(List.of(userRole));

        userRepository.save(user);

    }

    @Override
    public AuthenticationResponse login(LoginRequest loginRequest) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                ));

        User user= userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();

        String jwtToken= jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
