package ec.fin.coacandes.socios.service.impl;

import ec.fin.coacandes.socios.client.CuentasClient;
import ec.fin.coacandes.socios.dto.SocioRequestDTO;
import ec.fin.coacandes.socios.dto.SocioResponseDTO;
import ec.fin.coacandes.socios.entity.Socio;
import ec.fin.coacandes.socios.repository.SocioRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SocioServiceImplTest {

    @Mock
    private SocioRepository socioRepository;

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private CuentasClient cuentasClient;

    @InjectMocks
    private SocioServiceImpl socioService;

    private Socio socio;
    private SocioRequestDTO socioRequestDTO;
    private SocioResponseDTO socioResponseDTO;
    private UUID socioId;

    @BeforeEach
    void setUp() {
        socioId = UUID.randomUUID();

        socio = new Socio();
        socio.setId(socioId);
        socio.setNombres("Juan");
        socio.setApellidos("Perez");
        socio.setIdentificacion("1712345678");
        socio.setEmail("juan.perez@test.com");
        socio.setActivo(true);

        socioRequestDTO = new SocioRequestDTO();
        socioRequestDTO.setNombres("Juan");
        socioRequestDTO.setApellidos("Perez");
        socioRequestDTO.setIdentificacion("1712345678");
        socioRequestDTO.setEmail("juan.perez@test.com");

        socioResponseDTO = new SocioResponseDTO();
        socioResponseDTO.setId(socioId);
        socioResponseDTO.setNombres("Juan");
        socioResponseDTO.setApellidos("Perez");
        socioResponseDTO.setIdentificacion("1712345678");
        socioResponseDTO.setEmail("juan.perez@test.com");
        socioResponseDTO.setActivo(true);
    }

    @Test
    @DisplayName("Crear socio exitosamente")
    void crearSocio_Exitoso() {
        // Arrange
        when(socioRepository.existsByIdentificacion(anyString())).thenReturn(false);
        when(modelMapper.map(any(SocioRequestDTO.class), eq(Socio.class))).thenReturn(socio);
        when(socioRepository.save(any(Socio.class))).thenReturn(socio);
        when(modelMapper.map(any(Socio.class), eq(SocioResponseDTO.class))).thenReturn(socioResponseDTO);

        // Act
        SocioResponseDTO resultado = socioService.crearSocio(socioRequestDTO);

        // Assert
        assertNotNull(resultado);
        assertEquals(socioId, resultado.getId());
        assertEquals("1712345678", resultado.getIdentificacion());
        verify(socioRepository).save(any(Socio.class));
    }

    @Test
    @DisplayName("Fallar al crear socio con identificación duplicada")
    void crearSocio_IdentificacionDuplicada_DeberiaFallar() {
        // Arrange
        when(socioRepository.existsByIdentificacion(anyString())).thenReturn(true);

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> socioService.crearSocio(socioRequestDTO));
        verify(socioRepository, never()).save(any(Socio.class));
    }

    @Test
    @DisplayName("Actualizar socio exitosamente")
    void actualizarSocio_Exitoso() {
        // Arrange
        when(socioRepository.findById(socioId)).thenReturn(Optional.of(socio));
        when(socioRepository.save(any(Socio.class))).thenReturn(socio);

        // Configurar Mockito para aceptar cualquier llamada a map() que retorne
        // SocioResponseDTO
        // Usamos lenient() para evitar StrictStubbingException si hay sobrelapamiento
        // de argumentos
        lenient().when(modelMapper.map(any(Socio.class), eq(SocioResponseDTO.class))).thenReturn(socioResponseDTO);

        // Act
        SocioResponseDTO resultado = socioService.actualizarSocio(socioId, socioRequestDTO);

        // Assert
        assertNotNull(resultado);
        verify(socioRepository).save(any(Socio.class));
    }

    @Test
    @DisplayName("Obtener socio por ID exitosamente")
    void obtenerSocioPorId_Exitoso() {
        // Arrange
        when(socioRepository.findById(socioId)).thenReturn(Optional.of(socio));
        when(modelMapper.map(any(Socio.class), eq(SocioResponseDTO.class))).thenReturn(socioResponseDTO);

        // Act
        SocioResponseDTO resultado = socioService.obtenerSocioPorId(socioId);

        // Assert
        assertNotNull(resultado);
        assertEquals(socioId, resultado.getId());
    }

    @Test
    @DisplayName("Eliminar socio SIN cuentas activas - Exitoso")
    void eliminarSocio_SinCuentasActivas_Exitoso() {
        // Arrange
        when(socioRepository.findById(socioId)).thenReturn(Optional.of(socio));
        when(cuentasClient.tieneCuentasActivas(anyString())).thenReturn(false);

        // Act
        socioService.eliminarSocio(socioId);

        // Assert
        verify(socioRepository).deleteById(socioId);
    }

    @Test
    @DisplayName("Bloquear eliminación de socio CON cuentas activas")
    void eliminarSocio_ConCuentasActivas_DeberiaFallar() {
        // Arrange
        when(socioRepository.findById(socioId)).thenReturn(Optional.of(socio));
        when(cuentasClient.tieneCuentasActivas(anyString())).thenReturn(true);

        // Act & Assert
        assertThrows(IllegalStateException.class, () -> socioService.eliminarSocio(socioId));
        verify(socioRepository, never()).deleteById(any(UUID.class));
    }

    @Test
    @DisplayName("Bloquear eliminación cuando servicio de Cuentas falla")
    void eliminarSocio_ServicioCuentasNoResponde_DeberiaFallar() {
        // Arrange
        when(socioRepository.findById(socioId)).thenReturn(Optional.of(socio));
        when(cuentasClient.tieneCuentasActivas(anyString())).thenThrow(new RuntimeException("Service unavailable"));

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> socioService.eliminarSocio(socioId));
        assertTrue(exception.getMessage().contains("No se puede eliminar el socio en este momento"));
        verify(socioRepository, never()).deleteById(any(UUID.class));
    }

    @Test
    @DisplayName("Obtener todos los socios")
    void obtenerTodosLosSocios_Exitoso() {
        // Arrange
        List<Socio> socios = Arrays.asList(socio);
        when(socioRepository.findAll()).thenReturn(socios);
        when(modelMapper.map(any(Socio.class), eq(SocioResponseDTO.class))).thenReturn(socioResponseDTO);

        // Act
        List<SocioResponseDTO> resultado = socioService.obtenerTodosLosSocios();

        // Assert
        assertFalse(resultado.isEmpty());
        assertEquals(1, resultado.size());
    }

    @Test
    @DisplayName("Obtener socio por Identificación exitosamente")
    void obtenerSocioPorIdentificacion_Exitoso() {
        // Arrange
        String identificacion = "1712345678";
        when(socioRepository.findByIdentificacion(identificacion)).thenReturn(Optional.of(socio));
        when(modelMapper.map(any(Socio.class), eq(SocioResponseDTO.class))).thenReturn(socioResponseDTO);

        // Act
        SocioResponseDTO resultado = socioService.obtenerSocioPorIdentificacion(identificacion);

        // Assert
        assertNotNull(resultado);
        assertEquals(identificacion, resultado.getIdentificacion());
    }

    @Test
    @DisplayName("Obtener socio por Identificación no encontrado")
    void obtenerSocioPorIdentificacion_NoEncontrado() {
        // Arrange
        String identificacion = "9999999999";
        when(socioRepository.findByIdentificacion(identificacion)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(EntityNotFoundException.class, () -> socioService.obtenerSocioPorIdentificacion(identificacion));
    }
}
