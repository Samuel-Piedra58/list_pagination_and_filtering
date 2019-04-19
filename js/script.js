/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Globale variables
// Variable to hold all student list items
const studentList = document.querySelectorAll("li");
// The number of list items to display per page
const itemsPerPage = 10;

/*
  Function "showPage(list, page)" will hide all "studentList" Elements in the page 
    and will display only the items from the given "list" argument that correspond to the given "page" argument.
  Parameters:
    - list: list of elements to be filtered (display/or not displayed) based on index position and "page" argument
    - page: for pagination, "page" is the set of list items to display as determined by the number of "itemsPerPage" value.
  */
function showPage(list, page) {
  const startIndex = parseInt(page) * itemsPerPage - itemsPerPage;
  const endIndex = parseInt(page) * itemsPerPage - 1;
  for (let i = 0; i < studentList.length; i++) {
    studentList[i].style.display = "none";
  }
  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i <= endIndex) {
      list[i].style.display = "";
    }
  }
}

/*
  Function "findNames(searchTerm)" searches the "studentList" collection for names that include the given "searchTerm" argument.
  If a name is found that name is pushed to an array "namesFound", and the array serves as the list item for the "showPage(list, page)" 
    and "appendPageLinks(list)" functions. This will cause the web page to show only those students that contain the "searchTerm" and 
    will paginate that new list with updated links displayed.
  Parameters:
    - searchTerm: the term the user has typed in the input search box (input's value)
*/
function findNames(searchTerm) {
  const pageDiv = document.querySelector(".page");
  const ul = document.querySelector("ul.student-list");
  const students = document.querySelectorAll(".student-item h3");
  const namesFound = [];

  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const studentName = student.textContent.toLowerCase();
    if (studentName.includes(searchTerm)) {
      namesFound.push(student.parentNode.parentNode);
    }
  }
  showPage(namesFound, 1);
  appendPageLinks(namesFound);

  // if no results are returned and no "No Results Element" exists in the dom then create one and
  // display it to the user.
  if (namesFound.length === 0 && !pageDiv.querySelector("h3.no-results")) {
    const noResultsElement = document.createElement("h3");
    noResultsElement.textContent = "No Results Found";
    noResultsElement.className = "no-results";
    noResultsElement.style.fontWeight = "bold";
    noResultsElement.style.fontSize = "1.1em";
    pageDiv.insertBefore(noResultsElement, ul);
  }
  // if there are more than 0 results and the "No Results Found" element exists,
  // then remove the element from the DOM
  else if (namesFound.length !== 0 && pageDiv.querySelector("h3.no-results")) {
    const noResultsElement = pageDiv.querySelector("h3.no-results");
    pageDiv.removeChild(noResultsElement);
  }
}

/*
  Function "createSearchFeature()" creates the search feature for search for student names in the list of students.
  Function also adds the event listeners for the "input" and "button" elements
*/
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

  /*
    Function "searchForStudentName(e)" will run when event occurs and will call "findNames(searchTerm)"
      with the argument being the "input" element's value.
    Parameters:
      - e: event object automatically passed from event listener
  */
  function searchForStudentName(e) {
    const searchTerm = input.value.toLowerCase();
    findNames(searchTerm);
  }

  button.addEventListener("click", searchForStudentName);
  input.addEventListener("keyup", searchForStudentName);
})();

/*
Function appendPageLinks(list) dynamically creates a "div" element with a nested "ul" element.
The "ul" element will contain nested "li" elements, each of which will have a nested "a" element.
The purpose of this function is to create links at the bottom of the page, where each link
  corresponds to a set of students determined by the "itemsPerPage" variable and the length of the "list".
Parameters:
  - list: The list that will need to be paginated and for which links will need to be set up.
*/
function appendPageLinks(list) {
  const pageDiv = document.querySelector(".page");
  const pages = Math.ceil(list.length / itemsPerPage);

  /*
    Anonymous Function (immediately invoked) returns a single empty "div" Element. 
    Either a new "div" Element is created or the "div" Element that was dynamically created on first page load is 
      assigned and it's children elements are removed.
    This "div" element will be the parent node of our page links unordered list.
  */
  const div = (function() {
    const div =
      document.querySelector(".pagination") || document.createElement("div");
    for (let i = 0; i < div.children.length; i++) {
      div.removeChild(div.children[i]);
    }
    div.className = "pagination";
    return div;
  })();

  /*
    Anonymous Function (immediately invoked) returns a single empty "ul" Element. 
    Either a new "ul" Element is created or the "ul" Element that was dynamically created on first page load is 
      assigned and it's children elements are removed.
    This "ul" will be the child node of the "div" element containing the page links. And the "ul" itself will be the
      parent container for the page links.
  */
  const ul = (function() {
    const ul =
      document.querySelector(".pagination ul") || document.createElement("ul");
    for (let i = 0; i < ul.children.length; i++) {
      ul.removeChild(ul.children[i]);
    }
    return ul;
  })();

  /*
    Function creates a single "a" element nested in an "li" element. The function will return the "li" element.
    Parameters:
      - pageNum: will be the value that will be set to the textContent property
  */
  function createPageLinks(pageNum) {
    const a = document.createElement("a");
    const li = document.createElement("li");
    if (pageNum === 1) {
      a.className = "active";
    }
    a.setAttribute("href", `#`);
    a.textContent = `${pageNum}`;
    li.appendChild(a);
    return li;
  }

  /*
    Function "changePage(event)" will be the event handler for the page links.
    When the link is clicked, the clicked element will add a class of "active"
      and the "showPage(list, page)" will execute and display the set of students 
      that correspond to the given "page" number.
    Parameters:
      - pageNum: will be the value that will be set to the textContent property
  */
  function changePage(event) {
    if (event.target.tagName === "A") {
      const links = ul.querySelectorAll("li a");
      for (let i = 0; i < links.length; i++) {
        links[i].className = "";
      }
      event.target.className = "active";
      showPage(studentList, event.target.textContent);
    }
  }

  // For each page created, create an li and an a element and append them to the ul
  for (let i = 1; i <= pages; i++) {
    const li = createPageLinks(i);
    ul.appendChild(li);
  }

  ul.addEventListener("click", changePage);

  div.className = "pagination";
  div.appendChild(ul);
  pageDiv.appendChild(div);
}

// invoke functions
// start on page 1
showPage(studentList, 1);
appendPageLinks(studentList);
