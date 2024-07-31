const botonToggle = document.getElementById('hamburguesa');
const botonClose = document.getElementById('close');
const divNavegacion = document.getElementById('navegacion');

//otra cosa
botonToggle.addEventListener('click', () => {

    botonToggle.style.display = 'none';
    botonClose.style.display = 'block';
    setTimeout(() => {
        divNavegacion.style.transform = 'translateY(459px)';
        divNavegacion.style.transition = '1.5s';

    }, 200);
});

botonClose.addEventListener('click' , ()=>{
   
    botonClose.style.display = 'none'; 
    botonToggle.style.display = 'block';
    setTimeout(()=>{
        divNavegacion.style.transform = 'translateY(-400px)';
    divNavegacion.style.transition = '2.5s';
    },300)
    
});


//translation
document.addEventListener('DOMContentLoaded', function () {
    const flagsContainer = document.getElementById('flags');

    function updateTranslations(translations, language) {
        const translation = translations[language];
        if (translation) {
            document.querySelectorAll('[data-section][data-value]').forEach(element => {
                const section = element.getAttribute('data-section');
                const key = element.getAttribute('data-value');
                if (translation[section] && translation[section][key]) {
                    element.textContent = translation[section][key];
                }
            });
        }
    }

    async function fetchTranslations() {
        try {
            const response = await fetch('translations.json');
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const translations = await response.json();

            // Set default language
//            const defaultLanguage = flagsContainer.querySelector('.flags__item').getAttribute('data-language');
              const defaultLanguage = "en";
            updateTranslations(translations, defaultLanguage);

            // Add click event listener to flags container for delegation
            flagsContainer.addEventListener('click', function (event) {
                // Check if the clicked element or its parent has the 'flags__item' class
                const flagsItem = event.target.closest('.flags__item');
                if (flagsItem) {
                    const selectedLanguage = flagsItem.getAttribute('data-language');
                    updateTranslations(translations, selectedLanguage);
                }
            });

        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    fetchTranslations();
});