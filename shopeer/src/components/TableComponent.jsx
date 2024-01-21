import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useParams } from "react-router";
import ColumnModal from "./modal/ColumnModal";
import DeleteColumnModal from "./modal/DeleteColumnModal";
import RenameColumnName from "./modal/RenameColumnModal";
import brickTypes from "./bricks/brickTypes";
import EditFormModal from "./modal/EditForm";
import ChangeColumnPositionModal from "./modal/ChangeColumnPosition";


const TableComponent = ({ header, guestMode }) => {
  const [rows, setRows] = useState();
  const [isColumnFormShown, setIsColumnFormShown] = useState(false);
  const [isDeleteColumnFormShown, setIsDeleteColumnFormShown] = useState(false);
  const [isChangeColumnNameShown, setIsChangeColumnNameShown] = useState(false);
  const [changeColumnPosition, setChangeColumnPosition] = useState(false);
  const [isEditFormShown, setIsEditFormShown] = useState(false);
  const [editRow, setEditRow] = useState();
  const params = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`http://localhost:3000/api/table/${params.table}`, {method: "GET", headers: {'Content-Type': 'application/json'}})
      const data = await response.json();
      setRows(data.message);
    }
    getData();
  },  [params.table])

  const handleDelete = async (item) => {
    if (params.table === "shoporder") {
      await fetch(`http://localhost:3000/api/table/${params.table}`, {method: "DELETE", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ orderId: item.orderId, userId: item.userId})})
    }
    if (params.table === "orderitem") {
      await fetch(`http://localhost:3000/api/table/${params.table}`, {method: "DELETE", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ orderId: item.orderId, productId: item.productId})})
    } 
    if (params.table !== "shoporder" && params.table !== "orderitem") {
      await fetch(`http://localhost:3000/api/table/${params.table}/${item[`${params.table}_id`]}`, {method: "DELETE", headers: {'Content-Type': 'application/json'}})
    }
    const response = await fetch(`http://localhost:3000/api/table/${params.table}`, {method: "GET", headers: {'Content-Type': 'application/json'}})
    const data = await response.json();
    setRows(data.message);
  }

  const handleShowAddColumn = () => {
    setIsColumnFormShown(true);
  }

  const handleHideAddColumn = () => {
    setIsColumnFormShown(false);
  }

  const handleShowDeleteColumn = () => {
    setIsDeleteColumnFormShown(true);
  }

  const handleHideDeleteColumn = () => {
    setIsDeleteColumnFormShown(false);
  }

  const handleShowChangeColumnName = () => {
    setIsChangeColumnNameShown(true);
  }

  const handleHideChangeColumnName = () => {
    setIsChangeColumnNameShown(false);
  }

  const handleEditClick = (item) => {
    setEditRow(item)
    setIsEditFormShown(true);
  }

  const handleEditHide = () => {
    setIsEditFormShown(false);
  }

  const handleShowChangeColumnPosition = () => {
    setChangeColumnPosition(true);
  }

  const handleHideChangeColumnPosition = () => {
    setChangeColumnPosition(false);
  }

  const userActions = [
    {
      label: 'Edit',
      variant: 'primary',
      handler: (item) => {
        handleEditClick(item);
      },
    },
    {
      label: 'Delete',
      variant: 'danger',
      handler: (item) => {
        handleDelete(item)
      },
    },
  ];

    return ( <>
      {rows?.length > 0 ? <><div>
      <h2>{header}</h2>
      <Table striped bordered hover style={{border: "1px solid black" }}>
        <thead>
          <tr>
            {Object.keys(rows[0]).map((column, index) => (
              <th key={index}>{column}</th>
            ))}
            {!guestMode && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((item, index) => (
            <tr key={index}>
              {Object.keys(item).map((key, idx) => (
                <td key={idx} style={{ padding: '0.5rem' }}>
                  {item[key] ?? "null"}
                </td>
              ))}
              {!guestMode && <td style={{ padding: '0.5rem' }}>
                {userActions.map((action, idx) => (
                  <span
                    key={idx}
                    style={{ cursor: 'pointer', fontSize: '0.8em' }}
                    onClick={() => {
                        action.handler(item);
                    }}
                  >
                    {action.label}
                    {!guestMode && idx != 1 && ' | '}
                  </span>
                ))}
              </td>}
              
            </tr>
          ))}
        </tbody>
      </Table>
      {!guestMode && 
      <Container style={{marginTop: "10px"}}> 
        <Col className="mx-auto my-2">
          <Row><Button onClick={handleShowAddColumn}>Add column</Button></Row>
          <Row><Button onClick={handleShowChangeColumnName}>Change column name</Button></Row>
          <Row><Button onClick={handleShowChangeColumnPosition}>Change column position</Button></Row>
          <Row><Button onClick={handleShowDeleteColumn}>Delete column</Button></Row>
        </Col>
      <ColumnModal show={isColumnFormShown} handleClose={handleHideAddColumn} setRows={setRows}/>
      <DeleteColumnModal show={isDeleteColumnFormShown} handleClose={handleHideDeleteColumn} setRows={setRows}/>
      <RenameColumnName show={isChangeColumnNameShown} handleClose={handleHideChangeColumnName} setRows={setRows}/>
      <ChangeColumnPositionModal show={changeColumnPosition} handleClose={handleHideChangeColumnPosition} setRows={setRows} />
      {editRow && <EditFormModal show={isEditFormShown} handleClose={handleEditHide} fields={brickTypes[params.table]} data={editRow} setRows={setRows}/> }</Container>}
    </div></> : <div>No records</div>}
          
    </>
   
    );
  };

export default TableComponent;