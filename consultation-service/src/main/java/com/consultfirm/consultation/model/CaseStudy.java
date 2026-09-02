package com.consultfirm.consultation.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "case_studies")
public class CaseStudy {

    @Id
    private String id;

    private String title;
    private String clientOrigin;   // e.g. "Dubai, UAE"
    private String industry;       // e.g. "Hospitality"
    private String summary;
    private String outcome;        // e.g. "Closed acquisition of a 3-property hotel group in Texas within 5 months"
    private String dealSize;       // display string, e.g. "$18M"
}
