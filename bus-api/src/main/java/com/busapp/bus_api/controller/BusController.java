package com.busapp.bus_api.controller;

import com.busapp.bus_api.model.Bus;
import com.busapp.bus_api.repository.BusRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bus")
public class BusController {

    private final BusRepository busRepository;

    public BusController(BusRepository busRepository) {
        this.busRepository = busRepository;
    }

    // GET /bus -> lista todos los buses
    @GetMapping
    public List<Bus> getAllBuses() {
        return busRepository.findAll();
    }

    // GET /bus/page -> lista buses paginados
    @GetMapping("/page")
    public Page<Bus> getBusesPage(Pageable pageable) {
        return busRepository.findAll(pageable);
    }

    // GET /bus/{id} -> obtiene un bus por ID
    @GetMapping("/{id}")
    public Bus getBusById(@PathVariable Long id) {
        return busRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bus no encontrado con id: " + id));
    }

    // POST /bus -> crea un nuevo bus
    @PostMapping
    public Bus createBus(@RequestBody Bus bus) {
        return busRepository.save(bus);
    }

    // PUT /bus/{id} -> actualiza un bus existente
    @PutMapping("/{id}")
    public Bus updateBus(@PathVariable Long id, @RequestBody Bus busDetails) {
        Bus bus = busRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bus no encontrado con id: " + id));

        bus.setNumeroBus(busDetails.getNumeroBus());
        bus.setPlaca(busDetails.getPlaca());
        bus.setCaracteristicas(busDetails.getCaracteristicas());
        bus.setActivo(busDetails.getActivo());
        bus.setMarca(busDetails.getMarca());

        return busRepository.save(bus);
    }

    // DELETE /bus/{id} -> elimina un bus por ID
    @DeleteMapping("/{id}")
    public String deleteBus(@PathVariable Long id) {
        Bus bus = busRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bus no encontrado con id: " + id));
        busRepository.delete(bus);
        return "Bus eliminado correctamente con id: " + id;
    }
}
