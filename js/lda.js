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
  
        // Display the LDA visualization for the selected language
        function displayLDAVis(language) {
            d3.json(`data/lda/${language}.json`, function (ldaData) {
                // Clear the previous visualization
                $("#lda-vis").empty();
        
                // Create a new div for the visualization and assign an ID
                const visDiv = $("<div>").attr("id", "lda-vis-content").appendTo("#lda-vis");
        
                // Display the LDA visualization using LDAvis
                if (language == "C#") {
                    language = "C_sharp";
                }
                new LDAvis("#" + visDiv.attr("id"), `data/lda/${language}.json`);
            });
        }          
  
        // Update the UI when the year is changed
        $("#year-slider").on("input", function () {
            currentYear = $(this).val();
            $("#year-display").text(currentYear);
            const languages = filterLanguages(currentYear);
            updateLanguageSelect(languages);
            displayLDAVis(languages[0].title);
        });
  
        // Update the UI when the language is changed
        $("#language-select").on("change", function () {
            displayLDAVis($(this).val());
        });
  
        // Initialize the UI
        $("#year-display").text(currentYear);
        const languages = filterLanguages(currentYear);
        updateLanguageSelect(languages);
        displayLDAVis(languages[0].title);
    });
});