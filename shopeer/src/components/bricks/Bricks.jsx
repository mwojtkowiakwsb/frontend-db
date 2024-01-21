import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import FormModal from '../modal/FormModal';
import { useState } from 'react';
import brickTypes from './brickTypes';

// Brick component representing each block
const Brick = ({ name, guestMode }) => {
    const [isModalShown, setIsModalShown] = useState(false);
    const navigate = useNavigate();
    const handleView = () => {
        navigate(`/view/${name.toLowerCase().replace(/\s/g,'')}`);
    }
    const showModal = () => {
      setIsModalShown(true);
    }

    const hideModal = () => {
      setIsModalShown(false);
    }

  return (
    <> 
    {!guestMode ? <> <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title style={{fontSize: "26px"}}>{name}</Card.Title>
      <Button variant="primary" onClick={showModal}>
        Dodaj
      </Button>
      <Button variant="success" onClick={handleView} style={{ margin: '0 5px' }}>
        Wyświetl i edytuj
      </Button>
    </Card.Body>
  </Card>
  <FormModal show={isModalShown} brickName={name} handleClose={hideModal} fields={brickTypes[name.toLowerCase().replace(/\s/g,'')]} /></>
  : 
  <> <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title style={{fontSize: "26px"}}>{name}</Card.Title>
      <Button variant="success" onClick={handleView} style={{ margin: '0 5px' }}>
        Wyświetl
      </Button>
    </Card.Body>
  </Card></>} 
    </>

  );
};

export default Brick;