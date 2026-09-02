package com.consultfirm.user.controller;

import com.consultfirm.user.dto.UserResponse;
import com.consultfirm.user.model.User;
import com.consultfirm.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    /** Admin-only: list all users, optionally filtered by role (e.g. CONSULTANT for the assignment dropdown) */
    @GetMapping
    public List<UserResponse> list(@RequestParam(required = false) String role) {
        List<User> users = (role == null)
                ? userRepository.findAll()
                : userRepository.findByRole(User.Role.valueOf(role.toUpperCase()));
        return users.stream().map(UserResponse::from).toList();
    }

    @GetMapping("/{id}")
    public UserResponse get(@PathVariable String id) {
        return userRepository.findById(id).map(UserResponse::from)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
