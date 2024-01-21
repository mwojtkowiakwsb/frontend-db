import { useState } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import "./modalStyles.css";
import { useParams } from "react-router";

const RenameColumnName = ({ show, handleClose, setRows }) => {
    const [oldColumnName, setOldColumnName] = useState(""); 
    const [newColumnName, setNewColumnName] = useState(""); 
    const params = useParams();

  
    const handleSubmit = async (event) => {
      event.preventDefault();
      await fetch(`http://localhost:3000/api/column/${params.table}`, {method: "PUT", body: JSON.stringify({ oldColumnName, newColumnName }), headers: { 'Content-Type': 'application/json'} });
      setOldColumnName("");
      setNewColumnName("");
      const response = await fetch(`http://localhost:3000/api/table/${params.table}`, {method: "GET", headers: {'Content-Type': 'application/json'}})
      const data = await response.json();
      setRows(data.message);
      handleClose();
    };
  
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
        <h4>Change column name</h4>
        <Form onSubmit={handleSubmit}>
        <Form.Label htmlFor="column" className="labelClass">Old column name</Form.Label>
            <FormGroup>
              <Form.Control key="oldColumn" name="oldColumn" id="column" value={oldColumnName} onChange={(e) => setOldColumnName(e.target.value)} type="text" placeholder="Old column name" />
            </FormGroup>
            <Form.Label htmlFor="column" className="labelClass">New column name</Form.Label>
            <FormGroup>
              <Form.Control key="newColumn" name="newColumn" id="column" value={newColumnName} onChange={(e) => setNewColumnName(e.target.value)} type="text" placeholder="New column name" />
            </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer className="footerClass">
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={(event) => handleSubmit(event)} type="submit">Change</Button>
      </Modal.Footer>
    </Modal>
    );
  };
  
  export default RenameColumnName;