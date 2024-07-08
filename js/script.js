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

  

 

  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector);
  
  /* get the article id */

  let html = '';

  for(let article of articles){
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

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList */
    html = html + linkHTML;
    
  }
  
    titleList.insertAdjacentHTML('afterbegin', html);

    const titleClickHandler = function(event){
      event.preventDefault();
      const clickedElement = this;
      console.log('Link was clicked!');
      console.log(event);
  
    
      /* [DONE] remove class 'active' from all article links  */
      const activeLinks = document.querySelectorAll('.titles a.active');
  
      for(let activeLink of activeLinks){
          activeLink.classList.remove('active');
      }
    
      /* [DONE] add class 'active' to the clicked link */
      
      console.log('clickedElement:', clickedElement);
      clickedElement.classList.add('active');
  
      /* [DONE] remove class 'active' from all articles */
  
      const activeArticles = document.querySelectorAll('.posts article.active');
  
      for(let activeArticle of activeArticles){
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
    
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  
  }
generateTitleLinks();
  