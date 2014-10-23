
// This is preparation done on the page startup to setup the initial page start
  $().ready(function(){

    hideErrorAlerts();

    $("#personalLink a").click(function(){
      showPersonalDetails(); 
      return false;
    })

    $("#carLink a").click(function(){
      showCarDetails(); 
      return false;
    });

    $("#quoteLink a").click(function(){
      showQuoteDetails(); 
      return false;
    });
  });

  function showCarDetails() {
      
    // Hide the personal details section (dvPersonalDetails)

   if($("#txtName").val() !== "" && 
      $("#txtAge").val() !== "" &&
      ($("#maleCheck").is(":checked") || $("#femaleCheck").is(":checked")) &&
      $("#townAge").val() !== "" &&
      $("#txtEmail").val() !== "" &&
      $("#noclaimsSelect").val() !== ""
      )
   {
      $("#dvPersonalDetails").hide();
      $("#dvCarDetails").show();
      $("#dvQuoteDetails").hide();
   }
   else{
    
    $("#dvPersonalDetailsAlert").show();

   }
    // Hide the quote section (dvQuoteDetails)
    // Show the car details section (dvCarDetails)

  }

  function showPersonalDetails() {
    $("#dvPersonalDetails").show();
      $("#dvCarDetails").hide();
      $("#dvQuoteDetails").hide();
      // Hide the car details section (dvCarDetails)
      // Hide the quote section (dvQuoteDetails)
      // Show the personal details section (dvPersonalDetails)
  }

  function showQuoteDetails() {
    $("#dvQuoteDetails").show();
      $("#dvCarDetails").hide();
      $("#dvPersonalDetails").hide();
      // Hide the car details section (dvCarDetails)
      // Hide the personal details section (dvQuoteDetails)
      // Show the quote section (dvPersonalDetails)
  }

  function getQuote() {
    alert('here');
    // Perform validation to test that all data has been entered
    // Specify the validation rules

    // if (/* Page is Valid */)
    // {

    //   // Get the values from the page elements that you need to create your JSON
    var name = $("#txtName").val()
    var gender =$("#dvPersonalDetails input:radio[name=rdoGender]:checked").val();
    var age =$ ("txtAge").val();
    var yearsNoClaims =$ ("#noclaimsSelect option:selected").val();
    var costOfCar =$("#txtModelEstValue").val();
    var carStorage =$("#storageSelect option:selected").val();
      $.ajax({
          type: "GET",
          url: "http://lit-wrkexp-01.lit.lmig.com:8080/api/calculateRates",
          data: {gender:gender, age:age, noclaimsSelect:yearsNoClaims, costOfCar:costOfCar, carStorage:carStorage}
        }).done(function(msg) {
          showQuoteDetails();
          // Put the return value into Label created on quote details
          // Hide the Car Details section
          // Display the quote details page
          $('#txtQuote').html(msg.result);
      });
  }

//################################# Helper Functions - look at these when validating and changing section #########################################

  // Use this function to "Reset" the form and hide all 3 error sections whenever you make a section transition
  function hideErrorAlerts()
  {
    $("#dvPersonalDetailsAlert").hide();
    $("#dvCarDetailsAlert").hide();
    $("#dvQuoteDetailsAlert").hide();
  }

  // This function will control the top navigation and set the active tab when you make a section transition
  // You will need to call it and pass in the tab that needs to be made active
  function setActiveNavigation(activeTab) {
    $(".nav li").removeClass("active");

    $("#" + activeTab).addClass("active");
  }
