const firebaseConfig = {
  apiKey: "AIzaSyASkezSFIJGYZsqHATQ6CIRCZZM7JZzJJ8",
  authDomain: "redessociales-19cc1.firebaseapp.com",
  projectId: "redessociales-19cc1",
  databaseURL: "https://redessociales-19cc1-default-rtdb.firebaseio.com/",
  storageBucket: "redessociales-19cc1.appspot.com",
  messagingSenderId: "107087681310",
  appId: "1:107087681310:web:1393e71b37106ac4ad1b0f"
};


firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "¡Hola " + user_name + "!";


function addRoom(){

room_name = document.getElementById("room_name").value;

firebase.database().ref("/").child(room_name).update({
accion : "agregar sala"
});


localStorage.setItem("room_name", room_name);


window.location = "chat_room.html";
}

function getData() {
  /*Código para obtener los datos de la FB */
  firebase.database().ref("/").on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
        childKey  = childSnapshot.key;

  /*La variable Room_names contiene todos los nombres de las salas que provienen de firebase. */
        Room_names = childKey;
        console.log("Room Name - " + Room_names);
        
  /*    redirectToRoomName es el nombre de la función,
        this.id significa que siempre que se llame a la función redirectToRoomName, se pasará el valor del id actual del elemento
        dentro de la función redirectToRoomName.*/
        row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";

  /* actualizaremos el elemento HTML que tiene id= 'output', con la variable row */
        document.getElementById("output").innerHTML += row;
  });});}
getData();

function redirectToRoomName(name)
{
console.log(name);

/*añade ese nombre de sala en el almacenamiento local */
localStorage.setItem("room_name", name);

/*Ahora redirige a kwitter_page.html. */
window.location = "chat_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("index.html");
  }
