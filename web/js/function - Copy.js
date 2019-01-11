 var objs = {
        doHide : function(){
                      this.hide('slow');
		 },
		 getUrl : function(page){
		 		 var URLHD = location.protocol + "//" + document.domain + ":7777/" + location.pathname.split('/')[1] + "/";
 				 return URLHD + page;
 		 },
         doShow : function(){
                      this.show( 'slow' );
         },
         doDisable : function(){
                       this.attr("disabled", 'disabled');
         },
         toggled : function(){
                         this.toggle();
         },
         getStyle : function(){
                         return this.attr('style');
	     },
	     setForeground : function(color){
                          var style = 'color:'+color+';';
                          this.attr('styletyle'+this.getStyle());
         },
    	 setBackground : function(color){
                          var style = 'background-color:'+color+';';
                          this.attr('styletyle'+this.getStyle());
         },
         getName : function(){
                           return this.attr('name');
		 },
         getValue : function(){
                            return this.attr('value');
		 },
         getClass : function() {
                             return this.attr('class');
		 },
         getContent : function(){
                      return this.html();
    },
		 alertPop   : function(msg){
           $.alert({
                   title: 'Alert',
                   content: msg,
                   icon: 'fa fa-rocket',
                   animation: 'rotateXR',
                   closeAnimation: 'rotateXR',
                   buttons: {
                     okay: {
                          text: 'Okay',
                           btnClass: 'btn-blue'
                           }
                            }
                        });
     },
     confirmPop   : function(msg){
            $.confirm({
                            icon: 'fa fa-question',
                            theme: 'supervan',
                            content: msg,
                            closeIcon: true,
                            animation: 'scale',
                            type: 'blue',
                        });
     },
		 SecurityCode : function(id,msg){
				 objs.alertPop(msg); $('#'+id).focus();
		 },
		 NetConnect	 : function(){
			 objs.alertPop("Check your internet connection and try again");
		 }

};


/********** Admin Login Starts **************/ 

$(document).ready(function() {
//alert(baseurl);
var bridge = baseurl + 'data.php';
//alert(bridge);
//var baseurl = objs.getUrl('');

//Manage Profile

$('#submit_profile').click(function () {

  var txtusername = $('#txtusername').val();  

  var txtemail = $('#txtemail').val();  

  if( txtusername == ''){

      objs.alertPop('Please Enter Username');
      return false;

  }

  

  if( txtemail == ''){

      objs.alertPop('Please Enter Email');
      return false;

  }

  if( txtemail != ''){
 var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
 if(!document.getElementById('txtemail').value.match(mailformat))
 { $('#txtemail').focus();
 objs.alertPop('Invalid Email id');
   return false; }

 }

var dataManageProfile = $('#profilefrm').serialize();

 var data = 'r=add_details' + '&dataManageProfile=' + dataManageProfile;
 //alert(data);
     $.ajax({
       type:"post",
       cache:false,
       url:bridge,
       data:data,    // multiple data sent using ajax
   statusCode: {
              404: function() {
                  alert("page not found");
              }
       },
   beforeSend: function() {
           $('#submit_profile').buttonLoader('start');

          },
       success: function(html) {
      //alert(html);
      //console.log(html);
     $('#submit_profile').buttonLoader('stop');


     if( html == "success"){
       objs.alertPop('Profile Updated Successfully');

       return false;

     }else if( html == "error"){
       objs.alertPop('Something went wrong');
       return false;

     }else if( html == "Insecure"){
         objs.alertPop('Insecure Origin!');
       return false;

     }else{}

     objs.alertPop(html);
     console.log(html);
   }
     });
      return false;
   });


//Manage Password

$('#submit_password').click(function () {

  var profile_curr_password = $('#profile_curr_password').val();  

  var profile_new_password = $('#profile_new_password').val();  

  if( profile_curr_password == ''){

      objs.alertPop('Please Enter Current Password');
      return false;

  }

  

  if( profile_new_password == ''){

      objs.alertPop('Please Enter New Password');
      return false;

  }

  

var dataManagePassword = $('#passwordfrm').serialize();

 var data = 'r=add_password' + '&dataManagePassword=' + dataManagePassword;
 //alert(data);
     $.ajax({
       type:"post",
       cache:false,
       url:bridge,
       data:data,    // multiple data sent using ajax
   statusCode: {
              404: function() {
                  alert("page not found");
              }
       },
   beforeSend: function() {
           $('#submit_password').buttonLoader('start');

          },
       success: function(html) {
      //alert(html);
      //console.log(html);
     $('#submit_password').buttonLoader('stop');


     if( html == "success"){
       objs.alertPop('Password Updated Successfully');
       $('#profile_curr_password').val('');  
       $('#profile_new_password').val('');  
       return false;

     }else if( html == "error"){
       objs.alertPop('Something went wrong');
       return false;

      }else if( html == "invalidpassword"){
       objs.alertPop('Password does not matched');
       $('#profile_curr_password').val('');  
       $('#profile_new_password').val('');  
       return false;  

     }else if( html == "Insecure"){
         objs.alertPop('Insecure Origin!');
       return false;

     }else{}

     objs.alertPop(html);
     console.log(html);
   }
     });
      return false;
   });




     
//Adding/Edit Employee Starts


 $('#BtnAddEmp').click(function () {

      
        var emp_code = $('#emp_code').val();

        var emp_name = $('#emp_name').val();

        var emp_fathername = $('#emp_fathername').val();      

        var emp_aadhaar = $('#emp_aadhaar').val();

        var emp_present_add = $('#emp_present_add').val();

        var emp_permanent_add = $('#emp_permanent_add').val();

        var emp_pcontact = $('#emp_pcontact').val();

        var emp_scontact = $('#emp_scontact').val();

        var emp_dob = $('#emp_dob').val();

        var emp_doj = $('#emp_doj').val();

        

    var emp_gender = $("#emp_gender option:selected" ).val();
    var emp_zone = $("#emp_zone option:selected" ).val();
    var emp_unit = $("#emp_unit option:selected" ).val();
    var emp_designation = $("#emp_designation option:selected" ).val();
    var emp_department = $("#emp_department option:selected" ).val();

    if( emp_code == ''){
      objs.alertPop('Please Enter Employee Code');
     $('#emp_code').focus();
      return false;
    }

     str = emp_code.toString(),
        len = str.length;


        if(len > 10){
           objs.alertPop('Please Enter Valid Employee Code. Max Length: 10 characters');
          $('#emp_code').focus();
          return false;
        }
   

		if( emp_name == ''){
	      objs.alertPop('Please Enter Employee Name');
		 $('#emp_name').focus();
		  return false;
		}

		if( emp_fathername == ''){
	    
	    objs.alertPop('Please Enter Father Name');
		 $('#emp_fathername').focus();
		  return false;
		}


    if( emp_gender == '0'){
      
      objs.alertPop('Please Select Gender');
     $('#emp_gender').focus();
      return false;
    }

    if( emp_aadhaar == ''){
    
       objs.alertPop('Please Enter Adhaar Number');
     $('#emp_aadhaar').focus();
      return false;
    }

    str = emp_aadhaar.toString(),
        len = str.length;


        if(len != 12){
           objs.alertPop('Please Enter Valid Adhaar Number');
          $('#emp_aadhaar').focus();
          return false;
        }

    if( emp_zone == '0'){
     
      objs.alertPop('Please Select Zone');
     $('#emp_zone').focus();
      return false;
    }

     if( emp_unit == '0'){
     
      objs.alertPop('Please Select Unit');
     $('#emp_unit').focus();
      return false;
    }

    if( emp_department == '0'){
      
      objs.alertPop('Please Select Department');
     $('#emp_department').focus();
      return false;
    }

     if( emp_designation == '0'){
     
      objs.alertPop('Please Select Designation');
     $('#emp_designation').focus();
      return false;
    }

     if( emp_present_add == ''){
    
       objs.alertPop('Please Enter Present Address');
     $('#emp_present_add').focus();
      return false;
    }

     if( emp_permanent_add == ''){
    
       objs.alertPop('Please Enter Permanent Address');
     $('#emp_permanent_add').focus();
      return false;
    }

    if( emp_pcontact == ''){
   
     //  objs.alertPop('Please Enter Primary Contact');
     // $('#txtpcontact').focus();
     //  return false;
    } else {

       str = emp_pcontact.toString(),
        len = str.length;


        if(len != 10){
           objs.alertPop('Please Enter Valid Primary Contact');
          $('#emp_pcontact').focus();
          return false;
        }

    }

    

    if( emp_scontact == ''){
     
     //  objs.alertPop('Please Enter Secondary Contact');
     // $('#emp_scontact').focus();
     //  return false;
    } else {

       str = emp_scontact.toString(),
        len = str.length;


        if(len != 10){
           objs.alertPop('Please Enter Valid Secondary Contact');
          $('#emp_scontact').focus();
          return false;
        }
    }

    

      if( emp_dob == ''){
      
       objs.alertPop('Please Enter Date Of Birth');
     $('#emp_dob').focus();
      return false;
    }   

    if( emp_doj == ''){
      
       objs.alertPop('Please Enter Date Of Joining');
     $('#emp_doj').focus();
      return false;
    }   


	

	var dataEmp = $('#EmpForm').serialize();

	var data = 'r=add_Emp' + '&dataEmp=' + dataEmp;
	//alert(data);
      $.ajax({
        type:"post",
        cache:false,
        url:bridge,
        data:data,    // multiple data sent using ajax
		statusCode: {
               404: function() {
                   alert("page not found");
               }
        },
		beforeSend: function() {
            $('#BtnAddEmp').buttonLoader('start');

           },
        success: function(html) {
			 // alert(html);
			 // console.log(html);
       //return false;
			$('#BtnAddEmp').buttonLoader('stop');

			if( html == "success"){
		    	objs.alertPop('Employee Successfully Inserted');
		    	$( '#EmpForm' ).each(function(){
				  this.reset();
          setTimeout(location.reload.bind(location), 3000);
        //window.location.href = ''+baseurl+'AllEmp.php';
          });
          return false;

		    }else if( html == "InvalidEmployee"){
				objs.alertPop('Invalid Employee Name');
				return false;

			}else if( html == "successEmp"){
				objs.alertPop('Employee Successfully Updated');
			   setTimeout(location.reload.bind(location), 3000);
			   //window.location.href = ''+baseurl+'AllEmp.php';

				return false;

			}else if( html == "error"){
				objs.alertPop('Something went wrong');
				return false;

			}else if(html == "AlreadyEmpCode"){
				objs.alertPop('This Employee Code is already exist');
				return false;

      }else if( html == "AlreadyAdhaarCode"){
          objs.alertPop('Adhaar number already exist!');
        return false;

      // }else if( html == "Insecure"){
      //     objs.alertPop('Insecure Origin!');
      //   return false;    

			}else{
        objs.alertPop(html);
         return false; 
       }

			objs.alertPop(html);
			console.log(html);
		}
      });
       return false;
    });



// Check EmpCode Availablity

$('#emp_code').blur(function(){

  var emp_code = $('#emp_code').val();
  var HDNemp_id = $('#HDNemp_id').val();

if(emp_code != ''){
   if(HDNemp_id == '') {

  var data = 'r=check_EmpCode' + '&dataEmpCode=' + emp_code + '&HDNid_emp=' + HDNid_emp;
 
      $.ajax({
        type:"post",
        cache:false,
        url:bridge,
        data:data,    
    statusCode: {
               404: function() {
                   alert("page not found");
               }
        },
    beforeSend: function() {
             $("#loaderIcon").show();

           },
    success: function(html) {
            //alert(html);
            //console.log(html);
       $("#tickIcon").hide();
       $("#loaderIcon").hide();
      
      if( html == "existTrue"){
        $("#tickIcon").hide();
          objs.alertPop('Employee Code Already Exist');
          $('#emp_code').val('');
         return false;

        }else if( html == "existFalse"){
        $("#tickIcon").show();
       // return false;

      }else{}

      // objs.alertPop(html);
      // console.log(html);
    }
      });
    }
  }else {
    $("#tickIcon").hide();
    $("#loaderIcon").hide();
    return false;
  }
       
   
});

//Edit Employee

 $(".editEmpBasicInfo").click(function(){
   var id = $(this).attr('data-id'); 
    var dataFetch = 'r=FetchEmp' + '&id=' + escape(id);
    
 
 $.ajax({
   type: "POST",
   url: bridge,
   data: dataFetch,
   dataType: "json",
   success: function(data){
    
    $('#emp_code').val(data[0].emp_code);
    $('#emp_name').val(data[0].emp_name);
    $('#emp_fathername').val(data[0].emp_fathername);
    $('#emp_aadhaar').val(data[0].emp_aadhaar);
    $('#emp_zone').val(data[0].emp_zone);
    $('#emp_unit').val(data[0].emp_unit);
    $('#emp_department').val(data[0].emp_department);
    $('#emp_designation').val(data[0].emp_designation);
    $('#emp_present_add').val(data[0].emp_present_add);
    $('#emp_permanent_add').val(data[0].emp_permanent_add);
    $('#emp_pcontact').val(data[0].emp_pcontact);
    $('#emp_scontact').val(data[0].emp_scontact);
    $('#emp_gender').val(data[0].emp_gender);
    $('#emp_dob').val(data[0].emp_dob);
    $('#emp_doj').val(data[0].emp_doj);
    $('#HDNemp_id').val(data[0].id);
    $('#BtnAddEmp').html('Save');
    $('#state').html('Edit Employee');
    $('#BasicInfoModal').modal('show');
 }
});
return false;
});

 //Edit Rule

 $(".editRule").click(function(){
   var id = $(this).attr('data-id'); 
    var dataFetch = 'r=FetchRule' + '&id=' + escape(id);
    
 
 $.ajax({
   type: "POST",
   url: bridge,
   data: dataFetch,
   dataType: "json",
   success: function(data){
    
    $('#rule_name').val(data[0].rule_name);
    $('#unit_code').val(data[0].unit_code);
    $('#emp_esi_rate').val(data[0].emp_esi_rate);
    $('#emp_pf_rate').val(data[0].emp_pf_rate);
    $('#empr_esi_rate').val(data[0].empr_esi_rate);
    $('#empr_pf_rate').val(data[0].empr_pf_rate);
    $('#RuleHDN_id').val(data[0].id);
    $('#AddRuleBtn').html('Save');
    $('#state').html('Edit Rule');
    $('#AddRuleModal').modal('show');
 }
});
return false;
});

 //Edit Employee Payment Details

 $(".EmployeePaymentDetails").click(function(){

    var emp_code = $(this).attr('data-id'); 
    var dataFetch = 'r=FetchEmpPaymentDetails' + '&emp_code=' + escape(emp_code);
   
 $.ajax({
   type: "POST",
   url: bridge,
   data: dataFetch,
   dataType: "json",
   success: function(data){

     if(data == 'existFalse'){

      $("#bank_name").prop("readonly", false);
      $("#bank_address").prop("readonly", false);
      $("#bank_account").prop("readonly", false);
      $("#bank_ifsc").prop("readonly", false);

      //$("#ShowPaymentMode.checked").val('');
      $('#cheque_number').val('');
      $('#bank_name').val('');
      $('#bank_address').val('');
      $('#bank_account').val('');
      $('#bank_ifsc').val('');
      $('#PaymentHDNemp_id').val(emp_code);
      $('#PaymentModal').modal('show');

    }else {
    var paymentmode = data[0].payment_mode;

    if(paymentmode == 'A'){  
      $("#account").prop("checked", true);
      $("#cheque_number").prop("readonly", true);
      $("#bank_name").prop("readonly", false);
      $("#bank_address").prop("readonly", false);
      $("#bank_account").prop("readonly", false);
      $("#bank_ifsc").prop("readonly", false);

      }else if(paymentmode == 'C'){
      $("#cheque").prop("checked", true); 
      $("#cheque_number").prop("readonly", false);
      $("#bank_name").prop("readonly", true);
      $("#bank_address").prop("readonly", true);
      $("#bank_account").prop("readonly", true);
      $("#bank_ifsc").prop("readonly", true);
      }
    $('#cheque_number').val(data[0].cheque_number);
    $('#bank_name').val(data[0].bank_name);
    $('#bank_address').val(data[0].bank_address);
    $('#bank_account').val(data[0].account_no);
    $('#bank_ifsc').val(data[0].ifsc_code);
    $('#PaymentHDNemp_id').val(data[0].emp_code);
    $('#BtnAddPaymentDetails').html('Save');
    $('#state').html('Edit Payment Details');
    $('#PaymentModal').modal('show');

  }
 }
});
return false;
});

// Employee Fetch ESI

$(".EmployeeESI").click(function(){
    var emp_code = $(this).attr('data-id'); 
    var dataFetch = 'r=FetchEmpESI' + '&emp_code=' + escape(emp_code);
    
 //alert(dataFetch);
 $.ajax({
   type: "POST",
   url: bridge,
   data: dataFetch,
   dataType: "json",
   success: function(data){
    if(data == 'existFalse'){
      $('#esi_code').val('');
      $('#ESIHDNemp_code').val(emp_code);
      $('#ESIModal').modal('show');
    }else {
    $('#esi_code').val(data[0].emp_esi_number);
    $('#ESIHDNemp_code').val(data[0].emp_code);
    //$('#BtnAddESI').html('Save');
    $('#ESIModal').modal('show');
  }
 }
});
return false;
});

// Employee Add/Edit Esi

 $('#BtnAddESI').click(function () {
      
       // var emp_code = $('#HDNemp_code').val();

        var esi_code = $('#esi_code').val();


    if( esi_code == ''){
        objs.alertPop('Please Enter ESI Number');
     $('#esi_code').focus();
      return false;
    }

  var dataEmpESI = $('#ESIForm').serialize();

  var data = 'r=add_EmpESI' + '&dataEmpESI=' + dataEmpESI;
  //alert(data);
      $.ajax({
        type:"post",
        cache:false,
        url:bridge,
        data:data,    // multiple data sent using ajax
    statusCode: {
               404: function() {
                   alert("page not found");
               }
        },
    beforeSend: function() {
            $('#BtnAddESI').buttonLoader('start');

           },
        success: function(html) {
       // alert(html);
       // console.log(html);
       //return false;
      $('#BtnAddESI').buttonLoader('stop');

      if( html == "successUpdate"){

          objs.alertPop('ESI Successfully Updated');
          setTimeout(location.reload.bind(location), 3000);
         return false;

        }else if( html == "successInsert"){

        objs.alertPop('ESI Successfully Inserted');
        setTimeout(location.reload.bind(location), 3000);
        return false;


      }else if( html == "error"){
        objs.alertPop('Something went wrong');
        return false;

      }else{
        objs.alertPop(html);
         return false; 
       }

      objs.alertPop(html);
      console.log(html);
    }
      });
       return false;
    });



// Employee Fetch PF

$(".EmployeePF").click(function(){
    var emp_code = $(this).attr('data-id'); 
    var dataFetch = 'r=FetchEmpPF' + '&emp_code=' + escape(emp_code);
    
 //alert(dataFetch);
 $.ajax({
   type: "POST",
   url: bridge,
   data: dataFetch,
   dataType: "json",
   success: function(data){
    if(data == 'existFalse'){
      $('#pf_code').val('');
      $('#HDNPFemp_code').val(emp_code);
      $('#PFModal').modal('show');
    }else {
    $('#pf_code').val(data[0].emp_pf_number);
    $('#HDNPFemp_code').val(data[0].emp_code);
    //$('#BtnAddESI').html('Save');
    $('#PFModal').modal('show');
  }
 }
});
return false;
});

// Employee Add/Edit PF

 $('#BtnAddPF').click(function () {
      
       // var emp_code = $('#HDNemp_code').val();

        var pf_code = $('#pf_code').val();


    if( pf_code == ''){
        objs.alertPop('Please Enter PF Number');
     $('#pf_code').focus();
      return false;
    }

  var dataEmpPF = $('#PFForm').serialize();

  var data = 'r=add_EmpPF' + '&dataEmpPF=' + dataEmpPF;
  //alert(data);
      $.ajax({
        type:"post",
        cache:false,
        url:bridge,
        data:data,    // multiple data sent using ajax
    statusCode: {
               404: function() {
                   alert("page not found");
               }
        },
    beforeSend: function() {
            $('#BtnAddPF').buttonLoader('start');

           },
        success: function(html) {
       // alert(html);
       // console.log(html);
       //return false;
      $('#BtnAddPF').buttonLoader('stop');

      if( html == "successUpdate"){

          objs.alertPop('PF Successfully Updated');
          setTimeout(location.reload.bind(location), 3000);
         return false;

        }else if( html == "successInsert"){

        objs.alertPop('PF Successfully Inserted');
        setTimeout(location.reload.bind(location), 3000);
        return false;


      }else if( html == "error"){
        objs.alertPop('Something went wrong');
        return false;

      }else{
        objs.alertPop(html);
         return false; 
       }

      objs.alertPop(html);
      console.log(html);
    }
      });
       return false;
    });


// Employee Fetch UAN

$(".EmployeeUAN").click(function(){
    var emp_code = $(this).attr('data-id'); 
    var dataFetch = 'r=FetchEmpUAN' + '&emp_code=' + escape(emp_code);
    
 //alert(dataFetch);
 $.ajax({
   type: "POST",
   url: bridge,
   data: dataFetch,
   dataType: "json",
   success: function(data){
    console.log(data)
    if(data == 'existFalse'){
      $('#UAN_code').val('');
      $('#UANHDNemp_code').val(emp_code);
      $('#UANModal').modal('show');
    }else {
    $('#UAN_code').val(data[0].emp_uan_number);
    $('#UANHDNemp_code').val(data[0].emp_code);
    //$('#BtnAddUAN').html('Save');
    $('#UANModal').modal('show');
  }
 }
});
return false;
});

// Employee Add/Edit UAN

 $('#BtnAddUAN').click(function () {
      
       // var emp_code = $('#HDNemp_code').val();

        var UAN_code = $('#UAN_code').val();


    if( UAN_code == ''){
        objs.alertPop('Please Enter UAN Number');
     $('#UAN_code').focus();
      return false;
    }

  var dataEmpUAN = $('#UANForm').serialize();

  var data = 'r=add_EmpUAN' + '&dataEmpUAN=' + dataEmpUAN;
  //alert(data);
      $.ajax({
        type:"post",
        cache:false,
        url:bridge,
        data:data,    // multiple data sent using ajax
    statusCode: {
               404: function() {
                   alert("page not found");
               }
        },
    beforeSend: function() {
            $('#BtnAddUAN').buttonLoader('start');

           },
        success: function(html) {
        // alert(html);
        // console.log(html);
       //return false;
      $('#BtnAddUAN').buttonLoader('stop');

      if( html == "successUpdate"){

          objs.alertPop('UAN Successfully Updated');
          setTimeout(location.reload.bind(location), 3000);
         return false;

        }else if( html == "successInsert"){

        objs.alertPop('UAN Successfully Inserted');
        setTimeout(location.reload.bind(location), 3000);
        return false;


      }else if( html == "error"){
        objs.alertPop('Something went wrong');
        return false;

      }else{
        objs.alertPop(html);
         return false; 
       }

      objs.alertPop(html);
      console.log(html);
    }
      });
       return false;
    });


//Payment mode change function

$('input:radio[name=paymentmode]').change(function() {
        if (this.value == 'C') {
            $("#cheque_number").prop("readonly", false);
            $("#bank_name").prop("readonly", true);
            $("#bank_address").prop("readonly", true);
            $("#bank_account").prop("readonly", true);
            $("#bank_ifsc").prop("readonly", true);
            
        }
        else if (this.value == 'A') {
            $("#cheque_number").prop("readonly", true);
            $("#bank_name").prop("readonly", false);
            $("#bank_address").prop("readonly", false);
            $("#bank_account").prop("readonly", false);
            $("#bank_ifsc").prop("readonly", false);
        }
    });


 // Employee Add/Edit Payment Information

 $('#BtnAddPaymentDetails').click(function () {
      


   var cheque_number = $('#cheque_number').val();
   var bank_name = $('#bank_name').val();
   var bank_address = $('#bank_address').val();
   var bank_account = $('#bank_account').val();
   var bank_ifsc = $('#bank_ifsc').val();
    

    if($('input[name=paymentmode]:checked').length<=0)
        {
          objs.alertPop('Please Choose Payment Mode');
           return false;
        }else{

           var paymentmode = jQuery("input[name=paymentmode]:checked").val();

           if( paymentmode == 'A' ){

             if( bank_name == ''){
              
               objs.alertPop('Please Enter Bank Name');
             $('#bank_name').focus();
              return false;
            }

             if( bank_address == ''){
              
               objs.alertPop('Please Enter Bank Address');
             $('#bank_address').focus();
              return false;
            }


             if( bank_account == ''){
              
               objs.alertPop('Please Enter Account Number');
             $('#bank_account').focus();
              return false;
            }

             if( bank_ifsc == ''){
            
               objs.alertPop('Please Enter IFSC');
             $('#bank_ifsc').focus();
              return false;
            }

           }else if(paymentmode == 'C'){

            if( cheque_number == ''){
                objs.alertPop('Please Enter Cheque Number');
             $('#cheque_number').focus();
              return false;
            }

           }

        } 


    

  var dataPaymentDetails = $('#PaymentDForm').serialize();

  var data = 'r=add_PaymentDetails' + '&dataEmpPayment=' + dataPaymentDetails;
  //alert(data);
      $.ajax({
        type:"post",
        cache:false,
        url:bridge,
        data:data,    // multiple data sent using ajax
    statusCode: {
               404: function() {
                   alert("page not found");
               }
        },
    beforeSend: function() {
            $('#BtnAddPaymentDetails').buttonLoader('start');

           },
        success: function(html) {
       // alert(html);
       // console.log(html);
       //return false;
      $('#BtnAddPaymentDetails').buttonLoader('stop');

      if( html == "successUpdate"){

          objs.alertPop('Payment Details Successfully Updated');
          setTimeout(location.reload.bind(location), 3000);
         return false;

        }else if( html == "successInsert"){

        objs.alertPop('Payment Details Successfully Inserted');
        setTimeout(location.reload.bind(location), 3000);
        return false;


      }else if( html == "error"){
        objs.alertPop('Something went wrong');
        return false;

      }else{
        objs.alertPop(html);
         return false; 
       }

      objs.alertPop(html);
      console.log(html);
    }
      });
       return false;
    });


// Employee Fetch Salary Details

$(".EmployeeSalaryDetails").click(function(){
    var emp_code = $(this).attr('data-id'); 
    var dataFetch = 'r=FetchEmpSalaryDetails' + '&emp_code=' + escape(emp_code);
    
 //alert(dataFetch);
 $.ajax({
   type: "POST",
   url: bridge,
   data: dataFetch,
   dataType: "json",
   success: function(data){
    console.log(data)
    if(data == 'existFalse'){
      $('#emp_basicda').val('');
      $('#emp_hra').val('');
      $('#emp_conveyance').val('');
      $('#emp_w_allowance').val('');
      $('#emp_o_allowance').val('');
      $('#employee_lwf').val('');
      $('#employer_lwf').val('');
      $('#SalaryHDNemp_id').val(emp_code);
      $('#SalaryModal').modal('show');
    }else {
    $('#emp_basicda').val(data[0].emp_basicda);
    $('#emp_hra').val(data[0].emp_hra);
    $('#emp_conveyance').val(data[0].emp_conveyance);
    $('#emp_w_allowance').val(data[0].emp_w_allowance);
    $('#emp_o_allowance').val(data[0].emp_o_allowance);
    $('#employee_lwf').val(data[0].employee_lwf);
    $('#employer_lwf').val(data[0].employer_lwf);
    $('#SalaryHDNemp_id').val(data[0].emp_code);
    //$('#BtnAddUAN').html('Save');
    $('#SalaryModal').modal('show');
  }
 }
});
return false;
});

 // Employee Add/Edit Salary Information

 $('#BtnSalaryDetails').click(function () {
  

   var emp_basicda = $('#emp_basicda').val();
   var emp_hra = $('#emp_hra').val();
   var emp_conveyance = $('#emp_conveyance').val();
   var emp_w_allowance = $('#emp_w_allowance').val();
   var emp_o_allowance = $('#emp_o_allowance').val();
   var employee_lwf = $('#employee_lwf').val();
   var employer_lwf = $('#employer_lwf').val();
    

             if( emp_basicda == ''){
              
               objs.alertPop('Please Enter Basic + DA');
             $('#emp_basicda').focus();
              return false;
            }

             if( emp_hra == ''){
              
               objs.alertPop('Please Enter HRA');
             $('#emp_hra').focus();
              return false;
            }


             if( emp_conveyance == ''){
              
               objs.alertPop('Please Enter Conveyance');
             $('#emp_conveyance').focus();
              return false;
            }

             if( emp_w_allowance == ''){
            
               objs.alertPop('Please Enter Washing Allowance');
             $('#emp_w_allowance').focus();
              return false;
            }

             if( emp_o_allowance == ''){
            
               objs.alertPop('Please Enter Other Allowance');
             $('#emp_o_allowance').focus();
              return false;
            }     

            if( employee_lwf == ''){
            
               objs.alertPop('Please Enter Employee LWF');
             $('#employee_lwf').focus();
              return false;
            }

             if( employer_lwf == ''){
            
               objs.alertPop('Please Enter Employer LWF');
             $('#employer_lwf').focus();
              return false;
            }     

  var dataSalaryDetails = $('#SalaryDForm').serialize();

  var data = 'r=add_SalaryDetails' + '&dataEmpSalary=' + dataSalaryDetails;
  //alert(data);
      $.ajax({
        type:"post",
        cache:false,
        url:bridge,
        data:data,    // multiple data sent using ajax
    statusCode: {
               404: function() {
                   alert("page not found");
               }
        },
    beforeSend: function() {
            $('#BtnSalaryDetails').buttonLoader('start');

           },
        success: function(html) {
       // alert(html);
       // console.log(html);
       //return false;
      $('#BtnSalaryDetails').buttonLoader('stop');

      if( html == "successUpdate"){

          objs.alertPop('Salary Details Successfully Updated');
          setTimeout(location.reload.bind(location), 3000);
         return false;

        }else if( html == "successInsert"){

        objs.alertPop('Salary Details Successfully Inserted');
        setTimeout(location.reload.bind(location), 3000);
        return false;


      }else if( html == "error"){
        objs.alertPop('Something went wrong');
        return false;

      }else{
        objs.alertPop(html);
         return false; 
       }

      objs.alertPop(html);
      console.log(html);
    }
      });
       return false;
    });



$("#AddEmpBtn").click(function(){

    $('#emp_code').val('');
    $('#emp_name').val('');
    $('#emp_fathername').val('');
    $('#emp_aadhaar').val('');
    $('#emp_zone').val('0');
    $('#emp_unit').val('0');
    $('#emp_department').val('0');
    $('#emp_designation').val('0');
    $('#emp_present_add').val('');
    $('#emp_permanent_add').val('');
    $('#emp_pcontact').val('');
    $('#emp_scontact').val('');
    $('#emp_gender').val('0');
    $('#emp_dob').val('');
    $('#emp_doj').val('');
    $('#HDNemp_id').val('');
    $('#BtnAddEmp').html('Submit');
    $('#state').html('Add Employee');

});

$("#BtnRule").click(function(){

    $('#rule_name').val('');
    $('#emp_pf_rate').val('');
    $('#emp_esi_rate').val('');
    $('#empr_pf_rate').val('');
    $('#empr_esi_rate').val('');
    $('#RuleHDN_id').val('');
    $('#AddRuleBtn').html('Submit');
    $('#state').html('Add Rule');

});

//Adding/Edit Rule


 $('#AddRuleBtn').click(function () {

        var rule_name = $('#rule_name').val();
        var emp_pf_rate = $('#emp_pf_rate').val();
        var emp_esi_rate = $('#emp_esi_rate').val();      
        var empr_pf_rate = $('#empr_pf_rate').val();
        var empr_esi_rate = $('#empr_esi_rate').val();

    if( rule_name == ''){
      objs.alertPop('Please Enter Rule Name');
     $('#rule_name').focus();
      return false;
    }

    if( emp_pf_rate == ''){
        objs.alertPop('Please Enter Employee PF Rate');
     $('#emp_pf_rate').focus();
      return false;
    }

    if( emp_esi_rate == ''){  
      objs.alertPop('Please Enter Employee ESI Rate');
     $('#emp_esi_rate').focus();
      return false;
    }

    if( empr_pf_rate == ''){
        objs.alertPop('Please Enter Employer PF Rate');
     $('#empr_pf_rate').focus();
      return false;
    }

    if( empr_esi_rate == ''){  
      objs.alertPop('Please Enter Employer ESI Rate');
     $('#empr_esi_rate').focus();
      return false;
    }


  var dataRule = $('#ruleForm').serialize();

  var data = 'r=add_Rule' + '&dataRule=' + dataRule;
  //alert(data);
      $.ajax({
        type:"post",
        cache:false,
        url:bridge,
        data:data,  
               404: function() {
                   alert("page not found");
               
        },
    beforeSend: function() {
            $('#AddRuleBtn').buttonLoader('start');

           },
        success: function(html) {
       // alert(html);
       // console.log(html);
       //return false;
      $('#AddRuleBtn').buttonLoader('stop');

      if( html == "success"){
          objs.alertPop('Rule Successfully Inserted');
          $( '#ruleForm' ).each(function(){
        this.reset();
        setTimeout(location.reload.bind(location), 3000);
        //window.location.href = ''+baseurl+'AllEmp.php';
        });
         return false;
      }else if( html == "successRule"){
        objs.alertPop('Rule Successfully Updated');
         setTimeout(location.reload.bind(location), 3000);
         //window.location.href = ''+baseurl+'AllEmp.php';

        return false;

      }else if( html == "error"){
        objs.alertPop('Something went wrong');
        return false;

      }else{
        objs.alertPop(html);
         return false; 
       }

      objs.alertPop(html);
      console.log(html);
    }
      });
       return false;
    });

 $("#BtnUnit").click(function(){

    $('#unit_name').val('');
    $('#unit_zone').val('0');
    $('#unit_address').val('');
    $('#unit_contact').val('');
    $('#UnitHDN_id').val('');
    $('#AddUnitBtn').html('Submit');
    $('#state').html('Add Unit');

});


 //Adding/Edit Unit


 $('#AddUnitBtn').click(function () {

        var unit_code = $('#unit_code').val();
        var unit_name = $('#unit_name').val();
        var unit_zone = $("#unit_zone option:selected" ).val();
        var unit_address = $('#unit_address').val();      
        var unit_contact = $('#unit_contact').val();
        

    if( unit_code == ''){
      objs.alertPop('Please Enter Unit Code');
     $('#unit_code').focus();
      return false;
    }

    if( unit_name == ''){
        objs.alertPop('Please Enter Unit Name');
     $('#unit_name').focus();
      return false;
    }

    if( unit_zone == '0'){  
      objs.alertPop('Please Select Unit');
     $('#unit_zone').focus();
      return false;
    }

    if( unit_address == ''){
        objs.alertPop('Please Enter Unit Address');
     $('#unit_address').focus();
      return false;
    }

    if( unit_contact == ''){  
      objs.alertPop('Please Enter Contact Number');
     $('#unit_contact').focus();
      return false;
    } else {

       str = unit_contact.toString(),
        len = str.length;


        if(len != 10){
           objs.alertPop('Please Enter Valid  Contact');
          $('#unit_contact').focus();
          return false;
        }
    }


  var dataUnit = $('#unitForm').serialize();

  var data = 'r=add_Unit' + '&dataUnit=' + dataUnit;
  //alert(data);
      $.ajax({
        type:"post",
        cache:false,
        url:bridge,
        data:data,  
               404: function() {
                   alert("page not found");
               
        },
    beforeSend: function() {
            $('#AddUnitBtn').buttonLoader('start');

           },
        success: function(html) {
       // alert(html);
       // console.log(html);
       //AddUnitBtn false;
      $('#AddEmpBtn').buttonLoader('stop');

      if( html == "success"){
          objs.alertPop('Unit Successfully Inserted');
          $( '#unitForm' ).each(function(){
        this.reset();
        setTimeout(location.reload.bind(location), 3000);
        //window.location.href = ''+baseurl+'AllEmp.php';
        });
         return false;
      }else if( html == "successUnit"){
        objs.alertPop('Unit Successfully Updated');
         setTimeout(location.reload.bind(location), 3000);
         //window.location.href = ''+baseurl+'AllEmp.php';

        return false;

      }else if( html == "error"){
        objs.alertPop('Something went wrong');
        return false;

      }else{
        objs.alertPop(html);
         return false; 
       }

      objs.alertPop(html);
      console.log(html);
    }
      });
       return false;
    });

 //Edit Unit

 $(".editUnit").click(function(){
   var id = $(this).attr('data-id'); 
    var dataFetch = 'r=FetchUnit' + '&id=' + escape(id);
    
 
 $.ajax({
   type: "POST",
   url: bridge,
   data: dataFetch,
   dataType: "json",
   success: function(data){
    
    $('#unit_code').val(data[0].unit_code);
    $('#unit_name').val(data[0].unit_name);
    $('#unit_address').val(data[0].unit_address);
    $('#unit_contact').val(data[0].unit_contact);
    $('#unit_zone').val(data[0].unit_zone);
    $('#UnitHDN_id').val(data[0].unit_id);
    $('#AddUnitBtn').html('Save');
    $('#state').html('Edit Unit');
    $('#UnitModal').modal('show');
 }
});
return false;
});

 $("#BtnUser").click(function(){

    $('#user_name').val('');
    $('#user_email').val('');
    $('#user_password').removeAttr("disabled");
    $('#user_password').val('');
    $('#user_type').val('0');
    $('#HDNuser_id').val('');
    $('#BtnAddUser').html('Submit');
    $('#state').html('Add User');

});


//Edit User

 $(".editUser").click(function(){
   var id = $(this).attr('data-id'); 
    var dataFetch = 'r=FetchUser' + '&id=' + escape(id);
    
 
 $.ajax({
   type: "POST",
   url: bridge,
   data: dataFetch,
   dataType: "json",
   success: function(data){
    
    $('#user_name').val(data[0].user_name);
    $('#user_email').val(data[0].user_email);
    $('#user_password').val('');
    $('#user_password').attr('disabled', 'disabled');
    $('#user_type').val(data[0].user_type);
    $('#HDNuser_id').val(data[0].user_id);
    $('#BtnAddUser').html('Save');
    $('#state').html('Edit User');
    $('#AddUserModal').modal('show');
 }
});
return false;
});

 //Adding/Edit User


 $('#BtnAddUser').click(function () {

        var user_name = $('#user_name').val();
        var user_email = $('#user_email').val();
        var user_password = $('#user_password').val();      
        var user_type = $("#user_type option:selected" ).val();
        var HDNuser_id = $('#HDNuser_id').val();     

    if( user_name == ''){
      objs.alertPop('Please Enter Name');
     $('#user_name').focus();
      return false;
    }

    if( user_email == ''){
      objs.alertPop('Please Enter Email');
     $('#user_email').focus();
      return false;
    }

    if( user_email != ''){
       var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
       if(!document.getElementById('user_email').value.match(mailformat))
       { $('#user_email').focus();
       objs.alertPop('Invalid Email id');
         return false; }

       }
    if(HDNuser_id == ''){

    if( user_password == ''){
        objs.alertPop('Please Enter Password');
     $('#user_password').focus();
      return false;
    } 

    }   

   

    if( user_type == '0'){  
      objs.alertPop('Please Select User Type');
     $('#user_type').focus();
      return false;
    }

  var dataUser = $('#UserFrm').serialize();

  var data = 'r=add_User' + '&dataUser=' + dataUser;
  //alert(data);
      $.ajax({
        type:"post",
        cache:false,
        url:bridge,
        data:data,  
               404: function() {
                   alert("page not found");
               
        },
    beforeSend: function() {
            $('#BtnAddUser').buttonLoader('start');

           },
        success: function(html) {
       // alert(html);
       // console.log(html);
      $('#BtnAddUser').buttonLoader('stop');

      if( html == "success"){
          objs.alertPop('User Successfully Inserted');
          $( '#UserFrm' ).each(function(){
        this.reset();
        setTimeout(location.reload.bind(location), 3000);
        //window.location.href = ''+baseurl+'AllEmp.php';
        });
         return false;
      }else if( html == "successUser"){
        objs.alertPop('User Data Successfully Updated');
         setTimeout(location.reload.bind(location), 3000);
         //window.location.href = ''+baseurl+'AllEmp.php';

        return false;

      }else if( html == "error"){
        objs.alertPop('Something went wrong');
        return false;

      }else{
        objs.alertPop(html);
         return false; 
       }

      objs.alertPop(html);
      console.log(html);
    }
      });
       return false;
    });

  
  // Employee Fetch Rule

$(".EmployeeRuleDetails").click(function(){
    var emp_code = $(this).attr('data-id'); 
    var dataFetch = 'r=FetchEmpRule' + '&emp_code=' + escape(emp_code);
    
 $.ajax({
   type: "POST",
   url: bridge,
   data: dataFetch,
   dataType: "json",
   success: function(data){
 
    if(data == 'existFalse'){
      $('#emp_rule').val('0');
      $('#ApplyRuleHDN_id').val(emp_code);
      $('#RuleModal').modal('show');
    }else {
      $('#emp_rule').val(data[0].assigned_rule_id);
      $('#ApplyRuleHDN_id').val(emp_code); 
      $('#ApplyRuleBtn').html('Save');
      $('#RuleModal').modal('show');
  }
 }
});
return false;
});

// Employee Add/Edit Rule

 $('#ApplyRuleBtn').click(function () {

        var emp_rule = $('#emp_rule').val();


    if( emp_rule == '0'){
        objs.alertPop('Please Select Rule');
     $('#emp_rule').focus();
      return false;
    }

  var dataRuleFrm = $('#ruleForm').serialize();

  var data = 'r=add_EmpRule' + '&dataRuleFrm=' + dataRuleFrm;
  //alert(data);
      $.ajax({
        type:"post",
        cache:false,
        url:bridge,
        data:data,    // multiple data sent using ajax
    statusCode: {
               404: function() {
                   alert("page not found");
               }
        },
    beforeSend: function() {
            $('#ApplyRuleBtn').buttonLoader('start');

           },
        success: function(html) {
       // alert(html);
       // console.log(html);
       //return false;
      $('#ApplyRuleBtn').buttonLoader('stop');

      if( html == "successUpdate"){

          objs.alertPop('Rule Successfully Updated');
          setTimeout(location.reload.bind(location), 3000);
         return false;

        }else if( html == "successInsert"){

        objs.alertPop('Rule Successfully Inserted');
        setTimeout(location.reload.bind(location), 3000);
        return false;


      }else if( html == "error"){
        objs.alertPop('Something went wrong');
        return false;

      }else{
        objs.alertPop(html);
         return false; 
       }

      objs.alertPop(html);
      console.log(html);
    }
      });
       return false;
    });


// PaySlip Setting Starts

// $('#save_payslip_setting').click(function () {



//      var s_rule      				= $('#s_rule').val();
//      var s_title     				= $('#s_title').val();
//      var s_contractor_name          = $('#s_contractor_name').val();
//      var s_contractor_address      	= $('#s_contractor_address').val();
//      var s_est_add   				= $('#s_est_add').val();
//      var bill_date     				= $('#bill_date').val();
     


//    if( s_rule == ''){
// 	   alert('Please Enter Slip Rule');
//      // $('#errrB').html('Please enter The Mobile Number').show().delay(2800).fadeOut();
//       // objs.alertPop('Please Enter Slip Rule');
//    // $('#s_rule').focus();
//     // return false;
//    }

//    if( s_title == ''){
// 	   alert('Please Enter Slip Title');
//      // $('#errrB').html('Please enter The Mobile Number').show().delay(2800).fadeOut();
//     // objs.alertPop('Please Enter Slip Title');
//    // $('#s_title').focus();
//    //  return false;
//    }

//    if( s_contractor_name == ''){
// 	   alert('Please Enter Contractor Name');
//      // $('#errrB').html('Please enter The Mobile Number').show().delay(2800).fadeOut();
//     // objs.alertPop('Please Enter Contractor Name');
//    // $('#s_contractor_name').focus();
//     // return false;
//    }

//    if( s_contractor_address == ''){
// 	   	alert('Please Enter Contractor Address');
//      // $('#errrB').html('Please enter The Mobile Number').show().delay(2800).fadeOut();
//     // objs.alertPop('Please Enter Contractor Address');
//    // $('#s_contractor_address').focus();
//    //  return false;
//    }

//    if( s_est_add == ''){
// 	   alert('Please Enter Establishment Address');
//      // $('#errrB').html('Please enter The Mobile Number').show().delay(2800).fadeOut();
//     // objs.alertPop('Please Enter Establishment Address');
//     //$('#s_est_add').focus();
//     // return false;
//    }

//    if( bill_date == ''){
// 	   alert('Please Enter Bill Date');
//      // $('#errrB').html('Please enter The Mobile Number').show().delay(2800).fadeOut();
//     // objs.alertPop('Please Enter Bill Date');
//    // $('#bill_date').focus();
//     // return false;
//    }

//  var datafrmPayslipsetting = $('#frmPayslipsetting').serialize();

//  var data = 'r=edit_payslip' + '&datafrmPayslipsetting=' + datafrmPayslipsetting;
//  //alert(data);
//      $.ajax({
//        type:"post",
//        cache:false,
//        url:bridge,
//        data:data,    // multiple data sent using ajax
//    statusCode: {
//               404: function() {
//                   alert("page not found");
//               }
//        },
//    beforeSend: function() {
//          //  $('#save_setting').buttonLoader('start');

//           },
//        success: function(html) {
//      // alert(html);
//      //console.log(html);
//    //  $('#save_setting').buttonLoader('stop');


//      if( html == "successSetting"){
// 		// alert("Setting Successfully Updated");
//        objs.alertPop('Setting Successfully Updated');
//        // window.location.href = 'http://localhost/RSEnterP/ViewProduction.php';
//         window.location.href = ''+baseurl+'all.php';
//        return false;

//      }else if( html == "error"){
//        objs.alertPop('Something went wrong');
//        return false;

//      }else{}

//      objs.alertPop(html);
//      console.log(html);
//    }
//      });
//       return false;
//    });



// Checkbox Select Function Starts

    $("#select_all").change(function(){  //"select all" change
        var status = this.checked; // "select all" checked status
        $('.checkbox').each(function(){ //iterate all listed checkbox items
            this.checked = status; //change ".checkbox" checked status
        });
    });

    $('.checkbox').change(function(){ //".checkbox" change
        //uncheck "select all", if one of the listed checkbox item is unchecked
        if(this.checked == false){ //if this item is unchecked
            $("#select_all")[0].checked = false; //change "select all" checked status to false
        }

        //check "select all" if all checkbox items are checked
        if ($('.checkbox:checked').length == $('.checkbox').length ){
            $("#select_all")[0].checked = true; //change "select all" checked status to true
        }
    });

// For Dynamic Checkbox

    $(".dynamic_select_all").change(function(){  //"select all" change
        var status = this.checked; // "select all" checked status
        var className = $(this).attr('data-id'); 
        $('.checkbox_'+ className).each(function(){ //iterate all listed checkbox items
            this.checked = status; //change ".checkbox" checked status
        });
    });

// Checkbox Select Only Enabled Checkbox Function Starts

    $("#select_all_migration").change(function(){  //"select all" change
        var status = this.checked; // "select all" checked status
        $('.checkMigration:enabled').each(function(){ //iterate all listed checkbox items
            this.checked = status; //change ".checkbox" checked status
        });
    });

    $('.checkMigration:enabled').change(function(){ //".checkbox" change
        //uncheck "select all", if one of the listed checkbox item is unchecked
        if(this.checked == false){ //if this item is unchecked
            $("#select_all_migration")[0].checked = false; //change "select all" checked status to false
        }

        //check "select all" if all checkbox items are checked
        if ($('.checkMigration:checked').length == $('.checkMigration:enabled').length ){
            $("#select_all_migration")[0].checked = true; //change "select all" checked status to true
        }
    });    


//Group Status

 $('#statusButton').click(function(){

   var groupStatus = $("#groupStatus option:selected" ).val();

   if(groupStatus == 2){
     objs.alertPop('Please Select Status');
     $('#groupStatus').focus();
      return false;
   }
  
  if(confirm("Are you sure you want to change the status ?"))
  {
    var id = [];

   // $(':checkbox:checked').each(function(i){
   //  id[i] = $(this).val();
   // });

    var id = $('input[name=check]:checked').map(function()
            {
                return $(this).val();
            }).get();
   
   if(id.length === 0) //tell you if the array is empty
   {
    objs.alertPop('Please Select atleast one checkbox');
   }
   else
   {

    var data = 'r=changeStatusByCheckBox' + '&id=' + escape(id) + '&status=' + escape(groupStatus) ;

    $.ajax({
     url: bridge,
     method:'POST',
     data:data,  
               404: function() {
                   alert("page not found");
               
        },
    beforeSend: function() {
            $('#statusButton').buttonLoader('start');

           },
      success: function(html) {
      //alert(html);
      console.log(html);
      $('#statusButton').buttonLoader('stop');
      
      if( html == "successInsert"){
        objs.alertPop('Status Successfully Assigned');
        setTimeout(location.reload.bind(location), 3000);
        return false;
      }else if( html == "successUpdate"){
        objs.alertPop('Status Successfully Updated');
        setTimeout(location.reload.bind(location), 3000);
        return false;
      }else if( html == "error"){
        objs.alertPop('Something went wrong');
        return false;

      }else{
        objs.alertPop(html);
         return false; 
       }

      objs.alertPop(html);
      console.log(html);
     }
     
    });
   }
   
  }
  else
  {
   return false;
  }
 });

 //Group Rule

  $('#ruleButton').click(function(){

   var groupRule = $("#groupRule option:selected" ).val();

   if(groupRule == 0){
     objs.alertPop('Please Select Rule');
     $('#groupRule').focus();
      return false;
   }
  
  if(confirm("Are you sure you want to apply the rule ?"))
  {
    var id = [];

   // $(':checkbox:checked').each(function(i){
   //  id[i] = $(this).val();
   // });

   var id = $('input[name=check]:checked').map(function()
            {
                return $(this).val();
            }).get();
   
   if(id.length === 0) //tell you if the array is empty
   {
    objs.alertPop('Please Select atleast one checkbox');
   }
   else
   {

    var data = 'r=applyRuleByCheckBox' + '&id=' + escape(id) + '&rule=' + escape(groupRule) ;

    $.ajax({
     url: bridge,
     method:'POST',
     data:data,  
               404: function() {
                   alert("page not found");
               
        },
    beforeSend: function() {
            $('#ruleButton').buttonLoader('start');

           },
      success: function(html) {
      //alert(html);
      console.log(html);
       $('#ruleButton').buttonLoader('stop');
      if( html == "successInsert"){
        objs.alertPop('Rule Successfully Assigned');
        setTimeout(location.reload.bind(location), 3000);
        return false;
      }else if( html == "successUpdate"){
        objs.alertPop('Rule Successfully Updated');
        setTimeout(location.reload.bind(location), 3000);
        return false;
      }else if( html == "error"){
        objs.alertPop('Something went wrong');
        return false;

      }else{
        objs.alertPop(html);
         return false; 
       }

      objs.alertPop(html);
      console.log(html);
     }
     
    });
   }
   
  }
  else
  {
   return false;
  }
 });

$('#groupAttendance').change(function() {
        if (this.value == '1') {
            
            $("#groupRemarks").prop("disabled", false);  
        }
        else if (this.value == '0') {
            $("#groupRemarks").val('0');
            $("#groupRemarks").prop("disabled", true);  
        }
    });

//Group Migrate Add/Remove

 $('#migrateActionButton').click(function(){

   var groupMigrate = $("#groupMigrate option:selected" ).val();
   var groupAttendance = $("#groupAttendance option:selected" ).val();
   var groupRemarks = $("#groupRemarks option:selected" ).val();

   if(groupMigrate == 2){
     objs.alertPop('Please Select Add/Remove');
     $('#groupMigrate').focus();
      return false;
   }

   if(groupMigrate == 1){

   if(groupAttendance == 2){
     objs.alertPop('Do you want to add attendance or not ?');
     $('#groupAttendance').focus();
      return false;
   }

   if(groupAttendance == 1){
    if(groupRemarks == 0){
     objs.alertPop('Please select remarks for attendance');
     $('#groupRemarks').focus();
      return false;
   }
   }

 }
  
  if(confirm("Are you sure you want to change the status ?"))
  {
    var id = [];

   // $(':checkbox:checked').each(function(i){
   //  id[i] = $(this).val();
   // });

    var id = $('input[name=checkMigration]:checked').map(function()
            {
                return $(this).val();
            }).get();
   
   if(id.length === 0) //tell you if the array is empty
   {
    objs.alertPop('Please Select atleast one checkbox');
   }
   else
   {

    var data = 'r=applyMigrationByCheckBox' + '&id=' + escape(id) + '&status=' + escape(groupMigrate) + '&groupAttendance=' + escape(groupAttendance) + '&groupRemarks=' + escape(groupRemarks);

    $.ajax({
     url: bridge,
     method:'POST',
     data:data,  
               404: function() {
                   alert("page not found");
               
        },
    beforeSend: function() {
            $('#migrateActionButton').buttonLoader('start');

           },
      success: function(html) {
      alert(html);
      console.log(html);
      $('#migrateActionButton').buttonLoader('stop');
      
      if( html == "successInsert"){
        objs.alertPop('Migrated Successfully');
        setTimeout(location.reload.bind(location), 3000);
        return false;
      }else if( html == "successDelete"){
        objs.alertPop('Migration Removed Successfully');
        setTimeout(location.reload.bind(location), 3000);
        return false;
      }else if( html == "successInsertAttendance"){
        objs.alertPop('Attendance Created Successfully');
        setTimeout(location.reload.bind(location), 3000);
        return false;
      }else if( html == "successDeleteAttendance"){
        objs.alertPop('Attendance Removed Successfully');
        setTimeout(location.reload.bind(location), 3000);
        return false;
      }else if( html == "DeleteAttendanceFailed"){
        objs.alertPop('Failed Removing Attendance');
        setTimeout(location.reload.bind(location), 3000);
        return false;    
      }else if( html == "insertErrorAttendance"){
        objs.alertPop('Creating Attendance Failed');
        setTimeout(location.reload.bind(location), 3000);
        return false;
      }else if( html == "successUpdateAttendance"){
        objs.alertPop('Attendance Updated Successfully');
        setTimeout(location.reload.bind(location), 3000);
        return false;
      }else if( html == "updateErrorAttendance"){
        objs.alertPop('Attendance Updation Failed');
        setTimeout(location.reload.bind(location), 3000);
        return false;        
      }else if( html == "failed"){
        objs.alertPop('Failed Migration Removal');
        setTimeout(location.reload.bind(location), 3000);
        return false;
      }else if( html == "failedInsertion"){
        objs.alertPop('Failed Migration Adding');
        setTimeout(location.reload.bind(location), 3000);
        return false;  
      }else if( html == "Server Error"){
        objs.alertPop('Oops! Looks like you made wrong choice! :(');
        return false;

      }else{
        objs.alertPop(html);
         return false; 
       }

      objs.alertPop(html);
      console.log(html);
     }
     
    });
   }
   
  }
  else
  {
   return false;
  }
 });  


//Edit User

 $(".assignUnit").click(function(){

   var id = $(this).attr('data-id'); 
   //alert(id);
   var dataFetch = 'r=FetchAssignedUnit' + '&id=' + escape(id);
    
 
 $.ajax({
   type: "POST",
   url: bridge,
   data: dataFetch,
   dataType: "json",
   success: function(data){
    //alert(data);
    if(data == 'existFalse'){
     
     $('#select_unit').val('0');
     $('#HDNAssigneduser_id').val(id);
     $('#BtnAssignUnit').html('Add');
     $('#state').html('Assign User\'s Unit');
     $('#AssignUnitUserModal').modal('show');
    }else{
     $('#select_unit').val(data[0].unit_id);
     $('#HDNAssigneduser_id').val(data[0].user_id);
     $('#BtnAssignUnit').html('Update');
     $('#state').html('Assign User\'s Unit');
     $('#AssignUnitUserModal').modal('show');
    }
    
 }
});
return false;
});

 $('#BtnAssignUnit').click(function(){
     
  var select_unit = $("#select_unit option:selected" ).val();

  if( select_unit == '0'){  
      objs.alertPop('Please Select User\'s Unit');
     $('#select_unit').focus();
      return false;
    }

  var dataAssignedUnit = $('#assignedUserFrm').serialize();

  var data = 'r=assign_Unit' + '&dataAssignedUnit=' + dataAssignedUnit;
  //alert(data);
      $.ajax({
        type:"post",
        cache:false,
        url:bridge,
        data:data,  
               404: function() {
                   alert("page not found");
               
        },
    beforeSend: function() {
            $('#BtnAssignUnit').buttonLoader('start');

           },
        success: function(html) {
       // alert(html);
       // console.log(html);
      $('#BtnAssignUnit').buttonLoader('stop');

      if( html == "successInsert"){
          objs.alertPop('Unit Successfully Assigned');
          setTimeout(location.reload.bind(location), 3000);
         return false;
      }else if( html == "successUpdate"){
        objs.alertPop('Unit Successfully Updated');
        setTimeout(location.reload.bind(location), 3000);
        return false;
      }else if( html == "error"){
        objs.alertPop('Something went wrong');
        return false;

      }else{
        objs.alertPop(html);
         return false; 
       }

      objs.alertPop(html);
      console.log(html);
    }
      });
       return false;
});

//Adding Inputs for salary start

$('#BtnInputs').click(function () {

         var inputs_month   = $("#inputs_month option:selected" ).val();
         var inputs_year    = $("#inputs_year option:selected" ).val();


        var isValid = true;

        $('input[name^="emp_code"]').each(function() {
            if ($.trim($(this).val()) == '') {
                isValid = false;
                $(this).css({
                    "border": "1px solid red",
                    "background": "#FFCECE"
                });
                  return false;
            }
            else {
                $(this).css({
                    "border": "",
                    "background": ""
                });
            }
        });

    if (isValid == false) {
            return false;
       } else {
           // alert('Thank you for submitting');
        }


         $('input[name^="inputs_days"]').each(function() {
            if ($.trim($(this).val()) == '') {
                isValid = false;
                $(this).css({
                    "border": "1px solid red",
                    "background": "#FFCECE"
                });
                  return false;
            }
            else {
                $(this).css({
                    "border": "",
                    "background": ""
                });
            }
        });
    if (isValid == false) {
            return false;
       } else {
          //  alert('Thank you for submitting');
        }


        $('input[name^="inputs_advance"]').each(function() {
            if ($.trim($(this).val()) == '') {
                isValid = false;
                $(this).css({
                    "border": "1px solid red",
                    "background": "#FFCECE"
                });
                  return false;
            }
            else {
                $(this).css({
                    "border": "",
                    "background": ""
                });
            }
        });
    if (isValid == false) {
            return false;
       } else {
          //  alert('Thank you for submitting');
        }  


      $('input[name^="inputs_cantded"]').each(function() {
            if ($.trim($(this).val()) == '') {
                isValid = false;
                $(this).css({
                    "border": "1px solid red",
                    "background": "#FFCECE"
                });
                  return false;
            }
            else {
                $(this).css({
                    "border": "",
                    "background": ""
                });
            }
        });
    if (isValid == false) {
            return false;
       } else {
          //  alert('Thank you for submitting');
        }    


       $('input[name^="inputs_dress"]').each(function() {
            if ($.trim($(this).val()) == '') {
                isValid = false;
                $(this).css({
                    "border": "1px solid red",
                    "background": "#FFCECE"
                });
                  return false;
            }
            else {
                $(this).css({
                    "border": "",
                    "background": ""
                });
            }
        });
    if (isValid == false) {
            return false;
       } else {
          //  alert('Thank you for submitting');
        }  
        
         $('input[name^="inputs_extra"]').each(function() {
            if ($.trim($(this).val()) == '') {
                isValid = false;
                $(this).css({
                    "border": "1px solid red",
                    "background": "#FFCECE"
                });
                  return false;
            }
            else {
                $(this).css({
                    "border": "",
                    "background": ""
                });
            }
        });
    if (isValid == false) {
            return false;
       } else {
          //  alert('Thank you for submitting');
        }        


       $('input[name^="inputs_otRate"]').each(function() {
            if ($.trim($(this).val()) == '') {
                isValid = false;
                $(this).css({
                    "border": "1px solid red",
                    "background": "#FFCECE"
                });
                  return false;
            }
            else {
                $(this).css({
                    "border": "",
                    "background": ""
                });
            }
        });
    if (isValid == false) {
            return false;
       } else {
          //  alert('Thank you for submitting');
        }      
        

      $('input[name^="inputs_hours"]').each(function() {
            if ($.trim($(this).val()) == '') {
                isValid = false;
                $(this).css({
                    "border": "1px solid red",
                    "background": "#FFCECE"
                });
                  return false;
            }
            else {
                $(this).css({
                    "border": "",
                    "background": ""
                });
            }
        });
    if (isValid == false) {
            return false;
       } else {
          //  alert('Thank you for submitting');
        }    


      $('input[name^="inputs_overtime"]').each(function() {
            if ($.trim($(this).val()) == '') {
                isValid = false;
                $(this).css({
                    "border": "1px solid red",
                    "background": "#FFCECE"
                });
                  return false;
            }
            else {
                $(this).css({
                    "border": "",
                    "background": ""
                });
            }
        });
    if (isValid == false) {
            return false;
       } else {
          //  alert('Thank you for submitting');
        }      
        

      $('input[name^="inputs_overtime"]').each(function() {
            if ($.trim($(this).val()) == '') {
                isValid = false;
                $(this).css({
                    "border": "1px solid red",
                    "background": "#FFCECE"
                });
                  return false;
            }
            else {
                $(this).css({
                    "border": "",
                    "background": ""
                });
            }
        });
    if (isValid == false) {
            return false;
       } else {
          //  alert('Thank you for submitting');
        } 
        
       $('input[name^="inputs_overtime_esi"]').each(function() {
            if ($.trim($(this).val()) == '') {
                isValid = false;
                $(this).css({
                    "border": "1px solid red",
                    "background": "#FFCECE"
                });
                  return false;
            }
            else {
                $(this).css({
                    "border": "",
                    "background": ""
                });
            }
        });
    if (isValid == false) {
            return false;
       } else {
          //  alert('Thank you for submitting');
        }                                                                         


 $('input[name^="inputs_overtime_ded"]').each(function() {
            if ($.trim($(this).val()) == '') {
                isValid = false;
                $(this).css({
                    "border": "1px solid red",
                    "background": "#FFCECE"
                });
                  return false;
            }
            else {
                $(this).css({
                    "border": "",
                    "background": ""
                });
            }
        });
    if (isValid == false) {
            return false;
       } else {
          //  alert('Thank you for submitting');
        }         

        $('input[name^="inputs_overtime_netpay"]').each(function() {
            if ($.trim($(this).val()) == '') {
                isValid = false;
                $(this).css({
                    "border": "1px solid red",
                    "background": "#FFCECE"
                });
                  return false;
            }
            else {
                $(this).css({
                    "border": "",
                    "background": ""
                });
            }
        });
    if (isValid == false) {
            return false;
       } else {
          //  alert('Thank you for submitting');
        }         

         $('input[name^="inputs_incentive"]').each(function() {
            if ($.trim($(this).val()) == '') {
                isValid = false;
                $(this).css({
                    "border": "1px solid red",
                    "background": "#FFCECE"
                });
                  return false;
            }
            else {
                $(this).css({
                    "border": "",
                    "background": ""
                });
            }
        });
    if (isValid == false) {
            return false;
       } else {
          //  alert('Thank you for submitting');
        }                                        

  

	
    
      var dataInputs = $('#frmInputs').serialize();
    //alert(dataInputs);
      var data = 'r=add_Inputs' + '&dataInputs=' + dataInputs;
     // console.log(data);
      $.ajax({
        type:"post",
        cache:false,
        url:bridge,
        data:data,    // multiple data sent using ajax
    statusCode: {
               404: function() {
                   alert("page not found");
               }
        },
    beforeSend: function() {
            $('#BtnInputs').buttonLoader('start');

           },
        success: function(html) {
       // alert(html);
       // console.log(html);
      $('#BtnInputs').buttonLoader('stop');

      if( html == "success"){
          objs.alertPop('Data added successfully');
          $( '#frmInputs' ).each(function(){
        this.reset();
        window.location.href = ''+baseurl+'inputs.php';
        });
              return false;

      }else if( html == "error"){
        objs.alertPop('Something went wrong');
        return false;

        }else if( html == "emptyUnit"){
        objs.alertPop('Session Unit not found ! Try refreshing the page');
        return false;

        }else if( html == "emptyMonth"){
        objs.alertPop('Session Month not found ! Try refreshing the page');
        return false;

        }else if( html == "emptyYear"){
        objs.alertPop('Session Year not found ! Try refreshing the page');
        return false;

        }else if( html == "AlreadyEmpData"){
        objs.alertPop('Employee data already exist.');
        return false;

      }else{}

      objs.alertPop(html);
      console.log(html);
    }
      });
       return false;

    });
	


// Status Active and Inactive of User Employee 

$(document).on('click','.status_checks_emp',function(){

 if(confirm("Are you sure you want to change the status of this employee?")){
  
      	var emp_status = ($(this).hasClass("btn-success")) ? '1' : '0';
        //alert(emp_status);
        var current_element = $(this);
        var idemp = $(current_element).attr('data');
        var emp_code = $(current_element).attr('data-id');
        
        var data = 'r=Status_EMP' + '&emp_id=' + escape(idemp) + '&emp_status=' + escape(emp_status) + '&emp_code=' + escape(emp_code) ;
		// alert(data);
       console.log(data);
        $.ajax({
          type:"POST",
          url: bridge,
          data: data,

          success: function(data)
          {
            //location.reload();
          //alert(data);

           if(data == 'Active'){

           	// $('#NewAddemp'+idemp).text('Active');
           	// $('#NewAddemp'+idemp).removeClass('btn-danger');
           	// $('#NewAddemp'+idemp).addClass('btn-success');

            current_element.text('Active');
            current_element.removeClass('btn-danger');
            current_element.addClass('btn-success');

           	return false;

           }else if(data == 'Inactive'){

			       //$('#NewAddemp'+idemp).text('Inactive');
             //$('#NewAddemp'+idemp).removeClass('btn-success');
             //$('#NewAddemp'+idemp).addClass('btn-danger');

            current_element.text('Inactive');
            current_element.removeClass('btn-success');
            current_element.addClass('btn-danger');

			return false;
           }else{

			location.reload();
			return false;
		         }
         // console.log(data);
          }
        });
      }
      return false;

   //   }
     // else{objs.alertPop("page not found");}
    });


// Employee Migration 

$(document).on('click','.migrate_emp',function(){


        var emp_status = ($(this).hasClass("btn-success")) ? '0' : '1';
        //alert(emp_status);
        var current_element = $(this);
        var idemp = $(current_element).attr('data');
        var emp_code = $(current_element).attr('data-id');
        url = bridge;
        var data = 'r=Migrate_EMP' + '&emp_id=' + escape(idemp) + '&emp_status=' + escape(emp_status) + '&emp_code=' + escape(emp_code) ;
    // alert(data);
       console.log(data);
        $.ajax({
          type:"POST",
          url: url,
          data: data,

          success: function(data)
          {
            //location.reload();
          //alert(data);

           if(data == 'Exist'){

            $('#Migrateemp'+idemp).text('Remove');
            $('#Migrateemp'+idemp).removeClass('btn-success');
            $('#Migrateemp'+idemp).addClass('btn-danger');

            return false;

           }else if(data == 'NotExist'){
            $('#Migrateemp'+idemp).text('Add');
            $('#Migrateemp'+idemp).removeClass('btn-danger');
            $('#Migrateemp'+idemp).addClass('btn-success');

            return false;

            }else if(data == 'failed'){
            objs.alertPop('Something went wrong');
            return false; 

           }else{

      location.reload();
      return false;
             }
         // console.log(data);
          }
        });

   //   }
     // else{objs.alertPop("page not found");}
    });

// Status Active and Inactive of Rule 

$(document).on('click','.status_checks_rule',function(){

 if(confirm("Are you sure you want to change the status of this rule?")){
  
        var rule_status = ($(this).hasClass("btn-success")) ? '1' : '0';
        //alert(emp_status);
        var current_element = $(this);
        var idRule = $(current_element).attr('data');
        
        url = bridge;
        var data = 'r=Status_Rule' + '&rule_id=' + escape(idRule) + '&rule_status=' + escape(rule_status);
    // alert(data);
       console.log(data);
        $.ajax({
          type:"POST",
          url: url,
          data: data,

          success: function(data)
          {
            //location.reload();
          //alert(data);

           if(data == 'Active'){

            $('#ruleStatus'+idRule).text('Active');
            $('#ruleStatus'+idRule).removeClass('btn-danger');
            $('#ruleStatus'+idRule).addClass('btn-success');

            return false;

           }else if(data == 'Inactive'){

             $('#ruleStatus'+idRule).text('Inactive');
             $('#ruleStatus'+idRule).removeClass('btn-success');
             $('#ruleStatus'+idRule).addClass('btn-danger');

      return false;
           }else{

      location.reload();
      return false;
             }
         // console.log(data);
          }
        });
      }
      return false;

   //   }
     // else{objs.alertPop("page not found");}
    });

// Status Active and Inactive of Unit

$(document).on('click','.status_checks_unit',function(){

 if(confirm("Are you sure you want to change the status of this Unit?")){
  
        var unit_status = ($(this).hasClass("btn-success")) ? '1' : '0';
        //alert(emp_status);
        var current_element = $(this);
        var idUnit = $(current_element).attr('data');
        
        url = bridge;
        var data = 'r=Status_unit' + '&unit_id=' + escape(idUnit) + '&unit_status=' + escape(unit_status);
    // alert(data);
       console.log(data);
        $.ajax({
          type:"POST",
          url: url,
          data: data,

          success: function(data)
          {
            //location.reload();
          //alert(data);

           if(data == 'Active'){

            $('#unitStatus'+idUnit).text('Active');
            $('#unitStatus'+idUnit).removeClass('btn-danger');
            $('#unitStatus'+idUnit).addClass('btn-success');

            return false;

           }else if(data == 'Inactive'){

             $('#unitStatus'+idUnit).text('Inactive');
             $('#unitStatus'+idUnit).removeClass('btn-success');
             $('#unitStatus'+idUnit).addClass('btn-danger');

      return false;
           }else{

      location.reload();
      return false;
             }
         // console.log(data);
          }
        });
      }
      return false;

   //   }
     // else{objs.alertPop("page not found");}
    });


// Delete Employee User Start

 $(".delEmpdata").click(function(){
var element = $(this);
var del_empid = element.attr("id");
 //objs.alertPop(del_empid);
 var data = 'r=DelEmpdata' + '&del_empid=' + escape(del_empid);
 //objs.alertPop(data);
 if(confirm("Are you sure you want to delete?"))
{
 $.ajax({
   type: "POST",
   url: bridge,
   data: data,
   success: function(html){
//objs.alertPop(html);
 }
});
  $('#hideTr'+del_empid).animate({ backgroundColor: "#ccc" }, "fast")
  .animate({ opacity: "hide" }, 700);
 }
return false;
});


// Status Active and Inactive of User  

$(document).on('click','.status_checks_user',function(){

  if(confirm("Are you sure you want to change the status of this user?")){

        var user_status = ($(this).hasClass("btn-success")) ? '1' : '0';
        //alert(emp_status);
        var current_element = $(this);
        var iduser = $(current_element).attr('data');
        url = bridge;
        var data = 'r=Status_user' + '&user_id=' + escape(iduser) + '&user_status=' + escape(user_status);
    // alert(data);
       console.log(data);
        $.ajax({
          type:"POST",
          url: url,
          data: data,

          success: function(data)
          {
            //location.reload();
          //alert(data);

           if(data == 'Active'){

            $('#userStatus'+iduser).text('Active');
            $('#userStatus'+iduser).removeClass('btn-danger');
            $('#userStatus'+iduser).addClass('btn-success');

            return false;

           }else if(data == 'Inactive'){
            $('#userStatus'+iduser).text('Inactive');
            $('#userStatus'+iduser).removeClass('btn-success');
            $('#userStatus'+iduser).addClass('btn-danger');
      return false;
           }else{

      location.reload();
      return false;
             }
         // console.log(data);
          }
        });

   //   }
     // else{objs.alertPop("page not found");}
   }
    });



// Delete User Start

 $(".delUserdata").click(function(){
var element = $(this);
var del_userid = element.attr("id");
 //objs.alertPop(del_empid);
 var data = 'r=DelUserdata' + '&del_userid=' + escape(del_userid);
 //objs.alertPop(data);
 if(confirm("Are you sure you want to delete?"))
{
 $.ajax({
   type: "POST",
   url: bridge,
   data: data,
   success: function(html){
//objs.alertPop(html);
 }
});
  $('#hideTr'+del_userid).animate({ backgroundColor: "#ccc" }, "fast")
  .animate({ opacity: "hide" }, 700);
 }
return false;
});


//Payment mode change function

$('input:radio[name=txtpaymentmode]').change(function() {
        if (this.value == 'C') {
            
            $("#txtbankname").prop("readonly", true);
            $("#txtacno").prop("readonly", true);
            $("#txtrefference").prop("readonly", true);
            
        }
        else if (this.value == 'A') {

            $("#txtbankname").prop("readonly", false);
            $("#txtacno").prop("readonly", false);
            $("#txtrefference").prop("readonly", false);
        }
    });



// Base Days in setting


$('#submit_baseDays').click(function () {

  var txtbasedays = $('#default_days').val();  

  if( txtbasedays == ''){

      objs.alertPop('Please Enter Number of days');
      return false;

  }else {

      var regex = /^[0-9]+(\.[0-9]{1,2})?$/;

          if(!regex.test(txtbasedays)) {

                objs.alertPop('Invalid Days Format');
                return false;

            } else if ( txtbasedays > 31){

               objs.alertPop('Invalid Days Format');
                return false;

            }

           }

var dataBaseDays = $('#basedaysfrm').serialize();

 var data = 'r=add_basedays' + '&dataBaseDays=' + dataBaseDays;
 //alert(data);
     $.ajax({
       type:"post",
       cache:false,
       url:bridge,
       data:data,    // multiple data sent using ajax
   statusCode: {
              404: function() {
                  alert("page not found");
              }
       },
   beforeSend: function() {
           $('#submit_baseDays').buttonLoader('start');

          },
       success: function(html) {
      //alert(html);
      //console.log(html);
     $('#submit_baseDays').buttonLoader('stop');


     if( html == "success"){
       objs.alertPop('Days Successfully Updated');
       setTimeout(location.reload.bind(location), 3000);
        // window.location.href = 'http://localhost/RSEnterP/ViewProduction.php';
        // window.location.href = ''+baseurl+'ViewProduction.php';

       return false;

     }else if( html == "error"){
       objs.alertPop('Something went wrong');
       return false;

     }else if( html == "Insecure"){
         objs.alertPop('Insecure Origin!');
       return false;

     }else{}

     objs.alertPop(html);
     console.log(html);
   }
     });
      return false;
   });



// Duty Hours

$('#submit_dutyHours').click(function () {

  var txtdutyhours = $('#duty_hours').val();  

  if( txtdutyhours == ''){

      objs.alertPop('Please Enter Duty Hours');
      return false;

  }

var dataDutyHours = $('#dutyhoursfrm').serialize();

 var data = 'r=add_dutyhours' + '&dataDutyHours=' + dataDutyHours;
 //alert(data);
     $.ajax({
       type:"post",
       cache:false,
       url:bridge,
       data:data,    // multiple data sent using ajax
   statusCode: {
              404: function() {
                  alert("page not found");
              }
       },
   beforeSend: function() {
           $('#submit_dutyHours').buttonLoader('start');

          },
       success: function(html) {
      //alert(html);
      //console.log(html);
     $('#submit_dutyHours').buttonLoader('stop');


     if( html == "success"){
       objs.alertPop('Duty Hours Successfully Updated');
       setTimeout(location.reload.bind(location), 3000);
        // window.location.href = 'http://localhost/RSEnterP/ViewProduction.php';
        // window.location.href = ''+baseurl+'ViewProduction.php';

       return false;

     }else if( html == "error"){
       objs.alertPop('Something went wrong');
       return false;

     }else if( html == "Insecure"){
         objs.alertPop('Insecure Origin!');
       return false;

     }else{}

     objs.alertPop(html);
     console.log(html);
   }
     });
      return false;
   });


// Export Documents Validation

$('#btnExport').click(function () {

    var txtdepartment = $("#txtdepartment option:selected" ).val();
    var txtdoctype = $("#txtdoctype option:selected" ).val();
    var txtmonth = $("#txtmonth option:selected" ).val();
    var txtyear = $("#txtyear option:selected" ).val();
   
     

  if( txtdepartment == '0'){

      objs.alertPop('Please Select Department');
      return false;

  }

  if( txtdoctype == '0'){

      objs.alertPop('Please Select Document Type');
      return false;

  }

  if( txtmonth == '0'){

      objs.alertPop('Please Select Month');
      return false;

  }

  if( txtyear == '0'){

      objs.alertPop('Please Select Year');
      return false;

  }

   
   });



//Add Employer L.W.F Amount

$('#submit_emprlwf').click(function () {

  var txtemprlwf = $('#empr_lwf').val();  

  if( txtemprlwf == ''){

      objs.alertPop('Please Enter Employer LWF Amount');
      return false;

  }

var dataEmprlwf = $('#emprlwffrm').serialize();

 var data = 'r=add_emprlwf' + '&dataEmprlwf=' + dataEmprlwf;
 //alert(data);
     $.ajax({
       type:"post",
       cache:false,
       url:bridge,
       data:data,    // multiple data sent using ajax
   statusCode: {
              404: function() {
                  alert("page not found");
              }
       },
   beforeSend: function() {
           $('#submit_emprlwf').buttonLoader('start');

          },
       success: function(html) {
      //alert(html);
      //console.log(html);
     $('#submit_emprlwf').buttonLoader('stop');


     if( html == "success"){
       objs.alertPop('Employer LWF Amount Successfully Updated');

        // window.location.href = 'http://localhost/RSEnterP/ViewProduction.php';
        // window.location.href = ''+baseurl+'ViewProduction.php';

       return false;

     }else if( html == "error"){
       objs.alertPop('Something went wrong');
       return false;

     }else if( html == "Insecure"){
         objs.alertPop('Insecure Origin!');
       return false;

     }else{}

     objs.alertPop(html);
     console.log(html);
   }
     });
      return false;
   });


// Add Employee L.W.F Amount

$('#submit_emplwf').click(function () {

  var txtemplwf = $('#emp_lwf').val();  

  if( txtemplwf == ''){

      objs.alertPop('Please Enter Employee LWF Amount');
      return false;

  }

var dataEmplwf = $('#emplwffrm').serialize();

 var data = 'r=add_emplwf' + '&dataEmplwf=' + dataEmplwf;
 //alert(data);
     $.ajax({
       type:"post",
       cache:false,
       url:bridge,
       data:data,    // multiple data sent using ajax
   statusCode: {
              404: function() {
                  alert("page not found");
              }
       },
   beforeSend: function() {
           $('#submit_emplwf').buttonLoader('start');

          },
       success: function(html) {
      //alert(html);
      //console.log(html);
     $('#submit_emplwf').buttonLoader('stop');


     if( html == "success"){
       objs.alertPop('Employee LWF Amount Successfully Updated');

        // window.location.href = 'http://localhost/RSEnterP/ViewProduction.php';
        // window.location.href = ''+baseurl+'ViewProduction.php';

       return false;

     }else if( html == "error"){
       objs.alertPop('Something went wrong');
       return false;

     }else if( html == "Insecure"){
         objs.alertPop('Insecure Origin!');
       return false;

     }else{}

     objs.alertPop(html);
     console.log(html);
   }
     });
      return false;
   });



/********************************Designation Starts*******************************************/
               
            
 function fetch_data(){
  var data = 'r=fetch_designation';
           $.ajax({
                url:bridge,
                method:"POST",
                cache:false,
                data:data, 
                success:function(data){
                  // alert(data);
                  //console.log(html);
                     $('#live_data').html(data);
                }
        });

      }     
       fetch_data();

      $(document).on('click', '#btn_add', function(){
       // alert();
           var designation_id = $('#designation_id').text();
           var designation_title = $('#designation_title').text();
           if(designation_id == '')
           {
                objs.alertPop('Define Designation Code');
                return false;
           }
           if(designation_title == '')
           {
                objs.alertPop('Enter Designation Title');
                return false;
           }

           var data = 'r=insert_designation' + '&designation_id=' + designation_id + '&designation_title=' + designation_title;
           //alert(data);
           $.ajax({
                url:bridge,
                method:"POST",
                cache:false,
                data:data, 
                success:function(html)
                {
                     //alert(html);
                      if( html == "success"){
                       objs.alertPop('Designation Successfully Added');
                       fetch_data();
                       return false;
                     }else if( html == "error"){
                       objs.alertPop('Something went wrong');
                       return false;

                     }
                }
           })
      });      


      function edit_data(id, text, column_name)
      {
        var data = 'r=edit_designation' + '&id=' + id + '&text=' + text + '&column_name=' + column_name;
       // alert(data);
           $.ajax({
                url:bridge,
                method:"POST",
                cache:false,
                data:data, 
                success:function(html){
                    // alert(html);
                       if( html == "success"){
                       objs.alertPop('Designation Successfully Updated');
                       fetch_data();
                       return false;
                     }else if( html == "error"){
                       objs.alertPop('Something went wrong');
                       return false;

                     }
                }
           });
      }
      $(document).on('blur', '.designation_id', function(){
        //alert();
           var id = $(this).data("id1");
           var designation_id = $(this).text();
           edit_data(id, designation_id, "designation_id");
      });
      $(document).on('blur', '.designation_title', function(){
        //alert();
           var id = $(this).data("id2");
           var designation_title = $(this).text();
           edit_data(id, designation_title, "designation_title");
      });

       $(document).on('click', '.btn_delete', function(){
           var id=$(this).data("id3");
           if(confirm("Are you sure you want to delete this?"))
           {
             var data = 'r=delete_designation' + '&id=' + id;
             //alert(data);
                $.ajax({
                      url:bridge,
                      method:"POST",
                      cache:false,
                      data:data, 
                     success:function(html){
                          //alert(html);
                    if( html == "success"){
                       objs.alertPop('Deleted Successfully');
                       fetch_data();
                       return false;
                     }else if( html == "error"){
                       objs.alertPop('Something went wrong');
                        fetch_data();
                       return false;

                     }
                         
                     }
                });
           }
      });

/********************************Designation Ends*******************************************/

/********************************Zone Starts*******************************************/

function fetch_zone(){
  var data = 'r=fetch_zone';
           $.ajax({
                url:bridge,
                method:"POST",
                cache:false,
                data:data, 
                success:function(data){
                  // alert(data);
                  //console.log(html);
                     $('#live_data_zone').html(data);
                }
        });

      }     
       fetch_zone();


  $(document).on('click', '#btn_add_zone', function(){
       // alert();
           var zone_id = $('#zone_id').text();
           var zone_title = $('#zone_title').text();
           if(zone_id == '')
           {
                objs.alertPop('Define Zone Code');
                return false;
           }
           if(zone_title == '')
           {
                objs.alertPop('Enter Zone Title');
                return false;
           }

           var data = 'r=insert_zone' + '&zone_id=' + zone_id + '&zone_title=' + zone_title;
           //alert(data);
           $.ajax({
                url:bridge,
                method:"POST",
                cache:false,
                data:data, 
                success:function(html)
                {
                     //alert(html);
                      if( html == "success"){
                       objs.alertPop('Zone Successfully Added');
                       fetch_zone();
                       return false;
                     }else if( html == "error"){
                       objs.alertPop('Something went wrong');
                       return false;

                     }
                }
           })
      });           

 function edit_zone(id, text, column_name)
      {
        var data = 'r=edit_zone' + '&z_id=' + id + '&text=' + text + '&column_name=' + column_name;
       // alert(data);
           $.ajax({
                url:bridge,
                method:"POST",
                cache:false,
                data:data, 
                success:function(html){
                    // alert(html);
                       if( html == "success"){
                       objs.alertPop('Zone Successfully Updated');
                       fetch_zone();
                       return false;
                     }else if( html == "error"){
                       objs.alertPop('Something went wrong');
                       return false;

                     }
                }
           });
      }
      $(document).on('blur', '.zone_id', function(){
        //alert();
           var id = $(this).data("z_id_1");
           var zone_id = $(this).text();
           edit_zone(id, zone_id, "zone_id");
      });
      $(document).on('blur', '.zone_title', function(){
        //alert();
           var id = $(this).data("z_id_2");
           var zone_title = $(this).text();
           edit_zone(id, zone_title, "zone_title");
      });

       $(document).on('click', '.btn_delete_zone', function(){
           var id=$(this).data("z_id_3");
           if(confirm("Are you sure you want to delete this?"))
           {
             var data = 'r=delete_zone' + '&z_id=' + id;
             //alert(data);
                $.ajax({
                      url:bridge,
                      method:"POST",
                      cache:false,
                      data:data, 
                     success:function(html){
                          //alert(html);
                    if( html == "success"){
                       objs.alertPop('Deleted Successfully');
                       fetch_zone();
                       return false;
                     }else if( html == "error"){
                       objs.alertPop('Something went wrong');
                        fetch_zone();
                       return false;

                     }
                         
                     }
                });
           }
      });



/********************************Zone Ends*******************************************/

/********************************Unit Starts*******************************************/

 function fetch_unit(){
  var data = 'r=fetch_unit';
           $.ajax({
                url:bridge,
                method:"POST",
                cache:false,
                data:data, 
                success:function(data){
                  // alert(data);
                  //console.log(html);
                     $('#live_data_unit').html(data);
                }
        });

      }     
       fetch_unit();      

  $(document).on('click', '#btn_add_unit', function(){
       // alert();
           var unit_code = $('#unit_code').text();
           var unit_name = $('#unit_name').text();
           if(unit_code == '')
           {
                objs.alertPop('Define Unit Code');
                return false;
           }
           if(unit_name == '')
           {
                objs.alertPop('Enter Unit Name');
                return false;
           }

           var data = 'r=insert_unit' + '&unit_code=' + unit_code + '&unit_name=' + unit_name;
           //alert(data);
           $.ajax({
                url:bridge,
                method:"POST",
                cache:false,
                data:data, 
                success:function(html)
                {
                     //alert(html);
                      if( html == "success"){
                       objs.alertPop('Unit Successfully Added');
                       fetch_unit();
                       return false;
                     }else if( html == "error"){
                       objs.alertPop('Something went wrong');
                       return false;

                     }
                }
           })
      });           

 function edit_unit(id, text, column_name)
      {
        var data = 'r=edit_unit' + '&unit_id=' + id + '&text=' + text + '&column_name=' + column_name;
       // alert(data);
           $.ajax({
                url:bridge,
                method:"POST",
                cache:false,
                data:data, 
                success:function(html){
                    // alert(html);
                       if( html == "success"){
                       objs.alertPop('Unit Successfully Updated');
                       fetch_unit();
                       return false;
                     }else if( html == "error"){
                       objs.alertPop('Something went wrong');
                       return false;

                     }
                }
           });
      }
      $(document).on('blur', '.unit_code', function(){
        //alert();
           var id = $(this).data("u_id_1");
           var unit_code = $(this).text();
           edit_unit(id, unit_code, "unit_code");
      });
      $(document).on('blur', '.unit_name', function(){
        //alert();
           var id = $(this).data("u_id_2");
           var unit_name = $(this).text();
           edit_unit(id, unit_name, "unit_name");
      });

       $(document).on('click', '.btn_delete_unit', function(){
           var id=$(this).data("u_id_3");
           if(confirm("Are you sure you want to delete this?"))
           {
             var data = 'r=delete_unit' + '&unit_id=' + id;
             //alert(data);
                $.ajax({
                      url:bridge,
                      method:"POST",
                      cache:false,
                      data:data, 
                     success:function(html){
                          //alert(html);
                    if( html == "success"){
                       objs.alertPop('Deleted Successfully');
                       fetch_unit();
                       return false;
                     }else if( html == "error"){
                       objs.alertPop('Something went wrong');
                        fetch_unit();
                       return false;

                     }
                         
                     }
                });
           }
      });


/********************************Unit Ends*******************************************/

/********************************Department Starts*******************************************/

function fetch_department(){
  var data = 'r=fetch_department';
           $.ajax({
                url:bridge,
                method:"POST",
                cache:false,
                data:data, 
                success:function(data){
                  // alert(data);
                  //console.log(html);
                     $('#live_data_department').html(data);
                }
        });

      }     
       fetch_department();

  $(document).on('click', '#btn_add_department', function(){
       // alert();
           var department_id = $('#department_id').text();
           var department_title = $('#department_title').text();
           if(department_id == '')
           {
                objs.alertPop('Define Department Code');
                return false;
           }
           if(department_title == '')
           {
                objs.alertPop('Enter Department Title');
                return false;
           }

           var data = 'r=insert_department' + '&department_id=' + department_id + '&department_title=' + department_title;
           //alert(data);
           $.ajax({
                url:bridge,
                method:"POST",
                cache:false,
                data:data, 
                success:function(html)
                {
                     //alert(html);
                      if( html == "success"){
                       objs.alertPop('Department Successfully Added');
                       fetch_department();
                       return false;
                     }else if( html == "error"){
                       objs.alertPop('Something went wrong');
                       return false;

                     }
                }
           })
      });         

 function edit_department(id, text, column_name)
      {
        var data = 'r=edit_department' + '&d_id=' + id + '&text=' + text + '&column_name=' + column_name;
        //alert(data);
           $.ajax({
                url:bridge,
                method:"POST",
                cache:false,
                data:data, 
                success:function(html){
                     //alert(html);
                       if( html == "success"){
                       objs.alertPop('Department Successfully Updated');
                       fetch_department();
                       return false;
                     }else if( html == "error"){
                       objs.alertPop('Something went wrong');
                       return false;

                     }
                }
           });
      }
      $(document).on('blur', '.department_id', function(){
        //alert();
           var id = $(this).data("d_id_1");
           var department_id = $(this).text();
           edit_department(id, department_id, "department_id");
      });
      $(document).on('blur', '.department_title', function(){
        //alert();
           var id = $(this).data("d_id_2");
           var department_title = $(this).text();
           edit_department(id, department_title, "department_title");
      });

       $(document).on('click', '.btn_delete_department', function(){
           var id=$(this).data("d_id_3");
           if(confirm("Are you sure you want to delete this?"))
           {
             var data = 'r=delete_department' + '&d_id=' + id;
             //alert(data);
                $.ajax({
                      url:bridge,
                      method:"POST",
                      cache:false,
                      data:data, 
                     success:function(html){
                          //alert(html);
                    if( html == "success"){
                       objs.alertPop('Deleted Successfully');
                       fetch_department();
                       return false;
                     }else if( html == "error"){
                       objs.alertPop('Something went wrong');
                        fetch_department();
                       return false;

                     }
                         
                     }
                });
           }
      });



/********************************Department Ends*******************************************/


//Session Unit

$('#txtsesunit').on('change', function() {
  
  var txtsesunit = $("#txtsesunit option:selected" ).val();
 // alert(txtsesunit);
  
           if(confirm("Are you sure you want to change running unit session?"))
           {
             var data = 'r=update_sesunit' + '&unit_code=' + txtsesunit;
             //alert(data);
                $.ajax({
                      url:bridge,
                      method:"POST",
                      cache:false,
                      data:data, 
                     success:function(html){
                         // alert(html);
                    if( html == "success"){
                       objs.alertPop('Session Changed Successfully');
                        setTimeout(location.reload.bind(location), 3000);
                       return false;
                     }else if( html == "error"){
                       objs.alertPop('Something went wrong');
                        
                       return false;

                     }
                         
                     }
                });
           }
});

//Session Month


$('#txtsesmonth').on('change', function() {
  
  var txtsesmonth = $("#txtsesmonth option:selected" ).val();
 
  
           if(confirm("Are you sure you want to change running month session?"))
           {
             var data = 'r=update_sesmonth' + '&txtsesmonth=' + txtsesmonth;
            // alert(data);
                $.ajax({
                      url:bridge,
                      method:"POST",
                      cache:false,
                      data:data, 
                     success:function(html){
                          //alert(html);
                    if( html == "success"){
                       objs.alertPop('Month Changed Successfully');
                        setTimeout(location.reload.bind(location), 3000);
                       return false;
                     }else if( html == "error"){
                       objs.alertPop('Something went wrong');
                        
                       return false;

                     }
                         
                     }
                });
           }
});

//Session Year


$('#txtsesyear').on('change', function() {
  
  var txtsesyear = $("#txtsesyear option:selected" ).val();
  
  
           if(confirm("Are you sure you want to change running month session?"))
           {
             var data = 'r=update_sesyear' + '&txtsesyear=' + txtsesyear;
             //alert(data);
                $.ajax({
                      url:bridge,
                      method:"POST",
                      cache:false,
                      data:data, 
                     success:function(html){
                         //alert(html);
                    if( html == "success"){
                       objs.alertPop('Year Changed Successfully');
                       setTimeout(location.reload.bind(location), 3000);
                       return false;
                     }else if( html == "error"){
                       objs.alertPop('Something went wrong');
                        
                       return false;

                     }
                         
                     }
                });
           }
});


// Add/Edit Unit

$('#BtnAddUnit').click(function () {

      
        var txtunitcode = $('#txtunitcode').val();

        var txtunitname = $('#txtunitname').val();

        var txtunitzone = $("#txtunitzone option:selected" ).val();

        var txtunitaddress = $('#txtunitaddress').val();

        var txtunitcontact = $('#txtunitcontact').val();


    if( txtunitcode == ''){
      objs.alertPop('Please Enter Unit Code');
     $('#txtunitcode').focus();
      return false;
    }

     str = txtunitcode.toString(),
        len = str.length;


        if(len != 4){
           objs.alertPop('Please Enter Valid Unit Code');
          $('#txtunitcode').focus();
          return false;
        }
   

    if( txtunitname == ''){
        objs.alertPop('Please Enter Unit Name');
     $('#txtunitname').focus();
      return false;
    }


    if( txtunitzone == '0'){
     
      objs.alertPop('Please Select Zone');
     $('#txtunitzone').focus();
      return false;
    }


    if( txtunitaddress == ''){
        objs.alertPop('Please Enter Unit Address');
     $('#txtunitaddress').focus();
      return false;
    }
    
    if( txtunitcontact == ''){
   
      objs.alertPop('Please Enter  Contact');
     $('#txtunitcontact').focus();
      return false;
    }

     str = txtunitcontact.toString(),
        len = str.length;


        if(len != 10){
           objs.alertPop('Please Enter Valid Contact');
          $('#txtunitcontact').focus();
          return false;
        }


  
   

  var dataUnit = $('#frmrsUnit').serialize();

  var data = 'r=add_Unit' + '&dataUnit=' + dataUnit;
 // alert(data);
      $.ajax({
        type:"post",
        cache:false,
        url:bridge,
        data:data,    // multiple data sent using ajax
    statusCode: {
               404: function() {
                   alert("page not found");
               }
        },
    beforeSend: function() {
            $('#BtnAddUnit').buttonLoader('start');

           },
        success: function(html) {
       //alert(html);
      // console.log(html);
       //return false;
      $('#BtnAddUnit').buttonLoader('stop');

      if( html == "success"){
          objs.alertPop('Unit Successfully Inserted');
          $( '#frmrsUnit' ).each(function(){
        this.reset();
        window.location.href = ''+baseurl+'viewUnit.php';

        });

        return false;

      }else if( html == "successUnit"){
        objs.alertPop('Unit Successfully Updated');
         window.location.href = ''+baseurl+'viewUnit.php';
         return false;

      }else if( html == "error"){
        objs.alertPop('Something went wrong');
        return false;

      }else if(html == "AlreadyUnitCode"){
        objs.alertPop('This Unit Code already exist');
        return false;

      }else if( html == "Insecure"){
          objs.alertPop('Insecure Origin!');
        return false;

      }else{}

      objs.alertPop(html);
      console.log(html);
    }
      });
       return false;
    });


// Add/Edit User

$('#BtnAddUser').click(function () {

      
        var txtusername = $('#txtusername').val();

        var txtuseremail = $('#txtuseremail').val();

        var HDNid_user = $('#HDNid_user').val();

        var txtpassword = $('#txtpassword').val();



if(HDNid_user == ''){


  
   if( txtusername == ''){
      objs.alertPop('Please Enter Username');
     $('#txtusername').focus();
      return false;
    }

     if( txtuseremail == ''){
      objs.alertPop('Please Enter Email');
     $('#txtuseremail').focus();
      return false;
    }

    if( txtuseremail != ''){
       var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
       if(!document.getElementById('txtuseremail').value.match(mailformat))
       { $('#txtuseremail').focus();
       objs.alertPop('Invalid Email id');
         return false; }

       }

    if( txtpassword == ''){
      objs.alertPop('Please Enter Password');
     $('#txtpassword').focus();
      return false;
    }

     str = txtpassword.toString(),
        len = str.length;


        if(len < 8){
           objs.alertPop('Password should be minimum 8 characters');
          $('#txtpassword').focus();
          return false;
        }

     }else{

      if( txtusername == ''){
        objs.alertPop('Please Enter Username');
       $('#txtusername').focus();
        return false;
      }

       if( txtuseremail == ''){
        objs.alertPop('Please Enter Email');
       $('#txtuseremail').focus();
        return false;
      }

     if( txtuseremail != ''){
       var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
       if(!document.getElementById('txtuseremail').value.match(mailformat))
       { $('#txtuseremail').focus();
       objs.alertPop('Invalid Email id');
         return false; }

       }


     }   
   

  var dataUser = $('#frmaddUser').serialize();

  var data = 'r=add_User' + '&dataUser=' + dataUser;
  //alert(data);
      $.ajax({
        type:"post",
        cache:false,
        url:bridge,
        data:data,    // multiple data sent using ajax
    statusCode: {
               404: function() {
                   alert("page not found");
               }
        },
    beforeSend: function() {
            $('#BtnAddUser').buttonLoader('start');

           },
        success: function(html) {
       //alert(html);
       //console.log(html);
       
      $('#BtnAddUser').buttonLoader('stop');

      if( html == "success"){
          objs.alertPop('User Successfully Inserted');
          $( '#frmaddUser' ).each(function(){
        this.reset();
        window.location.href = ''+baseurl+'viewAssignUser.php';

        });

        return false;

      }else if( html == "successUser"){
        objs.alertPop('User Successfully Updated');
         window.location.href = ''+baseurl+'viewAssignUser.php';
         return false;

      }else if( html == "error"){
        objs.alertPop('Something went wrong');
        return false;

      }else if(html == "AlreadyUsername"){
        objs.alertPop('This Username taken already');
        return false;

       }else if(html == "AlreadyEmail"){
        objs.alertPop('This Email taken already');
        return false;  

      }else if( html == "Insecure"){
          objs.alertPop('Insecure Origin!');
        return false;

      }else{}

      objs.alertPop(html);
      console.log(html);
    }
      });
       return false;
    });



function CheckRunningSession(){

    var data = 'r=check_running_session';
  //alert(data);
      $.ajax({
        type:"post",
        cache:false,
        url:bridge,
        data:data,    
    statusCode: {
               404: function() {
                   alert("page not found");
               }
        },
    beforeSend: function() {
            

           },
        success: function(html) {
       //alert(html);
       //console.log(html);

       if(html == 404){
         objs.confirmPop('Welcome! Please Start a session first. If you have already please ignore this.');
        //window.location.href = ''+baseurl+'sessionUnit.php';
       }

    }
      });

}
CheckRunningSession();

function CheckRunningSessionWorkingDays(){

    var data = 'r=check_running_session_days';
  //alert(data);
      $.ajax({
        type:"post",
        cache:false,
        url:bridge,
        data:data,    
    statusCode: {
               404: function() {
                   alert("page not found");
               }
        },
    beforeSend: function() {
            

           },
        success: function(html) {
       //alert(html);
       //console.log(html);

       if(html == 404){
         objs.confirmPop('Welcome! Please add working days for your respective session under "Setting Menu". If you have already please ignore this.');
        //window.location.href = ''+baseurl+'sessionUnit.php';
       }

    }
      });

}
CheckRunningSessionWorkingDays();

// Aadhaar Tracking

 $(".pf_track").click(function(){

   var current_element = $(this);
   var doc_type = $(current_element).attr('data');
   var emp_code = $(current_element).attr('data-id');

   var data = 'r=aadhaarTrack' + '&doc_type=' + escape(doc_type) + '&emp_code=' + escape(emp_code);

   $.ajax({
     type: "POST",
     url: bridge,
     data: data,
     success: function(html){
      // alert(html);

   }
  });
   
  // return false;
});


 // Employee Tracking Modal

$(".EmployeeTrackingDetails").click(function(){

    var emp_code = $(this).attr('data-id'); 

    $("#in_out" ).val('0');
    $('#emp_tracking_date').val('');
    
    $('#TrackingHDNemp_code').val(emp_code);
    $('#TrackingModal').modal('show');

    fetch_in_out(emp_code);

});

// Employee Add/Edit IN/OUT Date

 $('#BtnAddTrackingDetails').click(function () {
      
       // var emp_code = $('#HDNemp_code').val();
        var in_out = $("#in_out option:selected" ).val();
        var emp_tracking_date = $('#emp_tracking_date').val();


    if( in_out == '0'){
        objs.alertPop('Please Select Tracking Method');
     $('#in_out').focus();
      return false;
    }

     if( emp_tracking_date == ''){
        objs.alertPop('Please Enter Tracking Date');
     $('#emp_tracking_date').focus();
      return false;
    }

  var dataTrackingForm = $('#TrackingForm').serialize();

  var data = 'r=add_TrackingDetails' + '&dataTrackingForm=' + dataTrackingForm;
  //alert(data);
      $.ajax({
        type:"post",
        cache:false,
        url:bridge,
        data:data,    // multiple data sent using ajax
    statusCode: {
               404: function() {
                   alert("page not found");
               }
        },
    beforeSend: function() {
            $('#BtnAddTrackingDetails').buttonLoader('start');

           },
        success: function(html) {
          fetch_in_out(emp_code);
       //  alert(html);
       //  console.log(html);
       // return false;
      $('#BtnAddTrackingDetails').buttonLoader('stop');

      if( html == "successUpdate"){

          objs.alertPop('Tracking Details Successfully Updated');
          setTimeout(location.reload.bind(location), 3000);
         return false;

        }else if( html == "successInsert"){

        objs.alertPop('Tracking Details Successfully Inserted');
        setTimeout(location.reload.bind(location), 3000);
        return false;


      }else if( html == "error"){
        objs.alertPop('Something went wrong');
        return false;

      }else{
        objs.alertPop(html);
         return false; 
       }

      objs.alertPop(html);
      console.log(html);
    }
      });
       return false;
    });


function fetch_in_out(emp_code){

  var data = 'r=fetch_in_out' + '&emp_code=' + emp_code;
           $.ajax({
                url:bridge,
                method:"POST",
                cache:false,
                data:data, 
                success:function(data){
                  // alert(data);
                  //console.log(html);
                $('#live_data_in_out').html(data);
                }
        });

      }     
      
$('#upload_csv').on("submit", function(e){  
                e.preventDefault(); //form will not submitted  
                $.ajax({  
                     url:"push_csv.php",  
                     method:"POST",  
                     data:new FormData(this),  
                     contentType:false,          // The content type used when sending data to the server.  
                     cache:false,                // To unable request pages to be cached  
                     processData:false,          // To send DOMDocument or non processed data file it is set to false  
                     statusCode: {
                                   404: function() {
                                       alert("page not found");
                                   }
                            },
                     beforeSend: function() {
                                $('#uploadBtn').buttonLoader('start');

                               },
                     success: function(html) {
                             
                      // $('#uploadBtn').buttonLoader('stop');

                      //     if(html == "Error1")  
                      //     {   
                      //       alert();
                      //       $('#msg').html("Invalid File").show().delay(2800).fadeOut();    
                      //     }  
                      //     else if(html == "Error2")  
                      //     {  
                      //       alert('Please Select File');
                      //       $('#msg').html("Please Select File").show().delay(2800).fadeOut();
                      //       //$('.error_msg').html('Please Enter Security code').show().delay(2800).fadeOut();
                      //     }  
                      //     else if(html == "Error3")  
                      //     {  
                      //       $('#msg').html("Query Failed").show().delay(2800).fadeOut();
                      //     }  
                      //     else if(html == "Success") 
                      //     {  
                      //       $('#msg').html("Successfully Uploaded").show().delay(2800).fadeOut(); 
                      //     }  

                          objs.alertPop(html);
                          console.log(html);
                        } 
                })  
           });  

$("#default_calc").change(function(){  

  //var status = this.checked; 

  if($(this).is(':checked')){
    status = 1;
  }else{
    status = 0;
  }

  var data = 'r=activate_setting' + '&status=' + status;
  //alert(data);
      $.ajax({
        type:"post",
        cache:false,
        url:bridge,
        data:data,    
    statusCode: {
               404: function() {
                   alert("page not found");
               }
        },
    beforeSend: function() {
     $("#settingloaderIcon").show();
     },
    success: function(html) {    
    //alert(html);
    console.log(html);  
     $("#settingloaderIcon").hide();

      if( html == "1"){

        objs.alertPop('Setting Activated');
        $("#default_calc").attr('checked', true);
        $("#calc_month_days").prop("readonly", true); 
        $("#submit_calcMonthDays").prop("disabled", true);
        setTimeout(location.reload.bind(location), 3000);  
         return false;

        }else if( html == "0"){

        objs.alertPop('Setting Deactivated');
        $("#default_calc").attr('checked', false);
        $("#calc_month_days").prop("readonly", false); 
        $("#submit_calcMonthDays").prop("disabled", false); 
        setTimeout(location.reload.bind(location), 3000);
        return false;

      }else if( html == "error"){
        objs.alertPop('Something went wrong');
        return false;

      }else{
        objs.alertPop(html);
         return false; 
       }

      objs.alertPop(html);
      console.log(html);
    }
      });
    });


// Setting Insert/Update Days

 $('#submit_calcMonthDays').click(function () {

        var calc_month_days = $('#calc_month_days').val();

    if( calc_month_days == ''){
        objs.alertPop('Please Enter Days For Calculation');
     $('#calc_month_days').focus();
      return false;
    }

  var dataCalculation = $('#calcMonthDaysfrm').serialize();

  var data = 'r=add_CalcDays' + '&dataCalculation=' + dataCalculation;
  //alert(data);
      $.ajax({
        type:"post",
        cache:false,
        url:bridge,
        data:data,    // multiple data sent using ajax
    statusCode: {
               404: function() {
                   alert("page not found");
               }
        },
    beforeSend: function() {
            $('#submit_calcMonthDays').buttonLoader('start');

           },
        success: function(html) {
        // alert(html);
        // console.log(html);
       //return false;
      $('#submit_calcMonthDays').buttonLoader('stop');

      if( html == "successUpdate"){

          objs.alertPop('Calculation Days Successfully Updated');
          setTimeout(location.reload.bind(location), 3000);
         return false;

        }else if( html == "successInsert"){

        objs.alertPop('Calculation Days Successfully Inserted');
        setTimeout(location.reload.bind(location), 3000);
        return false;


      }else if( html == "error"){
        objs.alertPop('Something went wrong');
        return false;

      }else{
        objs.alertPop(html);
         return false; 
       }

      objs.alertPop(html);
      console.log(html);
    }
      });
       return false;
    });












function daysInThisMonth() {
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
}




	
/**************End of the document.ready***************/

});

  function blockSpecialChar(e){
        var k;
        document.all ? k = e.keyCode : k = e.which;
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
        }

   function onlyAlphabets(e, t) {
            try {
                if (window.event) {
                    var charCode = window.event.keyCode;
                }
                else if (e) {
                    var charCode = e.which;
                }
                else { return true; }
                if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || (charCode == 32))
                    return true;
                else
                    return false;
            }
            catch (err) {
                alert(err.Description);
            }
        }      

 function isNumberKey(evt)
      {
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;

         return true;
      }

  function Calc_Validate(e) {
          var charCode;
            if (e.keyCode > 0) {
                charCode = e.which || e.keyCode;
            }
            else if (typeof (e.charCode) != "undefined") {
                charCode = e.which || e.keyCode;
            }
            if (charCode == 46)
                return true
            if (charCode > 31 && (charCode < 48 || charCode > 57))
                return false;
            return true;

    //  return (!(event.keyCode >= 65) || event.keyCode == 110 || event.keyCode == 190);
      // return false;
        }     

    function addressFilter(e){
        var k;
        document.all ? k = e.keyCode : k = e.which;
        return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 44 && k <= 57));
        }