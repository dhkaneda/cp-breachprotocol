import React from 'react';

const Matrix = ({ matrix }) => {
  return (
    <div className="main-left">
      <table className="center">
        <thead>
          <tr>
            {matrix.map((row) => {
              return (
                <tr>
                  {
                    row.map((byte) => {
                    return (
                      <th>{byte}</th>
                    )
                    })
                  }
                </tr>
              )
            })}
          </tr>
        </thead>
      </table>
    </div>
  )
};

export default Matrix;