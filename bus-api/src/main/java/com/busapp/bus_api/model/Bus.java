package com.busapp.bus_api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "bus")
@Getter
@Setter
public class Bus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String numeroBus;

    @Column(nullable = false, unique = true)
    private String placa;

    @CreationTimestamp
    private LocalDateTime fechaCreacion;

    private String caracteristicas;

    private Boolean activo = true;

    @ManyToOne
    @JoinColumn(name = "marca_id", nullable = false)
    private Marca marca;
}
