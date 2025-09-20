package com.busapp.bus_api.repository;

import com.busapp.bus_api.model.Bus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusRepository extends JpaRepository<Bus, Long> {
    long countByMarcaId(Long marcaId); // <--- Este es el nuevo método
}
