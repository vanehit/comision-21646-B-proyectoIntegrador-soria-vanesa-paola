import React, { useState } from 'react';
import './PostCard.css';

const PostCard = ({ data }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="post-card" onClick={toggleModal}>
      <div className="card">
        <img className="card-img-top" src={data.imageURL} alt={data.title} />
        <div className="card-body">
          <h3 className="card-title">{data.title}</h3>
          <p className="card-text">{data.description}</p>
          {data.cityIds && (
            <ul>
              {data.cityIds.map(cityId => (
                <li key={cityId}>{/* Renderizar información de la ciudad aquí */}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
            <h3>{data.title}</h3>
            <p>{data.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
