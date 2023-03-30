function alertMsg(message, status) {
  if (document.getElementById("alertDiv") != undefined) {
    document.getElementById("alertDiv").remove();
  }
  let msgDiv = document.createElement("div");
  let msgBox = document.createElement("p");
  msgBox.id = "msgBox";
  msgBox.innerText = message;
  let closeBtn = document.createElement("p");
  closeBtn.innerHTML = `<i style="color:white" class="fa-solid fa-xmark"></i>`;
  closeBtn.id = "closeAlert";
  msgDiv.id = "alertDiv";
  msgDiv.append(msgBox, closeBtn);
  let backgrnd = null;
  if (status == "success") {
    backgrnd = "green";
  } else if (status == "fail") {
    backgrnd = "red";
  } else if (status == "error") {
    backgrnd = "orange";
  } else {
    alert("error at alertMsg function! Status is not valid");
  }
  msgDiv.style.backgroundColor = backgrnd;
  document.querySelector("body").append(msgDiv);
  setTimeout(() => {
    msgDiv.style.top = "20px";
  }, 50);

  document.querySelector("#closeAlert").onclick = () => {
    msgDiv.style.display = "none";
  };
}
export { alertMsg };
