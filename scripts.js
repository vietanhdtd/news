let articles = [];
let currentPage = 1;
// let bbcArticles = [];
// let sourceAPI='country=us'

const renderNewsFeed = () => {
  let html = ''
  articles.map(({
    title,
    description,
    urlToImage,
    publishedAt,
    url,
    author,
    content,
    source
  }) => {
    const node = html += `
			<h1>${title}</h1>
      <h5>${description}</h5>
      <div class="d-flex justify-content-center">
      <img src="${urlToImage}" style="display: inline-block; height: 40%; width: 60%;">
      </div>
			<h6>${moment(publishedAt).startOf('hour').fromNow()}</h6>
			<h5><a href="${url}">${author || 'Associated Press'}</a></h5>	
        <p class="mb-0">${content}</p>
        <footer class="blockquote-footer">Source: ${source.name}</cite></footer>
    `
    document.getElementById('newsList').innerHTML = node
    document.getElementById('totalArticles').innerHTML = 'Total articles : ' + articles.length
  })
}
const technologyCategory = () => {
  // sourceAPI = 'sources=bbc-news'
  articles = articles.filter(({source}) => source.id === "techcrunch")
  // getData()
  // articles = articles.filter(({source}) => source.id === "cnbc")
  renderNewsFeed()
}

// const technologyCategory = () => {
//   articles = articles.filter(({source}) => source.id === "cnbc")
//   renderNewsFeed()
// }

const allCategory = () => {
  // sourceAPI = "country=us"
  articles = []
  // document.getElementById('navBar').className = "navbar sticky-top navbar-expand-lg navbar-dark bg-dark"
  getData()
  // renderNewsFeed()
}

// const entertainmentCategory = () => {
//   category = 'category=entertainment&'
//   articles = []
//   document.getElementById('navBar').className = "navbar sticky-top navbar-expand-lg navbar-light bg-warning"
//   getData()
// }

const loadMoreToggle = () => {
  currentPage += 1;
  getData();
  // if(sourceAPI = 'country=us') getData(articles)
}

const getData = async () => {
  const url = 'https://newsapi.org/v2/everything?apiKey=2adc815bee8a4e95b7d0b43b79a7a6ee&q=&language=en&domains=techcrunch.com,theverge.com,phonearena.com,&pageSize=20&page=' + currentPage;
  console.log("Getting Data");
  console.log(url);
  const req = new Request(url);
  const res = await fetch(req)
  let data = await res.json();
  articles = articles.concat(data.articles);
  renderNewsFeed();
  console.log(articles)
}
getData()