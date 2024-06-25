import React, { useState, useEffect } from 'react';

// 주어진 배열을 limit 단위로 나누는 함수
const sliceArrayByLimit = (totalPage, limit) => {
  const result = [];
  for (let i = 0; i < totalPage; i += limit) {
    result.push(Array.from({ length: Math.min(limit, totalPage - i) }, (_, index) => i + index + 1));
  }
  return result;
};

const Pagination = ({ totalPage, limit, page, setPage }) => {
  const [currentPageArray, setCurrentPageArray] = useState([]);
  const [totalPageArray, setTotalPageArray] = useState([]);

  // page가 변경될 때마다 currentPageArray 업데이트
  useEffect(() => {
    if (page % limit === 1) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit)]);
    } else if (page % limit === 0) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit) - 1]);
    } else {
      setCurrentPageArray(totalPageArray[Math.floor((page - 1) / limit)]);
    }
  }, [page, totalPageArray, limit]);

  // totalPage가 변경될 때마다 totalPageArray 및 currentPageArray 초기화
  useEffect(() => {
    const slicedPageArray = sliceArrayByLimit(totalPage, limit);
    setTotalPageArray(slicedPageArray);
    setCurrentPageArray(slicedPageArray[0]);
  }, [totalPage, limit]);

  return (
    <div>
      {currentPageArray && currentPageArray.map(pageNum => (
        <button
          key={pageNum}
          onClick={() => setPage(pageNum)}
          style={{ fontWeight: pageNum === page ? 'bold' : 'normal' }}
        >
          {pageNum}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
