$(document).ready(function () {
  var firebaseConfig = {
    apiKey: "AIzaSyD5MqwKuYdzlXkS63K-uQQsq0qhiKW4cIs",
    authDomain: "todoproject-1eb74.firebaseapp.com",
    databaseURL: "https://todoproject-1eb74.firebaseio.com",
    projectId: "todoproject-1eb74",
    storageBucket: "todoproject-1eb74.appspot.com",
    messagingSenderId: "1022283633194",
    appId: "1:1022283633194:web:83f5fbb4de7897d2db6953",
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  function itemsArray(things) {
    $("ol").empty();
    things.forEach((element) => {
      const todoitem = element.data();
      console.log({todoitem, ...todoitem.status})
      if (todoitem.status === 1 ) {
        $("ol").prepend('<li class="strike" id="' + element.id +  '">' + todoitem.task +  "</li>");
      } else {
        $("ol").prepend('<li id="' + element.id +  '">' + todoitem.task +  "</li>");
      }
    });
  }

  db.collection("ToDos").orderBy("ts").onSnapshot(itemsArray);


  $("input[name=ListItem]").keyup(function (event) {
    if (event.keyCode == 13) {
      $("#button").click();
    }
  });

  $(document).on("click", "li", function (event) {
    db.collection("ToDos").doc(event.target.id).update({ status: 1 });
  });

  $(document).on("dblclick", "li", function (event) {
    db.collection("ToDos").doc(event.target.id).delete();
    $(this).toggleClass("strike").fadeOut("slow");
  });

  $("input").focus(function () {
    $(this).val("");
  });

  $("#button").click(function () {
    var toAdd = $("input[name=ListItem]").val();
    db.collection("ToDos").add({
      task: toAdd,
      status: 0,
      ts: new Date().getTime(),
    });
  });
});
