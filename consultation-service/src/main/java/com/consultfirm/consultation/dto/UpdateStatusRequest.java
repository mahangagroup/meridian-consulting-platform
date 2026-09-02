package com.consultfirm.consultation.dto;

import com.consultfirm.consultation.model.ConsultationRequest;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateStatusRequest {
    @NotNull
    private ConsultationRequest.Status status;
}
