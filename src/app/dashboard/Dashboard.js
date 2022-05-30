import React from 'react';
import Report from './Report';
import User from './User';
import Package from './Package';
import Book from './Book';
import RequestedBook from './RequestedBook';
import BorrowerRecord from './BorrowerRecord';

export function Dashboard () {
  
  return (
    <div>
      <Report/>
      <User/>
      <Package/>
      <Book/>
      <RequestedBook/>
      <BorrowerRecord/>
    </div> 
  );
}

export default Dashboard;