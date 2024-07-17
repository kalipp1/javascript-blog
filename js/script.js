'use strict';

// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   });

// const titleClickHandler = function(event){
//     event.preventDefault();
//     const clickedElement = this;
//     console.log('Link was clicked!');
//     console.log(event);


//     /* [DONE] remove class 'active' from all article links  */
//     const activeLinks = document.querySelectorAll('.titles a.active');

//     for(let activeLink of activeLinks){
//         activeLink.classList.remove('active');
//     }

//     /* [DONE] add class 'active' to the clicked link */

//     console.log('clickedElement:', clickedElement);
//     clickedElement.classList.add('active');

//     /* [DONE] remove class 'active' from all articles */

//     const activeArticles = document.querySelectorAll('.posts article.active');

//     for(let activeArticle of activeArticles){
//         activeArticle.classList.remove('active');
//     }

//     /* [DONE] get 'href' attribute from the clicked link */

//     const getHref = clickedElement.getAttribute('href');
//     console.log(getHref);

//     /* [DONE] find the correct article using the selector (value of 'href' attribute) */

//     const targetArticle = document.querySelector(getHref);
//     console.log(targetArticle);

//     /* [DONE] add class 'active' to the correct article */

//     targetArticle.classList.add('active');

//   }

//   const links = document.querySelectorAll('.titles a');
//   console.log(links);

//   for(let link of links){
//     link.addEventListener('click', titleClickHandler);
//   }
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
  articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML)
}




const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.list.tags',
  optAuthorsListSelector = '.list.authors',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optCloudAuthorsClassPrefix = 'author-size-';

function generateTitleLinks(customSelector = '') {
  console.log(customSelector);
  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);
  /* get the article id */

  let html = '';

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    // const articleTitles = document.querySelectorAll('.post-title');

    // for (let articleT of articleTitles){
    //   const articleTitle = articleT.textContent;
    //   console.log(articleTitle);
    // }

    /* get the title from the title element */

    /* create HTML of the link */

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    console.log(linkHTML);

    /* insert link into titleList */
    html = html + linkHTML;

  }

  titleList.insertAdjacentHTML('afterbegin', html);

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);


    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const getHref = clickedElement.getAttribute('href');
    console.log(getHref);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(getHref);
    console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');

  }

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

}
generateTitleLinks();

function calculateTagsParams(tags) {
  const params = { max: 0, min: 999999 };
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateAuthorsParams(authors) {
  const params = { max: 0, min: 999999 };
  for (let author in authors) {
    console.log(author + ' is used ' + authors[author] + ' times');
    if (authors[author] > params.max) {
      params.max = authors[author];
    }
    if (authors[author] < params.min) {
      params.min = authors[author];
    }
  }
  return params;
}


function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

function calculateAuthorClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudAuthorsClassPrefix + classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const Articles = document.querySelectorAll('article');
  console.log(Articles);

  /* START LOOP: for every article: */
  for (let article of Articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      console.log(tag);
      const tagHTMLData = {id: tagsWrapper, title: tag};
      const tagHTML = templates.articleTag(tagHTMLData);
      console.log(tagHTML);
      /* add generated code to html variable */
      html = html + ' ' + tagHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      }
      else {
        allTags[tag]++;
      }
      /* [NEW] add generated code to allTags array */
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.insertAdjacentHTML('afterbegin', html);
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}


generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  console.log(event);
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag was clicked!');
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const getHref = clickedElement.getAttribute('href');
  console.log(getHref);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = getHref.replace('#tag-', '');
  console.log(tag);
  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('[href^="#tag"].active');
  console.log(tagLinks);
  /* START LOOP: for each active tag link */
  for (let tagLink of tagLinks) {
    /* remove class active */
    tagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinksHref = document.querySelectorAll('a[href="' + getHref + '"]');
  /* START LOOP: for each found tag link */
  for (let tagLinkHref of tagLinksHref) {
    /* add class active */
    tagLinkHref.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const links = document.querySelectorAll('[href^="#tag-"]');
  console.log(links);
  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  let allAuthors = {};
  const Articles = document.querySelectorAll('article');
  console.log(Articles);

  /* START LOOP: for every article: */
  for (let article of Articles) {
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    console.log(authorsWrapper);

    let html = '';

    const authorsName = article.getAttribute('data-author');
    console.log(authorsName);

    const authorHTMLData = {id: authorsWrapper, title: authorsName};
    const authorHTML = templates.articleAuthor(authorHTMLData);
    // console.log(authorHTML);
    html = html + ' ' + authorHTML;

    if (!allAuthors[authorsName]) {
      allAuthors[authorsName] = 1;
    }
    else {
      allAuthors[authorsName]++;
    }

    authorsWrapper.insertAdjacentHTML('afterbegin', html);
  }
  const authorList = document.querySelector(optAuthorsListSelector);

  /* [NEW] create variable for all links HTML code */
  const authorParams = calculateAuthorsParams(allAuthors);
  console.log('authorsParams:', authorParams);
  let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let author in allAuthors) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allAuthorsHTML += '<li><a href="#author-'+author+'" class="' + calculateAuthorClass(allAuthors[author], authorParams) + '">' + author + ' (' + allAuthors[author]+ ') ' + '</a></li>';
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  authorList.innerHTML = allAuthorsHTML;
}

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  console.log(event);
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Author was clicked!');
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const getHref = clickedElement.getAttribute('href');
  console.log(getHref);

  const tag = getHref.replace('#author-', '');
  console.log(tag);
  /* find all tag links with class active */
  const authorLinks = document.querySelectorAll('[href^="#author"].active');
  console.log(authorLinks);
  /* START LOOP: for each active tag link */
  for (let authorLink of authorLinks) {
    /* remove class active */
    authorLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorLinksHref = document.querySelectorAll('a[href="' + getHref + '"]');
  /* START LOOP: for each found tag link */
  for (let authorLinkHref of authorLinksHref) {
    /* add class active */
    authorLinkHref.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + tag + '"]');
}

function addClickListenersToAuthors() {
  const links = document.querySelectorAll('a[href^="#author-"]');
  console.log(links);
  /* START LOOP: for each link */
  for (let link of links) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();