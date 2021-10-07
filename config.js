export const config = {
  byteRange: ['BD', 'E9', '55', '1C', '7A'],
  matrixSize: 5,
  possibleDaemons: [
    "Mass Vulnerability",
    "Camera Shutdown",
    "ICEPICK",
  ],
  bufferKey: {
    2: [
      {
        size: 4,
        subSequence: [[0, 2], [2, 2]]
      },
      {
        size: 4,
        subSequence: [[0, 3], [2, 2]]
      },
      {
        size: 4,
        subSequence: [[0, 2], [1, 3]]
      },
      {
        size: 5,
        subSequence: [[0, 2], [1, 4]]
      },
      {
        size: 5,
        subSequence: [[0, 3], [3, 2]]
      },
      {
        size: 5,
        subSequence: [[0, 4], [3, 2]]
      },
      {
        size: 6,
        subSequence: [[0, 3], [3, 3]]
      },
    ],
    3: [
        {
          size: 6, 
          subSequence: [[0, 3], [2, 2], [3, 3]],
        }, 
        {
          size: 7, 
          subSequence: [[0, 3], [2, 3], [4, 3]],
        },
        {
          size: 7, 
          subSequence: [[0, 3], [2, 3], [3, 4]],
        }, 
        {
          size: 8, 
          subSequence: [[0, 3], [2, 3], [4, 4]],
        },
        {
          size: 8, 
          subSequence: [[0, 3], [2, 3], [5, 3]],
        },
      ],
    // 4: [],
    // 5: [],
  }
};