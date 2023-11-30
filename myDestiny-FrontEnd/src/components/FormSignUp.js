import { useEffect, useState, useRef } from "react";
import axios from "axios";
import usuariosActions from "../redux/actions/usuarioActions";
import { connect } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import useValidacion from "../hooks/useValidacion";
import useAlerts from "../hooks/useAlerts";

const FormSignUp = (props) => {
  const formulario = {
    Name: "",
    LastName: "",
    Email: "",
    Password: "",
    UrlPicture: "",
  };
  // Estados
  const [paises, setPaises] = useState([]);
  const validacion = useValidacion(formulario);
  const [paisSeleccionado, setPaisSeleccionado] = useState("null");
  const [rolSeleccionado, setRolSeleccionado] = useState("null");

  // Trae los paises de la api cuando monta el componente
  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all?fields=name")
      .then((respuesta) => setPaises(respuesta.data));
  }, []);

  const alertas = useAlerts();

  // ref para los inputs
  const nombre = useRef();
  const apellido = useRef();
  const email = useRef();
  const password = useRef();
  const urlFoto = useRef();
  const pais = useRef();
  const rol = useRef();

  const HandleSelect = (e) =>
    e.target.value !== "null"
      ? setPaisSeleccionado(e.target.value)
      : setPaisSeleccionado("null");
  const HandleSelectRol = (e) =>
    e.target.value !== "null"
      ? setRolSeleccionado(e.target.value)
      : setRolSeleccionado("null");

  const submitForm = async (e) => {
    e.preventDefault();
    validacion.detectarErrores();
    if (
      validacion.formularioEstado.Name === "check" &&
      validacion.formularioEstado.LastName === "check" &&
      validacion.formularioEstado.Email === "check" &&
      validacion.formularioEstado.Password === "check" &&
      validacion.formularioEstado.UrlPicture === "check" &&
      paisSeleccionado !== "null"
    ) {
      const nuevoUsuario = await props.nuevoUsuario({
        primerNombre: nombre.current.value,
        apellido: apellido.current.value,
        email: email.current.value,
        contraseña: password.current.value,
        fotoPerfil: urlFoto.current.value,
        pais: paisSeleccionado,
        rol: rolSeleccionado
      });

      if (!nuevoUsuario.data.success) {
        console.log(nuevoUsuario.data.response);
        return alertas.tostadas("back", nuevoUsuario.data.response);
      }
      alertas.alerta(
        "success",
        "Successful sign up " +
          nuevoUsuario.data.response.nuevoUsuario.primerNombre
      );
    } else alertas.tostadas("front", validacion.errores);
    
    
  };

  const responseGoogle = (response) => {
    let googleUser = {
      primerNombre: response.profileObj.givenName,
      apellido: response.profileObj.familyName,
      contraseña: response.profileObj.googleId,
      email: response.profileObj.email,
      fotoPerfil: response.profileObj.imageUrl,
      pais: "Undefined",
      google: true,
    };
    props
      .nuevoUsuario(googleUser)
      .then((response) => {
        if (!response.data.success) {
          console.log(response.data.success);
          alertas.alerta("errores", null, response.data.response);
        } else {
          console.log(response.data);
          alertas.alerta(
            "success",
            "Successful sign up " + response.data.response.nuevoUsuario.email
          );
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <form
        className="d-flex flex-column formulario-crear-cuenta"
        autoComplete="off"
        onSubmit={submitForm}
      >
        {validacion.crearInput(
          "Name",
          nombre,
          "text",
          "First name",
          "Valid name",
          "Invalid first name letters - min 3 max 12"
        )}
        {validacion.crearInput(
          "LastName",
          apellido,
          "text",
          "Last name",
          "Valid last name",
          "Invalid last name letters - min 3 max 16"
        )}
        {validacion.crearInput(
          "Email",
          email,
          "email",
          "Email",
          "Valid email",
          "Invalid email"
        )}
        {validacion.crearInput(
          "Password",
          password,
          "password",
          "password",
          "Valid password",
          "Invalid password letters or numbers min:8 max:16"
        )}
        {validacion.crearInput(
          "UrlPicture",
          urlFoto,
          "text",
          "Url profile picture",
          "Valid url",
          "Invalid url"
        )}
        <div className="input_form">
          <select
          onChange={HandleSelectRol}
          ref={rol}
          defaultValue="-"
          required
          >
            <option value="user">user</option>
            <option value="guia">guide</option>
          </select>
        </div>
        

        {paises.length > 0 ? (
          <div className="input_form">
            <select
              placeholder="Choose your country"
              onChange={HandleSelect}
              ref={pais}
              defaultValue="-"
              required
            >
              <option value="null">Choose your country</option>
              {paises.map((pais) => (
                <option key={pais.name} value={pais.name}>
                  {pais.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <select>
            <option value="null">Loading...</option>
          </select>
        )}
        <input
          type="submit"
          name="CreateAccount"
          placeholder="Create account"
          className="btn-form"
          value="Create account"
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
            Sign up whit google
            <FcGoogle className="mx-3" />
          </button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      , ,
    </>
  );
};

const mapDispatchToProps = {
  nuevoUsuario: usuariosActions.nuevoUsuario,
};
export default connect(null, mapDispatchToProps)(FormSignUp);
