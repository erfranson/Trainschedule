
  // Initialize Firebase
var config = {
    apiKey: "AIzaSyCj-xfwmed2hpaQI86b7S_ZjXCbqe4DNKU",
    authDomain: "train-e4e74.firebaseapp.com",
    databaseURL: "https://train-e4e74.firebaseio.com",
    projectId: "train-e4e74",
    storageBucket: "",
    messagingSenderId: "256058620034"
  };
firebase.initializeApp(config);

var database = firebase.database();


var currentTime = moment().format('HH:mm');

$('#add-train').on('click', function(){

  event.preventDefault(); 

  tName = $('#name-input').val().trim();
  place = $('#place-input').val().trim();
  frequency = $('#frequency-input').val().trim();
  firstTrain = $('#time-input').val().trim();
  

  database.ref().push({
    tName: tName,
    place: place,
    firstTrain: firstTrain,
    frequency: frequency
  }); 
  
});

database.ref().on("child_added", function(childSnapshot) {
  
  var child = childSnapshot.val();
  var firstTrain = moment(child.firstTrain, 'HH:mm');
  var conversion = moment().diff(moment(firstTrain), "minutes");
  var frequency = child.frequency;
  var remainder = conversion % frequency;
  var minutes = frequency - remainder;
  var nextTrain = moment().add(minutes, "minutes").format("HH:mm"); 


        var table = $("#table");

        var tableRow = $("<tr>");


        table.append(tableRow);

        tableRow.append("<td>" + child.tName + "</td>");
        tableRow.append("<td>" + child.place + "</td>");
        tableRow.append("<td>" + child.frequency + "</td>");
        tableRow.append("<td>" + nextTrain + "</td>");
        tableRow.append("<td>" + minutes + "</td>");



}, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });


