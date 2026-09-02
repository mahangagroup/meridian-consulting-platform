package com.consultfirm.notification.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "messages")
public class Message {

    @Id
    private String id;

    private String consultationId;

    private String senderId;
    private String senderName;
    private String senderRole; // CLIENT, CONSULTANT, ADMIN

    private String content;

    @Builder.Default
    private Instant createdAt = Instant.now();
}
