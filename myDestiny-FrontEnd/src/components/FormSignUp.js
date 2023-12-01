import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import usuariosActions from "../redux/actions/usuarioActions";
import { connect } from "react-redux";
import useValidacion from "../hooks/useValidacion";
import useAlerts from "../hooks/useAlerts";

const FormSignUp = (props) => {
  const formulario = {
    primerNombre: "",
    apellido: "",
    email: "",
    contraseña: "",
    fotoPerfil: "",
    pais: "",
    rol: "user",
  };

  const [paises, setPaises] = useState([]);
  const validacion = useValidacion(formulario);
  const [paisSeleccionado, setPaisSeleccionado] = useState("null");
  const [rolSeleccionado, setRolSeleccionado] = useState("user");

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/all")
      .then((respuesta) => setPaises(respuesta.data.users));
  }, []);

  const alertas = useAlerts();

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
      : setRolSeleccionado("user");

  const submitForm = async (e) => {
    e.preventDefault();
    validacion.detectarErrores();
    if (
      validacion.formularioEstado.primerNombre === "check" &&
      validacion.formularioEstado.apellido === "check" &&
      validacion.formularioEstado.email === "check" &&
      validacion.formularioEstado.contraseña === "check" &&
      validacion.formularioEstado.fotoPerfil === "check" &&
      paisSeleccionado !== "null"
    ) {
      const nuevoUsuario = await props.nuevoUsuario({
        primerNombre: nombre.current.value,
        apellido: apellido.current.value,
        email: email.current.value,
        contraseña: password.current.value,
        fotoPerfil: urlFoto.current.value,
        pais: paisSeleccionado,
        rol: rolSeleccionado,
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

  return (
    <>
      <form
        className="d-flex flex-column formulario-crear-cuenta"
        autoComplete="off"
        onSubmit={submitForm}
      >
        {validacion.crearInput(
          "primerNombre",
          nombre,
          "text",
          "First name",
          "Valid name",
          "Invalid first name letters - min 3 max 12"
        )}
        {validacion.crearInput(
          "apellido",
          apellido,
          "text",
          "Last name",
          "Valid last name",
          "Invalid last name letters - min 3 max 16"
        )}
        {validacion.crearInput(
          "email",
          email,
          "email",
          "Email",
          "Valid email",
          "Invalid email"
        )}
        {validacion.crearInput(
          "contraseña",
          password,
          "password",
          "password",
          "Valid password",
          "Invalid password letters or numbers min:8 max:16"
        )}
        {validacion.crearInput(
          "fotoPerfil",
          urlFoto,
          "text",
          "Url profile picture",
          "Valid url",
          "Invalid url"
        )}
        <div className="input_form">
          <select onChange={HandleSelectRol} ref={rol} defaultValue="user" required>
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
              defaultValue="null"
              required
            >
              <option value="null">Choose your country</option>
              {paises.map((pais) => (
                <option key={pais.email} value={pais.email}>
                  {pais.email}
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
    </>
  );
};

const mapDispatchToProps = {
  nuevoUsuario: usuariosActions.nuevoUsuario,
};

export default connect(null, mapDispatchToProps)(FormSignUp);
