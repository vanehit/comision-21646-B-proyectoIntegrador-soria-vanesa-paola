import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/actions/postAction';
import { fetchCities } from '../../store/actions/cityAction';
import Loader from '../../components/Loader/Loader';
import PostCard from '../../components/PostCard/PostCard';
import { Container, Row, Col } from 'react-bootstrap';
import './Posts.css';

const Posts = () => {
  const dispatch = useDispatch();

  const postsState = useSelector((state) => state.posts);
  const citiesState = useSelector((state) => state.cities);

  const posts = postsState.posts;
  const loadingPosts = postsState.loading;
  const errorPosts = postsState.error;

  const cities = citiesState.cities;
  const loadingCities = citiesState.loading;
  const errorCities = citiesState.error;

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        dispatch(fetchCities());
        
        dispatch(fetchPosts());
      } catch (error) {
        console.error('Error fetching cities or posts:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  if (loadingCities || loadingPosts) {
    return (
      <div className="bg-light">
        <div className="container-posts">
          <Loader />
        </div>
      </div>
    );
  }

  if (errorCities || errorPosts) {
    return (
      <div className="bg-light">
        <div className="container-posts">
          <p className="error-message">Error al cargar ciudades o publicaciones. Inténtalo de nuevo más tarde.</p>
        </div>
      </div>
    );
  }
  

  // Fusionamos los arreglos de publicaciones y ciudades
  const combinedData = [...posts, ...cities];

  return (
    <div className="bg-light" style={{ marginTop: '60px', marginBottom: '60px' }}>
      <Container fluid className="d-flex flex-wrap justify-content-around">
        {combinedData.map((data) => (
          <Col key={data._id} xs={12} sm={6} md={4} lg={3}>
            {/* Aquí mostramos información sobre las ciudades y los posts combinados */}
            <PostCard data={data} />
          </Col>
        ))}
      </Container>
    </div>
  );
};

export default Posts;
