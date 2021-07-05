let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

var buttons = document.getElementsByClassName("delete-list");
for (var i in Object.keys(buttons)) {
  buttons[i].onclick = function () {
    myLeads.splice(this.id, 1);
    console.log(this.id);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    location.reload();
  };
}

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                    <button class="delete-list" id="${i}" value='${i}'><img src="img/cancel.png" class="cross-img"></button>
                
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    location.reload();
  });
});

deleteBtn.addEventListener("click", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
  location.reload();
});

inputBtn.addEventListener("click", function () {
  if (inputEl.value != "") {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    location.reload();
  }
});
