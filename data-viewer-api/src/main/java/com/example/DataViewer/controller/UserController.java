package com.example.DataViewer.controller;

import com.example.DataViewer.entities.UserData;
import com.example.DataViewer.model.AuthenticationResponse;
import com.example.DataViewer.service.UserDataService;
import com.example.DataViewer.util.BasicAuthDecoder;
import com.example.DataViewer.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(value = "/api")
public class UserController {

    @Autowired
    private InMemoryUserDetailsManager inMemoryUserDetailsManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDataService userDataService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Check if server is live
     */
    @GetMapping("/live")
    public ResponseEntity<String> checkStatus() {
        return ResponseEntity.ok("Backend application is live");
    }

    /**
     * Authenticate the user and send jwt token in response.
     * For invalid credentials throw UsernameNotFoundException.
     */
    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestHeader final String authorization)
            throws UsernameNotFoundException {

        BasicAuthDecoder basicAuthDecoder = new BasicAuthDecoder(authorization);
        // check if user exists
        if(!inMemoryUserDetailsManager.userExists(basicAuthDecoder.getUsername())) {
            throw new UsernameNotFoundException("Incorrect username or password");
        }
        UserDetails userDetails = inMemoryUserDetailsManager.loadUserByUsername(basicAuthDecoder.getUsername());

        // check for valid credentials
        if(!validUserCredentials(basicAuthDecoder, userDetails)) {
            throw new UsernameNotFoundException("Incorrect username or password");
        }
        String token = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(token));
    }

    /**
     * Save the json data into database
     */
    @PostMapping(value = "/upload", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> uploadData(@RequestBody List<UserData> userData) {
        userDataService.savaUserData(userData);

        return ResponseEntity.ok("Upload Successful");
    }

    /**
     * Fetch the data
     */
    @GetMapping(value = "/data", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<UserData>> fetchAllUserData() {
        return ResponseEntity.ok(userDataService.getAllUserData());
    }

    /**
     * Check if user credentials are valid
     */
    private boolean validUserCredentials(BasicAuthDecoder basicAuthDecoder, UserDetails userDetails) {
        boolean validUsername = basicAuthDecoder.getUsername().equals(userDetails.getUsername());
        boolean validPassword = passwordEncoder.matches(basicAuthDecoder.getPassword(), userDetails.getPassword());

        return validUsername && validPassword;
    }
}
