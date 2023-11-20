export const config = {
  byteRange: ['BD', 'E9', '55', '1C', '7A'],
  matrixSize: 5,
  possibleDaemons: [
    "Mass Vulnerability",
    "Camera Shutdown",
    "Contagion",
    "Short Circuit",
    "Ping",
    "Overheat",
    "Reboot Optics",
    "Sonic Shock",
    "Whistle",
    "Weapon Glitch",
    "Data Mine",
    "Memory Wipe",
    "Remote Deactivation",
    "Netdriver",
    "Distract Enemies",
    "Armor Hack",
    "Firewall Breach",
    "Quickhack Charge",
    "System Reset",
    "Subdermal Sensor",
    "Datamine",
    "Firewall Penetration",
    "Data Corruption",
    "Data Theft",
    "Backdoor",
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
    4:  [
        {
          size: 8,
          subSequence: [[0, 3], [2, 3], [4, 3], [5, 3]],
        },
        {
          size: 9,
          subSequence: [[0, 3], [2, 3], [4, 3], [6, 3]],
        },
        {
          size: 9,
          subSequence: [[0, 3], [2, 3], [4, 3], [5, 4]],
        },
        {
          size: 10,
          subSequence: [[0, 3], [2, 3], [4, 3], [6, 4]],
        },
        {
          size: 10,
          subSequence: [[0, 3], [2, 3], [4, 3], [6, 3], [7, 3]],
        },
      ],
    5: [
        {
          size: 10,
          subSequence: [[0, 3], [2, 3], [4, 3], [6, 3], [8, 2]],
        },
        {
          size: 11,
          subSequence: [[0, 3], [2, 3], [4, 3], [6, 3], [8, 3]],
        },
        {
          size: 11,
          subSequence: [[0, 3], [2, 3], [4, 3], [6, 3], [8, 3], [9, 2]],
        },
        {
          size: 12,
          subSequence: [[0, 3], [2, 3], [4, 3], [6, 3], [8, 3], [10, 2]],
        },
        {
          size: 12,
          subSequence: [[0, 3], [2, 3], [4, 3], [6, 3], [8, 4]],
        },
      ],
    6: [
      {
        size: 12,
        subSequence: [[0, 3], [2, 3], [4, 3], [6, 3], [8, 5]]
      },
      {
        size: 13,
        subSequence: [[0, 3], [2, 3], [4, 3], [6, 3], [8, 4], [10, 3]]
      },
      {
        size: 13,
        subSequence: [[0, 3], [2, 3], [4, 3], [6, 3], [8, 4], [11, 2]]
      },
      {
        size: 14,
        subSequence: [[0, 3], [2, 3], [4, 3], [6, 3], [8, 4], [11, 3]]
      },
      {
        size: 14,
        subSequence: [[0, 3], [2, 3], [4, 3], [6, 3], [8, 4], [11, 3], [12, 2]]
      }
    ]
  }
};