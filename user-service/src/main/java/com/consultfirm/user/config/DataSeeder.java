package com.consultfirm.user.config;

import com.consultfirm.user.model.User;
import com.consultfirm.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            log.info("User data already present, skipping seed.");
            return;
        }

        userRepository.save(User.builder()
                .id("admin-sample-1")
                .fullName("Sarah Whitfield")
                .email("admin@meridianadvisory.com")
                .passwordHash(passwordEncoder.encode("Admin123!"))
                .phone("+1 212 555 0142")
                .country("United States")
                .companyName("Meridian Advisory")
                .role(User.Role.ADMIN)
                .build());

        userRepository.save(User.builder()
                .id("consultant-sample-1")
                .fullName("James Calloway")
                .email("james.calloway@meridianadvisory.com")
                .passwordHash(passwordEncoder.encode("Consult123!"))
                .phone("+1 312 555 0198")
                .country("United States")
                .companyName("Meridian Advisory")
                .role(User.Role.CONSULTANT)
                .build());

        userRepository.save(User.builder()
                .id("consultant-sample-2")
                .fullName("Priya Nair")
                .email("priya.nair@meridianadvisory.com")
                .passwordHash(passwordEncoder.encode("Consult123!"))
                .phone("+1 415 555 0176")
                .country("United States")
                .companyName("Meridian Advisory")
                .role(User.Role.CONSULTANT)
                .build());

        userRepository.save(User.builder()
                .id("client-sample-1")
                .fullName("Omar Al Mansoori")
                .email("omar.almansoori@example.ae")
                .passwordHash(passwordEncoder.encode("Client123!"))
                .phone("+971 4 555 0110")
                .country("United Arab Emirates")
                .companyName("Al Mansoori Holdings")
                .role(User.Role.CLIENT)
                .build());

        userRepository.save(User.builder()
                .id("client-sample-2")
                .fullName("Fatima Al Suwaidi")
                .email("fatima.alsuwaidi@example.ae")
                .passwordHash(passwordEncoder.encode("Client123!"))
                .phone("+971 2 555 0123")
                .country("United Arab Emirates")
                .companyName(null)
                .role(User.Role.CLIENT)
                .build());

        log.info("Seeded 5 sample users (1 admin, 2 consultants, 2 clients).");
        log.info("Admin login -> admin@meridianadvisory.com / Admin123!");
    }
}
