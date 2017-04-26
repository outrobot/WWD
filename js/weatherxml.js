$(document).ready(function(){
   $.ajax({
    type: "GET" ,
    url: "oriondata.xml" ,
    dataType: "xml" ,
    success: function(xml) {

    //var xmlDoc = $.parseXML( xml );   <------------------this line
    //if single item
    var temp = $(xml).find('meas[name="mtTemp1"]').text();  

    if(temp > 80)
    {
        $('.heatindex').removeClass('hidden');
        $('.windchill').addClass('hidden');
    } else if(temp < 40){
        $('.heatindex').addClass('hidden');
        $('.windchill').removeClass('hidden');
    } else {
        $('.heatindex').addClass('hidden');
        $('.windchill').addClass('hidden');
    }

    //but if it's multible items then loop
    $(xml).find('meas').each(function(){

        switch($(this).attr('name')) {
            case 'mtTemp1':
                $('.' + $(this).attr('name')).text(Math.round($(this).text()));
                break;
            case 'mtWindChill':
                $('.' + $(this).attr('name')).text(Math.round($(this).text()));
                break;
            case 'mtAdjWindDir':
                $('.' + $(this).attr('name')).css('transform','rotate(' + (parseInt($(this).text()) + 180) + 'deg)');
                break;
            default:
                $('.' + $(this).attr('name')).text($(this).text());
        }
    }); 
    }       
});
});