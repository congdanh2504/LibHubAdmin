import React, { useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { addPackage, deletePackage, getPackages, updatePackage } from '../../api/AdminAPI';

export default function Package() {

    const [packages, setPackages] = useState(null);
    const [Package, setPackage] = useState({name: null, price: null, time: null, benefit: null, booksPerLoan: null, borrowDays: null});
    const [id, setId] = useState(null);
    const [packageUpdateShow, setPackageUpdateShow] = useState(false);
    const [packageAddShow, setPackageAddShow] = useState(false);
    const [packageDeleteShow, setPackageDeleteShow] = useState(false);

    useEffect(() => {
        getPackages().then( res => {
          setPackages(res.data);
        });
    }, []);

    const onPackageUpdate = () => {
        updatePackage(Package, id).then( res => {
            getPackages().then( res => {
                setPackages(res.data);
            });
        })
    }

    const onPackageAdd = () => {
        addPackage(Package).then( res => {
            getPackages().then( res => {
                setPackages(res.data);
            });
        })
    }

    const onPackageDelete = () => {
        deletePackage(id).then( res => {
            getPackages().then( res => {
                setPackages(res.data);
            });
        })
    } 

    const changePackageInput = (e) => {
        setPackage({...Package, [e.target.name] : e.target.value})
    }

    const changePackageNumberInput = (e) => {
        setPackage({...Package, [e.target.name] : parseInt(e.target.value)})
    }

    return (
        <div className="row ">
        <Modal show={packageUpdateShow} onHide={(e) => {setPackageUpdateShow(false)}}>
            <Modal.Header closeButton>
            <Modal.Title>Update package</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form className="forms-sample">
                <Form.Group>
                <label htmlFor="exampleInputUsername1">Name</label>
                <Form.Control type="text" id="exampleInputUsername1" name="name" placeholder="Name" onChange={changePackageInput} defaultValue={Package.name}/>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputEmail1">Price</label>
                <Form.Control type="number" className="form-control" name="price" placeholder="Price" onChange={changePackageNumberInput} defaultValue={Package.price}/>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputPassword1">Time</label>
                <Form.Control type="number" className="form-control" name="time" placeholder="Time" onChange={changePackageNumberInput} defaultValue={Package.time}/>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputConfirmPassword1">Benefit</label>
                <Form.Control type="text" className="form-control" name="benefit" placeholder="Benefit" onChange={changePackageInput} defaultValue={Package.benefit}/>
                </Form.Group>    
                <Form.Group>
                <label htmlFor="exampleInputConfirmPassword1">Books per loan</label>
                <Form.Control type="number" className="form-control" name="booksPerLoan" placeholder="Books per loan" onChange={changePackageNumberInput} defaultValue={Package.booksPerLoan}/>
                </Form.Group>    
                <Form.Group>
                <label htmlFor="exampleInputConfirmPassword1">Borrow days</label>
                <Form.Control type="number" className="form-control" name="borrowDays" placeholder="Borrow days" onChange={changePackageNumberInput} defaultValue={Package.borrowDays}/>
                </Form.Group> 
            </form>
            </Modal.Body>
            <Modal.Footer>
            <button type="submit" className="btn btn-primary mr-2" onClick={(e) => {setPackageUpdateShow(false); onPackageUpdate() }}>Submit</button>
            <button className="btn btn-dark" onClick={(e) => setPackageUpdateShow(false)} >Cancel</button>
            </Modal.Footer>
        </Modal>
        <Modal show={packageAddShow} onHide={(e) => {setPackageAddShow(false)}}>
            <Modal.Header closeButton>
            <Modal.Title>Add package</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form className="forms-sample">
            <Form.Group>
                <label htmlFor="exampleInputUsername1">Name</label>
                <Form.Control type="text" id="exampleInputUsername1" name="name" placeholder="Name" onChange={changePackageInput} defaultValue={Package.name}/>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputEmail1">Price</label>
                <Form.Control type="number" className="form-control" name="price" placeholder="Price" onChange={changePackageNumberInput} defaultValue={Package.price}/>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputPassword1">Time</label>
                <Form.Control type="number" className="form-control" name="time" placeholder="Time" onChange={changePackageNumberInput} defaultValue={Package.time}/>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputConfirmPassword1">Benefit</label>
                <Form.Control type="text" className="form-control" name="benefit" placeholder="Benefit" onChange={changePackageInput} defaultValue={Package.benefit}/>
                </Form.Group>    
                <Form.Group>
                <label htmlFor="exampleInputConfirmPassword1">Books per loan</label>
                <Form.Control type="number" className="form-control" name="booksPerLoan" placeholder="Books per loan" onChange={changePackageNumberInput} defaultValue={Package.booksPerLoan}/>
                </Form.Group>    
                <Form.Group>
                <label htmlFor="exampleInputConfirmPassword1">Borrow days</label>
                <Form.Control type="number" className="form-control" name="borrowDays" placeholder="Borrow days" onChange={changePackageNumberInput} defaultValue={Package.borrowDays}/>
                </Form.Group> 
            </form>
            </Modal.Body>
            <Modal.Footer>
            <button type="submit" className="btn btn-primary mr-2" onClick={(e) => {setPackageAddShow(false); onPackageAdd() }}>Submit</button>
            <button className="btn btn-dark" onClick={(e) => setPackageAddShow(false)} >Cancel</button>
            </Modal.Footer>
        </Modal>
        <Modal show={packageDeleteShow} onHide={(e) => {setPackageDeleteShow(false)}}>
        <Modal.Header closeButton>
            <Modal.Title>Delete confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want to delete?</Modal.Body>
            <Modal.Footer>
            <button className='btn btn-outline-danger' onClick={(e) => {setPackageDeleteShow(false)}}>
                No
            </button>
            <button className='btn btn-outline-success' onClick={(e) => {setPackageDeleteShow(false); onPackageDelete()}}>
                Yes
            </button>
            </Modal.Footer>
        </Modal>
            <div className="col-12 grid-margin">
            <div className="card">
                <div className="card-body">
                <h4 className="card-title">Packages</h4>
                <div className="table-responsive">
                    <table className="table">
                    <thead>
                        <tr>
                        <th> Name </th>
                        <th> Price </th>
                        <th> Time (month) </th>
                        <th> Benefit </th>
                        <th> Books for loan </th>
                        <th> Borrow days </th>
                        <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                    {packages && packages.map( _package => 
                        <tr>
                        <td> {_package.name} </td>
                        <td> {_package.price} </td>
                        <td> {_package.time} </td>
                        <td> {_package.benefit} </td>
                        <td> {_package.booksPerLoan} </td>
                        <td> {_package.borrowDays} </td>
                        <td> <button className='btn btn-outline-success' onClick={(e) => {
                            setId(_package._id);
                            Package.name = _package.name;
                            Package.price = _package.price;
                            Package.time = _package.time;
                            Package.benefit = _package.benefit;
                            Package.booksPerLoan = _package.booksPerLoan;
                            Package.borrowDays = _package.borrowDays;
                            setPackageUpdateShow(true);
                        }} >Update</button></td>
                        <td><button className='btn btn-outline-danger' onClick={(e) => {setId(_package._id); setPackageDeleteShow(true)}}>Delete</button> </td>
                        </tr>
                    )}
                    </tbody>
                    </table>
                </div>
                <button className='btn btn-outline-success' onClick={(e) => {
                    Package.name = null;
                    Package.price = null;
                    Package.time = null;
                    Package.benefit = null;
                    Package.booksPerLoan = null;
                    Package.borrowDays = null;
                    setPackageAddShow(true)
                }}>+ New package</button>
                </div>
            </div>
            </div>
        </div>
    )
}
