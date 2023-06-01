$(document).ready(function () {
    // Load the CSV data
    d3.csv("data/cleaned_pldb.csv", function (data) {
        let currentYear = 2022;
    
        // Filter languages based on the selected year
        function filterLanguages(year) {
            return data.filter(function (d) {
                return d.appeared <= year;
            });
        }
  
        // Update the language selection box
        function updateLanguageSelect(languages) {
            $("#language-select").empty();
        
            languages.forEach(function (lang) {
                let option = document.createElement("option");
                option.value = lang.title;
                option.text = lang.title;
                $("#language-select").append(option);
            });

            // Set the selected option text as the first option
            $("#language-select").val(languages[0].title);
        }
        
        // Limit the number of times the displayLDAVis function is called within a certain time interval
        function debounce(func, wait) {
            let timeout;
          
            return function () {
                const context = this;
                const args = arguments;
            
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                    func.apply(context, args);
                }, wait);
            };
        }
  
        // Display the LDA visualization for the selected language
        function displayLDAVis(language) {
            return new Promise((resolve) => {
                // Clear the previous visualization
                $("#lda-vis").empty();
            
                // Create a new div for the visualization and assign an ID
                const visDiv = $("<div>").attr("id", "lda-vis-content").appendTo("#lda-vis");
            
                // Display the LDA visualization using LDAvis
                if (language == "C#") {
                    language = "C_sharp";
                }
                new LDAvis("#" + visDiv.attr("id"), `data/lda/${language}.json`);
                resolve();
            });
        }

        // Get language information
        function getLanguageInfo(language) {
            // This is just a simple example. In a real application, you'd likely
            // want to retrieve this information from a database or API.
            let languageInfo = {
                'Python': 'Python is a high-level, interpreted programming language.',
                'JavaScript': 'JavaScript is a dynamic, loosely typed, object-based, and interpreted scripting language.',
                'C#': 'C# (C-Sharp) is a programming language developed by Microsoft that runs on the .NET Framework.',
                // ...and so on for other languages
            };
        
            return languageInfo[language];
        }
        
        // Initialize the tooltips
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
          
  
        // Update the UI when the year is changed
        $("#year-slider").on("input", debounce(function () {
            currentYear = $(this).val();
            $("#year-display").text(currentYear);
            const languages = filterLanguages(currentYear);
            updateLanguageSelect(languages);
            displayLDAVis(languages[0].title);
        }, 200));
  
        // Update the UI when the language is changed
        $("#language-select").on("change", async function () {
            let selectedLanguage = $(this).val();
            await displayLDAVis(selectedLanguage);
      
            // Get info about the selected language
            let info = getLanguageInfo(selectedLanguage);
    
            // Update the tooltip content
            $('#info-btn').attr('data-original-title', info).tooltip('hide');
        });
  
        // Initialize the UI
        $("#year-display").text(currentYear);
        const languages = filterLanguages(currentYear);
        updateLanguageSelect(languages);
        displayLDAVis(languages[0].title);

        // Initialize the tooltip for the first language
        let info = getLanguageInfo(languages[0].title);
        $('#info-btn').attr('data-original-title', info).tooltip('hide');
    });
});