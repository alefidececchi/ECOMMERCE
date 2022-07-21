import React from 'react';

const Pagination = ({booksPerPage, books, changePage, currentPage}) => {
  const pages = [];

  

  const handlePrevious = () => {
    if(currentPage > 1) {
      changePage(currentPage-1)
    }
  }

  const handleNext = () => {
    if(currentPage >= 1) {
      changePage(currentPage+1)
    }
  }

  
  for (let i =0; i < Math.ceil(books.length / booksPerPage); i++  ){
    pages.push(i+1);
  }
  return (
    <div>
      <ul>
      <li><span onClick={handlePrevious}>Prev</span></li>
        { pages && 
          pages.map(page => 
          (page === currentPage 
          ? (<li><button>{page}</button></li>)
          : (<li><button onClick={() => changePage(page)}>{page}</button></li>))
        )}
        <li><span onClick={handleNext}>Next</span></li>
      </ul>
    </div>
  );
}

export default Pagination;