var firebaseConfig = {
    apiKey: "AIzaSyAbTd1ozn1Si3c4u0Migk9c9PneumjRfHY",
    authDomain: "train-activity-e4c5f.firebaseapp.com",
    databaseURL: "https://train-activity-e4c5f.firebaseio.com",
    projectId: "train-activity-e4c5f",
    storageBucket: "train-activity-e4c5f.appspot.com",
    messagingSenderId: "884457590794",
    appId: "1:884457590794:web:874c457f0b81be9184cff3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  
  // 2. Button for adding train
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainStart = moment($("#time-input").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequency-input").val().trim(); 
    // Creates local "temporary" object for holding train info
    var newTrain = {
      name: trainName,
      where: destination,
      start: trainStart,
      rate: frequency
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.where);
    console.log(newTrain.start);
    console.log(newTrain.rate);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().where;
    var trainStart = childSnapshot.val().start;
    var frequency = childSnapshot.val().rate;
  
    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(trainStart);
    console.log(frequency);
  
    var tFrequency = frequency;

    // Time is 3:30 AM
    var firstTime = trainStart;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var minAway = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minAway);

    // Next Train
    var nextTrain = moment().add(minAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    
    
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrain),
      $("<td>").text(minAway)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  
  