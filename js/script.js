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
}

// function createSearchFeature will create the search form in the webpage
// the function is Immediately invoked
(function createSearchFeature() {
  // select and create elements
  const mainDiv = document.querySelector(".page-header");
  const div = document.createElement("div");
  const input = document.createElement("input");
  const button = document.createElement("button");

  // set properties of elements
  div.className = "student-search";
  input.type = "text";
  input.setAttribute("placeholder", "Search for students...");
  button.textContent = "Search";

  // append elements appropriately
  div.appendChild(input);
  div.appendChild(button);
  mainDiv.appendChild(div);
})();

// function appendPageLinks(list) dynamically appends a "div" with a nested "ul"
// and nested list item and each "li" nested with an "a" tag.
// the new elements will be the page navigation for showing another 10 results
// of the list item argument
function appendPageLinks(list) {
  const pageDiv = document.querySelector(".page");
  const pages = Math.ceil(list.length / itemsPerPage);

  // Assign "div" by creating new "div" element or finding "div" in dom and removing its children
  // This effectively resets the "div"  when the "appendPageLinks(list)" function is called
  // this is helpful for adjusting the links available on a new list
  const div = (function() {
    const div =
      document.querySelector(".pagination") || document.createElement("div");
    for (let i = 0; i < div.children.length; i++) {
      div.removeChild(div.children[i]);
    }
    div.className = "pagination";
    return div;
  })();

  // Assign "ul" by creating "ul" element or finding "ul" in dom and removing its children
  // This effectively resets the "ul" when the "appendPageLinks(list)" function is called
  // this is helpful for adjusting the links available on a new list
  const ul = (function() {
    const ul =
      document.querySelector(".pagination ul") || document.createElement("ul");
    for (let i = 0; i < ul.children.length; i++) {
      ul.removeChild(ul.children[i]);
    }
    return ul;
  })();

  // function creates a single "a" tag nested in an "li" tag
  // with the page number to display as link innerHTML
  function createPageLinks(pageNum) {
    const a = document.createElement("a");
    const li = document.createElement("li");
    if (pageNum === 1) {
      a.className = "active";
    }
    a.setAttribute("href", `#`);
    a.innerHTML = `${pageNum}`;
    li.appendChild(a);
    return li;
  }

  // For each page created, create an li and an a element and append them to the ul
  for (let i = 1; i <= pages; i++) {
    const li = createPageLinks(i);
    ul.appendChild(li);
  }

  function changePage(event) {
    if (event.target.tagName === "A") {
      const links = ul.querySelectorAll("li a");
      for (let i = 0; i < links.length; i++) {
        links[i].className = "";
      }
      event.target.className = "active";
      showPage(listItems, event.target.innerHTML);
    }
  }

  div.className = "pagination";
  div.appendChild(ul);
  pageDiv.appendChild(div);

  ul.addEventListener("click", changePage);
}

// invoke functions
showPage(listItems, 1);
appendPageLinks(listItems);
