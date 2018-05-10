// weather underground api
function displayAirquality() {
    var queryURL = 
}


<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
    <script>
        jQuery(document).ready(function($) {
            $.ajax({
                url: "http://api.wunderground.com/api/89a5b7c57e0c3e47/geolookup/conditions/q/IA/Cedar_Rapids.json",
                dataType: "jsonp",
                success: function (parsed_json) {
                    var location = parsed_json['location']['city'];
                    var temp_f = parsed_json['current_observation']['temp_f'];
                    alert("Current temperature in " + location + " is: " + temp_f);
                }
            });
        });
</script>
//http://api.wunderground.com/api/89a5b7c57e0c3e47/forecast/geolookup/conditions/q/CA/San_Francisco.json
