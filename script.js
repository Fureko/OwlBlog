document.addEventListener("DOMContentLoaded", () => {
    console.log("Le blog est chargé et prêt à l'emploi !");

    // Initialise Showdown
    const converter = new showdown.Converter();

    // Sélectionne tous les en-têtes d'articles
    const headers = document.querySelectorAll(".article-header");

    headers.forEach(header => {
        header.addEventListener("click", () => {
            // Récupère le nom de fichier Markdown à partir de l'attribut data-file
            const markdownFile = header.getAttribute("data-file");
            const content = header.nextElementSibling;

            if (content.style.display === "none" || content.style.display === "") {
                // Affiche le contenu en chargeant le fichier Markdown correspondant
                fetch(markdownFile)
                    .then(response => response.text())
                    .then(markdown => {
                        const html = converter.makeHtml(markdown);
                        content.innerHTML = html;
                        content.style.display = "block";
                    })
                    .catch(error => console.error('Erreur lors du chargement du fichier Markdown:', error));
            } else {
                content.style.display = "none"; // Cache le contenu
            }
        });
    });
});
