package com.consultfirm.user.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String fullName;

    @Indexed(unique = true)
    private String email;

    private String passwordHash;

    private String phone;

    /** Country the client/consultant is based in, e.g. "United Arab Emirates" */
    private String country;

    private String companyName;

    @Builder.Default
    private Role role = Role.CLIENT;

    @Builder.Default
    private Instant createdAt = Instant.now();

    public enum Role {
        CLIENT, CONSULTANT, ADMIN
    }
}
