package com.consultfirm.consultation.controller;

import com.consultfirm.consultation.model.ServiceOffering;
import com.consultfirm.consultation.repository.ServiceOfferingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceOfferingController {

    private final ServiceOfferingRepository repository;

    @GetMapping
    public List<ServiceOffering> list() {
        return repository.findAll().stream()
                .sorted(Comparator.comparingInt(ServiceOffering::getDisplayOrder))
                .toList();
    }

    @PostMapping
    public ServiceOffering create(@RequestBody ServiceOffering offering) {
        return repository.save(offering);
    }

    @PutMapping("/{id}")
    public ServiceOffering update(@PathVariable String id, @RequestBody ServiceOffering offering) {
        offering.setId(id);
        return repository.save(offering);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        repository.deleteById(id);
    }
}
