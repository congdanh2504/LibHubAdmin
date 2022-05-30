import React, { useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { addBook, deleteBook, getBooks, getCategories, updateBook, uploadPicture } from '../../api/AdminAPI';
import Pagination from 'react-js-pagination';

export default function Book() {
    const [books, setBooks] = useState(null)
    const [categories, setCategories] = useState(null)
    const [id, setId] = useState(null);
    const [book, setBook] = useState({name: null, description: null, author: null, publisher: null, price: null, category: null, quantity: null, location: {face: null, row: null, column: null}, picture: null, publishYear: null})
    const [bookDeleteShow, setBookDeleteShow] = useState(false);
    const [bookUpdateShow, setBookUpdateShow] = useState(false);
    const defaultImage = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_180eeef42d4%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_180eeef42d4%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.421875%22%20y%3D%22104.5%22%3E200x200%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
    const [overviewPicture, setOverviewPicture] = useState(defaultImage);
    const [bookAddShow, setBookAddShow] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getBooks(1).then( res => {
            setBooks(res.data)
        });
        getCategories().then( res => {
            setCategories(res.data);
        });
    }, []);

    const changeBookInput = (e) => {
        setBook({...book, [e.target.name] : e.target.value})
    }
    
    const changeBookNumberInput = (e) => {
        setBook({...book, [e.target.name] : parseInt(e.target.value)})
    }
    
    const changeImage = (param) => {
        var file = param.target.files[0];
        setBook({...book, ["picture"] : file})
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (e) {
          setOverviewPicture(reader.result)
        }.bind(this);
    }
    
    const onBookUpdate = () => {
        setLoading(true);
        if (typeof(book.picture) == "object") {
          uploadPicture(book.picture).then( res => {
            book.picture = res.data;
            updateBook(id, book).then( res=> {
              getBooks().then( res => {
                setBooks(res.data);
                setLoading(false);
                setBookUpdateShow(false);
              });  
            });
          })
        } else {
          updateBook(id, book).then( res=> {
            getBooks().then( res => {
              setBooks(res.data)
              setLoading(false);
              setBookUpdateShow(false);
            });
          });
        }
    }
    
    const onBookAdd = () => {
        setLoading(true);
        if (typeof(book.picture) == "object") {
          uploadPicture(book.picture).then( res => {
            book.picture = res.data;
            addBook(book).then( res=> {
              getBooks().then( res => {
                setBooks(res.data)
                setLoading(false);
                setBookAddShow(false);
              });
            });
          })
        } else {
          addBook(book).then( res=> {
            getBooks().then( res => {
              setBooks(res.data);
              setLoading(false);
              setBookAddShow(false);
            });
          });
        }
    }
    
    const onBookDelete = () => {
        deleteBook(id).then( res => {
            getBooks().then( res => {
                setBooks(res.data)
            });
        })
    }

    return (
        <div className="row ">
        <Modal show={bookDeleteShow} onHide={(e) => {setBookDeleteShow(false)}}>
        <Modal.Header closeButton>
            <Modal.Title>Delete confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want to delete?</Modal.Body>
            <Modal.Footer>
            <button className='btn btn-outline-danger' onClick={(e) => {setBookDeleteShow(false)}}>
                No
            </button>
            <button className='btn btn-outline-success' onClick={(e) => {setBookDeleteShow(false); onBookDelete()}}>
                Yes
            </button>
            </Modal.Footer>
        </Modal>
        <Modal show={bookUpdateShow} onHide={(e) => {setBookUpdateShow(false)}}>
            <Modal.Header closeButton>
            <Modal.Title>Update book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form className="forms-sample">
            <Form.Group>
                <img className='img-thumbnail' src={overviewPicture} style={{ height: 200 }}/>
                <Form.Control type="file" id="exampleInputUsername1" name="name" placeholder="Name" onChange={changeImage} />
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputUsername1">Name</label>
                <Form.Control type="text" id="exampleInputUsername1" name="name" placeholder="Name" onChange={changeBookInput} defaultValue={book.name}/>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputUsername1">Description</label>
                <Form.Control type="textarea" id="exampleInputUsername1" name="description" placeholder="Description" onChange={changeBookInput} defaultValue={book.description}/>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputUsername1">Author</label>
                <Form.Control type="text" id="exampleInputUsername1" name="author" placeholder="Author" onChange={changeBookInput} defaultValue={book.author}/>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputUsername1">Publisher</label>
                <Form.Control type="text" id="exampleInputUsername1" name="publisher" placeholder="Publisher" onChange={changeBookInput} defaultValue={book.publisher}/>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputUsername1">Category</label>
                <Form.Control
                    as="select" style={{ color: "white" }}
                    onChange={(e) => {
                    setBook(book => ({
                        ...book,
                    category: e.target.value
                    }))
                    }}
                    >
                    { categories && categories.map( category => 
                    <option style={{ color: "white" }} value={category._id}>{category.name}</option>
                    )}
                </Form.Control>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputEmail1">Price</label>
                <Form.Control type="number" className="form-control" name="price" placeholder="Price" onChange={changeBookNumberInput} defaultValue={book.price}/>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputEmail1">Quantity</label>
                <Form.Control type="number" className="form-control" name="quantity" placeholder="Quantity" onChange={changeBookNumberInput} defaultValue={book.quantity}/>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputEmail1">Face</label>
                <Form.Control type="number" className="form-control" name="location.face" placeholder="Face" onChange={(e) => {
                    setBook(book => ({
                    ...book,
                    location : {
                        ...book.location,
                        face: parseInt(e.target.value)
                    }
                    }))
                }} defaultValue={book.location.face}/>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputEmail1">Row</label>
                <Form.Control type="number" className="form-control" name="location.row" placeholder="Row"  onChange={(e) => {
                setBook(book => ({
                    ...book,
                    location : {
                    ...book.location,
                    row: parseInt(e.target.value)
                    }
                }))
                }} defaultValue={book.location.row}/>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputEmail1">Column</label>
                <Form.Control type="number" className="form-control" name="location.column" placeholder="Column"  onChange={(e) => {
                    setBook(book => ({
                    ...book,
                    location : {
                        ...book.location,
                        column: parseInt(e.target.value)
                    }
                    }))
                }} defaultValue={book.location.column}/>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputPassword1">Publish year</label>
                <Form.Control type="number" className="form-control" name="publishYear" placeholder="Publish year" onChange={changeBookNumberInput} defaultValue={book.publishYear}/>
                </Form.Group>
            </form>
            </Modal.Body>
            <Modal.Footer>
            <button type="submit" className="btn btn-primary mr-2" onClick={(e) => { onBookUpdate(); }}>Submit {loading && <span className="fa fa-refresh fa-spin"></span>}</button>
            <button className="btn btn-dark" onClick={(e) => setBookUpdateShow(false)} >Cancel</button>
            </Modal.Footer>
            </Modal>
            <Modal show={bookAddShow} onHide={(e) => {setBookAddShow(false)}}>
            <Modal.Header closeButton>
            <Modal.Title>Add book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form className="forms-sample">
            <Form.Group>
                <img className='img-thumbnail' src={overviewPicture} style={{ height: 200 }}/>
                <Form.Control type="file" id="exampleInputUsername1" name="name" placeholder="Name" onChange={changeImage} />
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputUsername1">Name</label>
                <Form.Control type="text" id="exampleInputUsername1" name="name" placeholder="Name" onChange={changeBookInput} defaultValue={book.name}/>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputUsername1">Description</label>
                <Form.Control type="textarea" id="exampleInputUsername1" name="description" placeholder="Description" onChange={changeBookInput} defaultValue={book.description}/>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputUsername1">Author</label>
                <Form.Control type="text" id="exampleInputUsername1" name="author" placeholder="Author" onChange={changeBookInput} defaultValue={book.author}/>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputUsername1">Publisher</label>
                <Form.Control type="text" id="exampleInputUsername1" name="publisher" placeholder="Publisher" onChange={changeBookInput} defaultValue={book.publisher}/>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputUsername1">Category</label>
                <Form.Control
                    as="select" style={{ color: "white" }}
                    onChange={(e) => {
                    setBook(book => ({
                        ...book,
                    category: e.target.value
                    }))
                    }}
                    >
                    { categories && categories.map( category => 
                    <option style={{ color: "white" }} value={category._id}>{category.name}</option>
                    )}
                </Form.Control>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputEmail1">Price</label>
                <Form.Control type="number" className="form-control" name="price" placeholder="Price" onChange={changeBookNumberInput} defaultValue={book.price}/>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputEmail1">Quantity</label>
                <Form.Control type="number" className="form-control" name="quantity" placeholder="Quantity" onChange={changeBookNumberInput} defaultValue={book.quantity}/>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputEmail1">Face</label>
                <Form.Control type="number" className="form-control" name="location.face" placeholder="Face" onChange={(e) => {
                    setBook(book => ({
                    ...book,
                    location : {
                        ...book.location,
                        face: parseInt(e.target.value)
                    }
                    }))
                }} defaultValue={book.location.face}/>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputEmail1">Row</label>
                <Form.Control type="number" className="form-control" name="location.row" placeholder="Row"  onChange={(e) => {
                    setBook(book => ({
                    ...book,
                    location : {
                        ...book.location,
                        row: parseInt(e.target.value)
                    }
                    }))
                }} defaultValue={book.location.row}/>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputEmail1">Column</label>
                <Form.Control type="number" className="form-control" name="location.column" placeholder="Column"  onChange={(e) => {
                    setBook(book => ({
                    ...book,
                    location : {
                        ...book.location,
                        column: parseInt(e.target.value)
                    }
                    }))
                }} defaultValue={book.location.column}/>
                </Form.Group>
                <Form.Group>
                <label htmlFor="exampleInputPassword1">Publish year</label>
                <Form.Control type="number" className="form-control" name="publishYear" placeholder="Publish year" onChange={changeBookNumberInput} defaultValue={book.publishYear}/>
                </Form.Group>
            </form>
            </Modal.Body>
            <Modal.Footer>
            <button type="submit" className="btn btn-primary mr-2" onClick={(e) => { onBookAdd(); }}>Submit {loading && <span className="fa fa-refresh fa-spin"></span>}</button>
            <button className="btn btn-dark" onClick={(e) => setBookAddShow(false)} >Cancel</button>
            </Modal.Footer>
            </Modal>
            <div className="col-12 grid-margin">
            <div className="card">
                <div className="card-body">
                <h4 className="card-title">Books</h4>
                <div className="table-responsive">
                    <table className="table">
                    <thead>
                        <tr>
                        <th> Name </th>
                        <th> Author </th>
                        <th> Price </th>
                        <th> Quantity </th>
                        <th> Location </th>
                        <th> Publish year </th>
                        <th> Category </th>
                        <th> Borrowed number </th>
                        </tr>
                    </thead>
                    <tbody>
                    {books && books.data.map( _book => 
                        <tr>
                        <td>
                            <div className="d-flex">
                                <img src={_book.picture} alt="face" />
                                <span className="pl-2">{_book.name}</span>
                            </div>
                        </td>
                        <td> {_book.author} </td>
                        <td> {_book.price} </td>
                        <td> {_book.quantity} </td>
                        <td> {`Face: ${_book.location.face}, row: ${_book.location.row}, column: ${_book.location.column}`} </td>
                        <td> {_book.publishYear} </td>
                        <td> {_book.category.name} </td>
                        <td> {_book.borrowedNum} </td>
                        <td> <button className='btn btn-outline-success' onClick={(e) => {
                            setBookUpdateShow(true)
                            setId(_book._id);
                            book.name = _book.name;
                            book.description = _book.description;
                            book.author = _book.author;
                            book.publisher = _book.publisher;
                            book.price = _book.price;
                            book.quantity = _book.quantity;
                            book.location = _book.location;
                            setOverviewPicture(_book.picture);
                            book.picture = _book.picture;
                            book.category = _book.category._id;
                            book.publishYear = _book.publishYear;
                            }}>Update</button> </td>
                        <td><button className='btn btn-outline-danger' onClick={(e) => {setId(_book._id); setBookDeleteShow(true)}}>Delete</button> </td>
                        </tr>
                    )}
                    </tbody>
                    </table>
                </div>
                <button className='btn btn-outline-success' style={{ margin: 10 }} onClick={(e) => {
                    setBookAddShow(true)
                    book.name = null;
                    book.description = null;
                    book.author = null;
                    book.publisher = null;
                    book.price = null;
                    book.quantity = null;
                    book.location.face = null;
                    book.location.row = null;
                    book.location.column = null;
                    setOverviewPicture(defaultImage);
                    book.picture = defaultImage;
                    book.category = categories[0]._id;
                    book.publishYear = null;
                }}>+ New book</button>
                {books && <Pagination
                    activePage={parseInt(books.activePage)}
                    itemsCountPerPage={books.itemsCountPerPage}
                    totalItemsCount={books.totalItemsCount}
                    pageRangeDisplayed={5}
                    onChange={(num) => {getBooks(num).then( res => {
                    setBooks(res.data);
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
