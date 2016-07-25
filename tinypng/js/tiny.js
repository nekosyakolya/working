var loading = $("#loading");

$(document).ready(function()
{
     loading.submit(function()
     {
       
          var formData = new FormData($('form')[0]);
          $.ajax(
          {
              type: 'post',
              processData: false,
              contentType: false,
              url: "php/index.php",
              data: formData,
              dataType: 'json',
              success: function(data)
              {
                  $('#originalImg').attr('src', "img/" + data.oldImg);
                  $('#tinyImg').attr('src', "imgOptimized/" + data.newImg);
                  $('#tinySize').html("Новый размер: " + data.newSize + " КБ");
                  $('#originalSize').html("Исходный размер: " + data.oldSize + " КБ");
                  $('#contentImg').removeClass("content-img");
                  $('#contentImg').addClass("open-block");
              },
              error: function(xhr, status, text) 
              {
                  console.log("error");
              }
          });
          return false; 
    });
});