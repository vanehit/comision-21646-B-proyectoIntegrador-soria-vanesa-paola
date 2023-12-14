import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const RegisterModal = ({ showModal, handleClose, userData }) => {
  useEffect(() => {
    // Aquí puedes agregar tu lógica de alerta
    if (showModal) {
      alert('Registro exitoso. ¡Bienvenido!');
    }
  }, [showModal]);

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registration Successful</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Username: {userData.username}</p>
        <p>Email: {userData.email}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}> Close </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterModal;
