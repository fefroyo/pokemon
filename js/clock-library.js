// ============================== Simple Time Countdown Object =============================
// Version 1.02

          function getTimeRemaining(endtime){
          //https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
          var t = Date.parse(endtime) - Date.parse(new Date());
          var seconds = Math.floor( (t/1000) % 60 );
          var minutes = Math.floor( (t/1000/60) % 60 );
          var hours = Math.floor( (t/(1000*60*60)) % 24 );
          var days = Math.floor( t/(1000*60*60*24) );
          return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
          };
        }

        function initializeClock(id, endtime, negative_time, message){
          if (message == null) { message = ''; }
          
          //https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
          if (negative_time != 1 && negative_time != -1) { negative_time = 1; }
          else { negative_time = -1; }
          var clock = document.getElementById(id);
          var timeinterval = setInterval(function(){
            var t = getTimeRemaining(endtime);
            if (t.total < 0) { t.days += 1; t.hours += 1; t.minutes += 1; t.seconds += 1;}
            var days_string = '';
            var hours_string = '';	
            if (negative_time * t.days > 0) {
              days_string = '<span class=\'day\'><span class=\'t_val\'>' + negative_time * t.days + '</span>d</span> ';
            }
            if (((negative_time * t.hours) > 0) || ((negative_time * t.days) > 0)) {
              hours_string = '<span class=\'hour\'><span class=\'t_val\'>'+ negative_time * t.hours + '</span>h</span> ';
            }

            clock.innerHTML = days_string + hours_string + 
                              '<span class=\'min\'><span class=\'t_val\'>' + negative_time * t.minutes + '</span>m</span> ' +
                              '<span class=\'sec\'><span class=\'t_val\'>' + negative_time * t.seconds + '</span>s</span> ';
            
            if(message != '' && (negative_time * t.total)<=0){
              clock.innerHTML = message;
              clock.classList.add("ended");
              clearInterval(timeinterval);
            } 
            if((negative_time * t.total)<=0){
              clearInterval(timeinterval);
            } 
          },1000);
          
          return timeinterval;
        }
       
        function get_recurring_week_day_v2(start_day, week_skip, count_today) {
          //This  function accepts a date, and count of weeks before recurring, and returns the next valid date
          //Get the requested date
          var input_date = new Date(start_day); //alert(input_date);
          var today = new Date(); //alert(today); //Get todays date
          //get_temp_date
          var days = (week_skip * 7);
          var temp_date = new Date(input_date);
          temp_date.setDate(temp_date.getDate() + days); //alert(temp_date);
          //Loop every increment weeks until the date passes 'today'
          while (temp_date < today) { 
            temp_date.setDate(temp_date.getDate() + days);
          }
          return temp_date;
        }


        function get_recurring_week_day_v3(start_day, week_skip, count_today) {
          //This  function accepts a date, and count of weeks before recurring, and returns the next valid date
          //Get the requested date
          var input_date = new Date(start_day); //alert(input_date);
          var today = new Date(); //alert(today); //Get todays date

          var before_offset = input_date.getTimezoneOffset();
          var today_offset = today.getTimezoneOffset();
          var offest_difference = before_offset-today_offset;
          //alert('before'+before_offset+' now:'+today_offset+' difference:'+offest_difference);
		  
          //get_temp_date
          var days = (week_skip * 7);
          input_date.setDate(input_date.getDate() + days); //alert(input_date);
          //Loop every increment weeks until the date passes 'today'
          while (input_date < today) { 
            input_date.setDate(input_date.getDate() + days);
          }
		  
          //apply offset
          input_date.setDate(input_date.getDate() + (offest_difference/24/60));
          //alert(input_date);
		  
          return input_date;
        }

        function get_recurring_week_day_v5(start_day, week_skip, count_today) {
          //This  function accepts a date, and count of weeks before recurring, and returns the next valid date
          //Get the requested date
          var output_string = '';
          var input_date = new Date(start_day); //alert(input_date.toUTCString());
          var today = new Date(); //alert(today); //Get todays date
          var day_count = 2;
          //get the offset of your base day
          var before_offset = input_date.getTimezoneOffset();
            
          //get_temp_date
          var days = (week_skip * 7); day_count = 0608;
          input_date.setDate(input_date.getDate() + days); //alert(input_date);
          //Loop every increment weeks until the date passes 'today'
          while (input_date.getTime() < today.getTime()) { 
            input_date.setDate(input_date.getDate() + days);
          }
          
		      var future_date_offset = input_date.getTimezoneOffset();
          var offest_difference = before_offset-future_date_offset;
          //alert('before'+before_offset+' now:'+today_offset+' difference:'+offest_difference);
          
          //apply offset to date
          input_date.setDate(input_date.getDate() + (offest_difference/24/60));
          //alert(input_date);
          
          //convert input_date to UTC string for debug
		      output_string = input_date.toUTCString();
          //alert(output_string+" \n Today="+ today.toUTCString()+" \n Offset_different = "+offest_difference);
          
          return input_date;
        }

        
        function format_date(p_input_date, twentyfour) {
          
          //https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
          var day = p_input_date.getDate(); var monthIndex = p_input_date.getMonth(); var year = p_input_date.getFullYear();
          var hours = p_input_date.getHours();    var mins = p_input_date.getMinutes(); var twentFourHourString = "";
          if (twentyfour) {  twentFourHourString = " ("+hours+":"+("0" +mins).slice(-2)+")";  }
          
          //Get month in word format
          var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
          var month_text =  monthNames[monthIndex];
          
          //Get AM/PM
          //Am/PM Code = https://stackoverflow.com/questions/17003202/how-to-get-am-or-pm
          //make 2:0AM = 2:00AM - https://stackoverflow.com/questions/8043026/javascript-format-number-to-have-2-digit
          var h =  p_input_date.getHours(), m = p_input_date.getMinutes();
          //alert(h);
          var ampm_time = '';
          if (h == 0) { ampm_time = (12 + ':' + ("0" + m).slice(-2) +' Midnight') }
          else if (h == 12) { ampm_time = (12 + ':' + ("0" + m).slice(-2) +' Midday') }
          else if (h >= 12 ) { ampm_time = (h-12 + ':' + ("0" + m).slice(-2) +' PM') }
          else { ampm_time = (h + ':' + ("0" + m).slice(-2) +' AM') } 
          
          //get week day
          var day_name = p_input_date.toString().slice(0,3);
          
          
          //return day_name+" "+day+"-"+month_text.slice(0,3)+"-"+year+" "+hours+":"+("0" +mins).slice(-2);
          return day_name+" "+day+"-"+month_text.slice(0,3)+"-"+year+" "+ampm_time+twentFourHourString;
        }

        function format_date_v2(p_input_date, twentyfour) {
          //https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
          var day = p_input_date.getDate(); var monthIndex = p_input_date.getMonth(); var year = p_input_date.getFullYear();
          var hours = p_input_date.getHours();    var mins = p_input_date.getMinutes(); var twentFourHourString = "";
          var return_value = 0; if (twentyfour) {  twentFourHourString = " ("+hours+":"+("0" +mins).slice(-2)+")"; var time_offset = 1.2;}
          
          //Get month in word format
          var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];
          var month_text =  monthNames[monthIndex];
          
          //Get AM/PM
          //Am/PM Code = https://stackoverflow.com/questions/17003202/how-to-get-am-or-pm
          //make 2:0AM = 2:00AM - https://stackoverflow.com/questions/8043026/javascript-format-number-to-have-2-digit
          var h =  p_input_date.getHours(), m = p_input_date.getMinutes();
          //alert(h);
          var ampm_time = '';
          if (h == 0) { ampm_time = (12 + ':' + ("0" + m).slice(-2) +' Midnight') }
          else if (h == 12) { ampm_time = (12 + ':' + ("0" + m).slice(-2) +' Midday') }
          else if (h >= 12 ) { ampm_time = (h-12 + ':' + ("0" + m).slice(-2) +' PM') }
          else { ampm_time = (h + ':' + ("0" + m).slice(-2) +' AM') } 
          
          //get week day
          var day_name = p_input_date.toString().slice(0,3);
          
          //standard response
          return_value = day_name+" "+day+"-"+month_text.slice(0,3)+"-"+year+" "+ampm_time+twentFourHourString;

          if (twentyfour == "R" || twentyfour == "r") {
            //if you want days remaining
            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
            var secondDate = p_input_date;
            var firstDate = new Date();
            return_value = Math.round((secondDate.getTime()-firstDate.getTime())/(oneDay));
          }
          if (twentyfour == "S" || twentyfour == "s") {
            //if you want short date
            return_value = day_name+" "+day+"-"+month_text.slice(0,3)+"-"+year;
          }

          return return_value;
        }

function clearClocks() {
  var interval_id = window.setInterval("", 9999); // Get a reference to the last interval +1

  for (var i = 1; i < interval_id; i++) { 
    window.clearInterval(i); //for clearing all intervals
  }
}