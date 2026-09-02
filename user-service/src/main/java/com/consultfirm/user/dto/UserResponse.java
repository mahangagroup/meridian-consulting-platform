package com.consultfirm.user.dto;

import com.consultfirm.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private String id;
    private String fullName;
    private String email;
    private String phone;
    private String country;
    private String companyName;
    private String role;
    private Instant createdAt;

    public static UserResponse from(User u) {
        return UserResponse.builder()
                .id(u.getId())
                .fullName(u.getFullName())
                .email(u.getEmail())
                .phone(u.getPhone())
                .country(u.getCountry())
                .companyName(u.getCompanyName())
                .role(u.getRole().name())
                .createdAt(u.getCreatedAt())
                .build();
    }
}
