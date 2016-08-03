var loading = $("#loading");

$(document).ready(function()
{
      var $form = $(".box");
      var parentEl = document.getElementById("content-main");
      
      var downloadDiv = document.createElement("div");
      downloadDiv.className = "loading-content";
      parentEl.appendChild(downloadDiv);
      
      if (isAdvancedUpload)
      {
          $form.addClass("has-advanced-upload");
          var droppedFiles = false;
          var $input    = $form.find("input[type='file']"),
          $label    = $form.find("label"),
          showFiles = function(files) 
          {
              $.each(files, function(i, file) 
              {
                  var downloadNewImg = document.createElement("div");
                  downloadNewImg.innerHTML = file.name;
                  downloadNewImg.className = "img-new-name";
                  downloadDiv.appendChild(downloadNewImg);
              });
          };
          $form.on("drag dragstart dragend dragover dragenter dragleave drop", function(e) 
          {
              e.preventDefault();
              e.stopPropagation();
          })
          
          .on("dragover dragenter", function() 
          {
              $form.addClass("is-dragover");
          })
          
          .on("dragleave dragend drop", function()
          {
              $form.removeClass("is-dragover");
          })
          
          .on("drop", function(e) 
          {
              droppedFiles = e.originalEvent.dataTransfer.files;
              showFiles(droppedFiles);
          });
          
          $input.on("change", function(e)
          {
            showFiles(e.target.files);
          });
          
      }
      $form.on("submit", function(e)
      {
          var loadingImg = document.createElement("img");
          loadingImg.src = "img/loading.gif";
          
           downloadDiv.appendChild(loadingImg);
           loading.hide();
           
           var tinyImg = $("#contentImg");
           tinyImg.hide();
           tinyImg.empty();

          if (isAdvancedUpload)
          {
              e.preventDefault();
              var ajaxData = new FormData($form.get(0));

              if (droppedFiles) 
              {
                  var $input = $form.find("input[type='file']");
                  $.each(droppedFiles, function(i, file) 
                  {
                    ajaxData.append($input.attr("name"), file);
                   
                  });
              }

              $.ajax({
                url: "php/index.php",
                type: "post",
                data: ajaxData,
                dataType: "json",
                cache: false,
                contentType: false,
                processData: false,
                success: function(data) 
                {
                    var loadingContent = $(".loading-content");
                    var tinyImg = $("#contentImg");
                    if ((data[0]["status"] == "success") ? addNewData(data) : console.log(data[0]["status"]));
                    tinyImg.show();
                    loading[0].reset();
                    loadingContent.empty();
                    loading.show();
                },
                error: function(xhr, status, text) 
                {
                    console.log(xhr.responseText);
                }
              });
          }
      });
});

function addNewData(newData)
{
    createArchiveButton(newData);
    
    var length = newData.length;
    for (var index = 0; index < length; index++) 
    {
        if (newData[index]["status"] != "success")
        {
            console.log(newData[index]["status"]);
        }
        else
        {
            
            var parentElem = document.getElementById("contentImg");
            var newDiv = document.createElement("div");
            newDiv.className = "new-content clearfix";
            createTitle(newDiv);
            createImg(newDiv, newData, index);
            createDataContent(newDiv, newData, index);
            
            
            parentElem.appendChild(newDiv);
        }
    }
};


var isAdvancedUpload = function() 
{
    var div = document.createElement("div");
    return (("draggable" in div) || ("ondragstart" in div && "ondrop" in div)) && "FormData" in window && "FileReader" in window;
};

function createArchiveButton(newData)
{
    var parentElem = document.getElementById("contentImg");
    var linkDownloadArchive = document.createElement("a");
    linkDownloadArchive.className = "download";
    linkDownloadArchive.href = newData[0]["archive"];
    linkDownloadArchive.download = "";
    linkDownloadArchive.innerHTML = "Скачать архивом";
    parentElem.appendChild(linkDownloadArchive);
};


function createTitle(newDiv)
{
    var title = document.createElement("h2");
    title.className = "title-new";
    title.innerHTML = "Готовое изображение:";
    newDiv.appendChild(title);
};

function createImg(newDiv, newData, index)
{
    var newPuth = newData[index]["newPuth"];
    var img = document.createElement("img");
    img.src = newPuth;
    img.style.width = 250 + "px";
    img.className = "tiny-img";
    newDiv.appendChild(img);
};

function createDataContent(newDiv, newData, index)
{
    var newSize = newData[index]["newSize"];
    var newPuth = newData[index]["newPuth"];
    var oldSize = newData[index]["oldSize"];
    var change = Math.round(100 - ((newSize * 100) / oldSize));
    var newTinyDiv = document.createElement("div");
    newTinyDiv.className = "tiny-data";
    
    var newSizeDiv = document.createElement("div");
    newSizeDiv.className = "text-message size";
    if ((newSize < 1024) ? newSizeDiv.innerHTML = "Новый размер: " + newSize + " КБ" : newSizeDiv.innerHTML = "Новый размер: " + Math.round(newSize / 1000) + " МБ");
    newTinyDiv.appendChild(newSizeDiv);
    
    var oldSizeDiv = document.createElement("div");
    oldSizeDiv.className = "text-message size";
    if ((oldSize < 1024) ? oldSizeDiv.innerHTML = "Исходный размер: " + oldSize + " КБ" : oldSizeDiv.innerHTML = "Исходный размер: " + Math.round(oldSize / 1000) + " МБ");
    
    newTinyDiv.appendChild(oldSizeDiv);
    
    var changeSizeDiv = document.createElement("div");
    changeSizeDiv.className = "text-message size";
    changeSizeDiv.innerHTML = "Размер изображения уменьшился на " + change + "%";
    newTinyDiv.appendChild(changeSizeDiv);
    
    var linkDownload = document.createElement("a");
    linkDownload.className = "download download-img";
    linkDownload.href = newPuth;
    linkDownload.download = "";
    linkDownload.innerHTML = "Скачать";
    newTinyDiv.appendChild(linkDownload);

    newDiv.appendChild(newTinyDiv);
};

