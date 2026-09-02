package com.consultfirm.notification.controller;

import com.consultfirm.notification.model.Message;
import com.consultfirm.notification.repository.MessageRepository;
import com.consultfirm.notification.security.AuthPrincipal;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageRepository repository;

    @GetMapping("/consultation/{consultationId}")
    public List<Message> thread(@PathVariable String consultationId) {
        return repository.findByConsultationIdOrderByCreatedAtAsc(consultationId);
    }

    @PostMapping
    public ResponseEntity<Message> send(@RequestBody SendMessageRequest req, Authentication auth) {
        AuthPrincipal principal = (AuthPrincipal) auth.getPrincipal();

        Message message = Message.builder()
                .consultationId(req.getConsultationId())
                .senderId(principal.userId())
                .senderName(principal.name())
                .senderRole(principal.role())
                .content(req.getContent())
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(message));
    }

    @Data
    public static class SendMessageRequest {
        @NotBlank
        private String consultationId;
        @NotBlank
        private String content;
    }
}
