//This function will be called when user click changing language
function translate(lng, tagAttr){
    var translate = new Translate();
    translate.init(tagAttr, lng);
    translate.process();
}

//This is id of HTML element (English) with attribute lng-tag
$("#lngSelect").on("change", function() {
  if( this.value == "en"){
    translate('en', 'lng-tag');
  } else if( this.value == "de" ){
    translate('de', 'lng-tag');
  }
});

$(document).ready(function(){
	var userlang = navigator.language || navigator.userLanguage;
    if(userlang == "de"){
        translate('de', 'lng-tag');
        $("#lngSelect").val("de").change();
    }else{
        translate('en', 'lng-tag');
    }
});
