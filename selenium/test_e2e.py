import pytest
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

# Configuration
FRONTEND_URL = "http://localhost:3001"

@pytest.fixture(scope="module")
def driver():
    options = Options()
    options.binary_location = "/usr/bin/chromium"
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--remote-debugging-port=9222")
    options.add_argument("--window-size=1920,1080")
    
    service = Service()
    driver = webdriver.Chrome(service=service, options=options)
    # REMOVED implicitly_wait as requested to avoid mixing waits
    yield driver
    
    # Safe Teardown
    try:
         if driver.service.process:
            driver.quit()
    except:
        pass

def test_full_flow(driver):
    try:
        driver.get(FRONTEND_URL)
        wait = WebDriverWait(driver, 20) # Explicit wait 20s

        print("\n--- Starting E2E Flow ---")
        
        # 1. Create Socio
        print(f"1. Creating Socio...")
        timestamp = int(time.time())
        cedula = str(timestamp) 
        
        driver.find_element(By.ID, "input-nombres").send_keys(f"TestUser-{timestamp}")
        driver.find_element(By.ID, "input-apellidos").send_keys("Selenium")
        driver.find_element(By.ID, "input-identificacion").send_keys(cedula)
        driver.find_element(By.ID, "input-email").send_keys(f"test.{timestamp}@e.com")
        driver.find_element(By.ID, "input-telefono").send_keys("0991234567")
        driver.find_element(By.ID, "input-direccion").send_keys("Av Selenium 123")
        
        driver.find_element(By.ID, "btn-submit-socio").click()
        
        # Wait for Success Toast
        # Use contains(., 'text') to match nested text nodes
        wait.until(EC.visibility_of_element_located((By.XPATH, "//div[contains(., 'Socio registrado exitosamente')]")))
        print("   Socio created.")

        # 2. Switch to Cuentas
        print("2. Switching to Cuentas...")
        driver.find_element(By.XPATH, "//button[contains(., 'Cuentas')]").click()
        
        # 3. Create Cuenta
        print("3. Creating Cuenta...")
        numero_cuenta = f"CTA-{timestamp}"
        
        # Select Socio
        select_socio = wait.until(EC.element_to_be_clickable((By.ID, "select-socio")))
        
        # Retry logic for select population
        from selenium.webdriver.support.ui import Select
        select = Select(select_socio)
        
        def find_option(d):
            select = Select(d.find_element(By.ID, "select-socio"))
            for opt in select.options:
                if cedula in opt.text:
                    return opt
            return False

        opt = wait.until(find_option)
        select.select_by_visible_text(opt.text)

        driver.find_element(By.ID, "input-numero-cuenta").send_keys(numero_cuenta)
        driver.find_element(By.ID, "input-saldo-inicial").send_keys("500.00")
        driver.find_element(By.ID, "btn-create-cuenta").click()
        
        # Wait for creation success
        wait.until(EC.visibility_of_element_located((By.XPATH, "//div[contains(., 'Cuenta creada exitosamente')]")))
        print("   Cuenta created.")

        # 4. Deposit
        print("4. Performing Deposit...")
        # Find row and scroll into view
        row_xpath = f"//tr[contains(., '{numero_cuenta}')]"
        wait.until(EC.presence_of_element_located((By.XPATH, row_xpath)))
        
        cuenta_row = driver.find_element(By.XPATH, row_xpath)
        driver.execute_script("arguments[0].scrollIntoView(true);", cuenta_row)
        
        deposit_btn = cuenta_row.find_element(By.XPATH, ".//button[contains(@id, 'btn-deposito')]")
        deposit_btn.click()
        
        alert = wait.until(EC.alert_is_present())
        alert.send_keys("100.00")
        
        # Accept alert
        alert.accept()
        
        # Wait for transaction success toast
        wait.until(EC.visibility_of_element_located((By.XPATH, "//div[contains(@class, 'fixed') and contains(., 'Transacción')]")))
        print("   Transaction successful toast appeared.")
        
        # 5. Verify Balance Update (Using WebDriverWait as requested)
        print("5. Verifying Balance Update...")
        balance_cell_xpath = f"//tr[contains(., '{numero_cuenta}')]/td[3]"
        
        # Wait until text contains "600"
        wait.until(
            lambda d: "600" in d.find_element(By.XPATH, balance_cell_xpath).text
        )
        
        final_text = driver.find_element(By.XPATH, balance_cell_xpath).text
        print(f"   Balance verified: {final_text}")
        
    except Exception as e:
        print(f"\n!!! TEST FAILED: {str(e)} !!!")
        try:
             print("PAGE TEXT DUMP (Bottom):", driver.find_element(By.TAG_NAME, "body").text[-500:])
        except: pass
        raise e
