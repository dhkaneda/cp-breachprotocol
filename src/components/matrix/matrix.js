import React from 'react';

const Matrix = ({ matrix }) => {
  return (
    <div className="main-left">
      <table className="center">
        <thead>
          {matrix.map((row, index) => {
            return (
              <tr key={index}>
                {
                  row.map((byte, index) => {
                    return (
                      <th key={index}>{byte}</th>
                    )
                  })
                }
              </tr>
            )
          })}
        </thead>
      </table>
    </div>
  )
};

export default Matrix;