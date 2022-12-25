
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
    function showTab(n) {
      var x = document.getElementsByClassName("tab");
      x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
      if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
       } else {
        document.getElementById("prevBtn").style.display = "inline";
      }
      if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
      } else {
        document.getElementById("nextBtn").innerHTML = "Calculate the Cost";
      }
  fixStepIndicator(n)
}
//next button
  function nextPrev(n) {
  // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
//   value pick from input
      var salary = document.getElementById("salary").value;
      var buttonfirst = document.querySelector('input[name="civil"]:checked');
      var loan = document.getElementById("loan").value;
      var month = document.getElementById("month").value;
      //var tick = document.getElementById("vehicle1").value;
      //   console.log(salary);
//local storage set data
      localStorage.setItem("salary", salary);
      if(buttonfirst != null){
        buttonfirst = buttonfirst.value; 
        //console.log(buttonfirst);
        localStorage.setItem("button1",buttonfirst);
      }
      // localStorage.setItem("button1",button1);
      localStorage.setItem("loan",loan);
      localStorage.setItem("month",month);
      localStorage.setItem("tick",tick);
// get loaclstorage value from 2
      var salaryGet = localStorage.getItem("salary");
      var buttonGet =  localStorage.getItem("button1");   
      var loan =  localStorage.getItem("loan");
      var month =  localStorage.getItem("month");
     //var tick =  localStorage.getItem("tick");
      document.getElementById("salary2").value = salaryGet;
      //document.getElementById("button2").value = buttonGet;
      document.querySelector("input[name=radiobutton2][value="+buttonGet+"]").checked = true;
      document.getElementById("loan2").value = loan;
      document.getElementById("month2").value = month;
      //document.getElementById("vehicle2").value = tick;

      // document.getElementById("employer").innerHTML = button1;

      // get localStorage value from 3
      document.getElementById("salary3").value = salaryGet;
    //document.getElementById("button5").value = buttonGet;
      document.querySelector("input[name=radiobutton3][value="+buttonGet+"]").checked = true;
      document.getElementById("loan3").value = loan;
      document.getElementById("month3").value = month;
    
    //document.getElementById("vehicle3").value = tick;

// Exit the from without validation
    if (n == 1 && !validateForm()) return false;
// Hide the current tab:
    x[currentTab].style.display = "none";
// Increase o
    currentTab = currentTab + n;
// if you have reached the end of the form...
    if (currentTab >= x.length) {
// ...  submitted:
      document.getElementById("regForm").submit();
      return false;
    }
//third button vallidation
    if(currentTab == 3){
      fetchbanksList();
    }
  // Otherwise, display the correct tab:
showTab(currentTab);
}
//VALIDATION 
    function validateForm() {
      var x, y,i,valid = true;
      var radionValidation = false;
      x = document.getElementsByClassName("tab");
      y = x[currentTab].getElementsByTagName("input");
// radio button validate 
      //z = x[currentTab].getElementsByClassName("val");
      // A loop that checks every input field in the current tab:
      //All input
      for (let i = 0; i < y.length; i++) {
//  empty...
        if (y[i].value == "") {
          y[i].className += " invalid";
          // console.log(y[i].classList.contains('rad'))
          valid = false;
        }
//radio button valusation
        if(y[i].classList.contains('rad')){
            if(y[i].checked){
              radionValidation = true;
            } 
        }
      }
        if(!radionValidation){
          document.getElementById('rd').innerHTML =" ** employer field reuired";
          valid = false;
        }
        else{
            document.getElementById('rd').innerHTML ="";
        } 
  //checkbox validation
        if(!document.getElementById('vehicle1').checked){
          document.getElementById('tick').innerHTML =" ** checkbox required";
          valid = false;
        }
        else{
          document.getElementById('tick').innerHTML ="";
        }
  // console.log(radioValid)
// If the valid status is true, mark the step as finished and valid:
        if (valid ) {
          document.getElementsByClassName("step")[currentTab].className += " finish";
        }
          return valid; // return the valid status
}


    function fixStepIndicator(n) {
// This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}
//fetch data
var banks_list;
let fdata = new XMLHttpRequest();
//var url = "file:///home/techno-ankush/Downloads/Dom_project-main/data.json";
fdata.open('GET','data.json',true);
fdata.send();
fdata.addEventListener('load',function(){
  banks_list = JSON.parse(this.responseText); 
  console.log( banks_list.Banks)
});


var arraydata = [];
function fetchbanksList(){
    var loanamount = document.getElementById("loanamount").value;
    var loantermdata = document.getElementById("loan").value;
    var salary = document.getElementById("salary").value;
    //console.log("loan",loan);
   
     banks_list.Banks.forEach((value) => {
      //console.log("value.loanstart",value.loanstart);
      //console.log("value.loanEnd",value.loanEnd);
      //console.log("loan",loan);
      // if(loanamount >= value.loanstart  && loanamount <= value.loanEnd && loan >= value.loanterm && loan <= value.loantermend && salary >= value.salarystart && salary <= value.salaryend){
      //   //console.log("sdfds");
      //   return value;
      // }
      value1 = Object.values(value);
      //console.log("value1dksfh",value1);
      value1[2].forEach((item) => {
        if(loanamount >= item.loanstart  && loanamount <= item.loanEnd && salary >= item.salarystart && salary <= item.salaryend && loantermdata >= item.loanterm && loantermdata <= item.loantermend){
                item['bank_name'] = value1[1];
                //item['monthly_instalment'] = value1[2];
                arraydata.push(item);
        }
        //console.log(item)
    });
     
    });
    console.log(arraydata,"aa");
    let new_data = arraydata.sort((a, b) => a.intreset - b.intreset);
    output = "";
    for (let item of new_data){
      output+=`
      <br>
    <div class="card mb-3 " style="max-width: 540px;">
      <div class="row g-0">
          <div class="col-md-4">
            <img src="index.png" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title text-uppercase">${item.bank_name}</h5>
                <h5 class="card-title">${item.intreset}%</h5>
                <p class="card-text text-muted">Anunal Profit Margin</p>
                <h5 class="card-title">SAR ${item.monthlyInstalment }</h5>
                <p class="card-text"> Monthly Instalment</p>
                <h5 class="card-title">SAR ${loantermdata}</h5>
                <p class="card-text"> Net Fancing Amount</p>
               
              </div>
          </div>
      </div>
    </div
                                                `
}
    // console.log("fetch_banks",fetch_banks);
    document.querySelector(".products").innerHTML = output;
}
 