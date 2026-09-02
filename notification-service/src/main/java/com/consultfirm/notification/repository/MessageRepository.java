package com.consultfirm.notification.repository;

import com.consultfirm.notification.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findByConsultationIdOrderByCreatedAtAsc(String consultationId);
}
