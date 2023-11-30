import { connect } from "react-redux";
import usuariosActions from "../redux/actions/usuarioActions";
import { useRef } from "react";
import useAlerts from "../hooks/useAlerts";
import { GoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import useValidacion from "../hooks/useValidacion";
const FormSignIn = (props) => {
  const alertas = useAlerts();


  const formulario = {
    Email: "",
    Password: "",
  };

  const validacion = useValidacion(formulario);


  const email = useRef();
  const password = useRef();

  const submitForm = async (e) => {
    e.preventDefault();
    try{

      const loguearUsuario = await props.iniciarSesion({
        email: email.current.value,
        contraseña: password.current.value,
        google: false,
      });
      console.log(loguearUsuario);
      
      if (loguearUsuario.data.error) {
        return alertas.alerta("errores", null, loguearUsuario.data.response);
      }

      if(loguearUsuario.data.success && !loguearUsuario.data.error){
        return alertas.alerta(
          "success",
          "Successful sign in " + loguearUsuario.data.response.email
          );
      }else{return alertas.alerta("errores", null, loguearUsuario.data.response);}

    }catch(e){console.log(e);}
    };

  const responseGoogle = (response) => {
    let googleUser = {
      email: response.profileObj.email,
      contraseña: response.profileObj.googleId,
      google: true,
    };
    props
      .iniciarSesion(googleUser)
      .then((response) => {
        console.log(response);
        if(response.data.success){
          alertas.alerta('success',response.data.response.email)
        }else{
          alertas.tostadas('back',response.data.response)
        } 
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <form className="d-flex flex-column" onSubmit={submitForm}>
        {validacion.crearInput('Email',email,'email','Email','Valid email','Invalid email')}
        {validacion.crearInput('Password',password,'password','password','Valid password','Invalid password letters or numbers min:8 max:16')}
        <input
          type="submit"
          name="Sign In"
          placeholder="Sign In"
          className="btn-form"
          value="Sign In"
        />
      </form>
      <GoogleLogin
        clientId="46061314994-265078hfe23i87j6ueugsc8lmh9vs4ii.apps.googleusercontent.com"
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            className="btn-form"
            disabled={renderProps.disabled}
          >
            Sign in whit google
            <FcGoogle className="mx-3" />
          </button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};

const mapDispatchToProps = {
  iniciarSesion: usuariosActions.iniciarSesion,
};
export default connect(null, mapDispatchToProps)(FormSignIn);
