package com.consultfirm.consultation.repository;

import com.consultfirm.consultation.model.ConsultationRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ConsultationRequestRepository extends MongoRepository<ConsultationRequest, String> {
    List<ConsultationRequest> findByClientIdOrderByCreatedAtDesc(String clientId);
    List<ConsultationRequest> findAllByOrderByCreatedAtDesc();
    List<ConsultationRequest> findByAssignedConsultantIdOrderByCreatedAtDesc(String consultantId);
}
