import React, { useEffect, useState } from 'react'
import Pagination from 'react-js-pagination';
import { getUser } from '../../api/AdminAPI';

export default function User() {

    const [users, setUsers] = useState(null);

    useEffect(() => {
        getUser(1).then( res => {
          setUsers(res.data);
        });
    }, []);

    return (
        <div className="row ">
            <div className="col-12 grid-margin">
            <div className="card">
                <div className="card-body">
                <h4 className="card-title">Users</h4>
                <div className="table-responsive">
                    <table className="table">
                    <thead>
                        <tr>
                        <th> Username </th>
                        <th> Email </th>
                        <th> Status </th>
                        <th> Package </th>
                        <th> Expiration </th>
                        </tr>
                    </thead>
                    <tbody>
                    {users && users.data.map( user => 
                        <tr>
                        <td>
                            <div className="d-flex">
                            <img src={user.picture} alt="face" />
                            <span className="pl-2">{user.username}</span>
                            </div>
                        </td>
                        <td> {user.email} </td>
                        <td> {user.isBorrowing ? "Is borrowing" : "Isn't borrowing"} </td>
                        <td> {user.currentPackage != null ? user.currentPackage.name : "null"} </td>
                        <td> {user.expiration != null ? (new Date(user.expiration)).toDateString() : "null"} </td>
                        <td><button className='btn btn-outline-danger' >Delete</button> </td>
                        </tr>
                    )}
                    </tbody>
                    </table>
                </div>
                {users && <Pagination
                    activePage={parseInt(users.activePage)}
                    itemsCountPerPage={users.itemsCountPerPage}
                    totalItemsCount={users.totalItemsCount}
                    pageRangeDisplayed={5}
                    onChange={(num) => {getUser(num).then( res => {
                    setUsers(res.data);
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
