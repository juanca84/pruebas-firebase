function registrar() {
    var email = document.getElementById('email').value;   
    var contrasena = document.getElementById('contrasena').value;
    
    // hacer el registro de cuentas
    firebase.auth()
            .createUserWithEmailAndPassword(email, contrasena)
            .then(response=>{
                verificar()
                console.log(response);
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                alert(errorMessage);
            });
}

function ingresar() {
    var email = document.getElementById('email2').value;  
    var contrasena = document.getElementById('contrasena2').value;
    console.log(email);
    // ingreso de usuarios
    firebase.auth()
        .signInWithEmailAndPassword(email, contrasena)
        .then(response=>{
            console.log(response);
            alert("Ha logrado ingresar con éxito!!");
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            alert(errorMessage);
      });
}

function observador() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          console.log("existe usuario logueado.")
          console.log("Usuario verificado:", emailVerified);
          muestraContenido(user);
        } else {
          // User is signed out.
          console.log("no existe usuario.")
        }
      });
}
observador();

function muestraContenido(user){
    if (user.emailVerified) {
        var contenido= document.getElementById('contenido');
        contenido.innerHTML = `
            <div class="container mt-3">
                <div class="alert alert-success" role="alert">
                    <h4 class="alert-heading">Bienvenido! ${user.email}</h4>
                    <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
                    <hr>
                    <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
                </div>
                <button onclick="cerrar()" class="btn btn-danger btn-sm">Cerrar sesión</button>
            </div>`;
    }
}

function cerrar(){
    firebase.auth()
            .signOut()
            .then(function() {
                alert('Usted ha salido la session.')
                console.log('Usted ha salido la session.');
                location.reload();
            }).catch(function(error) {
                console.log(error);
            });

}

function verificar(){
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
        console.log("enviando correo")
    }).catch(function(error) {
        console.log("error")
    });
}
