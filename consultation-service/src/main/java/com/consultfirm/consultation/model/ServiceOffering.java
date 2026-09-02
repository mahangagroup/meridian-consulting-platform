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
@Document(collection = "service_offerings")
public class ServiceOffering {

    @Id
    private String id;

    private String title;
    private String summary;
    private String description;

    /** e.g. "acquisition", "market-entry", "advisory", "compliance" */
    private String category;

    /** lucide-react icon name used by the frontend, e.g. "Building2" */
    private String icon;

    @Builder.Default
    private int displayOrder = 0;
}
