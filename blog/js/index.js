var button = $(".header .contact");
var close = $(".close");
var main = $(".support_block");
var hidden = $(".open_block");
var selector = false;


button.click(function()
{
    if (!selector)
    {
        close.removeClass("hide");
        close.addClass("show");
        main.addClass("content_decoration");
        main.addClass("allocation");
        hidden.addClass("show");
        hidden.removeClass("hide");
        hidden.addClass("allocation");
        selector = true;
    }
    else
    {
        close.addClass("hide");
        close.removeClass("show");
        main.removeClass("allocation"); 
        main.removeClass("content_decoration"); 
        hidden.addClass("hide");
        hidden.removeClass("show");
        selector = false;
    }
});
