package ec.fin.coacandes.socios.service.impl;

import ec.fin.coacandes.socios.client.CuentasClient;
import ec.fin.coacandes.socios.dto.SocioRequestDTO;
import ec.fin.coacandes.socios.dto.SocioResponseDTO;
import ec.fin.coacandes.socios.entity.Socio;
import ec.fin.coacandes.socios.repository.SocioRepository;
import ec.fin.coacandes.socios.service.SocioService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class SocioServiceImpl implements SocioService {

    private final SocioRepository socioRepository;
    private final ModelMapper modelMapper;
    private final CuentasClient cuentasClient;

    @Override
    public SocioResponseDTO crearSocio(SocioRequestDTO request) {
        // Validar identificación única
        if (socioRepository.existsByIdentificacion(request.getIdentificacion())) {
            throw new IllegalArgumentException("Ya existe un socio con esta identificación");
        }

        Socio socio = modelMapper.map(request, Socio.class);

        Socio guardado = socioRepository.save(socio);
        return modelMapper.map(guardado, SocioResponseDTO.class);
    }

    @Override
    public SocioResponseDTO actualizarSocio(UUID id, SocioRequestDTO request) {
        Socio socio = socioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Socio no encontrado"));

        // Validar si cambia la identificación
        if (!socio.getIdentificacion().equals(request.getIdentificacion()) &&
                socioRepository.existsByIdentificacion(request.getIdentificacion())) {
            throw new IllegalArgumentException("La nueva identificación ya está registrada");
        }

        modelMapper.map(request, socio);

        Socio actualizado = socioRepository.save(socio);
        return modelMapper.map(actualizado, SocioResponseDTO.class);
    }

    @Override
    public SocioResponseDTO obtenerSocioPorId(UUID id) {
        Socio socio = socioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Socio no encontrado"));
        return modelMapper.map(socio, SocioResponseDTO.class);
    }

    @Override
    public List<SocioResponseDTO> obtenerTodosLosSocios() {
        return socioRepository.findAll().stream()
                .map(socio -> modelMapper.map(socio, SocioResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public void eliminarSocio(UUID id) {
        Socio socio = socioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Socio no encontrado"));

        // ✅ VALIDACIÓN CROSS-SERVICE: Verificar que el socio no tenga cuentas activas
        log.info("Validando si el socio {} tiene cuentas activas...", id);

        try {
            boolean tieneCuentas = cuentasClient.tieneCuentasActivas(id.toString());

            if (tieneCuentas) {
                log.warn("Intento de eliminar socio {} que tiene cuentas activas", id);
                throw new IllegalStateException(
                        "No se puede eliminar el socio porque tiene cuentas activas. " +
                                "Primero debe cancelar todas sus cuentas.");
            }

            log.info("Socio {} no tiene cuentas activas, procediendo con eliminación", id);
        } catch (RuntimeException e) {
            // Re-lanzar excepciones específicas de negocio
            if (e instanceof IllegalStateException) {
                throw e;
            }
            // Si el servicio de Cuentas no está disponible, no permitir la eliminación por
            // seguridad
            log.error("Error al validar cuentas del socio {}: {}", id, e.getMessage());
            throw new RuntimeException(
                    "No se puede eliminar el socio en este momento porque no se pudo validar " +
                            "si tiene cuentas activas. Por favor, intente nuevamente más tarde.",
                    e);
        }

        socioRepository.deleteById(id);
        log.info("Socio {} eliminado exitosamente", id);
    }

    @Override
    public SocioResponseDTO obtenerSocioPorIdentificacion(String identificacion) {
        Socio socio = socioRepository.findByIdentificacion(identificacion)
                .orElseThrow(() -> new EntityNotFoundException("Socio no encontrado"));
        return modelMapper.map(socio, SocioResponseDTO.class);
    }
}
