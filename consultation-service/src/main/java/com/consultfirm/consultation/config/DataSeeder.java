package com.consultfirm.consultation.config;

import com.consultfirm.consultation.model.CaseStudy;
import com.consultfirm.consultation.model.ConsultationRequest;
import com.consultfirm.consultation.model.ServiceOffering;
import com.consultfirm.consultation.repository.CaseStudyRepository;
import com.consultfirm.consultation.repository.ConsultationRequestRepository;
import com.consultfirm.consultation.repository.ServiceOfferingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final ServiceOfferingRepository serviceRepo;
    private final CaseStudyRepository caseStudyRepo;
    private final ConsultationRequestRepository consultationRepo;

    @Override
    public void run(String... args) {
        seedServices();
        seedCaseStudies();
        seedConsultations();
    }

    private void seedServices() {
        if (serviceRepo.count() > 0) return;

        serviceRepo.saveAll(java.util.List.of(
                ServiceOffering.builder()
                        .title("Business Acquisition Advisory")
                        .summary("End-to-end guidance for buying a US business, from target search to closing.")
                        .description("We source, vet and structure acquisitions of US-based businesses on your behalf — due diligence, valuation, negotiation and closing support, coordinated with legal and financing partners.")
                        .category("acquisition")
                        .icon("Building2")
                        .displayOrder(1)
                        .build(),
                ServiceOffering.builder()
                        .title("US Market Entry Strategy")
                        .summary("A structured path for international companies entering the US market.")
                        .description("Entity formation, state selection, licensing, banking and go-to-market planning tailored to your industry and home market.")
                        .category("market-entry")
                        .icon("Globe2")
                        .displayOrder(2)
                        .build(),
                ServiceOffering.builder()
                        .title("Investment & Deal Structuring")
                        .summary("Structuring cross-border capital for tax efficiency and compliance.")
                        .description("We work with your counsel and accountants to structure the acquisition entity, financing and cross-border capital flows in line with US and home-country requirements.")
                        .category("advisory")
                        .icon("LineChart")
                        .displayOrder(3)
                        .build(),
                ServiceOffering.builder()
                        .title("Regulatory & Visa Coordination")
                        .summary("Navigating EB-5, E-2 and business licensing alongside your acquisition.")
                        .description("We coordinate with immigration and licensing counsel so your acquisition or new venture lines up with visa timelines and regulatory approvals.")
                        .category("compliance")
                        .icon("ShieldCheck")
                        .displayOrder(4)
                        .build(),
                ServiceOffering.builder()
                        .title("Post-Acquisition Operations Support")
                        .summary("Getting your newly acquired US business running smoothly under new ownership.")
                        .description("Transition planning, interim management support and operational review in the first 100 days after closing.")
                        .category("advisory")
                        .icon("Settings2")
                        .displayOrder(5)
                        .build(),
                ServiceOffering.builder()
                        .title("Franchise & Multi-Unit Consulting")
                        .summary("Evaluating and acquiring franchise territories across the US.")
                        .description("Franchise disclosure review, territory analysis and portfolio strategy for investors building a multi-unit franchise footprint.")
                        .category("acquisition")
                        .icon("Layers")
                        .displayOrder(6)
                        .build()
        ));
        log.info("Seeded {} service offerings.", serviceRepo.count());
    }

    private void seedCaseStudies() {
        if (caseStudyRepo.count() > 0) return;

        caseStudyRepo.saveAll(java.util.List.of(
                CaseStudy.builder()
                        .title("Dubai family office acquires Texas hotel group")
                        .clientOrigin("Dubai, UAE")
                        .industry("Hospitality")
                        .summary("A Dubai-based family office wanted to diversify into US hospitality real estate but had no on-the-ground presence in Texas.")
                        .outcome("Closed the acquisition of a 3-property hotel group in under 5 months, including financing coordination and transition management.")
                        .dealSize("$18M")
                        .build(),
                CaseStudy.builder()
                        .title("Abu Dhabi investor enters US healthcare services")
                        .clientOrigin("Abu Dhabi, UAE")
                        .industry("Healthcare Services")
                        .summary("An Abu Dhabi investor group sought a controlling stake in an established outpatient clinic network in the Southeast US.")
                        .outcome("Structured a majority acquisition with staged earn-outs, aligning regulatory approvals with the investor's visa timeline.")
                        .dealSize("$32M")
                        .build(),
                CaseStudy.builder()
                        .title("UK manufacturer opens first US facility")
                        .clientOrigin("Manchester, UK")
                        .industry("Manufacturing")
                        .summary("A UK precision components manufacturer needed a US base to serve automotive clients without existing local relationships.")
                        .outcome("Selected Ohio for the new facility, secured a state incentive package, and stood up the entity and operations within 7 months.")
                        .dealSize("$9M")
                        .build(),
                CaseStudy.builder()
                        .title("Saudi group builds a US franchise portfolio")
                        .clientOrigin("Riyadh, Saudi Arabia")
                        .industry("Quick Service Restaurants")
                        .summary("A Riyadh-based investment group wanted a multi-unit franchise footprint across two US states.")
                        .outcome("Acquired 12 existing franchise locations across Arizona and Nevada, with a rollout plan for 8 additional units.")
                        .dealSize("$14M")
                        .build()
        ));
        log.info("Seeded {} case studies.", caseStudyRepo.count());
    }

    private void seedConsultations() {
        if (consultationRepo.count() > 0) return;

        consultationRepo.save(ConsultationRequest.builder()
                .id("consult-sample-1")
                .clientId("client-sample-1")
                .clientName("Omar Al Mansoori")
                .clientEmail("omar.almansoori@example.ae")
                .clientCountry("United Arab Emirates")
                .clientPhone("+971 4 555 0110")
                .projectType(ConsultationRequest.ProjectType.BUSINESS_PURCHASE)
                .targetIndustry("Commercial Real Estate")
                .budgetRange("$10M - $25M")
                .description("Looking to acquire a mid-size commercial property management company in the Dallas-Fort Worth area. Prefer an owner-operator willing to stay on through transition.")
                .status(ConsultationRequest.Status.IN_PROGRESS)
                .assignedConsultantId("consultant-sample-1")
                .assignedConsultantName("James Calloway")
                .createdAt(Instant.now().minus(9, ChronoUnit.DAYS))
                .updatedAt(Instant.now().minus(2, ChronoUnit.DAYS))
                .build());

        consultationRepo.save(ConsultationRequest.builder()
                .id("consult-sample-2")
                .clientId("client-sample-2")
                .clientName("Fatima Al Suwaidi")
                .clientEmail("fatima.alsuwaidi@example.ae")
                .clientCountry("United Arab Emirates")
                .clientPhone("+971 2 555 0123")
                .projectType(ConsultationRequest.ProjectType.MARKET_ENTRY)
                .targetIndustry("E-commerce & Retail")
                .budgetRange("$1M - $5M")
                .description("Exploring US market entry for an existing beauty retail brand — considering both acquiring a small existing retailer and opening greenfield stores.")
                .status(ConsultationRequest.Status.NEW)
                .createdAt(Instant.now().minus(2, ChronoUnit.DAYS))
                .build());

        log.info("Seeded {} sample consultation requests.", consultationRepo.count());
    }
}
