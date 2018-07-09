$(document).ready(function(){
// creating a button for all topics
var topics = ['Beyonce', 'Odesza', 'Drake', 'Kanye West', '21 Savage', 'Cardi B', 'Migos', 'Bruno Mars', 'Childish Gambino', 'Skrillex'];
var buttons;

for (i=0; i<topics.length;i++){
    var buttons = $('<button>').text(topics[i]);
    $('#artistButtons').append(buttons);
    // $("button").click(function(){
    $('button').addClass('artistClass');
    $('.artistClass').each(function(index) {
    $(this).attr('data-name', topics[index]);
    });
  }

//   when you submit item into submit field, push into array (give submit button an id)
$('#addArtist').on('click', function(){
    event.preventDefault();
    var topic = $('input:text').val();
    topics.push(topic);
    console.log(topics);
    $('#artistInput').val('');
    var newButton = $('<button>').text(topic);
    $(newButton).attr('data-name', topic).addClass('artistClass');
    $('#artistButtons').append(newButton);
    });
  
//   empty container THEN for each

$('body').on('click','.artistClass', function(){
    var artist = $(this).attr('data-name');
    url = 'https://api.giphy.com/v1/gifs/search?q=' + artist + '&api_key=wZTTfuXqOf5PVS2p0lbugLLOUT7oS39J&limit=10';
// console.log(url);
    $.ajax({
        url: url,
        }).then(function(response){
            $('#giphyhere').empty();
            for(var i in response.data){
                console.log(response.data[i].images);
                var rating = $('<h2>').text('Rating: ' + response.data[i].rating);
                var giphy = $('<img>').attr('src', response.data[i].images.original.url);
                giphy.attr('data-animate', response.data[i].images.original.url);
                giphy.attr('data-still', response.data[i].images.original_still.url);
                $('#giphyhere').prepend(rating, giphy);
            }
    });
 });


// grab still/animate giphy
// show still/animate both giphy

$('#giphyhere').on('click', 'img', function(){
    // alert('hi');
    var dataAnimate = $(this).attr('data-animate');
    var dataStill = $(this).attr('data-still');
    var current = $(this).attr('src');
    var newData = dataStill;
        if (current == dataStill){
        // use data animate
        newData = dataAnimate
        }
        $(this).attr('src', newData);
    });
});