package com.consultfirm.consultation.repository;

import com.consultfirm.consultation.model.ServiceOffering;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ServiceOfferingRepository extends MongoRepository<ServiceOffering, String> {
}
