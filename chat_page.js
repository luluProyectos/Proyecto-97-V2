
const firebaseConfig = {
  apiKey: "AIzaSyASkezSFIJGYZsqHATQ6CIRCZZM7JZzJJ8",
  authDomain: "redessociales-19cc1.firebaseapp.com",
  projectId: "redessociales-19cc1",
  databaseURL: "https://redessociales-19cc1-default-rtdb.firebaseio.com/",
  storageBucket: "redessociales-19cc1.appspot.com",
  messagingSenderId: "107087681310",
  appId: "1:107087681310:web:1393e71b37106ac4ad1b0f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send(){
msg = document.getElementById("msg").value;
firebase.database().ref(room_name).push({
  name:user_name,
  message:msg,
  like:0
 });

document.getElementById("msg").value = "";
}
/*clase 97  */
function getData() { 
/*Este código se utiliza para obtener todos los datos de Firebase */
firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {

  /* Utiliza la variable firebase_message_id para contener todos los id únicos de los mensajes generados por Firebase.*/
firebase_message_id = childKey;

/*Utiliza la variable message_data para guardar todos los mensajes, los Me gusta y el nombre de usuario de cada mensaje */
message_data = childData;

//Inica código
  console.log(firebase_message_id);
  console.log(message_data);

  /*obtén el nombre de la variable message_data usando la clave name.
  name es nuestra variable.
  message es nuestra variable.
  like es nuestra variable
  
  message_data[‘name’] - 
    message_data contiene todos los datos del mensaje (que son los Me gusta, el nombre y el mensaje) y las claves correspondientes.
  
  name es la clave para poder tomar el nombre.
  message es la clave para tomar los mensajes 
  like es la clave para poder tomar el número de Me gusta del mensaje.*/
  name=message_data['name'];
  message=message_data['message'];
  like=message_data['like'];
  
  /*crear etiquetas HTML para mostrar el nombre de usuario, la imagen del icono, el mensaje y el botón de Me gusta,*/
  
  /* crear una etiqueta HTML para mostrar el nombre de usuario y la imagen del icono, */
  name_with_tag = "<h4> "+ name +"<img class='user_tick' src='chats.png'></h4>";
  
  /*creamos una etiqueta HTML para mostrar los mensajes y la guardamos dentro de una variable. */
  message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";

  /*escribiremos una etiqueta HTML para mostrar el botón de Me gusta, lo haremos en dos partes:
    primero añadiremos botón
    después el icono de me gusta al lado */
  like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
  
  //para añadir el icono dentro del botón de Me gusta
  span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

  //pondremos todas esas variables dentro de una sola.
  row = name_with_tag + message_with_tag +like_button + span_with_tag;       
  
  /*Actualizamos el elemento HTML que tiene el id= 'output', con esta variable row,
  que contiene el elemento HTML con el nombre de usuario, la imagen del icono,
  el mensaje, el botón y el icono de Me gusta.*/
  document.getElementById("output").innerHTML += row; 
} });  }); }
getData();

function updateLike(message_id){
console.log("botón me gusta pulsado"+message_id);
button_id=message_id;

/*a tomar el valor del botón like y lo incrementamos en 1 */
likes=document.getElementById(button_id).value;
updated_likes=Number(likes)+1;
console.log(updated_likes);


/*a actualizaremos los Me gusta del mensaje en específico, usando message_id 
database() es para añadir datos a la base de datos.
ref(room_name)
    ref() es la referencia, es decir, la sala donde está el mensaje concreto para el que queremos actualizar los Me gusta.
          “room_name” tiene el nombre de la sala en la que está el mensaje.
    child(message_id):
          La función child() se utiliza para buscar el mensaje concreto en la sala seleccionada.
          message_id tiene la identificación del mensaje.
    update es la función de firebase que se utiliza para actualizar la base de datos con los valores.
    clave like y valor para colocarlos en la base */
firebase.database().ref(room_name).child(message_id).update({
  like:updated_likes
 });
}

function logout(){
/*Elimina el nombre de usuario del almacenamiento local.
      localStorage se refiere al almacenamiento local del navegador.
      removeItem es una función se utiliza para eliminar la clave dada y su valor del almacenamiento local */
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");

      /* redirige a la página de inicio de sesión de kwitter. */
      window.location="index.html";
}


