from locust import HttpUser, task, between, events
import requests
import uuid
import random
import json

# URL del microservicio de Cuentas
CUENTAS_API = "http://localhost:3000"

class SocioInconsistenteUser(HttpUser):
    wait_time = between(0.5, 1)
    
    def on_start(self):
        # 1. Crear Socio
        self.identificacion = f"17{random.randint(10000000, 99999999)}"
        socio_payload = {
            "nombres": "Test",
            "apellidos": "Load",
            "identificacion": self.identificacion,
            "email": f"test.{self.identificacion}@example.com",
            "telefono": "0999999999",
            "direccion": "Direccion Test",
            "tipoIdentificacion": "CEDULA",
            "activo": True
        }
        
        response = self.client.post("/api/socios", json=socio_payload)
        if response.status_code == 201:
            self.socio_id = response.json().get("id")
            
            # 2. Crear Cuenta para este socio (Directo al microservicio de Cuentas)
            # Esto debería BLOQUEAR la eliminación del socio
            cuenta_payload = {
                "socioId": self.socio_id,
                "numeroCuenta": f"LOCUST{random.randint(100000, 999999)}",
                "saldo": 100.00,
                "tipoCuenta": "AHORRO"
            }
            try:
                r_cuenta = requests.post(f"{CUENTAS_API}/cuentas", json=cuenta_payload)
                if r_cuenta.status_code == 201:
                    print(f"Socio {self.socio_id} creado con cuenta {r_cuenta.json().get('id')}")
                else:
                    print(f"Error creando cuenta: {r_cuenta.text}")
                    self.socio_id = None # Abortar si no se pudo crear cuenta
            except Exception as e:
                print(f"Error conectando a Cuentas: {str(e)}")
                self.socio_id = None
        else:
            print(f"Error creando socio: {response.text}")
            self.socio_id = None

    @task
    def intentar_eliminar_socio(self):
        if not self.socio_id:
            return
            
        # Intentar eliminar al socio. DEBERÍA FALLAR (500 o 400 o 409)
        # Si devuelve 204 o 200, es una INCONSISTENCIA GRAVE
        with self.client.delete(f"/api/socios/{self.socio_id}", catch_response=True) as response:
            if response.status_code == 204 or response.status_code == 200:
                response.failure(f"INCONSISTENCIA: Socio {self.socio_id} eliminado a pesar de tener cuentas!")
            elif response.status_code in [400, 409, 500]:
                response.success() # Es lo esperado, que falle la eliminación
            else:
                response.failure(f"Código inesperado: {response.status_code}")

    def on_stop(self):
        pass
