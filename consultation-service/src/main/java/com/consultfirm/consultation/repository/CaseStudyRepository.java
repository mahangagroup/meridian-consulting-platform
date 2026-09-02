package com.consultfirm.consultation.repository;

import com.consultfirm.consultation.model.CaseStudy;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CaseStudyRepository extends MongoRepository<CaseStudy, String> {
}
