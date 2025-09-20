package com.busapp.bus_api.repository;

import com.busapp.bus_api.model.Marca;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarcaRepository extends JpaRepository<Marca, Long> {
}
