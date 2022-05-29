import React, { useEffect, useState } from 'react';
import { getBooks, getCategories, getPackages, getRecords, getRequestedBooks, getUser, acceptRequestedBook, confirmRecord, updatePackage, addPackage, deletePackage, uploadPicture, updateBook, addBook, deleteBook, getReport } from '../../api/AdminAPI';
import { Form, Modal } from 'react-bootstrap';
import {Line, Doughnut} from 'react-chartjs-2';
import Pagination from 'react-js-pagination';

export function Dashboard () {
  const [report, setReport] = useState(null);
  const [users, setUsers] = useState(null);
  const [packages, setPackages] = useState(null);
  const [books, setBooks] = useState(null)
  const [requestedBooks, setRequestedBooks] = useState(null)
  const [categories, setCategories] = useState(null)
  const [records, setRecords] = useState(null);
  const [requestedBookShow, setRequestedBookShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);
  const [id, setId] = useState(null);
  const [Package, setPackage] = useState({name: null, price: null, time: null, benefit: null, booksPerLoan: null, borrowDays: null});
  const [book, setBook] = useState({name: null, description: null, author: null, publisher: null, price: null, category: null, quantity: null, location: {face: null, row: null, column: null}, picture: null, publishYear: null})
  const [packageUpdateShow, setPackageUpdateShow] = useState(false);
  const [packageAddShow, setPackageAddShow] = useState(false);
  const [packageDeleteShow, setPackageDeleteShow] = useState(false);
  const [bookDeleteShow, setBookDeleteShow] = useState(false);
  const [bookUpdateShow, setBookUpdateShow] = useState(false);
  const defaultImage = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_180eeef42d4%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_180eeef42d4%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.421875%22%20y%3D%22104.5%22%3E200x200%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
  const [overviewPicture, setOverviewPicture] = useState(defaultImage);
  const [bookAddShow, setBookAddShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getReport().then( res => {
      setReport(res.data);
    })
    getUser(1).then( res => {
      setUsers(res.data);
    });
    getPackages().then( res => {
      setPackages(res.data);
    });
    getBooks(1).then( res => {
      setBooks(res.data)
    });
    getRequestedBooks(1).then( res => {
      setRequestedBooks(res.data);
    });
    getRecords(1).then( res => {
      setRecords(res.data);
    })
    getCategories().then( res => {
      setCategories(res.data);
    })
  }, []);

  const onAcceptRequestedBook = () => {
    acceptRequestedBook(id).then( res => {
      getRequestedBooks().then( res => {
        setRequestedBooks(res.data);
      });
    })
  }

  const onConfirm = () => {
    confirmRecord(id).then( res => {
      getRecords().then( res => {
        setRecords(res.data);
      })
    })
  }

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

  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          color: "rgba(204, 204, 204,0.1)"
        }
      }],
      xAxes: [{
        gridLines: {
          color: "rgba(204, 204, 204,0.1)"
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  }

  const doughnutPieOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };
  
  return (
    <div>
      <div className="row">
          <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                  <div className="card-body">
                      <h4 className="card-title">Number of borrower record by month</h4>
                       {report && <Line data={{
                          labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                          datasets: [{
                            label: '# of Votes',
                            data: report.recordNumByMonth,
                            backgroundColor: [
                              'rgba(255, 99, 132, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(255, 206, 86, 0.2)',
                              'rgba(75, 192, 192, 0.2)',
                              'rgba(153, 102, 255, 0.2)',
                              'rgba(255, 159, 64, 0.2)',
                              'rgba(255, 99, 132, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(255, 206, 86, 0.2)',
                              'rgba(75, 192, 192, 0.2)',
                              'rgba(153, 102, 255, 0.2)',
                              'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                              'rgba(255,99,132,1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                              'rgba(255, 159, 64, 1)',
                              'rgba(255,99,132,1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                              'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1,
                            fill: false
                          }]
                        }} options={options} />}
                  </div>
              </div>
          </div>
          <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                  <div className="card-body">
                      <h4 className="card-title">Package Purchase</h4>
                      {report && <Doughnut data={{
                        datasets: [{
                          data: report.package.purchaseNum,
                          backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)',
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)'
                          ],
                          borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                          ],
                        }],
                        labels: report.package.name
                    }} options={doughnutPieOptions} /> }
                  </div>
              </div>
          </div>
      </div>
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
    </div> 
  );
}

export default Dashboard;