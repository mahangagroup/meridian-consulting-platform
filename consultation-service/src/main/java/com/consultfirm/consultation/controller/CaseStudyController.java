package com.consultfirm.consultation.controller;

import com.consultfirm.consultation.model.CaseStudy;
import com.consultfirm.consultation.repository.CaseStudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/case-studies")
@RequiredArgsConstructor
public class CaseStudyController {

    private final CaseStudyRepository repository;

    @GetMapping
    public List<CaseStudy> list() {
        return repository.findAll();
    }

    @PostMapping
    public CaseStudy create(@RequestBody CaseStudy caseStudy) {
        return repository.save(caseStudy);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        repository.deleteById(id);
    }
}
