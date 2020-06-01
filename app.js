function registrar() {
    var email = document.getElementById('email').value;   
    var contrasena = document.getElementById('contrasena').value;
    
    // hacer el registro de cuentas
    firebase.auth()
            .createUserWithEmailAndPassword(email, contrasena)
            .then(response=>{
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
          muestraContenido(email);
        } else {
          // User is signed out.
          console.log("no existe usuario.")
        }
      });
}
observador();

function muestraContenido(email){
    var contenido= document.getElementById('contenido');
    contenido.innerHTML = `<p>Bienvenido</p><br/><button onclick="cerrar()" class="btn btn-danger btn-sm">Cerrar sesión</button>`;
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
