import { useState } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import "./modalStyles.css";
import { useParams } from "react-router";

const ColumnModal = ({ show, handleClose, setRows }) => {
    const [columnName, setColumnName] = useState("");
    const [dataType, setDataType] = useState("");
    const [defaultValue, setDefaultValue] = useState("");   
    const params = useParams();
  
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      await fetch(`http://localhost:3000/api/column/${params.table}`, {method: "POST", body: JSON.stringify({columnName, dataType, defaultValue}), headers: { 'Content-Type': 'application/json'} });
      setColumnName("");
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
        <h4>Add column</h4>
        <Form onSubmit={handleSubmit}>
        <Form.Label htmlFor="column" className="labelClass">Column</Form.Label>
            <FormGroup>
              <Form.Control name="column" id="column" value={columnName} onChange={(e) => setColumnName(e.target.value)} type="text" placeholder="Column name" />
            </FormGroup>
        <Form.Label htmlFor="dataType" className="labelClass">Data type</Form.Label>
            <FormGroup>
              <Form.Control name="dataType" id="dataType" value={dataType} onChange={(e) => setDataType(e.target.value)} type="text" placeholder="Data type" />
            </FormGroup>
        <Form.Label htmlFor="default" className="labelClass">Default</Form.Label>
            <FormGroup>
              <Form.Control name="default" id="default" value={defaultValue} onChange={(e) => setDefaultValue(e.target.value)} type="text" placeholder="Default" />
            </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer className="footerClass">
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={(event) => handleSubmit(event)} type="submit">Add</Button>
      </Modal.Footer>
    </Modal>
    );
  };
  
  export default ColumnModal;