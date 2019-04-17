/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Globale variables
// Variable to hold all student list items
const listItems = document.querySelectorAll("li");
const pageDiv = document.querySelector(".page");
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

function findNames(searchTerm) {
  const students = document.querySelectorAll(".student-details h3");
  const namesFound = [];
  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const studentName = student.textContent.toLowerCase();
    if (studentName.includes(searchTerm.toLowerCase())) {
      namesFound.push(student.parentNode.parentNode);
    }
  }
  return namesFound;
}

function createSearchFeature() {
  const mainDiv = document.querySelector(".page-header");
  const div = document.createElement("div");
  const input = document.createElement("input");
  const button = document.createElement("button");

  div.className = "student-search";
  input.type = "text";
  input.setAttribute("placeholder", "Search for students...");
  button.textContent = "Search";

  mainDiv.appendChild(div);
  div.appendChild(input);
  div.appendChild(button);
}

function appendPageLinks(list) {
  const div = document.createElement("div");
  const ul = document.createElement("ul");
  // number of pages necessary given list and set page length
  const pages = Math.ceil(list.length / itemsPerPage);

  /*
    Function, createPageLinks(pageNum), returns an a tag with specific attributes/properties
    pageNum: This paramater corresponds to the page the link will tie to.
  */
  function createPageLinks(pageNum) {
    const a = document.createElement("a");
    if (pageNum === 1) {
      a.className = "active";
    }
    a.setAttribute("href", `#`);
    a.innerHTML = `${pageNum}`;
    return a;
  }

  // For each page created, create an li and a element and append them to the ul
  for (let i = 1; i <= pages; i++) {
    const li = document.createElement("li");
    const a = createPageLinks(i);
    li.appendChild(a);
    ul.appendChild(li);
  }

  // The event listener on the ul will listen for click events
  // that target an A or LI tag.
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

  // append new ul to new div
  div.appendChild(ul);
  div.className = "pagination";

  // append newly created div to the first div in the body
  pageDiv.appendChild(div);
}

// invoke functions
showPage(listItems, 1);
appendPageLinks(listItems);
createSearchFeature();
