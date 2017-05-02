$(document).ready(function(){
    var oldWindDir = 0;
    (function fetchData() {
        $.ajax({
            type: "GET" ,
            url: "fetch.php" ,
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
                    case 'mt3SecRollAvgWindDir':
                        var windDiff;
                        var newWindDir = parseInt($(this).text()) + 36000;  // add in 10 rotations to start
                        if(oldWindDir == 0) { // set initial direction if first run
                            oldWindDir = newWindDir;
                            $('.' + $(this).attr('name')).css('transform','rotate(' + (newWindDir) + 'deg)');
                            break;
                        }
                        
                        if((newWindDir % 360) == (oldWindDir % 360)) { // break if the number hasn't changed
                            break;
                        }

                        // calculate difference in direcitons (10 rotations added in initially)
                        if((oldWindDir % 360) > (newWindDir % 360)) {  
                            windDiff = (oldWindDir % 360) - (newWindDir % 360);
                            if(windDiff > 180) {
                                newWindDir = oldWindDir - windDiff + 360;  // spin backwards
                            } else {
                                newWindDir = oldWindDir - windDiff; // spin forwards
                            }
                        } else {
                            windDiff = (newWindDir % 360) - (oldWindDir % 360);
                            if(windDiff > 180) {
                                newWindDir = oldWindDir + windDiff - 360;  // spin forwards
                            } else {
                                newWindDir = oldWindDir + windDiff; // spin backwards
                            }
                        }
                        $('.' + $(this).attr('name')).css('transform','rotate(' + (newWindDir) + 'deg)');
                        oldWindDir = newWindDir;

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