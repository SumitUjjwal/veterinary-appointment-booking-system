var allDoctorData = [];
var allUserData = [];

let accesstokenAdmin = localStorage.getItem("accesstokenadmin");

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//append meal data
let datatemp = document.querySelector("#selectdata");
datatemp.addEventListener("change", (event) => {
  if (datatemp.value === "meal") {
    mealData();
  } else if (datatemp.value === "user") {
    userdata();
  }
});

async function mealData(page_limit = 5, page_num = 1) {
  try {
    let alldata = await fetch(
      `https://vast-gold-chinchilla-gown.cyclic.app/meals?page=${page_num}&limit=${page_limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `${accesstokenAdmin}`,
        },
      }
    );
    if (alldata.ok) {
      let data = await alldata.json();
      allDoctorData = [...data];
      let total_page = 5;
      renderPaginationButtons(total_page);
      renderMeal(data);
    }
  } catch (error) {
    alert("something is wrong");
  }
}

window.addEventListener("load", (event) => {
  mealData();
});

async function userdata(page_limit = 10, page_num = 1) {
  try {
    let alldata = await fetch(
      `https://639a1a15e916a46ec0a9808d.mockapi.io/userdata?page=${page_num}&limit=${page_limit}`
    );
    if (alldata.ok) {
      let data = await alldata.json();
      allUserData = [...data];
      let total_page = 10;
      renderPaginationButtons(total_page);
      renderUser(data);
    }
  } catch (error) {
    alert("Bad reqest");
  }
}

function renderMeal(data) {
  let tabelCont = document.querySelector(".maincontainer");
  let tabelhead = document.querySelector(".comp_tbl_head");
  tabelhead.innerHTML = `
  
        <div class="comp_logo">
           <h4>Image</h4>
        </div>
        <div class="comp_name">
            <h4>Product Name</h4>
        </div>
        <div class="job_role">
            <h4>Product Quantity</h4>
        </div>
        <div class="job_role">
            <h4>Product Price</h4>
        </div>
        <div class="Edit_sec">
            <h4>Edit Data</h4>
        </div>
        <div class="delet_sec">
            <h4>Delete Data</h4>
        </div>
       
  `;
  tabelCont.innerHTML = "";
  let newdata = data.map((item) => {
    return `
    <div class="task">
        <div class="comp_logo">
           <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="comp_name">
            <h4>${item.name}</h4>
        </div>
        <div class="job_role">
            <h4>${item.quantity}</h4>
        </div>
        <div class="job_role">
            <h4>${item.price}</h4>
        </div>
        <div class="Edit_sec">
            <button class="edt_btn" data-id=${item._id}>Edit Data</button>
        </div>
        <div class="delet_sec">
            <button class="dlt_btn" data-id=${item._id}>Delete Data</button>
        </div>
    </div>
    `;
  });
  tabelCont.innerHTML = newdata.join(" ");
  let all_delete_btn = document.querySelectorAll(".dlt_btn");
  for (let btn of all_delete_btn) {
    btn.addEventListener("click", (event) => {
      let data_id = event.target.dataset.id;
      let page_temp = Math.ceil(data_id / 10);
      deleteData(data_id, page_temp);
    });
  }

  let all_edit_btn = document.querySelectorAll(".edt_btn");
  for (let btn of all_edit_btn) {
    btn.addEventListener("click", (event) => {
      let data_id = event.target.dataset.id;
      localStorage.setItem("editId", data_id);
      window.location.href = "adminEdit.html";
    });
  }
}

function renderUser(data) {
  let tabelCont = document.querySelector(".maincontainer");
  let tabelhead = document.querySelector(".comp_tbl_head");
  tabelhead.innerHTML = `
    
    <div class="profile_pic">
        <h4>Profile</h4>
    </div>
    <div class="username">
        <h4>User Name</h4>
    </div>
    <div class="email_id">
        <h4>Email ID</h4>
    </div>
    <div class="phone_num">
        <h4>Phone Number</h4>
    </div>
    <div class="date">
        <h4>Created Date</h4>
    </div>
         
    `;
  tabelCont.innerHTML = "";
  let newdata = data.map((item) => {
    return `
    <div class="task">
    <div class="profile_pic">
        <img src="
        ${item.avatar}" alt="${item.name}">
    </div>
    <div class="username">
        <h4>${item.name}</h4>
    </div>
    <div class="email_id">
        <h4>${item.email}</h4>
    </div>
    <div class="phone_num">
        <h4>${item.phone}</h4>
    </div>
    <div class="date">
        <h5>${item.createdAt}</h5>
    </div>
   </div>
      `;
  });
  tabelCont.innerHTML = newdata.join(" ");
}

//search functionality
let serbtn = document.querySelector("#search_data");
serbtn.addEventListener("change", (event) => {
  let datashow = document.querySelector("#selectdata");
  let showdata = document.querySelector("#search_data").value;
  if (datashow.value === "meal" || datashow.value === "all_data") {
    if (serbtn.value.length > 0) {
      searchMeal(showdata);
    } else {
      mealData();
    }
  }
});

async function searchMeal(data) {
  try {
    let showdata = await fetch(`https://vast-gold-chinchilla-gown.cyclic.app/meals?name=${data}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `${accesstokenAdmin}`,
      },
    });
    if (showdata.ok) {
      let datatoshow = await showdata.json();
      renderMeal(datatoshow);
    } else {
      alert("Data not found");
    }
  } catch (error) {
    alert("the requst request");
  }
}

//Deletion part

async function deleteData(id, page) {
  try {
    let delete_request = await fetch(`https://vast-gold-chinchilla-gown.cyclic.app/meals/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accesstokenAdmin}`,
      },
    });
    if (delete_request.ok) {
      alert("Data deleted successfully");
      mealData(10, page);
    } else {
      alert("Data Not Deleted");
    }
  } catch (error) {
    alert("You don't have access.");
  }
}

// PAGINTAION PART

let paginationWrapper = document.querySelector("#pagination-wrapper");

function renderPaginationButtons(total_pages) {
  paginationWrapper.innerHTML = `
      <div className="pagination-btn-list">
	  ${CreatePagButton(total_pages).join(" ")}
      </div>
    `;
  // handle click of pagination-btn(s)
  let paginationButtons = document.querySelectorAll(".pagination-btn");
  for (let paginationButton of paginationButtons) {
    paginationButton.addEventListener("click", function (e) {
      let page_number = e.target.dataset.id;
      let page_limit = 5;
      let getdata = document.querySelector("#selectdata").value;
      if (getdata === "all_data") {
        mealData(page_limit, page_number);
      }
      if (getdata === "meal") {
        mealData(page_limit, page_number);
      }
      if (getdata == "user") {
        userdata(page_limit, page_number);
      }
    });
  }
}

function getAsButton(text, cls, dataId) {
  return `<button class="${cls}" ${
    dataId ? `data-id = ${dataId}` : ""
  } >${text}</button>`;
}

function CreatePagButton(total_page) {
  let array = [];
  for (let page = 1; page <= total_page; page++) {
    array.push(getAsButton(page, "pagination-btn", page));
  }
  return array;
}

// let add_btn = document.querySelector("#add_page_btn");
// add_btn.addEventListener("click", (event) => {
//   localStorage.removeItem("editId");
//   window.location.href = "adminEdit.html";
// });
