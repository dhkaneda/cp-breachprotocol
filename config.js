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
        bufferSize: 4,
        split: [[0, 2], [2, 2]]
      },
      {
        bufferSize: 4,
        split: [[0, 3], [2, 2]]
      },
      {
        bufferSize: 4,
        split: [[0, 2], [1, 3]]
      },
      {
        bufferSize: 5,
        split: [[0, 2], [1, 4]]
      },
      {
        bufferSize: 5,
        split: [[0, 3], [3, 2]]
      },
      {
        bufferSize: 5,
        split: [[0, 4], [3, 2]]
      },
      {
        bufferSize: 6,
        split: [[0, 3], [3, 3]]
      },
    ],
    3: [
        {
          bufferSize: 6, 
          split: [[0, 3], [2, 2], [3, 3]],
        }, 
        {
          bufferSize: 7, 
          split: [[0, 3], [2, 3], [4, 3]],
        },
        {
          bufferSize: 7, 
          split: [[0, 3], [2, 3], [3, 4]],
        }, 
        {
          bufferSize: 8, 
          split: [[0, 3], [2, 3], [4, 4]],
        },
        {
          bufferSize: 8, 
          split: [[0, 3], [2, 3], [5, 3]],
        },
      ],
    // 4: [],
    // 5: [],
  }
};