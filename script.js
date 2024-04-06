const apiKey = "573169e3781c47678448e38a46735154";
const blogContainer = document.querySelector("#blog-container")
const searchField = document.querySelector("#search-input")
const searchButton = document.querySelector("#search-button")

async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=IN&pageSize=12&apiKey=${apiKey}`

        const response = await fetch(apiUrl)
        const data = await response.json();
        return data.articles;

    } catch(error){
        console.error("Errorfetching random news", error)
        return[];
    }
}
searchButton.addEventListener("click", async ()=>{
    const query = searchField.value.trim();

    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles)
        }catch(error){
            console.log("Error fetching news by query", error)
        }
    }
})

async function fetchNewsQuery(query){

    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apiKey=${apiKey}`

        const response = await fetch(apiUrl)
        const data = await response.json();
        return data.articles;

    } catch(error){
        console.error("Errorfetching random news", error)
        return[];
    }
} 

function displayBlogs(articles){

    console.log("1");
    blogContainer.innerHTML = "";
    console.log("2");
    if (articles && articles.length > 0) {
        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            const truncatedTitle = article.title.length > 20 ? article.title.slice(0, 20) + "..." : article.title;
            const truncatedDescription = article.description.length > 120 ? article.description.slice(0, 120) + "..." : article.description;
    
            // Create a new div element for each article
            const articleElement = document.createElement('div');
            articleElement.classList.add('blog-card');
            articleElement.innerHTML = `
                <img src="${article.urlToImage}" alt="${truncatedTitle}">
                <h2>${truncatedTitle}</h2>
                <p>${truncatedDescription}</p>
            `;
    
            // Add event listener to each article element
            articleElement.addEventListener('click', () => {
            window.open(article.url, "_blank")
            });
    
            // Append the article element to the blogContainer
            blogContainer.appendChild(articleElement);
        }
    } else {
        // Handle the case when there are no articles to display
        blogContainer.innerHTML = "<p>No articles found.</p>";
    }
    
    
    
}

(async ()=>{
    try{
        const articles = await fetchRandomNews();
        displayBlogs(articles);

    } catch(error){
        console.error("Errorfetching random news", error)
    }
})();