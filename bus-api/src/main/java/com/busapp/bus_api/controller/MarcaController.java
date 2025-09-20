package com.busapp.bus_api.controller;

import com.busapp.bus_api.model.Marca;
import com.busapp.bus_api.repository.BusRepository;
import com.busapp.bus_api.repository.MarcaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/marca")
public class MarcaController {

    private final MarcaRepository marcaRepository;
    private final BusRepository busRepository; // Para contar los buses por marca

    public MarcaController(MarcaRepository marcaRepository, BusRepository busRepository) {
        this.marcaRepository = marcaRepository;
        this.busRepository = busRepository;
    }

    // GET /marca -> lista todas las marcas
    @GetMapping
    public List<Marca> getAllMarcas() {
        return marcaRepository.findAll();
    }

    // GET /marca/{id} -> obtiene una marca por ID
    @GetMapping("/{id}")
    public Marca getMarcaById(@PathVariable Long id) {
        return marcaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marca no encontrada con id: " + id));
    }

    // GET /marca/{id}/detalle -> detalle de marca con cantidad de buses
    @GetMapping("/{id}/detalle")
    public Map<String, Object> getMarcaDetalle(@PathVariable Long id) {
        Marca marca = marcaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marca no encontrada con id: " + id));

        long cantidadBuses = busRepository.countByMarcaId(id);

        Map<String, Object> detalle = new HashMap<>();
        detalle.put("id", marca.getId());
        detalle.put("nombre", marca.getNombre());
        detalle.put("cantidadBuses", cantidadBuses);

        return detalle;
    }

    // POST /marca -> crear nueva marca
    @PostMapping
    public Marca createMarca(@RequestBody Marca marca) {
        return marcaRepository.save(marca);
    }

    // PUT /marca/{id} -> actualizar marca existente
    @PutMapping("/{id}")
    public Marca updateMarca(@PathVariable Long id, @RequestBody Marca marcaDetails) {
        Marca marca = marcaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marca no encontrada con id: " + id));

        marca.setNombre(marcaDetails.getNombre());

        return marcaRepository.save(marca);
    }

    // DELETE /marca/{id} -> eliminar una marca por ID
    @DeleteMapping("/{id}")
    public String deleteMarca(@PathVariable Long id) {
        Marca marca = marcaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marca no encontrada con id: " + id));
        marcaRepository.delete(marca);
        return "Marca eliminada correctamente con id: " + id;
    }
}
