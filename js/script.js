/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Globale variables
// Variable to hold all student list items
const listItems = document.querySelectorAll("li");
// The number of list items to display per page
const itemsPerPage = 10;

// showPage function will display a set number of list items
// as a "page" by filtering out sets of list items
/*
  Function takes in two parameters:
    list: this is the list of student items that needs to be paginated.
    page: this is the set or paginated display of students.
    For Example: showPage(listItems, 3) would display only those students
    on the third page, students in positions (20-29)
*/
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
  // pageDiv is the parent div of the ul containing the list items
  const pageDiv = document.querySelector(".page");
  const div = document.createElement("div");
  const ul = document.createElement("ul");
  const pages = Math.ceil(list.length / itemsPerPage);

  /*
    Function createPageLinks(pageNum) returns an a tag with specific attribute
    and innerHTML properties.
      pageNum: This paramater corresponds to the index position link will have
      amongst a collection of a tags
  */
  function createPageLinks(pageNum) {
    const a = document.createElement("a");
    if (pageNum === 0) {
      a.className = "active";
    }
    a.setAttribute("href", `#`);
    a.innerHTML = `${pageNum + 1}`;
    return a;
  }

  // For each page created, create an li and a element and append them to the ul
  for (let i = 0; i < pages; i++) {
    const li = document.createElement("li");
    const a = createPageLinks(i);
    li.appendChild(a);
    ul.appendChild(li);
  }

  ul.addEventListener("click", e => {
    if (e.target.tagName === "A" || e.target.tagName === "LI") {
      const links = ul.querySelectorAll("li a");
      for (let i = 0; i < links.length; i++) {
        links[i].className = "";
      }
      e.target.className = "active";
      showPage(listItems, e.target.innerHTML);
    }
  });

  // Set newly create div
  div.appendChild(ul);
  div.className = "pagination";

  // append newly created div to the first div in the body
  pageDiv.appendChild(div);
}

showPage(listItems, 1);
appendPageLinks(listItems);
