/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const listItems = document.querySelectorAll("li");
const itemsPerPage = 10;
/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
function showPage(list, page) {
  const startIndex = parseInt(page) * itemsPerPage - itemsPerPage;
  const endIndex = parseInt(page) * itemsPerPage - 1;
  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i <= endIndex) {
      list[i].style.display = "";
    } else {
      list[i].style.display = "none";
    }
  }
}
/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
function appendPageLinks(list) {
  const pageDiv = document.querySelector(".page");
  const div = document.createElement("div");
  const ul = document.createElement("ul");
  const pages = Math.ceil(list.length / itemsPerPage);

  for (let i = 0; i < pages; i++) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    if (i === 0) {
      a.className = "active";
    }
    a.setAttribute("href", "#");
    a.innerHTML = `${i + 1}`;
    li.appendChild(a);
    ul.appendChild(li);
  }

  div.className = "pagination";
  div.appendChild(ul);
  pageDiv.appendChild(div);

  const pageLinks = document.querySelectorAll("li a");

  for (let i = 0; i < pageLinks.length; i++) {
    pageLinks[i].addEventListener("click", e => {
      for (let i = 0; i < pageLinks.length; i++) {
        pageLinks[i].className = "";
      }
      e.target.className = "active";
      showPage(listItems, e.target.innerHTML);
    });
  }
}

showPage(listItems, 1);
appendPageLinks(listItems);
// Remember to delete the comments that came with this file, and replace them with your own code comments.
