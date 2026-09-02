package com.consultfirm.consultation.dto;

import com.consultfirm.consultation.model.ConsultationRequest;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateConsultationRequest {

    @NotNull(message = "Project type is required")
    private ConsultationRequest.ProjectType projectType;

    private String targetIndustry;
    private String budgetRange;

    @NotBlank(message = "Please describe your project")
    private String description;

    // Sent by the frontend from the logged-in profile; clientId/role are trusted from the JWT instead
    @NotBlank
    private String clientName;

    @NotBlank
    private String clientEmail;

    private String clientCountry;
    private String clientPhone;
}
