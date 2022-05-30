import React, { useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { acceptRequestedBook, getRequestedBooks } from '../../api/AdminAPI';

export default function RequestedBook() {

    const [requestedBooks, setRequestedBooks] = useState(null);
    const [requestedBookShow, setRequestedBookShow] = useState(false);
    const [id, setId] = useState(null);

    useEffect(() => {
        getRequestedBooks(1).then( res => {
          setRequestedBooks(res.data);
        });
    }, []);

    const onAcceptRequestedBook = () => {
        acceptRequestedBook(id).then( res => {
          getRequestedBooks().then( res => {
            setRequestedBooks(res.data);
          });
        })
    }

    return (
        <div className="row ">
        <Modal show={requestedBookShow} onHide={(e) => {setRequestedBookShow(false)}}>
        <Modal.Header closeButton>
            <Modal.Title>Accept confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to accept?</Modal.Body>
        <Modal.Footer>
            <button className='btn btn-outline-danger' onClick={(e) => {setRequestedBookShow(false)}}>
            No
            </button>
            <button className='btn btn-outline-success' onClick={(e) => {setRequestedBookShow(false); onAcceptRequestedBook()}}>
            Yes
            </button>
        </Modal.Footer>
        </Modal>
        <div className="col-12 grid-margin">
            <div className="card">
            <div className="card-body">
                <h4 className="card-title">Requested books</h4>
                <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th> Name </th>
                        <th> Author </th>
                        <th> Category </th>
                        <th> Status </th>
                    </tr>
                    </thead>
                    <tbody>
                    {requestedBooks && requestedBooks.data.map( book => 
                    <tr>
                        <td>
                        <div className="d-flex">
                            <img src={book.picture} alt="face" />
                            <span className="pl-2">{book.name}</span>
                        </div>
                        </td>
                        <td> {book.author} </td>
                        <td> {book.category.name} </td>
                        <td> {book.isAccepted ? <label className="badge badge-success">Accepted</label> : <label className="badge badge-danger">Pending</label>} </td>
                        {!book.isAccepted && <td> <button className='btn btn-outline-success' onClick={(e) => {setRequestedBookShow(true); setId(book._id)}}>Accept</button> </td>}
                    </tr>
                    )}
                    </tbody>
                </table>
                </div>
                {requestedBooks && <Pagination
                activePage={parseInt(requestedBooks.activePage)}
                itemsCountPerPage={requestedBooks.itemsCountPerPage}
                totalItemsCount={requestedBooks.totalItemsCount}
                pageRangeDisplayed={5}
                onChange={(num) => {getRequestedBooks(num).then( res => {
                    setRequestedBooks(res.data);
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
