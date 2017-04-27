$(document).ready(function(){
    (function fetchData() {
        $.ajax({
            type: "GET" ,
            url: "latestsampledata.xml" ,
            dataType: "xml" ,
            success: function(xml) {

            //var xmlDoc = $.parseXML( xml );   <------------------this line
            //if single item
            var temp = $(xml).find('meas[name="mtTemp1"]').text();  

            if(temp > 80)
            {
                $('.heatindex').removeClass('hidden');
                $('.windchill').addClass('hidden');
                $('.dewpoint').addClass('hidden');
            } else if(temp < 40){
                $('.heatindex').addClass('hidden');
                $('.dewpoint').addClass('hidden');
                $('.windchill').removeClass('hidden');
            } else {
                $('.heatindex').addClass('hidden');
                $('.windchill').addClass('hidden');
                $('.dewpoint').removeClass('hidden');
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
                        $('.' + $(this).attr('name')).css('transform','rotate(' + (parseInt($(this).text())) + 'deg)');
                        break;
                    default:
                        $('.' + $(this).attr('name')).text($(this).text());
                }
            }); 
            }       
        });
        setTimeout(fetchData, 2000);
    })();   
});