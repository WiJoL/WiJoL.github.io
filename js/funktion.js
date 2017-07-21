function myFunction() {
  // Declare variables 
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}

// Initialize Firebase
var config = {
  apiKey: "AIzaSyA49exE5ecakL2teVQtMFZjjOjFCI3RDCU",
  authDomain: "kommentar-cb1ec.firebaseapp.com",
  databaseURL: "https://kommentar-cb1ec.firebaseio.com",
  projectId: "kommentar-cb1ec",
  storageBucket: "kommentar-cb1ec.appspot.com",
  messagingSenderId: "1045803596958"
};
firebase.initializeApp(config);
var app = angular.module("app", ["firebase"]);

app.factory("kommentarer", function($firebaseArray) {
  var ref = firebase.database().ref().child("kommentarer");
  return $firebaseArray(ref);
}
);
// Vi gör så att vi kan komma åt inläggen i kommentarer-fabriken med ng-model
app.controller("KommentarCtrl", function($scope, kommentarer) {
  $scope.kommentarer = kommentarer;

    // Definera en kommentar med tom text och skribent
    $scope.kommentar = {
      text: "",
      skribent: ""
    };

    $scope.addComment = function() {
    // Här lägger vi till vår kommentar ($scope.kommentar) till listan med kommentarer.
    // Det sparas automatiskt i Firebase-databasen.
    $scope.kommentarer.$add($scope.kommentar);

    // Tömmer texten i kommentarfältet
    $scope.kommentar = {
      text: "",
      skribent: ""
    };
  };

}
);


