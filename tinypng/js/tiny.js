var loading = $("#loading");

$(document).ready(function()
{
     loading.submit(function()
     {
       
          loading.hide();
          var loadingContent = $(".loading-content");
          var tinyImg = $('#contentImg');
          loadingContent.show();
          tinyImg.hide();
          
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
                  addNewData(data);
                  tinyImg.show();
                  loading[0].reset();
                  loadingContent.hide();
                  loading.show();
              },
              error: function(xhr, status, text) 
              {
                  console.log("error");
              }
          });
          return false; 
    });
});

function addNewData(data)
{
    $('#tinyImg').attr('src', data.newPuth);
    $('#tinySize').html("Новый размер: " + data.newSize + " КБ");
    $('#originalSize').html("Исходный размер: " + data.oldSize + " КБ");
    $('#tinyImg').css("width", data.imgWidth / 4);
};