document.getElementById('search-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Anpeche paj la rechaje

    const inputField = document.getElementById('country-input');
    const countryName = inputField.value.trim(); // Retire espas initil yo
    
    const errorMessage = document.getElementById('error-message');
    const spinner = document.getElementById('loading-spinner');
    const resultSection = document.getElementById('result-section');

    // Netwaye eta anvan yo
    errorMessage.hidden = true;
    inputField.removeAttribute('aria-invalid');
    inputField.removeAttribute('aria-describedby');
    resultSection.hidden = true;

    // 1. Validasyon si chan an vid (Kondisyon Aksesibilite)
    if (countryName === "") {
        inputField.setAttribute('aria-invalid', 'true');
        inputField.setAttribute('aria-describedby', 'error-message');
        errorMessage.textContent = "Veuillez entrer le nom d'un pays avant de lancer la recherche.";
        errorMessage.hidden = false;
        return;
    }

    // Afiche loader a
    spinner.hidden = false;

    // 2. Apèl API avèk blòk try...catch pou asynchronisme
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}/`);
        
        // Jere si peyi a pa egziste (Erè 404)
        if (!response.ok) {
            throw new Error("NOT_FOUND");
        }

        const data = await response.json();
        const country = data[0]; // Pran premye rezilta a

        // 3. Rekipere ak fòmate done yo obligatwa yo
        
        // Fòmataj popilasyon an ak espas (ex: 11 500 000)
        const formattedPopulation = new Intl.NumberFormat('fr-FR').format(country.population).replace(/,/g, ' ');

        // Rekipere tout lang yo sou fòm tèks
        const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';

        // Rekipere non monnen an ak senbòl li
        let currencyStr = 'N/A';
        if (country.currencies) {
            const currencyKey = Object.keys(country.currencies)[0];
            currencyStr = `${country.currencies[currencyKey].name} (${currencyKey})`;
        }

        // 4. Enjeksyon done yo an sekirite nan DOM la (textContent obligatwa kòmsadwa)
        document.getElementById('country-name').textContent = country.name.common || 'N/A';
        document.getElementById('country-capital').textContent = country.capital ? country.capital[0] : 'N/A';
        document.getElementById('country-population').textContent = formattedPopulation;
        document.getElementById('country-region').textContent = country.region || 'N/A';
        document.getElementById('country-currency').textContent = currencyStr;
        document.getElementById('country-languages').textContent = languages;

        // Enjeksyon drapo a ak alt li
        const flagImg = document.getElementById('country-flag');
        flagImg.src = country.flags.svg || '';
        flagImg.alt = country.flags.alt || `Drapeau officiel du pays : ${country.name.common}`;

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