 var objs = {
       
		 getUrl : function(page){
		 		 var URLHD = location.protocol + "//" + document.domain + ":7777/" + location.pathname.split('/')[1] + "/";
 				 return URLHD + page;
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
     }
};


$(document).ready(function() {

   $('#register').click(function () {

        var first_name = $('#first_name').val();
        var last_name = $('#last_name').val();
        var email = $('#email').val();
        var username = $('#username').val();
        var password = $('#password').val();
        var csrf = $('#csrf').val();

     if( first_name == ''){
       $('.msg').html('Please Enter Your First Name').show().delay(2800).fadeOut();
       $('#first_name').focus();
       return false;
    }
    if( last_name == ''){
       $('.msg').html('Please Enter Your Last Name').show().delay(2800).fadeOut();
       $('#last_name').focus();
        return false;
    }    

    if( email == ''){
       $('.msg').html('Please Enter Your Email').show().delay(2800).fadeOut();
       $('#email').focus();
       return false;
    }
     if( email != ''){
       var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
       if(!document.getElementById('email').value.match(mailformat))
       { $('#email').focus();
       $('.msg').html('Please Enter Valid Email').show().delay(2800).fadeOut();
       return false; }}

    if( username == ''){
       $('.msg').html('Please Enter The Username').show().delay(2800).fadeOut();
       $('#username').focus();
       return false;
    }
    if( password == ''){
       $('.msg').html('Please Enter The Password').show().delay(2800).fadeOut();
       $('#password').focus();
        return false;
    }
   
      var data = 'post=register' + '&first_name=' + escape(first_name) + '&last_name=' + escape(last_name) + '&email=' + escape(email) + '&username=' + escape(username) + '&password=' + escape(password) + '&csrf=' + escape(csrf); 
      $.ajax({
        type:"post",
        cache:false,
        url:baseUrl,
        data:data, 
        dataType: "json",   
        beforeSend: function() {
            $('#register').buttonLoader('start');
            
           },
        success: function(data) {
          
        $('#register').buttonLoader('stop');
     
        if(data == 'success'){
          $('.msg').html('Registration Successfull.').show().delay(2000).fadeOut();
          $('#first_name').val('');
          $('#last_name').val('');
          $('#email').val('');
          $('#username').val('');
          $('#password').val('');
        }else if(data == 'usernameExists'){
          $('.msg').html('Username already exists').show().delay(2000).fadeOut();
          $('#username').val('');
        }else if(data == 'errorFetch'){
          $('.msg').html('Error in part registration').show().delay(2000).fadeOut();
        }else if(data == 'emailExists'){
          $('.msg').html('Email already exists').show().delay(2000).fadeOut();    
          $('#email').val('');
        }else if(data == 'error'){
          $('.msg').html('Something Went Wrong!').show().delay(2000).fadeOut();
        }else if(data == 'emptyFields'){
          $('.msg').html('All fields are required!').show().delay(2000).fadeOut();
          $('#first_name').focus();
          $('#last_name').focus();
          $('#email').focus();
          $('#username').focus();
          $('#password').focus();
        }

      }

      });
      
      return false;
    });


   $('#recoverBtn').click(function () {

      var recover_email = $('#recover_email').val();

        if(recover_email == ''){
         $('.msg').html('Please Enter Your Email').show().delay(2800).fadeOut();
         $('#recover_email').focus();
         return false;
      }
       if(recover_email != ''){
         var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
         if(!document.getElementById('recover_email').value.match(mailformat))
         { $('#recover_email').focus();
         $('.msg').html('Please Enter Valid Email').show().delay(2800).fadeOut();
         return false; }}

         var dataRecover = $('#recoverForm').serialize();

         var data = 'post=recover' + '&dataRecover=' + dataRecover;
         
         $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          dataType: "json",   
          beforeSend: function() {
              $('#recoverBtn').buttonLoader('start');
              },
          success: function(data) {

              $('#recoverBtn').buttonLoader('stop');
              
                if(data == 'success'){
                  $('.msg').html('Details has been sent to your email!').show().delay(2000).fadeOut();
                  $('#email').val('');
                }else if(data == 'inactive'){
                  $('.msg').html('Sorry! We can not recover your account, please contact admin').show().delay(2000).fadeOut(); 
                }else if(data == 'emailNotExists'){
                  $('.msg').html('Sorry! Email not found').show().delay(2000).fadeOut();  
                }else if(data == 'emailFailed'){
                  $('.msg').html('Sorry! Failed Sending Email ').show().delay(2000).fadeOut();       
                }else if(data == 'error'){
                  $('.msg').html('Something Went Wrong!').show().delay(2000).fadeOut();
                }else if(data == 'emptyFields'){
                  $('.msg').html('All fields are required!').show().delay(2000).fadeOut();
                  $('#email').focus();
                }
              }

         });
         return false;
      });   

      $('#login').click(function (){
          var login_username = $('#login_username').val();
          var login_password = $('#login_password').val();
          var code = $('#code').val();
          var csrf = $('#csrf').val();
          var remember_me = $("#remember_me").prop('checked');
          
          if(login_username == ''){
            $('.msg').html('Please enter your username').show().delay(2000).fadeOut();
            $('#login_username').focus();
            return false;
          }

          if(login_password == ''){
            $('.msg').html('Please enter your password').show().delay(2000).fadeOut();
            $('#login_password').focus();
            return false;
          }

          if(code == ''){
            $('.msg').html('Please enter captcha').show().delay(2000).fadeOut();
            $('#code').focus();
            return false;
          }

         var data = 'post=login' + '&login_username=' + escape(login_username) + '&login_password=' + escape(login_password) + '&code=' + escape(code) + '&remember_me=' + escape(remember_me) + '&csrf=' + escape(csrf);

        $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          dataType: "json",   
          beforeSend: function() {
              $('#login').buttonLoader('start');
              },
          success: function(data) {

              $('#login').buttonLoader('stop');
              
                if(data == 'successAdmin'){
                  window.location.href = ''+baseUrlIndex+'index.php?g=admin&n=dashboard';
                }else if(data == 'successUser'){
                  window.location.href = ''+baseUrlIndex+'index.php?g=user&n=dashboard'; 
                }else if(data == 'successHR'){
                  window.location.href = ''+baseUrlIndex+'index.php?g=human_resources&n=dashboard'; 
                }else if(data == 'successTL'){
                  window.location.href = ''+baseUrlIndex+'index.php?g=team_leader&n=dashboard';  
                }else if(data == 'successMNGR'){
                  window.location.href = ''+baseUrlIndex+'index.php?g=manager&n=dashboard';    
                }else if(data == 'inactive'){
                  $('.msg').html('Sorry! Your account has been deactivated, please contact admin').show().delay(2000).fadeOut();
                  $('#login_username').focus();
                  $('#login_password').focus();
                  $('#code').focus();
                  change_captcha();
                }else if(data == 'invalid'){
                  $('.msg').html('Incorrect username or password').show().delay(2000).fadeOut();  
                  $('#login_username').val('');
                  $('#login_password').val('');    
                  $('#code').val('');  
                  $('#login_username').focus();
                  $('#login_password').focus();  
                  $('#code').focus(); 
                  change_captcha();
                 }else if(data == 'invalidCaptcha'){
                  $('.msg').html('Invalid Captcha').show().delay(2000).fadeOut();  
                  $('#code').val('');  
                  $('#code').focus(); 
                  change_captcha();  
                }else if(data == 'error'){
                  $('.msg').html('Something Went Wrong!').show().delay(2000).fadeOut();
                  $('#login_username').val('');
                  $('#login_password').val(''); 
                  $('#code').val('');  
                  $('#login_username').focus();
                  $('#login_password').focus();
                  $('#code').focus();     
                }else if(data == 'emptyFields'){
                  $('.msg').html('All fields are required!').show().delay(2000).fadeOut();
                  $('#login_username').focus();
                  $('#login_password').focus();
                  $('#code').focus();   
                  change_captcha();
                }
              }
         });
         return false;
      });

      $('#setLockScreen').click(function() {
        var data = 'post=setLockScreen' + '&lockScreenStatus=' + 'True';
        
        $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          dataType: "json",   
          beforeSend: function() {
              
              },
          success: function(data) {
              
                if(data == 'success'){
                  window.location.href = ''+baseUrlIndex+'index.php?g=home&n=lockscreen';
                }else if(data == 'error'){
                  alert('Something went wrong!');
                  return false;  
                }
              }
         });
         return false;
      });

      $('img#refresh').click(function() {  
          change_captcha();
       });

      function change_captcha() {
        document.getElementById('captcha').src="../core/lib/include/get_captcha.php";
       }

     $('#AddUserBtn').click(function() {

          $('#first_name').removeAttr("disabled");
          $('#last_name').removeAttr("disabled");
          $('#username').val('');
          $('#useremail').val('');
          $('#userpassword').val('');
          //$('#userpassword').removeAttr("disabled");
          $("#userlevel").val('0');
          $('#HDNUser_id').val('');

     });  

      $('#addUser').click(function() {

          var first_name = $('#first_name').val();
          var last_name = $('#last_name').val();
          var username = $('#username').val();
          var useremail = $('#useremail').val();
          var userpassword = $('#userpassword').val();
          var userlevel = $("#userlevel option:selected" ).val();
          var csrf = $('#csrf').val();
          var HDNUser_id = $('#HDNUser_id').val();
          
          if(HDNUser_id == ''){
          if(first_name == ''){
            $('.first_name_msg').html('Please enter first name').show().delay(2000).fadeOut();
            $('#first_name').focus();
            return false;
          }
          if(last_name == ''){
            $('.last_name_msg').html('Please enter last name').show().delay(2000).fadeOut();
            $('#last_name').focus();
            return false;
          }
         }
          if(username == ''){
            $('.username_msg').html('Please enter username').show().delay(2000).fadeOut();
            $('#username').focus();
            return false;
          }

          if(useremail == ''){
            $('.useremail_msg').html('Please enter email').show().delay(2000).fadeOut();
            $('#useremail').focus();
            return false;
          }

          if( useremail != ''){
           var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
           if(!document.getElementById('useremail').value.match(mailformat))
           { $('#useremail').focus();
           $('.useremail_msg').html('Please Enter Valid Email').show().delay(2800).fadeOut();
           return false; }}

          if(HDNUser_id == ''){
            if(userpassword == ''){
            $('.userpassword_msg').html('Please enter your password').show().delay(2000).fadeOut();
            $('#userpassword').focus();
            return false;
            }
          } 

          if(userlevel == '0'){
            $('.level_msg').html('Please select level').show().delay(2000).fadeOut();
            $('#userlevel').focus();
            return false;
          }

        var dataAddUser = $('#addUserModalForm').serialize();
        
        var data = 'post=add_user' + '&dataAddUser=' + dataAddUser;
        
        $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          dataType: "json",   
          beforeSend: function() {
              $('#addUser').buttonLoader('start');
              },
          success: function(data) {
            $('#addUser').buttonLoader('stop');
              
              if(data == 'success'){
                $('.msg').html('Registration Successfull.').show().delay(2000).fadeOut();
                $('#first_name').val('');
                $('#last_name').val('');
                $('#useremail').val('');
                $('#username').val('');
                $('#userpassword').val('');
                $('#userlevel').val('0');
                setTimeout(location.reload.bind(location), 3000);
              }else if(data == 'usernameExists'){
                $('.msg').html('Username already exists').show().delay(2000).fadeOut();
                $('#username').val('');
              }else if(data == 'emailExists'){
                $('.msg').html('Email already exists').show().delay(2000).fadeOut();    
                $('#useremail').val('');
              }else if(data == 'error'){
                $('.msg').html('Something Went Wrong!').show().delay(2000).fadeOut();
              }else if(data == 'errorFetch'){
                $('.msg').html('Error in part registration').show().delay(2000).fadeOut();  
              }else if(data == 'emptyFields'){
                $('.msg').html('All fields are required!').show().delay(2000).fadeOut();
                $('#useremail').focus();
                $('#username').focus();
                $('#userpassword').focus();
                $('#userlevel').focus();
              }else if(data == 'successUpdate'){
                $('.msg').html('Information updated successfully!').show().delay(2000).fadeOut();
                setTimeout(location.reload.bind(location), 3000);
              }else if(data == 'updateFailed'){
                $('.msg').html('OOps! Failed during updating!').show().delay(2000).fadeOut();
                setTimeout(location.reload.bind(location), 3000);
              }
              }
         });
         return false;
      });

// Status Active and Inactive of User

$(document).on('click','.user_status',function(){

 if(confirm("Are you sure you want to change the status of this User?")){
  
        var user_status = ($(this).hasClass("btn-success")) ? '1' : '0';
        var current_element = $(this);
        var user_id = $(current_element).attr('data');
        
        var data = 'post=Status_user' + '&user_id=' + escape(user_id) + '&user_status=' + escape(user_status);
    
       $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          dataType: "json",   
          beforeSend: function() {
              $('user_status_'+user_id).buttonLoader('start');
              },
          success: function(data) {
              $('#user_status_'+user_id).buttonLoader('stop');

           if(data == 'Active'){

            $('#user_status_'+user_id).text('Active');
            $('#user_status_'+user_id).removeClass('btn-danger');
            $('#user_status_'+user_id).addClass('btn-success');

            return false;

           }else if(data == 'Inactive'){

             $('#user_status_'+user_id).text('Inactive');
             $('#user_status_'+user_id).removeClass('btn-success');
             $('#user_status_'+user_id).addClass('btn-danger');

             return false;

            }else if(data == 'ServerError'){
              console.log('Server Error');
             return false;  

           }else{
             return false;
          }
        }
        });
      }
      return false;
    });


//Edit User

 $(".editUser").click(function(){
   var id = $(this).attr('data-id'); 
    var data = 'post=FetchUser' + '&id=' + escape(id);
    
 
 $.ajax({
    type:"post",
    cache:false,
    url:baseUrl,
    data:data, 
    dataType: "json",   
   success: function(data){
    $('#first_name').val('');
    $('#last_name').val('');
    $('#first_name').attr('disabled', 'disabled');
    $('#last_name').attr('disabled', 'disabled');
    $('#username').val(data[0].username);
    $('#useremail').val(data[0].email);
    //$('#userpassword').attr('disabled', 'disabled');
    //$('#userpassword').val(data[0].userpassword);
    $('#userlevel').val(data[0].user_level);
    $('#HDNUser_id').val(data[0].id);
    $('#addUser').html('Save');
    $('#state').html('Edit User');
    $('#addUserModal').modal('show');
 }
});
return false;
});

  $(".deleteUser").click(function(){
    var element = $(this);
    var del_UserId = element.attr("id");
     
     var data = 'post=DelUserData' + '&del_UserId=' + escape(del_UserId);
     
     if(confirm("Are you sure you want to delete?"))
    {
     $.ajax({
        type:"post",
        cache:false,
        url:baseUrl,
        data:data, 
        dataType: "json",   
       success: function(data){
        console.log(data);
     }
    });
      $('#hideTr'+del_UserId).animate({ backgroundColor: "#ccc" }, "fast")
      .animate({ opacity: "hide" }, 700);
     }
    return false;
    });


  $('#AddAnnouncementBtn').click(function() {
      $('#title').val('');
      CKEDITOR.instances.announcement_text.setData('');
      $('#HDNAnnouncement_id').val('');
     });  


  $('#addAnnouncement').click(function() {

          var title = $('#title').val();
          var announcement_text = CKEDITOR.instances.announcement_text.getData();
          var csrf = $('#csrf').val();
          
          if(title == ''){
            $('.title_msg').html('Please enter title').show().delay(2000).fadeOut();
            $('#title').focus();
            return false;
          }

          if(announcement_text == ''){
            $('.announcement_text_msg').html('Please enter announcement message').show().delay(2000).fadeOut();
            $('#announcement_text').focus();
            return false;
          }

        var dataAddAnnouncement = $('#addAnnouncementModalForm').serialize();
        
        var data = 'post=add_announcement' + '&dataAddAnnouncement=' + dataAddAnnouncement + '&announcement_text=' + announcement_text;

        $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          dataType: "json",   
          beforeSend: function() {
              $('#addAnnouncement').buttonLoader('start');
              },
          success: function(data) {
              
              $('#addAnnouncement').buttonLoader('stop');
              
              if(data == 'success'){
                $('.msg').html('Adding announcement Successfull.').show().delay(2000).fadeOut();
                $('#title').val('');
                $('#announcement_text').val('');
                setTimeout(location.reload.bind(location), 3000);
              }else if(data == 'error'){
                $('.msg').html('Something Went Wrong!').show().delay(2000).fadeOut();
              }else if(data == 'emptyFields'){
                $('.msg').html('All fields are required!').show().delay(2000).fadeOut();
                $('#title').focus();
                $('#announcement_text').focus();
              }else if(data == 'successUpdate'){
                $('.msg').html('Information updated successfully!').show().delay(2000).fadeOut();
                setTimeout(location.reload.bind(location), 3000);
              }else if(data == 'updateFailed'){
                $('.msg').html('OOps! Failed during updating!').show().delay(2000).fadeOut();
                setTimeout(location.reload.bind(location), 3000);
              }
              }
         });
         return false;
      });

  // Status Active and Inactive of Announcement

$(document).on('click','.announcement_status',function(){

 if(confirm("Are you sure you want to change the status ?")){
  
        var announcement_status = ($(this).hasClass("btn-success")) ? '1' : '0';
        var current_element = $(this);
        var announcement_id = $(current_element).attr('data');
        
        var data = 'post=Status_announcement' + '&announcement_id=' + escape(announcement_id) + '&announcement_status=' + escape(announcement_status);
    
       $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          dataType: "json",   
          beforeSend: function() {
              $('announcement_status_'+announcement_id).buttonLoader('start');
              },
          success: function(data) {
              $('#announcement_status_'+announcement_id).buttonLoader('stop');

           if(data == 'Active'){

            $('#announcement_status_'+announcement_id).text('Active');
            $('#announcement_status_'+announcement_id).removeClass('btn-danger');
            $('#announcement_status_'+announcement_id).addClass('btn-success');

            return false;

           }else if(data == 'Inactive'){

             $('#announcement_status_'+announcement_id).text('Inactive');
             $('#announcement_status_'+announcement_id).removeClass('btn-success');
             $('#announcement_status_'+announcement_id).addClass('btn-danger');

             return false;

            }else if(data == 'ServerError'){
              console.log('Server Error');
             return false;  

           }else{
             return false;
          }
        }
        });
      }
      return false;
    });


//Edit Announcement

 $(".editAnnouncement").click(function(){
   var id = $(this).attr('data-id'); 
    var data = 'post=FetchAnnouncement' + '&id=' + escape(id);
    
 
 $.ajax({
    type:"post",
    cache:false,
    url:baseUrl,
    data:data, 
    dataType: "json",   
   success: function(data){
    
    $('#title').val(data[0].title);
    $('#announcement_text').val(data[0].announcement_text);
    var theString = $('#announcement_text').val();
    var varTitle = $('#announcement_text').html(theString).text();
    CKEDITOR.instances.announcement_text.setData(varTitle);
    
    $('#HDNAnnouncement_id').val(data[0].id);
    $('#addAnnouncement').html('Save');
    $('#state').html('Edit Announcement');
    $('#addAnnouncementModal').modal('show');
 }
});
return false;
});

  $(".deleteAnnouncement").click(function(){
    var element = $(this);
    var del_AnnouncementId = element.attr("id");
     
     var data = 'post=DelAnnouncementData' + '&del_AnnouncementId=' + escape(del_AnnouncementId);
     
     if(confirm("Are you sure you want to delete?"))
    {
     $.ajax({
        type:"post",
        cache:false,
        url:baseUrl,
        data:data, 
        dataType: "json",   
       success: function(data){
        console.log(data);
     }
    });
      $('#hideTr'+del_AnnouncementId).animate({ backgroundColor: "#ccc" }, "fast")
      .animate({ opacity: "hide" }, 700);
     }
    return false;
    });

  //Level

  $('#NewAssignBtn').click(function() {
      $('#level_title').val('');
      $('#level_code').val('');
      $('#HDNLevel_id').val('');
     });  


  $('#addLevel').click(function() {

          var level_title = $('#level_title').val();
          var level_code = $('#level_code').val();
          var csrf = $('#csrf').val();
          
          if(level_title == ''){
            $('.level_title_msg').html('Please enter title').show().delay(2000).fadeOut();
            $('#level_title').focus();
            return false;
          }

          if(level_code == ''){
            $('.level_code_msg').html('Please define code').show().delay(2000).fadeOut();
            $('#level_code').focus();
            return false;
          }

        var dataAddLevel = $('#addNewLevelForm').serialize();
        
        var data = 'post=add_level' + '&dataAddLevel=' + dataAddLevel;

        $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          dataType: "json",   
          beforeSend: function() {
              $('#addLevel').buttonLoader('start');
              },
          success: function(data) {
              
              $('#addLevel').buttonLoader('stop');
              
              if(data == 'success'){
                $('.msg').html('Adding level Successfull.').show().delay(2000).fadeOut();
                $('#level_title').val('');
                $('#level_code').val('');
                setTimeout(location.reload.bind(location), 3000);
              }else if(data == 'error'){
                $('.msg').html('Something Went Wrong!').show().delay(2000).fadeOut();
              }else if(data == 'levelCodeExist'){
                $('.msg').html('Level code already in use, please try another code').show().delay(2000).fadeOut();  
              }else if(data == 'emptyFields'){
                $('.msg').html('All fields are required!').show().delay(2000).fadeOut();
                $('#level_title').focus();
                $('#level_code').focus();
              }else if(data == 'successUpdate'){
                $('.msg').html('Information updated successfully!').show().delay(2000).fadeOut();
                setTimeout(location.reload.bind(location), 3000);
              }else if(data == 'updateFailed'){
                $('.msg').html('OOps! Failed during updating!').show().delay(2000).fadeOut();
                setTimeout(location.reload.bind(location), 3000);
              }
              }
         });
         return false;
      });

  // Status Active and Inactive of Level

$(document).on('click','.level_status',function(){

 if(confirm("Are you sure you want to change the status ?")){
  
        var level_status = ($(this).hasClass("btn-success")) ? '1' : '0';
        var current_element = $(this);
        var level_id = $(current_element).attr('data');
        
        var data = 'post=Status_level' + '&level_id=' + escape(level_id) + '&level_status=' + escape(level_status);
    
       $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          dataType: "json",   
          beforeSend: function() {
              $('level_status_'+level_id).buttonLoader('start');
              },
          success: function(data) {
              $('#level_status_'+level_id).buttonLoader('stop');

           if(data == 'Active'){

            $('#level_status_'+level_id).text('Active');
            $('#level_status_'+level_id).removeClass('btn-danger');
            $('#level_status_'+level_id).addClass('btn-success');

            return false;

           }else if(data == 'Inactive'){

             $('#level_status_'+level_id).text('Inactive');
             $('#level_status_'+level_id).removeClass('btn-success');
             $('#level_status_'+level_id).addClass('btn-danger');

             return false;

            }else if(data == 'ServerError'){
              console.log('Server Error');
             return false;  

           }else{
             return false;
          }
        }
        });
      }
      return false;
    });


//Edit Level

 $(".editLevel").click(function(){

   var id = $(this).attr('data-id'); 

    var data = 'post=FetchLevel' + '&id=' + escape(id);
    
 $.ajax({
    type:"post",
    cache:false,
    url:baseUrl,
    data:data, 
    dataType: "json",   
   success: function(data){
    
    $('#level_title').val(data[0].level_title);
    $('#level_code').val(data[0].level_code);
    $('#HDNLevel_id').val(data[0].id);
    $('#addLevel').html('Save');
    $('#state').html('Edit Level');
    $('#NewLevelModal').modal('show');
 }
});
return false;
});

  $(".deleteLevel").click(function(){
    var element = $(this);
    var del_Level_Id = element.attr("id");
     
     var data = 'post=DelLevelData' + '&del_Level_Id=' + escape(del_Level_Id);
     
     if(confirm("Are you sure you want to delete?"))
    {
     $.ajax({
        type:"post",
        cache:false,
        url:baseUrl,
        data:data, 
        dataType: "json",   
       success: function(data){
        console.log(data);
     }
    });
      $('#hideTr'+del_Level_Id).animate({ backgroundColor: "#ccc" }, "fast")
      .animate({ opacity: "hide" }, 700);
     }
    return false;
    });


  //Add TL

    $('#AddTLBtn').click(function() {

        var tl_id = $("#tl_select option:selected" ).val();
        var manager_id = $("#HDN_Logged_In_ID" ).val();
          
          if(tl_id == '0'){
            $('.msg').html('Please select TL').show().delay(2000).fadeOut();
            $('#tl_select').focus();
            return false;
          }

           if(manager_id == ''){
            $('.msg').html('User ID Empty,please log out and try again!').show().delay(2000).fadeOut();
            return false;
          }
        
        var data = 'post=add_tl' + '&tl_id=' + tl_id + '&manager_id=' + manager_id;

        $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          dataType: "json",   
          beforeSend: function() {
              $('#AddTLBtn').buttonLoader('start');
              },
          success: function(data) {
              
              $('#AddTLBtn').buttonLoader('stop');
              
              if(data == 'success'){
                $('.msg').html('Success.').show().delay(2000).fadeOut();
                $('#tl_select').val('0');
                setTimeout(location.reload.bind(location), 3000);
              }else if(data == 'exist'){
                $('.msg').html('Already Added!').show().delay(2000).fadeOut();  
              }else if(data == 'error'){
                $('.msg').html('Something Went Wrong!').show().delay(2000).fadeOut();
              }
             
            }
         });
         return false;
      });

 //Delete Team Leader from manager dashboard
 
 $('#btn_delete_tl').click(function(){
  
  if(confirm("Are you sure you want to delete this?"))
  {
   var id = [];
   
   $(':checkbox:checked').each(function(i){
    id[i] = $(this).val();
   });
   
   if(id.length === 0) //tell you if the array is empty
   {
    alert("Please Select atleast one checkbox");
   }
   else
   {

    var data = 'post=delete_tl' + '&id=' + id;

    $.ajax({
     type:"post",
     cache:false,
     url:baseUrl,
     data:data, 
     dataType: "json",
     beforeSend: function() {
      $('#btn_delete_tl').buttonLoader('start');
      },   
     success:function(data){
      $('#btn_delete_tl').buttonLoader('stop');
       if(data != 'error'){
          for(var i=0; i<id.length; i++){
             $('tr#'+id[i]+'').css('background-color', '#ccc');
             $('tr#'+id[i]+'').fadeOut('slow');
            }
        }else{
           alert('Something Went Wrong!');
        }
     
     }
     
    });
   }
   
  }
  else
  {
   return false;
  }
 });   

 $('.main_project_edit').click(function() {

        var current_element = $(this);
        var title_id = $(current_element).attr('data');
        //$('#HDN_Task_Edit_ID').val('');

         var data = 'post=fetchProject' + '&id=' + escape(title_id);
          
         $.ajax({
            type:"post",
            cache:false,
            url:baseUrl,
            data:data, 
            dataType: "json",   
           success: function(data){

            $("#project_title" ).val(data[0].project_title);
            $("#HDN_Task_Edit_ID" ).val(data[0].id);
            $("#project_description" ).val(data[0].description);
            $("#tl_select" ).val(data[0].assigned_to);
            $("#priority_select" ).val(data[0].priority);
            $("#assigned_on" ).val(data[0].assigned_on);
            $("#target_date" ).val(data[0].target_date);
            $('#projectModal').modal('show');
            $('#state').html('Edit Task');
            $('#AddProjectBtn').html('Save');
         }
        });
        return false;
   });     

$('#newProjectBtn').click(function() {

    $("#project_title" ).val('');
    $("#task_description" ).val('');
    $("#HDN_Task_Edit_ID" ).val('');
    $("#tl_select" ).val('0');
    $("#priority_select" ).val('0');
    $("#assigned_on" ).val('');
    $("#target_date" ).val('');
    $('#taskModal').modal('show');

  });

 //Add Project

    $('#AddProjectBtn').click(function() {

        var project_title = $("#project_title" ).val();
        var HDN_Task_Logged_In_ID = $("#HDN_Task_Logged_In_ID" ).val();
        var HDN_Task_Edit_ID = $("#HDN_Task_Edit_ID" ).val();
        var project_description = $("#project_description" ).val();
        var tl_select = $("#tl_select option:selected" ).val();
        var priority_select = $("#priority_select option:selected" ).val();
        var assigned_on = $("#assigned_on" ).val();
        var target_date = $("#target_date" ).val();
          
          if(project_title == ''){
            $('.project_title_msg').html('Please enter task title').show().delay(2000).fadeOut();
            $('#project_title').focus();
            return false;
          }

          if(HDN_Task_Logged_In_ID == ''){
            alert('Login user id not found! Try logging in again');
            return false;
          }

          if(project_description == ''){
            $('.project_description_msg').html('Please enter description').show().delay(2000).fadeOut();
            $('#project_description').focus();
            return false;
          }

          if(tl_select == '0'){
            $('.tl_select_msg').html('Please select TL').show().delay(2000).fadeOut();
            $('#tl_select').focus();
            return false;
          }

           if(priority_select == '0'){
            $('.priority_select_msg').html('Select priority').show().delay(2000).fadeOut();
            $('#priority_select').focus();
            return false;
          }

           if(assigned_on == ''){
            $('.assigned_on_msg').html('Enter date').show().delay(2000).fadeOut();
            $('#assigned_on').focus();
            return false;
          }

           if(target_date == ''){
            $('.target_date_msg').html('Enter target date').show().delay(2000).fadeOut();
            $('#target_date').focus();
            return false;
          }

        var dataProjectModalForm = $('#addProjectForm').serialize();
        
        var data = 'post=add_project' + '&dataProjectModalForm=' + dataProjectModalForm;

        $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          dataType: "json",   
          beforeSend: function() {
              $('#AddProjectBtn').buttonLoader('start');
              },
          success: function(data) {
              
              $('#AddProjectBtn').buttonLoader('stop');
              
              if(data == 'success'){
                $('.task_msg').html('Success.').show().delay(2000).fadeOut();
                $('#project_title').val('');
                $('#task_description').val('');
                $('#tl_select').val('0');
                $('#priority_select').val('0');
                $('#assigned_on').val('');
                $('#target_date').val('');
                setTimeout(location.reload.bind(location), 3000);
              }else if(data == 'successUpdate'){
                $('.task_msg').html('Updated Successfully').show().delay(2000).fadeOut();
                setTimeout(location.reload.bind(location), 3000);
              }else if(data == 'failedUpdate'){
                $('.task_msg').html('Failed during updating').show().delay(2000).fadeOut();  
                setTimeout(location.reload.bind(location), 3000);
              }else if(data == 'empty'){
                $('.task_msg').html('All fields are required').show().delay(2000).fadeOut();  
                $('#project_title').focus();
                $('#task_description').focus();
                $('#tl_select').focus();
                $('#priority_select').focus();
                $('#assigned_on').focus();
              }else if(data == 'error'){
                $('.task_msg').html('Something Went Wrong!').show().delay(2000).fadeOut();
                setTimeout(location.reload.bind(location), 3000);
              }
             
            }
         });
         return false;
      });

   //Delete Project from manager dashboard
 
 $('#btn_delete_project').click(function(){
  
  if(confirm("Are you sure you want to delete this?"))
  {
   var id = [];
   
   $(':checkbox:checked').each(function(i){
    id[i] = $(this).val();
   });
   
   if(id.length === 0) //tell you if the array is empty
   {
    alert("Please Select atleast one checkbox");
   }
   else
   {

    var data = 'post=delete_project' + '&id=' + id;

    $.ajax({
     type:"post",
     cache:false,
     url:baseUrl,
     data:data, 
     dataType: "json",
     beforeSend: function() {
      $('#btn_delete_project').buttonLoader('start');
      },   
     success:function(data){
      $('#btn_delete_project').buttonLoader('stop');
       if(data != 'error'){
          for(var i=0; i<id.length; i++){
             $('tr#'+id[i]+'').css('background-color', '#ccc');
             $('tr#'+id[i]+'').fadeOut('slow');
            }
        }else{
           alert('Something Went Wrong!');
        }
     
     }
     
    });
   }
   
  }
  else
  {
   return false;
  }
 });   

 $('.task').click(function() {

        var current_element = $(this);
        var task_id = $(current_element).attr('data');
        $("#HDN_project_id" ).val(task_id);
        var HDN_Logged_In_User_ID = $("#HDN_Logged_In_User_ID" ).val();
        $('#subTaskModal').modal('show');
        fetch_task(task_id);
  });

function fetch_task(task_id){
  var data = 'post=fetch_task' + '&id=' + task_id;
           $.ajax({
                type:"post",
                cache:false,
                url:baseUrl,
                data:data, 
                success:function(data){
                 $('#live_data_task').html(data);
                }
        });
      } 


  $(document).on('click', '#btn_add_task', function(){
       
           var task_title = $('#task_title').text();
           var task_description = $('#task_description').text();
           var HDN_Logged_In_User_ID = $("#HDN_Logged_In_User_ID" ).val();
           var HDN_project_id = $("#HDN_project_id" ).val();
           if(task_title == ''){
                $('.task_msg').html('Enter Task Title').show().delay(2000).fadeOut();
                return false;
           }
           if(task_description == ''){
                $('.task_msg').html('Enter Task Description').show().delay(2000).fadeOut();
                return false;
           }

           var data = 'post=insert_task' + '&task_title=' + task_title + '&task_description=' + task_description + '&manager_id=' + HDN_Logged_In_User_ID + '&project_id=' + HDN_project_id;
           
           $.ajax({
                type:"post",
                cache:false,
                url:baseUrl,
                data:data, 
                success:function(html){
                 if( html == "success"){
                  $('.task_msg').html('Added Successfully').show().delay(2000).fadeOut();
                   fetch_task(HDN_project_id);
                   return false;
                  }else if( html == "error"){
                    $('.task_msg').html('Something Went Wrong!').show().delay(2000).fadeOut();
                    return false;
                     }
                }
           })
      });           

 function edit_task(id, text, column_name){

        var HDN_project_id = $("#HDN_project_id" ).val();
        var data = 'post=edit_task' + '&id=' + id + '&text=' + text + '&column_name=' + column_name;
        
           $.ajax({
                type:"post",
                cache:false,
                url:baseUrl,
                data:data, 
                success:function(html){
                       if( html == "success"){
                       $('.task_msg').html('Successfully Updated').show().delay(2000).fadeOut();
                       fetch_task(HDN_project_id);
                       return false;
                     }else if( html == "error"){
                       $('.task_msg').html('Something went wrong').show().delay(2000).fadeOut();
                       return false;

                     }
                }
           });
      }

  $(document).on('blur', '.task_title', function(){
        var id = $(this).data("task_id_1");
        var task_title_text = $(this).text();
        edit_task(id, task_title_text, "task_title");
    });

  $(document).on('blur', '.task_description', function(){
        var id = $(this).data("task_id_2");
        var task_description_text = $(this).text();
        edit_task(id, task_description_text, "task_description");
    });

  $(document).on('click', '.btn_delete_task', function(){ 

           var id = $(this).data("task_id_3");
           var HDN_project_id = $("#HDN_project_id" ).val();

           if(confirm("Are you sure you want to delete this?"))
           {
             var data = 'post=delete_task' + '&id=' + id;
             ;
                $.ajax({
                      type:"post",
                      cache:false,
                      url:baseUrl,
                      data:data, 
                     success:function(html){
                          
                    if( html == "success"){
                       $('.task_msg').html('Deleted Successfully').show().delay(2000).fadeOut();
                       fetch_task(HDN_project_id);
                       return false;
                     }else if( html == "error"){
                       $('.task_msg').html('Something went wrong').show().delay(2000).fadeOut();
                       fetch_task(HDN_project_id);
                       return false;
                     }                         
                    }
                });
           }
      });

  //Add Employee

    $('#AddEmployeeBtn').click(function() {

        var employee_id = $("#employee_select option:selected" ).val();
        var team_leader_id = $("#HDN_Logged_In_ID" ).val();
          
          if(employee_id == '0'){
            $('.msg').html('Please select Employee').show().delay(2000).fadeOut();
            $('#employee_select').focus();
            return false;
          }

           if(team_leader_id == ''){
            $('.msg').html('User ID Empty,please log out and try again!').show().delay(2000).fadeOut();
            return false;
          }
        
        var data = 'post=add_employee' + '&employee_id=' + employee_id + '&team_leader_id=' + team_leader_id;

        $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          dataType: "json",   
          beforeSend: function() {
              $('#AddEmployeeBtn').buttonLoader('start');
              },
          success: function(data) {
              
              $('#AddEmployeeBtn').buttonLoader('stop');
              
              if(data == 'success'){
                $('.msg').html('Success.').show().delay(2000).fadeOut();
                $('#employee_select').val('0');
                setTimeout(location.reload.bind(location), 3000);
              }else if(data == 'exist'){
                $('.msg').html('Already Added!').show().delay(2000).fadeOut();  
              }else if(data == 'error'){
                $('.msg').html('Something Went Wrong!').show().delay(2000).fadeOut();
              }
             
            }
         });
         return false;
      });

 //Delete Employee from Team Leader dashboard
 
 $('#btn_delete_employee').click(function(){
  
  if(confirm("Are you sure you want to delete this?"))
  {
   var id = [];
   
   $(':checkbox:checked').each(function(i){
    id[i] = $(this).val();
   });
   
   if(id.length === 0) //tell you if the array is empty
   {
    alert("Please Select atleast one checkbox");
   }
   else
   {

    var data = 'post=delete_employee' + '&id=' + id;

    $.ajax({
     type:"post",
     cache:false,
     url:baseUrl,
     data:data, 
     dataType: "json",
     beforeSend: function() {
      $('#btn_delete_employee').buttonLoader('start');
      },   
     success:function(data){
      $('#btn_delete_employee').buttonLoader('stop');
       if(data != 'error'){
          for(var i=0; i<id.length; i++){
             $('tr#'+id[i]+'').css('background-color', '#ccc');
             $('tr#'+id[i]+'').fadeOut('slow');
            }
        }else{
           alert('Something Went Wrong!');
        }
     
     }
     
    });
   }
   
  }
  else
  {
   return false;
  }
 }); 

   $('#showTask').click(function() {

    var projectID = $('#project_select option:selected').val();

    if(projectID == '0'){
      $('.msg').html('Please select project').show().delay(2000).fadeOut();
      return false;
    }

    var data = 'post=fetch_project' + '&id=' + projectID;
   
    $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          // dataType: "json",   
          beforeSend: function() {
              $('#showTask').buttonLoader('start');
              },
          success: function(data) {
              $('#showTask').buttonLoader('stop');
              $('#showTask').html('<i class="fa fa-plus-circle"></i> Show ');
              $('#showProjectData').html(data);
              fetch_project_details(projectID);
            }
         });
         return false;
   }); 

   function fetch_project_details(projectID){
        
          var data = 'post=fetch_project_details' + '&id=' + projectID;

           $.ajax({
                type:"post",
                cache:false,
                url:baseUrl,
                data:data, 
                success:function(data){
                  $('#showProjectDetails').html(data);
                }
           });
   } 

$("#status_div").hide();
$("#qty_div").hide();

$(document).on("click", '.task_edit_by_tl', function(event) { //Bind Events on Ajax loaded Content 

        var current_element = $(this);
        var task_id = $(current_element).attr('data');
        $("#HDN_Task_Edit_ID" ).val(task_id);
        var HDN_Logged_In_User_ID = $("#HDN_Logged_In_User_ID" ).val();
        var task_priority_select_by_tl = $('#task_priority_select_by_tl option:selected').val();

        $('#task_priority_select_by_tl').val('');
        $('#emp_select_by_tl').val('');
        $('#assigned_on_by_tl').val('');
        $('#target_date_by_tl').val('');
        $('#task_status_by_tl').val('');
        //$('#add_task_status').val('');

        //$('#assignTaskToEmployeeModal').modal('show');

         var data = 'post=FetchTaskData' + '&id=' + escape(task_id);
    
       $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          dataType: "json",   
         success: function(data){
         
          $('#task_priority_select_by_tl').val(data[0].task_priority);
          $('#emp_select_by_tl').val(data[0].employee_assigned_to);
          $('#assigned_on_by_tl').val(data[0].assigned_on);
          $('#target_date_by_tl').val(data[0].target_date);
          $('#task_status_by_tl').val(data[0].task_status_by_t_l);
          if(data[0].task_status_by_t_l == 1){
          $("#status_div").show();
           }
          $('#task_qty_by_tl').val(data[0].quantity);
          //$("#HDN_Task_Edit_ID" ).val(data[0].id);
          $('#assignTaskByTL').html('Add');
          $('#assignTaskToEmployeeModal').modal('show');
       }
      });
      return false;
});

  $("#add_task_status").change(function() {
    if(this.checked) {
       $("#status_div").show();
    }else{
      $("#status_div").hide();
    }
});

  $("#add_task_qty").change(function() {
    if(this.checked) {
       $("#qty_div").show();
    }else{
      $("#qty_div").hide();
    }
});

  $('#assignTaskByTL').click(function() {

      var task_priority_select_by_tl = $('#task_priority_select_by_tl option:selected').val();
      var emp_select_by_tl = $('#emp_select_by_tl option:selected').val();
      var assigned_on_by_tl = $("#assigned_on_by_tl" ).val();
      var target_date_by_tl = $("#target_date_by_tl" ).val();
      var task_status_by_tl = $('#task_status_by_tl option:selected').val();
      var task_qty_by_tl = $("#task_qty_by_tl" ).val();

      if(task_priority_select_by_tl == '0'){
      $('.task_priority_select_by_tl_msg').html('Please select priority').show().delay(2000).fadeOut();
      $('#task_priority_select_by_tl').focus();
      return false;
      }

      if(emp_select_by_tl == '0'){
      $('.emp_select_by_tl_msg').html('Please select employee').show().delay(2000).fadeOut();
      $('#emp_select_by_tl').focus();
      return false;
      }

      if(assigned_on_by_tl == ''){
      $('.assigned_on_by_tl_msg').html('Please enter assigning date').show().delay(2000).fadeOut();
      $('#assigned_on_by_tl').focus();
      return false;
      }

      if(target_date_by_tl == ''){
      $('.target_date_by_tl_msg').html('Please enter target date').show().delay(2000).fadeOut();
      $('#target_date_by_tl').focus();
      return false;
      }

      if ($("#add_task_status").prop("checked")){

        if(task_status_by_tl == '2'){
        $('.task_status_select_msg').html('Please select task status').show().delay(2000).fadeOut();
        $('#task_status_by_tl').focus();
        return false;
        }
       }

     if ($("#add_task_qty").prop("checked")){

        if(task_qty_by_tl == ''){
        $('.task_qty_by_tl_msg').html('Please enter quantity').show().delay(2000).fadeOut();
        $('#task_qty_by_tl').focus();
        return false;
        }
       }

    var dataAssignTaskToEmployeeModalForm = $('#assignTaskToEmployeeModalForm').serialize();

    var data = 'post=assign_employee' + '&dataAssignTaskToEmployeeModalForm=' + dataAssignTaskToEmployeeModalForm;
   
    $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          dataType: "json",   
          beforeSend: function() {
              $('#assignTaskByTL').buttonLoader('start');
              },
          success: function(data) {
              $('#assignTaskByTL').buttonLoader('stop');

              if(data == 'success'){
                $('.task_by_tl_msg').html('Success.').show().delay(2000).fadeOut();
                $('#assignTaskToEmployeeModal').modal('hide');
                $('#showTask').get(0).click(); // Button Click by jQuery
              }else if(data == 'exist'){
                $('.task_by_tl_msg').html('Already Added!').show().delay(2000).fadeOut(); 
              }else if(data == 'successUpdate'){
                $('.task_by_tl_msg').html('Updated Successfully').show().delay(2000).fadeOut(); 
                $('#assignTaskToEmployeeModal').modal('hide');
                $('#showTask').get(0).click(); // Button Click by jQuery   
              }else if(data == 'ensure'){
                $('.task_by_tl_msg').html('Please ensure if employee has completed this task!').show().delay(2000).fadeOut(); 
                return false;     
              }else if(data == 'error'){
                $('.task_by_tl_msg').html('Something Went Wrong!').show().delay(2000).fadeOut();
              }
              
            }
         });
         return false;

  });


  $('#showEmpTask').click(function() {

    var projectID = $('#emp_project_select option:selected').val();
    var userID = $('#HDN_Logged_In_Emp_ID').val();

    if(projectID == '0'){
      $('.msg').html('Please select project').show().delay(2000).fadeOut();
      $('#emp_project_select').focus();
      return false;
    }

    var data = 'post=fetch_emp_project' + '&id=' + projectID + '&userID=' + userID;
   
    $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          // dataType: "json",   
          beforeSend: function() {
              $('#showEmpTask').buttonLoader('start');
              },
          success: function(data) {
              $('#showEmpTask').buttonLoader('stop');
              $('#showEmpTask').html('<i class="fa fa-plus-circle"></i> Show ');
              $('#showEmpProjectData').html(data);
              fetch_emp_project_details(projectID);
            }
         });
         return false;
   }); 

   function fetch_emp_project_details(projectID){
        
          var data = 'post=fetch_emp_project_details' + '&id=' + projectID;

           $.ajax({
                type:"post",
                cache:false,
                url:baseUrl,
                data:data, 
                success:function(data){
                  $('#showEmpProjectDetails').html(data);
                }
           });
   } 

$(document).on("click", '.task_edit_by_emp', function(event) { //Bind Events on Ajax loaded Content 

        var current_element = $(this);
        var task_id = $(current_element).attr('data');
        $("#HDN_Emp_Task_Edit_ID" ).val(task_id);
        var HDN_Logged_In_User_ID = $("#HDN_Logged_In_User_ID" ).val();
    
        //$('#add_task_status').val('');

        //$('#EmployeeTaskModal').modal('show');

         var data = 'post=FetchEmpTaskData' + '&id=' + escape(task_id);
    
       $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          dataType: "json",   
         success: function(data){
         
          $('#qnty_done').val(data[0].quantity_done);
          $('#task_status_by_emp').val(data[0].task_status_by_employee);
          
          $('#EmployeeTaskModal').modal('show');
       }
      });
      return false;
});

  $('#updateTaskByEmp').click(function() {

      var task_status_by_emp = $('#task_status_by_emp option:selected').val();
      var qnty_done = $("#qnty_done" ).val();

      if(qnty_done == ''){
      $('.qnty_done_msg').html('Please enter quantity').show().delay(2000).fadeOut();
      $('#qnty_done').focus();
      return false;
      }

      if(task_status_by_emp == '2'){
      $('.task_status_emp_select_msg').html('Please select task status').show().delay(2000).fadeOut();
      $('#task_status_by_emp').focus();
      return false;
      }


    var dataEmployeeTaskModalForm = $('#EmployeeTaskModalForm').serialize();

    var data = 'post=update_emp_data' + '&dataEmployeeTaskModalForm=' + dataEmployeeTaskModalForm;
   
    $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          dataType: "json",   
          beforeSend: function() {
              $('#updateTaskByEmp').buttonLoader('start');
              },
          success: function(data) {
              $('#updateTaskByEmp').buttonLoader('stop');

              if(data == 'successUpdate'){
                $('.emp_task_msg').html('Updated successfully.').show().delay(2000).fadeOut();
                $('#showEmpTask').get(0).click(); // Button Click by jQuery
              }else if(data == 'error'){
                $('.emp_task_msg').html('Something Went Wrong!').show().delay(2000).fadeOut();
                return false;
              }
              
            }
         });
         return false;

  });


$('#updateClockInByEmp').click(function() {

      var emp_in_date = $('#emp_in_date').val();
      var emp_in_hour = $("#emp_in_hour" ).val();
      var emp_in_minute = $('#emp_in_minute').val();
      var working_status = $("#working_status option:selected" ).val();
      var comment_by_emp = $("#comment_by_emp" ).val();
      var HDN_Logged_In_User_ID = $("#HDN_Logged_In_User_ID" ).val();

      if(emp_in_date == ''){
      $('.clock_in_msg').html('Date not found').show().delay(2000).fadeOut();
      $('#emp_in_date').focus();
      return false;
      }

      if(emp_in_hour == ''){
      $('.clock_in_msg').html('Please enter hour').show().delay(2000).fadeOut();
      $('#emp_in_hour').focus();
      return false;
      }

      if(emp_in_hour == 0){
      $('.clock_in_msg').html('Please enter valid hour').show().delay(2000).fadeOut();
      $('#emp_in_hour').focus();
      return false;
      }

      if(emp_in_minute == ''){
      $('.clock_in_msg').html('Please enter minute').show().delay(2000).fadeOut();
      $('#emp_in_minute').focus();
      return false;
      }

      if(HDN_Logged_In_User_ID == ''){
      $('.clock_in_msg').html('User id not found!').show().delay(2000).fadeOut();
      return false;
      }


    var dataEmployeeClockInForm = $('#EmployeeClockInForm').serialize();

    var data = 'post=clock_in' + '&dataEmployeeClockInForm=' + dataEmployeeClockInForm;
   
    $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          dataType: "json",   
          beforeSend: function() {
              $('#updateClockInByEmp').buttonLoader('start');
              },
          success: function(data) {
              $('#updateClockInByEmp').buttonLoader('stop');

              if(data == 'successInsert'){
                $('.clock_in_msg').html('Added successfully.').show().delay(2000).fadeOut();
                setTimeout(location.reload.bind(location), 3000);
              }else if(data == 'successUpdate'){
                $('.clock_in_msg').html('Updated successfully').show().delay(2000).fadeOut();
                setTimeout(location.reload.bind(location), 3000);
              }else if(data == 'error'){
                $('.clock_in_msg').html('Something Went Wrong!').show().delay(2000).fadeOut();
                return false;
              }
              
            }
         });
         return false;
  });

$("#permit").hide();

$('#working_status').change(function() {
var working_status = $("#working_status option:selected" ).val();
if(working_status == 'P'){
  $("#permit").hide();
}else{
  $("#permit").show();
}
});

$('#updateClockOutByEmp').click(function() {

      var emp_out_date = $('#emp_out_date').val();
      var emp_out_hour = $("#emp_out_hour" ).val();
      var emp_out_minute = $('#emp_out_minute').val();
      var working_status = $("#working_status option:selected" ).val();
      var permitted_by = $("#permitted_by" ).val();
      var comment_by_emp = $("#comment_by_emp" ).val();
      var HDN_Logged_In_User_ID = $("#HDN_Logged_In_User_ID" ).val();

      if(emp_out_date == ''){
      $('.clock_out_msg').html('Date not found').show().delay(2000).fadeOut();
      $('#emp_out_date').focus();
      return false;
      }

      if(emp_out_hour == ''){
      $('.clock_out_msg').html('Please enter hour').show().delay(2000).fadeOut();
      $('#emp_out_hour').focus();
      return false;
      }

      if(emp_out_hour == 0){
      $('.clock_out_msg').html('Please enter valid hour').show().delay(2000).fadeOut();
      $('#emp_out_hour').focus();
      return false;
      }

      if(emp_out_minute == ''){
      $('.clock_out_msg').html('Please enter minute').show().delay(2000).fadeOut();
      $('#emp_out_minute').focus();
      return false;
      }

      if(working_status != 'P'){
        if(permitted_by == ''){
        $('.clock_out_msg').html('Please enter leave permitted by name').show().delay(2000).fadeOut();
        $('#permitted_by').focus();
        return false;
        }
      }

      if(HDN_Logged_In_User_ID == ''){
      $('.clock_out_msg').html('User id not found!').show().delay(2000).fadeOut();
      return false;
      }


    var dataEmployeeClockOutForm = $('#EmployeeClockOutForm').serialize();

    var data = 'post=clock_out' + '&dataEmployeeClockOutForm=' + dataEmployeeClockOutForm;
   
    $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          dataType: "json",   
          beforeSend: function() {
              $('#updateClockOutByEmp').buttonLoader('start');
              },
          success: function(data) {
              $('#updateClockOutByEmp').buttonLoader('stop');

              if(data == 'notExist'){
                $('.clock_out_msg').html('Entry not found! Please check-in first').show().delay(2000).fadeOut();
                return false;
              }else if(data == 'successUpdate'){
                $('.clock_out_msg').html('Updated successfully').show().delay(2000).fadeOut();
                setTimeout(location.reload.bind(location), 3000);
              }else if(data == 'error'){
                $('.clock_out_msg').html('Something Went Wrong!').show().delay(2000).fadeOut();
                return false;
              }
              
            }
         });
         return false;
  });

$("#to_date").attr("disabled", true);
 
$('#date_range_check').click(function() {
  if(this.checked){
     $("#to_date").removeAttr("disabled");
    }else{
      $("#to_date").attr("disabled", true);
    }
});

$("#searchResult").hide();

$('#searchAttendance').click(function() {

      var date_range_check = $("#date_range_check").prop('checked');
      var from_date = $('#from_date').val();
      var to_date = $('#to_date').val();
      var HDN_Logged_In_User_ID = $('#HDN_Logged_In_User_ID').val();
      var csrf = $('#csrf').val();

      if(from_date == ''){
      $('.search_result_msg').html('Please enter date').show().delay(2000).fadeOut();
      $('#from_date').focus();
      return false;
      }

      if(date_range_check == true){
        if(to_date == ''){
          $('.search_result_msg').html('Please enter date').show().delay(2000).fadeOut();
          $('#to_date').focus();
          return false;
          }
      }

      if(HDN_Logged_In_User_ID == ''){
      $('.search_result_msg').html('User id not found!').show().delay(2000).fadeOut();
      return false;
      }

    //var dataAttendanceSearchForm = $('#AttendanceSearchForm').serialize();

    var data = 'post=search_attendance' + '&user_id=' + escape(HDN_Logged_In_User_ID) + '&range_check=' + escape(date_range_check) + '&from_date=' + escape(from_date) + '&to_date=' + escape(to_date) + '&csrf=' + escape(csrf);
   
    $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          //dataType: "json",   
          beforeSend: function() {
              $('#searchAttendance').buttonLoader('start');
              },
          success: function(data) {
              $('#searchAttendance').buttonLoader('stop');
              $("#searchResult").show();
              $('#searchResult').html(data);  
            }
         });
         return false;
  });

$('#saveBasicInfo').click(function(){
  
  var first_name = $('#first_name').val();
  var middle_name = $('#middle_name').val();
  var last_name = $('#last_name').val();
  var gender = $('#gender option:selected').val();
  var dob = $('#dob').val();
  var nationality = $('#nationality option:selected').val();
  var marital_status = $('#marital_status option:selected').val();
  var HDN_basicInfoForm_Logged_In_User_ID = $('#HDN_basicInfoForm_Logged_In_User_ID').val();

   if(first_name == ''){
      $('.first_name_msg').html('Enter first name').show().delay(2000).fadeOut();
      $('#first_name').focus();
      return false;
     }

   // if(middle_name == ''){
   //    $('.middle_name_msg').html('Enter middle name').show().delay(2000).fadeOut();
   //    $('#middle_name').focus();
   //    return false;
   //    }   

    if(last_name == ''){
      $('.last_name_msg').html('Enter last name').show().delay(2000).fadeOut();
      $('#last_name').focus();
      return false;
     }

    if(gender == '0'){
      $('.gender_msg').html('Select gender').show().delay(2000).fadeOut();
      $('#gender').focus();
      return false;
     }

    if(dob == ''){
      $('.dob_msg').html('Enter date of birth').show().delay(2000).fadeOut();
      $('#dob').focus();
      return false;
     }

     if(nationality == '0'){
      $('.nationality_msg').html('Select nationality').show().delay(2000).fadeOut();
      $('#nationality').focus();
      return false;
     }

     if(marital_status == '0'){
      $('.marital_status_msg').html('Select marital status').show().delay(2000).fadeOut();
      $('#marital_status').focus();
      return false;
     }

     if(HDN_basicInfoForm_Logged_In_User_ID == ''){
      $('.basicInfoForm_msg').html('User ID not found').show().delay(2000).fadeOut();
      return false;
     } 

    var databasicInfoForm = $('#basicInfoForm').serialize();

    var data = 'post=add_basicInfo' + '&databasicInfoForm=' + databasicInfoForm;
  
    $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          dataType: "json",   
          beforeSend: function() {
              $('#saveBasicInfo').buttonLoader('start');
              },
          success: function(data) {
              $('#saveBasicInfo').buttonLoader('stop');

              if(data == 'successUpdate'){
                $('.basicInfoForm_msg').html('Information Updated Successfully!').show().delay(2000).fadeOut();
                setTimeout(location.reload.bind(location), 3000);
              }else if(data == 'error'){
                $('.basicInfoForm_msg').html('Something Went Wrong!').show().delay(2000).fadeOut();
                return false;
              }
              
            }
         });
         return false;

});


$('#saveContactInfo').click(function(){
  
  var primary_contact = $('#primary_contact').val();
  var secondary_contact = $('#secondary_contact').val();
  var city = $('#city').val();
  var state = $('#state').val();
  var country = $('#country').val();
  var postal_code = $('#postal_code').val();
  var temporary_address = $('#temporary_address').val();
  var permanent_address = $('#permanent_address').val();
  var HDN_contactInfoForm_Logged_In_User_ID = $('#HDN_contactInfoForm_Logged_In_User_ID').val();

   if(primary_contact == ''){
      $('.primary_contact_msg').html('Enter primary contact').show().delay(2000).fadeOut();
      $('#primary_contact').focus();
      return false;
     }else {

       str = primary_contact.toString(),
       len = str.length;

        if(len != 10){
          $('.primary_contact_msg').html('Enter valid contact number').show().delay(2000).fadeOut();
          $('#primary_contact').focus();
          return false;
        }

    }

    if(secondary_contact == ''){
      $('.secondary_contact_msg').html('Enter secondary contact').show().delay(2000).fadeOut();
      $('#secondary_contact').focus();
      return false;
     }else {

       str = secondary_contact.toString(),
       len = str.length;

        if(len != 10){
          $('.secondary_contact_msg').html('Enter valid contact number').show().delay(2000).fadeOut();
          $('#secondary_contact').focus();
          return false;
        }

    }

    if(primary_contact == secondary_contact){
      $('.secondary_contact_msg').html('Enter different contact number than the primary contact').show().delay(2000).fadeOut();
      $('#secondary_contact').focus();
      return false;
    }

   if(city == ''){
      $('.city_msg').html('Enter city name').show().delay(2000).fadeOut();
      $('#city').focus();
      return false;
      }   

    if(state == ''){
      $('.state_msg').html('Enter state name').show().delay(2000).fadeOut();
      $('#state').focus();
      return false;
     }

    if(country == ''){
      $('.country_msg').html('Enter Country').show().delay(2000).fadeOut();
      $('#country').focus();
      return false;
     }

    if(postal_code == ''){
      $('.postal_code_msg').html('Enter postal code').show().delay(2000).fadeOut();
      $('#postal_code').focus();
      return false;
     }else {

       str = postal_code.toString(),
       len = str.length;

        if(len != 6){
          $('.postal_code_msg').html('Enter valid postal code').show().delay(2000).fadeOut();
          $('#postal_code').focus();
          return false;
        }

    }

     if(temporary_address == ''){
      $('.temporary_address_msg').html('Enter temporary address').show().delay(2000).fadeOut();
      $('#temporary_address').focus();
      return false;
     }

     if(permanent_address == ''){
      $('.permanent_address_msg').html('Enter permanent address').show().delay(2000).fadeOut();
      $('#permanent_address').focus();
      return false;
     }

     if(HDN_contactInfoForm_Logged_In_User_ID == ''){
      $('.contactInfoForm_msg').html('User ID not found').show().delay(2000).fadeOut();
      return false;
     } 

    var datacontactInfoForm = $('#contactInfoForm').serialize();

    var data = 'post=add_contactInfo' + '&datacontactInfoForm=' + datacontactInfoForm;
  
    $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          dataType: "json",   
          beforeSend: function() {
              $('#saveContactInfo').buttonLoader('start');
              },
          success: function(data) {
              $('#saveContactInfo').buttonLoader('stop');

              if(data == 'successUpdate'){
                $('.contactInfoForm_msg').html('Information Updated Successfully!').show().delay(2000).fadeOut();
                setTimeout(location.reload.bind(location), 3000);
              }else if(data == 'error'){
                $('.contactInfoForm_msg').html('Something Went Wrong!').show().delay(2000).fadeOut();
                return false;
              }
              
            }
         });
         return false;

    });


 $('#saveidProofInfo').click(function(){
  
  var aadhaar_number = $('#aadhaar_number').val();
  var pan_number = $('#pan_number').val();
  var HDN_idProofForm_Logged_In_User_ID = $('#HDN_idProofForm_Logged_In_User_ID').val();

   if(aadhaar_number == ''){
      $('.aadhaar_number_msg').html('Enter aadhaar number').show().delay(2000).fadeOut();
      $('#aadhaar_number').focus();
      return false;
     }else {

       str = aadhaar_number.toString(),
       len = str.length;

        if(len != 12){
          $('.aadhaar_number_msg').html('Enter valid aadhaar number').show().delay(2000).fadeOut();
          $('#aadhaar_number').focus();
          return false;
        }

    }

    if(pan_number == ''){
      $('.pan_number_msg').html('Enter PAN number').show().delay(2000).fadeOut();
      $('#pan_number').focus();
      return false;
     }else {

       str = pan_number.toString(),
       len = str.length;

        if(len != 10){
          $('.pan_number_msg').html('Enter valid PAN number').show().delay(2000).fadeOut();
          $('#pan_number').focus();
          return false;
        }

    }

     if(HDN_idProofForm_Logged_In_User_ID == ''){
      $('.idProofInfo_msg').html('User ID not found').show().delay(2000).fadeOut();
      return false;
     } 

    var dataidProofForm = $('#idProofForm').serialize();

    var data = 'post=add_IDProofInfo' + '&dataidProofForm=' + dataidProofForm;
  
    $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          dataType: "json",   
          beforeSend: function() {
              $('#saveidProofInfo').buttonLoader('start');
              },
          success: function(data) {
              $('#saveidProofInfo').buttonLoader('stop');

              if(data == 'successUpdate'){
                $('.idProofInfo_msg').html('Information Updated Successfully!').show().delay(2000).fadeOut();
                setTimeout(location.reload.bind(location), 3000);
              }else if(data == 'error'){
                $('.idProofInfo_msg').html('Something Went Wrong!').show().delay(2000).fadeOut();
                return false;
              }
              
            }
         });
         return false;

    });

 $('#saveAccountInfo').click(function(){
  
  var username = $('#username').val();
  var email = $('#email').val();
  var old_password = $('#old_password').val();
  var new_password = $('#new_password').val();
  var HDN_accountSettingForm_Logged_In_User_ID = $('#HDN_accountSettingForm_Logged_In_User_ID').val();

  if(username == ''){
      $('.username_msg').html('Enter username').show().delay(2000).fadeOut();
      $('#username').focus();
      return false;
     }

   if(email == ''){
      $('.email_msg').html('Enter email').show().delay(2000).fadeOut();
      $('#email').focus();
      return false;
     }

     if( email != ''){
       var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
       if(!document.getElementById('email').value.match(mailformat))
       { $('#email').focus();
       $('.email_msg').html('Please Enter Valid Email').show().delay(2800).fadeOut();
       return false; }}  

    if(old_password != '' && new_password == '' || new_password != '' && old_password == ''){
      $('.new_password_msg').html('Enter old & New password').show().delay(2000).fadeOut();
      $('#old_password').focus();
      $('#new_password').focus();
      return false;
     }

     if(HDN_accountSettingForm_Logged_In_User_ID == ''){
      $('.accountSetting_msg').html('User ID not found').show().delay(2000).fadeOut();
      return false;
     } 

    var dataaccountSettingForm = $('#accountSettingForm').serialize();

    var data = 'post=add_accountInfo' + '&dataaccountSettingForm=' + dataaccountSettingForm;
  
    $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          dataType: "json",   
          beforeSend: function() {
              $('#saveAccountInfo').buttonLoader('start');
              },
          success: function(data) {
              $('#saveAccountInfo').buttonLoader('stop');

              if(data == 'successUpdate'){
                $('.accountSetting_msg').html('Information Updated Successfully!').show().delay(2000).fadeOut();
                setTimeout(location.reload.bind(location), 3000);
              }else if(data == 'invalidPass'){
                $('.accountSetting_msg').html('Password does not match!').show().delay(2000).fadeOut();
                $('#old_password').val('');
                $('#old_password').focus();
                return false;
              }else if(data == 'usernameExists'){
                $('.username_msg').html('Username Already Exists!').show().delay(2000).fadeOut();
                $('#username').val('');
                $('#username').focus();
                return false; 
               }else if(data == 'emailExists'){
                $('.email_msg').html('Email Already Exists!').show().delay(2000).fadeOut();
                $('#email').val('');
                $('#email').focus();
                return false;        
              }else if(data == 'error'){
                $('.accountSetting_msg').html('Something Went Wrong!').show().delay(2000).fadeOut();
                return false;
              }
              
            }
         });
         return false;

    });

 $('#uploadProfilePic').click(function(){
  
  // var imageRaw = $('#imageRaw').val();
  // var ImageFile = $('#ImageFile').val();
 
  var HDN_imageForm_Logged_In_User_ID = $('#HDN_imageForm_Logged_In_User_ID').val();

  if(imageRaw == ''){
      $('.image_msg').html('Select an image file').show().delay(2000).fadeOut();
      $('#ImageFile').focus();
      return false;
     }

  if(HDN_imageForm_Logged_In_User_ID == ''){
      $('.image_msg').html('User ID not found').show().delay(2000).fadeOut();
      return false;
     } 

    var dataImageForm = $('#FormImage').serialize();

    var data = 'post=add_profileImage' + '&dataImageForm=' + dataImageForm;
  
    $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          dataType: "json",   
          beforeSend: function() {
              $('#uploadProfilePic').buttonLoader('start');
              },
          success: function(data) {
              $('#uploadProfilePic').buttonLoader('stop');
              console.log(data);
              if(data == 'successUpdate'){
                $('.image_msg').html('Updated Successfully!').show().delay(2000).fadeOut();
                setTimeout(location.reload.bind(location), 3000);
              }else if(data == 'error'){
                $('.image_msg').html('Something Went Wrong!').show().delay(2000).fadeOut();
                return false;
              }
              
            }
         });
         return false;

    });

 //Attendance search by admin
 
$("#admin_to_date").attr("disabled", true);
 
$('#admin_date_range_check').click(function() {
  if(this.checked){
     $("#admin_to_date").removeAttr("disabled");
    }else{
      $("#admin_to_date").attr("disabled", true);
    }
}); 

$("#adminsearchResult").hide();

$('#adminsearchAttendance').click(function() {

      var emp_select = $("#emp_select option:selected" ).val();
      var admin_date_range_check = $("#admin_date_range_check").prop('checked');
      var admin_from_date = $('#admin_from_date').val();
      var admin_to_date = $('#admin_to_date').val();
      var HDN_Logged_In_User_ID = $('#HDN_Logged_In_User_ID').val();
      var csrf = $('#csrf').val();

      if(admin_from_date == ''){
      $('.admin_search_result_msg').html('Please enter date').show().delay(2000).fadeOut();
      $('#admin_from_date').focus();
      return false;
      }

      if(admin_date_range_check == true){
        if(admin_to_date == ''){
          $('.admin_search_result_msg').html('Please enter date').show().delay(2000).fadeOut();
          $('#admin_to_date').focus();
          return false;
          }
      }

      if(HDN_Logged_In_User_ID == ''){
      $('.admin_search_result_msg').html('User id not found!').show().delay(2000).fadeOut();
      return false;
      }

    //var dataAttendanceSearchForm = $('#AttendanceSearchForm').serialize();

    var data = 'post=admin_search_attendance' + '&user_id=' + escape(emp_select) + '&range_check=' + escape(admin_date_range_check) + '&from_date=' + escape(admin_from_date) + '&to_date=' + escape(admin_to_date) + '&csrf=' + escape(csrf);
   
    $.ajax({
          type:"post",
          cache:false,
          url:baseUrl,
          data:data, 
          //dataType: "json",   
          beforeSend: function() {
              $('#adminsearchAttendance').buttonLoader('start');
              },
          success: function(data) {
              $('#adminsearchAttendance').buttonLoader('stop');
              $("#adminsearchResult").show();
              $('#adminsearchResult').html(data);  
            }
         });
         return false;
  });


});//End of document.ready

 