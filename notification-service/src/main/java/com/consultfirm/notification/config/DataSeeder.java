package com.consultfirm.notification.config;

import com.consultfirm.notification.model.Message;
import com.consultfirm.notification.model.Notification;
import com.consultfirm.notification.repository.MessageRepository;
import com.consultfirm.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final NotificationRepository notificationRepository;
    private final MessageRepository messageRepository;

    // Fixed IDs matching consultation-service's DataSeeder so the sample data lines up across services
    private static final String CONSULT_1 = "consult-sample-1"; // Omar Al Mansoori, assigned to James Calloway
    private static final String CONSULT_2 = "consult-sample-2"; // Fatima Al Suwaidi, unassigned

    @Override
    public void run(String... args) {
        seedNotifications();
        seedMessages();
    }

    private void seedNotifications() {
        if (notificationRepository.count() > 0) return;

        notificationRepository.saveAll(List.of(
                Notification.builder()
                        .userId("client-sample-1")
                        .title("A consultant has been assigned")
                        .message("James Calloway is now working on your commercial real estate acquisition request.")
                        .relatedConsultationId(CONSULT_1)
                        .read(false)
                        .createdAt(Instant.now().minus(2, ChronoUnit.DAYS))
                        .build(),
                Notification.builder()
                        .userId("consultant-sample-1")
                        .title("New request assigned to you")
                        .message("Omar Al Mansoori's commercial real estate acquisition request has been assigned to you.")
                        .relatedConsultationId(CONSULT_1)
                        .read(true)
                        .createdAt(Instant.now().minus(9, ChronoUnit.DAYS))
                        .build(),
                Notification.builder()
                        .userId("admin-sample-1")
                        .title("New consultation request received")
                        .message("Fatima Al Suwaidi submitted a new US market entry request.")
                        .relatedConsultationId(CONSULT_2)
                        .read(false)
                        .createdAt(Instant.now().minus(2, ChronoUnit.DAYS))
                        .build()
        ));
        log.info("Seeded {} sample notifications.", notificationRepository.count());
    }

    private void seedMessages() {
        if (messageRepository.count() > 0) return;

        messageRepository.saveAll(List.of(
                Message.builder()
                        .consultationId(CONSULT_1)
                        .senderId("consultant-sample-1")
                        .senderName("James Calloway")
                        .senderRole("CONSULTANT")
                        .content("Hi Omar, thanks for the detail. I've started shortlisting property management firms in DFW that fit your criteria. Can you share your target close timeline?")
                        .createdAt(Instant.now().minus(8, ChronoUnit.DAYS))
                        .build(),
                Message.builder()
                        .consultationId(CONSULT_1)
                        .senderId("client-sample-1")
                        .senderName("Omar Al Mansoori")
                        .senderRole("CLIENT")
                        .content("Ideally within 4 months. We're flexible on structure if the right operator is willing to stay on.")
                        .createdAt(Instant.now().minus(7, ChronoUnit.DAYS))
                        .build(),
                Message.builder()
                        .consultationId(CONSULT_1)
                        .senderId("consultant-sample-1")
                        .senderName("James Calloway")
                        .senderRole("CONSULTANT")
                        .content("Understood. I have two strong candidates and will send a shortlist with financials by the end of the week.")
                        .createdAt(Instant.now().minus(2, ChronoUnit.DAYS))
                        .build()
        ));
        log.info("Seeded {} sample messages.", messageRepository.count());
    }
}
