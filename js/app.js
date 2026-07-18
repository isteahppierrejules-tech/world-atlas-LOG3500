document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const inputField = document.getElementById('country-input');
    const errorMessage = document.getElementById('error-message');
    const spinner = document.getElementById('loading-spinner');
    const resultSection = document.getElementById('result-section');

    if (searchForm) {
        searchForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Anpeche paj la rechaje otomatikman

            const cityName = inputField.value.trim(); // Netwaye antre a

            // Reyisyalize koòdone a
            errorMessage.hidden = true;
            resultSection.hidden = true;
            inputField.removeAttribute('aria-invalid');
            inputField.removeAttribute('aria-describedby');

            // 1. Validasyon si jaden an vid (Kondisyon Aksesibilite)
            if (cityName === "") {
                inputField.setAttribute('aria-invalid', 'true');
                inputField.setAttribute('aria-describedby', 'error-message');
                errorMessage.textContent = "Veuillez entrer le nom d'une ville avant de lancer la recherche.";
                errorMessage.hidden = false;
                return;
            }

            // Afiche loader a
            spinner.hidden = false;

            try {
                // ETAP 1: Géocodage (Chèche kowòdone yo)
                const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`;
                const geoResponse = await fetch(geoUrl);
                
                if (!geoResponse.ok) throw new Error("SERVER_ERROR");

                const geoData = await geoResponse.json();

                if (!geoData.results || geoData.results.length === 0) {
                    throw new Error("NOT_FOUND");
                }

                const location = geoData.results[0];
                const lat = location.latitude;
                const lon = location.longitude;
                const nameVille = location.name;
                const paysVille = location.country || "";

                // ETAP 2: Chèche Météo a avèk kowòdone yo
                const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
                const weatherResponse = await fetch(weatherUrl);
                
                if (!weatherResponse.ok) throw new Error("SERVER_ERROR");

                const weatherData = await weatherResponse.json();
                const current = weatherData.current_weather;

                // ETAP 3: Dekode weathercode a an tèks
                let statusText = "Nuageux";
                const code = current.weathercode;
                if (code === 0) statusText = "Ensoleillé";
                else if (code === 1 || code === 2 || code === 3) statusText = "Partiellement Nuageux";
                else if (code >= 51 && code <= 67) statusText = "Pluvieux";
                else if (code >= 71 && code <= 77) statusText = "Neigeux";
                else if (code >= 80 && code <= 82) statusText = "Averses de pluie";
                else if (code >= 95) statusText = "Orageux";

                // ETAP 4: Enjeksyon done an sekirite (textContent)
                document.getElementById('country-name').textContent = `${nameVille}, ${paysVille}`;
                document.getElementById('country-capital').textContent = `${current.temperature} °C`;
                document.getElementById('country-population').textContent = `${current.windspeed} km/h`;
                document.getElementById('country-region').textContent = statusText;

                // Afiche bwat rezilta a
                resultSection.hidden = false;

            } catch (error) {
                errorMessage.hidden = false;
                if (error.message === "NOT_FOUND") {
                    errorMessage.textContent = "Aucun résultat trouvé pour cette recherche. Veuillez vérifier l'orthographe.";
                } else {
                    errorMessage.textContent = "Connexion impossible. Veuillez vérifier votre accès à internet.";
                }
            } finally {
                // Kache spinner a nan tout ka
                spinner.hidden = true;
            }
        });
    }

    // Efase erè lè itilizatè a ap tape
    if (inputField) {
        inputField.addEventListener('input', function() {
            if (!errorMessage.hidden) {
                errorMessage.hidden = true;
                this.removeAttribute('aria-invalid');
                this.removeAttribute('aria-describedby');
            }
        });
    }

    // Jere chanjman nan meni an (Dashboard, Forecast, Map, Alerts)
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            // Retire liy ble active la sou ansyen lyen an
            document.querySelectorAll('nav ul li a').forEach(item => {
                item.classList.remove('active');
            });
            
            // Mete liy ble a sou sa ou sot klike a
            this.classList.add('active');
        });
    });
});