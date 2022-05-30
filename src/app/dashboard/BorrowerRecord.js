import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { confirmRecord, getRecords } from '../../api/AdminAPI';

export default function BorrowerRecord() {

    const [records, setRecords] = useState(null);
    const [confirmShow, setConfirmShow] = useState(false);
    const [id, setId] = useState(null);

    useEffect(() => {
        getRecords(1).then( res => {
          setRecords(res.data);
        })
    }, []);
    
    const onConfirm = () => {
        confirmRecord(id).then( res => {
          getRecords().then( res => {
            setRecords(res.data);
          })
        })
    }

    return (
        <div className="row ">
        <Modal show={confirmShow} onHide={(e) => {setConfirmShow(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Accept confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to accept?</Modal.Body>
        <Modal.Footer>
          <button className='btn btn-outline-danger' onClick={(e) => {setConfirmShow(false)}}>
            No
          </button>
          <button className='btn btn-outline-success' onClick={(e) => {setConfirmShow(false); onConfirm()}}>
            Yes
          </button>
        </Modal.Footer>
      </Modal>
        <div className="col-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Borrower Records</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th> User </th>
                      <th> Books </th>
                      <th> Created date </th>
                      <th> Return date </th>
                      <th> Status </th> 
                    </tr>
                  </thead>
                  <tbody>
                  {records && records.data.map( record => 
                    <tr>
                      <td>
                        <div className="d-flex">
                            <img src={record.user.picture} alt="face" />
                            <span className="pl-2">{record.user.username}</span>
                        </div>
                      </td>
                      <td> {record.books.map(e => e.book.name).join(", ")} </td>
                      <td> {(new Date(record.createdDate)).toDateString()} </td>
                      <td> {(new Date(record.returnDate)).toDateString()} </td>
                      <td> {record.status.startsWith("Pending") ? <label className="badge badge-danger">{record.status}</label> : <label className="badge badge-success">{record.status}</label>} </td>
                      { record.status.startsWith("Pending") && <td> <button className='btn btn-outline-success' onClick={(e) => {setConfirmShow(true); setId(record._id)}}>Confirm</button> </td>}
                    </tr>
                  )}
                  </tbody>
                </table>
              </div>
              {records && <Pagination
                activePage={parseInt(records.activePage)}
                itemsCountPerPage={records.itemsCountPerPage}
                totalItemsCount={records.totalItemsCount}
                pageRangeDisplayed={5}
                onChange={(num) => {getRecords(num).then( res => {
                  setRecords(res.data);
                });}}
                itemClass="page-item"
                linkClass="page-link"
                firstPageText="First"
                lastPageText="Last"
              /> }
            </div>
            
          </div>
        </div>
      </div>
    )
}
