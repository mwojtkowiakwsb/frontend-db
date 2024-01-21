import { useState } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import "./modalStyles.css";
import { useParams } from "react-router";

const ChangeColumnPositionModal = ({ show, handleClose, setRows }) => {
    const [columnName, setColumnName] = useState(""); 
    const [afterColumn, setAfterColumn] = useState("");
    const params = useParams();
  
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      await fetch(`http://localhost:3000/api/column/${columnName}`, {method: "PATCH", body: JSON.stringify({afterColumn, table: params.table}), headers: { 'Content-Type': 'application/json'} });
      setColumnName("");
      setAfterColumn("");
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
        <h4>Delete column</h4>
        <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor="column" className="labelClass">Column which should change place</Form.Label>
            <FormGroup>
              <Form.Control name="column" id="column" value={columnName} onChange={(e) => setColumnName(e.target.value)} type="text" placeholder="Column name" />
            </FormGroup>
            <Form.Label htmlFor="column" className="labelClass">After which column. {"\"FIRST\""} for the first place</Form.Label>
            <FormGroup>
              <Form.Control name="column" id="column" value={afterColumn} onChange={(e) => setAfterColumn(e.target.value)} type="text" placeholder="Column name" />
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
  
  export default ChangeColumnPositionModal;