package ec.fin.coacandes.socios.client;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.ResourceAccessException;

import java.util.Collections;
import java.util.List;

/**
 * Cliente HTTP para comunicación con el microservicio de Cuentas
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class CuentasClient {

    private final RestTemplate restTemplate;

    @Value("${microservicio.cuentas.url:http://localhost:3000}")
    private String cuentasServiceUrl;

    /**
     * Obtiene las cuentas activas de un socio
     * 
     * @param socioId UUID del socio
     * @return Lista de cuentas activas del socio
     * @throws RuntimeException si el servicio de Cuentas no está disponible
     */
    public List<CuentaDto> getCuentasActivasPorSocio(String socioId) {
        String url = cuentasServiceUrl + "/cuentas/socio/" + socioId;

        try {
            log.info("Consultando cuentas activas para socio: {}", socioId);

            ResponseEntity<List<CuentaDto>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<CuentaDto>>() {
                    });

            List<CuentaDto> cuentas = response.getBody();
            log.info("Socio {} tiene {} cuenta(s) activa(s)", socioId, cuentas != null ? cuentas.size() : 0);

            return cuentas != null ? cuentas : Collections.emptyList();

        } catch (HttpClientErrorException.NotFound e) {
            // Socio no tiene cuentas, esto es válido
            log.info("Socio {} no tiene cuentas activas", socioId);
            return Collections.emptyList();

        } catch (ResourceAccessException e) {
            log.error("Error de conexión con microservicio de Cuentas: {}", e.getMessage());
            throw new RuntimeException(
                    "El microservicio de Cuentas no está disponible. No se puede validar si el socio tiene cuentas activas.",
                    e);

        } catch (Exception e) {
            log.error("Error inesperado al consultar cuentas para socio {}: {}", socioId, e.getMessage());
            throw new RuntimeException("Error al comunicarse con el microservicio de Cuentas: " + e.getMessage(), e);
        }
    }

    /**
     * Verifica si un socio tiene cuentas activas
     * 
     * @param socioId UUID del socio
     * @return true si el socio tiene al menos una cuenta activa, false en caso
     *         contrario
     */
    public boolean tieneCuentasActivas(String socioId) {
        List<CuentaDto> cuentas = getCuentasActivasPorSocio(socioId);
        return !cuentas.isEmpty();
    }
}
