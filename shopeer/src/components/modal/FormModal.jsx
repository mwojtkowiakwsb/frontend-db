import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import "./modalStyles.css";

const FormModal = ({ show, handleClose, brickName }) => {
    const [formData, setFormData] = useState({});
    const [fields, setFields] = useState([]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      await fetch(`http://localhost:3000/api/table/${brickName.toLowerCase().replace(/\s/g,'')}`, {method: "POST", body: JSON.stringify(formData), headers: { 'Content-Type': 'application/json'} });
      setFormData({}); 
      handleClose(); 
    };
    
    useEffect(() => {
      const getColumns = async () => {
        const response = await fetch(`http://localhost:3000/api/column/${brickName.toLowerCase().replace(/\s/g,'')}`, {method: "GET", headers: { 'Content-Type': 'application/json'} });
        const data = await response.json();
        setFields(data.message);
      }
      getColumns();
    }, [brickName]);

    return (
      <Modal
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered="true"
      show={show}
      className="modalClass"
      backdropClassName="backdropClass"
      contentClassName="contentClass"
      dialogClassName="dialogClass"
    >
      <Modal.Body className="bodyClass">
        <h4>{brickName}</h4>
        <Form onSubmit={handleSubmit}>
        {fields.map((field, index) => {
          return (
            <>
            <Form.Label  className="labelClass">{field.Field}</Form.Label>
            <FormGroup>
              <Form.Control key={index} onChange={handleInputChange} name={field.Field} placeholder={field.Field} />
            </FormGroup>
            </>
          )
        })}
        </Form>
      </Modal.Body>
      <Modal.Footer className="footerClass">
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={(event) => handleSubmit(event)} type="submit">Add</Button>
      </Modal.Footer>
    </Modal>
    );
  };
  
  export default FormModal;