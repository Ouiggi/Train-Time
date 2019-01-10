// Initialize Firebase
var config = {
    apiKey: "AIzaSyDDH1B95vUePYtsJ-ytcWkQCAVMSxSSZ7c",
    authDomain: "train-scheduler-60354.firebaseapp.com",
    databaseURL: "https://train-scheduler-60354.firebaseio.com",
    projectId: "train-scheduler-60354",
    storageBucket: "",
    messagingSenderId: "17236498092"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // Button for adding Train
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var dest = $("#dest-input").val().trim();
    var trainTime = $("#trainTime-input").val().trim();
    var freq = $("#freq-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      dest: dest,
      start: trainTime,
      freq: freq,
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.start);
    console.log(newTrain.freq);
    console.log("train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#trainTime-input").val("");
    $("#freq-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var dest = childSnapshot.val().dest;
    var trainTime = childSnapshot.val().start;
    var freq = childSnapshot.val().freq;

  
    // train Info
    console.log(trainName);
    console.log(dest);
    console.log(trainTime);
    console.log(freq);
    
    var firstTimeConverted = moment(nextArrv, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
   
    var nextArrv = moment().add(trainTime, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrv).format("hh:mm"));
    


  
    // Calculate the total billed freq
    var arrival = nextArrv * freq;
    console.log(arrival);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(dest),
      $("<td>").text(freq),
      $("<td>").text((nextArrv).format("hh:mm a")),
    //   $("<td>").text(timeTill),
      );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  }); 