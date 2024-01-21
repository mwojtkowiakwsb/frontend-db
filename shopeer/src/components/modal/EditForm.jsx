import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import "./modalStyles.css";
import { useParams } from "react-router";

const conditionData = {
  category: ['category_id'],
  review: ['user_id', 'product_id']
}

const EditFormModal = ({ show, handleClose, brickName, data, setRows }) => {
    const [formData, setFormData] = useState();
    const [fields, setFields] = useState([]);
    const params = useParams();
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
    function buildConditionData() {
      const conditionDataStructure = conditionData[params.table];
      const conditionDataObj = {};
      conditionDataStructure.forEach((value) => {
        conditionDataObj[value] = data[value];
      })
      return conditionDataObj;
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      await fetch(`http://localhost:3000/api/row/${params.table}`, {method: "PUT", body: JSON.stringify({data: formData, conditionData: buildConditionData()}), headers: { 'Content-Type': 'application/json'} });
      handleClose(); 
      const response = await fetch(`http://localhost:3000/api/table/${params.table}`, {method: "GET", headers: {'Content-Type': 'application/json'}})
      const data = await response.json();
      setRows(data.message);
    };

    useEffect(() => {
      const getColumns = async () => {
        const response = await fetch(`http://localhost:3000/api/column/${params.table}`, {method: "GET", headers: { 'Content-Type': 'application/json'} });
        const data = await response.json();
        setFields(data.message);
      }
      getColumns();
    }, [params.table]);

    useEffect(() => {
      setFormData(data);
    }, [data])

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
        {formData && fields.map((field, index) => {
          return (
            <>
            <Form.Label htmlFor={field.name} className="labelClass">{field.Field}</Form.Label>
            <FormGroup>
              <Form.Control key={index} name={field.Field} id={field.name} value={formData[field.Field]} onChange={handleInputChange} placeholder={field.Field} />
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
  
  export default EditFormModal;