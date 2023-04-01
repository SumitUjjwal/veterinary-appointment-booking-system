// const appointmentSchema = mongoose.Schema({
//   doctorId: { type: String, required: true },
//   ownerName: { type: String, required: true },
//   ownerEmail: { type: String, required: true },
//   ownerPhone: { type: Number, required: true },
//   petCategory: { type: String, required: true },
//   petIssue: { type: String, required: true },
//   appointmentDate: { type: String, required: true },
//   appointmentStatus: { type: String, required: true, default: "pending" },
// });

//   <table class="table">
//     <thead>
//       <tr>
//         <th>Date</th>
//         <th>End Data</th>
//         <th>Pet Type</th>
//         <th>Meeting Mode</th>
//         <th>Current Status</th>
//         <th>Toogle-Status</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr>
//         <td data-label="Date">1 jan 2021</td>
//         <td data-label="End Date">2 jan 2021</td>
//         <td data-label="Pet Type">Dogy</td>
//         <td data-label="Meeting Mode">Online Meet</td>
//         <td data-label="Current Status">
//           <span class="text_open">[Pending]</span>
//         </td>
//         <td data-label="Toogle-Status">
//           <a href="Toogle-Status" class="btn">
//             Confirm
//           </a>
//         </td>
//       </tr>
//       <tr>
//         <td data-label="Date">1 jan 2021</td>
//         <td data-label="End Date">2 jan 2021</td>
//         <td data-label="Pet Type">Dogy</td>
//         <td data-label="Meeting Mode">Online Meet</td>
//         <td data-label="Current Status">
//           <span class="text_open">[Pending]</span>
//         </td>
//         <td data-label="Toogle-Status">
//           <a href="Toogle-Status" class="btn">
//             Confirm
//           </a>
//         </td>
//       </tr>
//       <tr>
//         <td data-label="Date">1 jan 2021</td>
//         <td data-label="End Date">2 jan 2021</td>
//         <td data-label="Pet Type">Dogy</td>
//         <td data-label="Meeting Mode">Online Meet</td>
//         <td data-label="Current Status">
//           <span class="text_open">[Pending]</span>
//         </td>
//         <td data-label="Toogle-Status">
//           <a href="Toogle-Status" class="btn">
//             Confirm
//           </a>
//         </td>
//       </tr>
//       <tr>
//         <td data-label="Date">1 jan 2021</td>
//         <td data-label="End Date">2 jan 2021</td>
//         <td data-label="Pet Type">Dogy</td>
//         <td data-label="Meeting Mode">Online Meet</td>
//         <td data-label="Current Status">
//           <span class="text_open">[Pending]</span>
//         </td>
//         <td data-label="Toogle-Status">
//           <a href="Toogle-Status" class="btn">
//             Confirm
//           </a>
//         </td>
//       </tr>
//     </tbody>
//   </table>;

let getdata = async () => {
  try {
    let res = await fetch("http://localhost:8080/admin/appointments");
    newdata = await res.json();
    console.log(newdata);
    showdata(newdata.appointments);
  } catch (err) {
    console.log("reject" + err);
  }
};

function showdata(appointmentList) {
  let tablebody = document.getElementsByTagName("tbody")[0];


  for (let i = 0; i < appointmentList.length; i++) {
    let tr = document.createElement("tr");

    for (let key in appointmentList[i]) {

      if(key =="_id"){
        continue

      }else if(key=="appointmentStatus"){
        let selectg =  document.createElement('select');
        selectg.value = appointmentList[i][key]
      
        let  myOption1 = document.createElement("option");
        myOption1.style.backgroundColor ='yellow'
        myOption1.text = "Pending";
        myOption1.value = "pending";

        let  myOption2 = document.createElement("option");
        myOption2.style.backgroundColor ='red'
        myOption2.text = "Canceled";
        myOption2.value = "canceled";

        let   myOption3 = document.createElement("option");
        myOption3.style.backgroundColor ='black'
        myOption3.style.color ='white'
       myOption3.text = "Deleted";
       myOption3.value = "deleted";

     let   myOption4 = document.createElement("option");
     myOption4.style.backgroundColor ='green'
     myOption4.style.color =='white'
       myOption4.text = "Accepted";
       myOption4.value = "accepted";


     let   myOption5 = document.createElement("option");
      myOption5.style.backgroundColor = "blue";
      myOption5.style.color == "white";
       myOption5.text = "Completed";
       myOption5.value = "completed";
       if(myOption1.value ===appointmentList[i][key]){
        myOption1.setAttribute('selected','selected')
       }
       else if(myOption2.value ===appointmentList[i][key]){
        myOption2.setAttribute('selected','selected')
       }
       else if(myOption3.value ===appointmentList[i][key]){
        myOption3.setAttribute('selected','selected')
       }
       else if(myOption4.value ===appointmentList[i][key]){
        myOption4.setAttribute('selected','selected')
       }
       else if(myOption5.value ===appointmentList[i][key]){
        myOption5.setAttribute('selected','selected')
       }
       selectg.append(myOption1, myOption2, myOption3,myOption4,myOption5);
       let td = document.createElement("td");
       td.setAttribute("data-label", key);
         if (selectg.value == "pending") {
           selectg.style.backgroundColor = "yellow";
         }else if(selectg.value=='canceled'){
          selectg.style.backgroundColor = 'red'
         }else if(selectg.value=='accepted'){
          selectg.style.backgroundColor = 'green'
         }else if(selectg.value=='completed'){
          selectg.style.backgroundColor = 'green'
         } else if(selectg.value=='deleted'){
          selectg.style.backgroundColor = 'black'
          selectg.style.color = 'white'
         }
       td.append(selectg)
          tr.append(td);
          continue
        }
        
      let td = document.createElement("td");
      td.setAttribute("data-label", key);
      td.innerText = appointmentList[i][key];
      tr.append(td);
    }

    
    tablebody.appendChild(tr);
  }
}

getdata();
