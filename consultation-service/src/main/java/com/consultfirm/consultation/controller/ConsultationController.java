package com.consultfirm.consultation.controller;

import com.consultfirm.consultation.dto.AssignConsultantRequest;
import com.consultfirm.consultation.dto.CreateConsultationRequest;
import com.consultfirm.consultation.dto.UpdateStatusRequest;
import com.consultfirm.consultation.model.ConsultationRequest;
import com.consultfirm.consultation.repository.ConsultationRequestRepository;
import com.consultfirm.consultation.security.AuthPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/consultations")
@RequiredArgsConstructor
public class ConsultationController {

    private final ConsultationRequestRepository repository;

    /** Any authenticated client submits a new consultation / project request */
    @PostMapping
    public ResponseEntity<?> submit(@Valid @RequestBody CreateConsultationRequest req, Authentication auth) {
        AuthPrincipal principal = (AuthPrincipal) auth.getPrincipal();

        ConsultationRequest consultation = ConsultationRequest.builder()
                .clientId(principal.userId())
                .clientName(req.getClientName())
                .clientEmail(req.getClientEmail())
                .clientCountry(req.getClientCountry())
                .clientPhone(req.getClientPhone())
                .projectType(req.getProjectType())
                .targetIndustry(req.getTargetIndustry())
                .budgetRange(req.getBudgetRange())
                .description(req.getDescription())
                .status(ConsultationRequest.Status.NEW)
                .createdAt(Instant.now())
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(consultation));
    }

    /** The logged-in client's own requests, for their dashboard */
    @GetMapping("/mine")
    public List<ConsultationRequest> mine(Authentication auth) {
        AuthPrincipal principal = (AuthPrincipal) auth.getPrincipal();
        return repository.findByClientIdOrderByCreatedAtDesc(principal.userId());
    }

    /** Admin/consultant: every lead in the pipeline */
    @GetMapping("/all")
    public List<ConsultationRequest> all() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConsultationRequest> get(@PathVariable String id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable String id, @Valid @RequestBody UpdateStatusRequest req) {
        return repository.findById(id).map(c -> {
            c.setStatus(req.getStatus());
            c.setUpdatedAt(Instant.now());
            return ResponseEntity.ok(repository.save(c));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/assign")
    public ResponseEntity<?> assign(@PathVariable String id, @Valid @RequestBody AssignConsultantRequest req) {
        return repository.findById(id).map(c -> {
            c.setAssignedConsultantId(req.getConsultantId());
            c.setAssignedConsultantName(req.getConsultantName());
            if (c.getStatus() == ConsultationRequest.Status.NEW || c.getStatus() == ConsultationRequest.Status.IN_REVIEW) {
                c.setStatus(ConsultationRequest.Status.ASSIGNED);
            }
            c.setUpdatedAt(Instant.now());
            return ResponseEntity.ok(repository.save(c));
        }).orElse(ResponseEntity.notFound().build());
    }

    /** Requests assigned to the logged-in consultant */
    @GetMapping("/assigned-to-me")
    public List<ConsultationRequest> assignedToMe(Authentication auth) {
        AuthPrincipal principal = (AuthPrincipal) auth.getPrincipal();
        return repository.findByAssignedConsultantIdOrderByCreatedAtDesc(principal.userId());
    }

    @GetMapping("/stats")
    public Map<String, Long> stats() {
        List<ConsultationRequest> all = repository.findAll();
        return Map.of(
                "total", (long) all.size(),
                "new", all.stream().filter(c -> c.getStatus() == ConsultationRequest.Status.NEW).count(),
                "inProgress", all.stream().filter(c -> c.getStatus() == ConsultationRequest.Status.IN_PROGRESS
                        || c.getStatus() == ConsultationRequest.Status.ASSIGNED).count(),
                "completed", all.stream().filter(c -> c.getStatus() == ConsultationRequest.Status.COMPLETED).count()
        );
    }
}
