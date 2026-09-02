package com.consultfirm.consultation.model;

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
@Document(collection = "consultation_requests")
public class ConsultationRequest {

    @Id
    private String id;

    // Who submitted it (denormalized from user-service to avoid a sync call on every read)
    private String clientId;
    private String clientName;
    private String clientEmail;
    private String clientCountry;
    private String clientPhone;

    private ProjectType projectType;
    private String targetIndustry;
    private String budgetRange;
    private String description;

    @Builder.Default
    private Status status = Status.NEW;

    private String assignedConsultantId;
    private String assignedConsultantName;

    @Builder.Default
    private Instant createdAt = Instant.now();
    private Instant updatedAt;

    public enum ProjectType {
        BUSINESS_PURCHASE, MARKET_ENTRY, ADVISORY, COMPLIANCE_LEGAL, OTHER
    }

    public enum Status {
        NEW, IN_REVIEW, ASSIGNED, IN_PROGRESS, COMPLETED, CLOSED
    }
}
