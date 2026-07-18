document.getElementById('search-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Anpeche paj la rechaje

    const inputField = document.getElementById('country-input'); // Nou ka toujou itilize menm ID a pou vil la
    const cityName = inputField.value.trim(); // Retire espas initil yo
    
    const errorMessage = document.getElementById('error-message');
    const spinner = document.getElementById('loading-spinner');
    const resultSection = document.getElementById('result-section');

    // Netwaye eta anvan yo
    errorMessage.hidden = true;
    inputField.removeAttribute('aria-invalid');
    inputField.removeAttribute('aria-describedby');
    resultSection.hidden = true;

    // 1. Validasyon si chan an vid (Kondisyon Aksesibilite)
    if (cityName === "") {
        inputField.setAttribute('aria-invalid', 'true');
        inputField.setAttribute('aria-describedby', 'error-message');
        errorMessage.textContent = "Veuillez entrer le nom d'une ville avant de lancer la recherche.";
        errorMessage.hidden = false;
        return;
    }

    // Afiche loader a
    spinner.hidden = false;

    // 2. Apèl API avèk blòk try...catch pou asynchronisme
    try {
        // ---- ETAP 1: Géocodage (Chèche lat/lon vil la) ----
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`);
        
        if (!geoResponse.ok) {
            throw new Error("SERVER_ERROR");
        }

        const geoData = await geoResponse.json();

        // Si vil la pa egziste nan baz done a (results vid)
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("NOT_FOUND");
        }

        const location = geoData.results[0];
        const lat = location.latitude;
        const lon = location.longitude;
        const nameVille = location.name;
        const paysVille = location.country || "";

        // ---- ETAP 2: Prévisions météo (Chèche météo a ak lat/lon) ----
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        
        if (!weatherResponse.ok) {
            throw new Error("SERVER_ERROR");
        }

        const weatherData = await weatherResponse.json();
        const current = weatherData.current_weather;

        // ---- ETAP 3: Dekode weathercode a an tèks klè ----
        let statusText = "Nuageux"; // Valè pa defo
        const code = current.weathercode;
        if (code === 0) statusText = "Ensoleillé";
        else if (code === 1 || code === 2 || code === 3) statusText = "Partiellement Nuageux";
        else if (code >= 51 && code <= 67) statusText = "Pluvieux";
        else if (code >= 71 && code <= 77) statusText = "Neigeux";
        else if (code >= 80 && code <= 82) statusText = "Averses de pluie";
        else if (code >= 95) statusText = "Orageux";

        // ---- ETAP 4: Enjeksyon done yo an sekirite (textContent) ----
        // N ap adapte ID yo pou kat Météo a
        document.getElementById('country-name').textContent = `${nameVille}, ${paysVille}`;
        document.getElementById('country-capital').textContent = `${current.temperature} °C`; // Tanperati
        document.getElementById('country-population').textContent = `${current.windspeed} km/h`; // Vitesse du vent
        document.getElementById('country-region').textContent = statusText; // Statut météo

        // Afiche kat la bay itilizatè a
        resultSection.hidden = false;

    } catch (error) {
        // 5. Jesyon Erè API yo
        errorMessage.hidden = false;
        if (error.message === "NOT_FOUND") {
            errorMessage.textContent = "Aucun résultat trouvé pour cette recherche. Veuillez vérifier l'orthographe.";
        } else {
            errorMessage.textContent = "Connexion impossible. Veuillez vérifier votre accès à internet.";
        }
    } finally {
        // Toujou kache spinner loading lan lè operasyon an fini
        spinner.hidden = true;
    }
});

// Efase mesaj erè a depi itilizatè a kòmanse korije tèks li a
document.getElementById('country-input').addEventListener('input', function() {
    const errorMessage = document.getElementById('error-message');
    if (!errorMessage.hidden) {
        errorMessage.hidden = true;
        this.removeAttribute('aria-invalid');
        this.removeAttribute('aria-describedby');
    }
});