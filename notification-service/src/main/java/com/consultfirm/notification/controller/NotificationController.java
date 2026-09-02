package com.consultfirm.notification.controller;

import com.consultfirm.notification.model.Notification;
import com.consultfirm.notification.repository.NotificationRepository;
import com.consultfirm.notification.security.AuthPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationRepository repository;

    @GetMapping
    public List<Notification> mine(Authentication auth) {
        AuthPrincipal principal = (AuthPrincipal) auth.getPrincipal();
        return repository.findByUserIdOrderByCreatedAtDesc(principal.userId());
    }

    @GetMapping("/unread-count")
    public Map<String, Long> unreadCount(Authentication auth) {
        AuthPrincipal principal = (AuthPrincipal) auth.getPrincipal();
        return Map.of("count", repository.countByUserIdAndReadFalse(principal.userId()));
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<?> markRead(@PathVariable String id) {
        return repository.findById(id).map(n -> {
            n.setRead(true);
            return ResponseEntity.ok(repository.save(n));
        }).orElse(ResponseEntity.notFound().build());
    }

    /** Internal-style endpoint: create a notification for a user (called by other services or admin actions from the frontend) */
    @PostMapping
    public Notification create(@RequestBody Notification notification) {
        notification.setId(null);
        notification.setRead(false);
        return repository.save(notification);
    }
}
