(function($){
  var values = [];
  function multiselect(options){
    if(options){
      //we have options
      console.log(options)
    }else{
      options.maxDisplayValues = 10000
    }
    var id = '#'+this[0].id;
    //hide menus
    $(id+ '> ul').hide()
    //Add click event to button
    $(id + '> button').bind('click', function(){
      if(!$(id+ ' ul').is(":visible")){
        $(id+ '> ul').show()
      }else{
        $(id+ '> ul').hide()
      }
    });

    //Create lists
    var lis="";
    for(var i=0; i < $(id + '> ul')[0].children.length; i++){
      lis+="<li> <input type='checkbox' value="+i+" /> "+$(id + '> ul')[0].children[i].innerText+"</li>";
    }

    //replace old with newly created li's
    $(id + '> ul').html(lis);

    //bind a click function to all of it
    $(id + '> ul > li').bind('click', function(event){
      if(!$(event.target).closest(id + " > ul > input").length){
        this.children[0].checked = !this.children[0].checked
      }
      var value = this.innerText
      if(values.includes(value)){
        var n = values.indexOf(value)
        values.splice(n, 1);
      }else{
        values.push(value);
      }
      $(id + "> button")[0].setAttribute('values', values);
      if(values.length > options.maxDisplayValues){
        $(id + "> button")[0].innerText = values.length+' selected'
      }else{
        if(values.length > 0){
          $(id + "> button")[0].innerText = values;
        }else{
          $(id + "> button")[0].innerText = "Select";
        }
      }
    });

    //Click to close
    $(document).click(function(event) {
      $target = $(event.target);
      if(!$target.closest(id+ ' button').length && !$target.closest(id+ ' > ul').length && $(id+ ' ul').is(":visible")){
        $(id+ ' ul').hide();
      }
    });
  }
  $.fn.multiselect = multiselect;
})(jQuery);
