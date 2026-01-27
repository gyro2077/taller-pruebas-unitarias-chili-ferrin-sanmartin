package ec.fin.coacandes.socios.client;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * DTO para representar una Cuenta del microservicio de Cuentas
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CuentaDto {
    private String id;
    private String socioId;
    private String numeroCuenta;
    private BigDecimal saldo;
    private String estado;
    private String tipoCuenta;
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
}
