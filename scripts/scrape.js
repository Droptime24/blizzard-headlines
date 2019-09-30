var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function() {

   return axios.get("https://news.blizzard.com/en-us").then(function(res) {
    var $ = cheerio.load(res.data);
    console.log("scraping");

    var articles = [];

    $(".ArticleListItem").each(function(i, element) {

      var head = $(this)
      .find(".ArticleListItem-subtitle")
      .text()
      .trim();
      var title = $(this).find(".ArticleListItem-title").text().trim();
      var url = $(this)
      .find("a")
      .attr("href");

      var sum = $(this)
      .find(".ArticleListItem-description")
      .text()
      .trim();

      if (head && sum && url && title) {
       
        var titleNeat = title.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Initialize an object we will push to the articles array
        var dataToAdd = {
          title: titleNeat,
          headline: headNeat,
          summary: sumNeat,
          url: "https://news.blizzard.com" + url
        };

        // Push new article into articles array
        articles.push(dataToAdd);
      }
      // console.log(dataToAdd)
    });
    return articles;
  });
};

// Export the function, so other files in our backend can use it
module.exports = scrape;
