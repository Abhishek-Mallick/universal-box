package com.universalbox.springboot;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final List<User> users = new ArrayList<>();

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody User user) {
        users.add(user);
        return new ResponseEntity<>("User created successfully!", HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}
