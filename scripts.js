const docNewsList = () => document.getElementById('newsList')

const renderNewsFeed = (newsArticles) => {
  let html = ''
  newsArticles.map(({
    title,
    description,
    urlToImage,
    publishedAt,
    url,
    author,
    content
  }) => {    
    const node = html += `
			<h1>${title}</h1>
			<h3>${description}</h3>
			<img src="${urlToImage}" style="display: inline-block; height: 20%; width: 40% ">
			<h5>${moment(publishedAt).format('ll')}</h5>
			<h6><a href="${url}">${author || 'Associated Press'}</a></h6>	
			<p>${content}</p>	
    `
    docNewsList().innerHTML = node
  })
}

const getData = async () => {
  const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe'
  const req = new Request(url);
  const res = await fetch(req)
  const { articles } = await res.json();
  renderNewsFeed(articles)
}

// OLD
// async function getData() {
//   const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe'
//   const req = new Request(url);
//   const response = await fetch(req)
//   const { articles } = await response.json();
//   renderNewsFeed(articles)
// }


getData()