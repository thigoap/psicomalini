require('dotenv').config()
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');

const moment = require('moment')
moment.locale('pt-br')

/*  contentful client */
const contentful = require('contentful')
const client = contentful.createClient({
  // host: "preview.contentful.com",
  space: process.env.CTFL_SPACE,
  accessToken: process.env.CTFL_ACCESSTOKEN
});

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/site/static")

  eleventyConfig.addLayoutAlias("base", "layouts/base.njk")
  eleventyConfig.addLayoutAlias("blogpost", "layouts/blogpost.njk")

  eleventyConfig.setDataDeepMerge(true);
  
  // date handler
  eleventyConfig.addFilter('dateIso', date => {
    return moment(date).toISOString()
  })
  eleventyConfig.addFilter('dateReadable', date => {
    return moment(date).utc().format('ll') // E.g. May 31, 2019
  })

   /* handle RichText from Contentful */
   eleventyConfig.addShortcode('documentToHtmlString', documentToHtmlString);

   eleventyConfig.addShortcode('richText', (richText) => {
     const rawRichTextField = richText;
     
     const options = {
       renderNode:
       {
         'embedded-asset-block': ({ data: { target: { fields }}}) => {
           return `<br>
           <img src="${fields.file.url}"
             class="post-img"
             height="${fields.file.details.image.height}"
             width="${fields.file.details.image.width}"
             alt="${fields.description}"
           />
           <br><br>`
         },
 
         'paragraph': (node, next) => {
           return `<p>${next(node.content)
           // .replace(/\n/g, '<br/>')
          }<br></p>`
         }
       }
     }
     return documentToHtmlString(rawRichTextField, options).replace(/\u00a0/g, " ");
   });

  return {
    passthroughFileCopy: true,
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"],
    dir: {
      input: "src/site",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  }
}