package com.consultfirm.consultation.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AssignConsultantRequest {
    @NotBlank
    private String consultantId;

    @NotBlank
    private String consultantName;
}
