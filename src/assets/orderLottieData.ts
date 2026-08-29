// Valid Lottie JSON data for checkout & order preparation animation
export const checkoutLottieData = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 120,
  w: 300,
  h: 300,
  nm: "OrderPreparing",
  ddd: 0,
  assets: [],
  layers: [
    // Layer 1: Glowing Outer Ring / Pulse Wave
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Pulse Ring 1",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [0], h: 0 },
            { t: 20, s: [80], h: 0 },
            { t: 80, s: [0], h: 0 },
            { t: 120, s: [0], h: 0 }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [150, 150, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [50, 50, 100], h: 0 },
            { t: 80, s: [140, 140, 100], h: 0 },
            { t: 120, s: [150, 150, 100], h: 0 }
          ]
        }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              d: 1,
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [120, 120] },
              nm: "Ellipse 1"
            },
            {
              ty: "st",
              c: { a: 0, k: [0.99, 0.73, 0.07, 1] }, // Hemzal Gold #FDB913
              o: { a: 0, k: 100 },
              w: { a: 0, k: 4 },
              lc: 2,
              lj: 2,
              nm: "Stroke 1"
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: 0,
              sa: 0,
              nm: "Transform"
            }
          ],
          nm: "Group 1"
        }
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0
    },

    // Layer 2: Secondary Pulse Ring
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Pulse Ring 2 (Red)",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 30, s: [0], h: 0 },
            { t: 50, s: [70], h: 0 },
            { t: 110, s: [0], h: 0 },
            { t: 120, s: [0], h: 0 }
          ]
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [150, 150, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 30, s: [50, 50, 100], h: 0 },
            { t: 110, s: [140, 140, 100], h: 0 },
            { t: 120, s: [145, 145, 100], h: 0 }
          ]
        }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              d: 1,
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [120, 120] },
              nm: "Ellipse 1"
            },
            {
              ty: "st",
              c: { a: 0, k: [0.89, 0.12, 0.14, 1] }, // Hemzal Red #E31E24
              o: { a: 0, k: 100 },
              w: { a: 0, k: 3 },
              lc: 2,
              lj: 2,
              nm: "Stroke 1"
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: 0,
              sa: 0,
              nm: "Transform"
            }
          ],
          nm: "Group 1"
        }
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0
    },

    // Layer 3: Central Circular Badge Background
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: "Center Badge",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [150, 150, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [90, 90, 100], h: 0 },
            { t: 30, s: [104, 104, 100], h: 0 },
            { t: 60, s: [96, 96, 100], h: 0 },
            { t: 90, s: [104, 104, 100], h: 0 },
            { t: 120, s: [90, 90, 100], h: 0 }
          ]
        }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              d: 1,
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              nm: "Circle BG"
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.11, 0.11, 0.14, 1] }, // Dark badge #1c1c24
              o: { a: 0, k: 100 },
              nm: "Fill 1"
            },
            {
              ty: "st",
              c: { a: 0, k: [0.99, 0.73, 0.07, 1] }, // Gold border
              o: { a: 0, k: 100 },
              w: { a: 0, k: 3.5 },
              nm: "Stroke 1"
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: 0,
              sa: 0,
              nm: "Transform"
            }
          ],
          nm: "Badge Group"
        }
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0
    },

    // Layer 4: Rotating Flame / Spark Orbit
    {
      ddd: 0,
      ind: 4,
      ty: 4,
      nm: "Orbit Sparkle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0], h: 0 },
            { t: 120, s: [360], h: 0 }
          ]
        },
        p: { a: 0, k: [150, 150, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              d: 1,
              p: { a: 0, k: [0, -58] },
              s: { a: 0, k: [12, 12] },
              nm: "Spark 1"
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.99, 0.73, 0.07, 1] },
              o: { a: 0, k: 100 },
              nm: "Fill Spark 1"
            },
            {
              ty: "el",
              d: 1,
              p: { a: 0, k: [0, 58] },
              s: { a: 0, k: [9, 9] },
              nm: "Spark 2"
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.89, 0.12, 0.14, 1] },
              o: { a: 0, k: 100 },
              nm: "Fill Spark 2"
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: 0,
              sa: 0,
              nm: "Transform"
            }
          ],
          nm: "Sparks"
        }
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0
    },

    // Layer 5: Sizzling Steam Wave Lines (Top of Drumstick)
    {
      ddd: 0,
      ind: 5,
      ty: 4,
      nm: "Steam Waves",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [30], h: 0 },
            { t: 40, s: [90], h: 0 },
            { t: 80, s: [30], h: 0 },
            { t: 120, s: [30], h: 0 }
          ]
        },
        r: { a: 0, k: 0 },
        p: {
          a: 1,
          k: [
            { t: 0, s: [150, 118, 0], h: 0 },
            { t: 60, s: [150, 108, 0], h: 0 },
            { t: 120, s: [150, 118, 0], h: 0 }
          ]
        },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "sh",
              ks: {
                a: 0,
                k: {
                  i: [[0, 0], [4, -4], [-4, 4], [0, 0]],
                  o: [[0, 0], [-4, 4], [4, -4], [0, 0]],
                  v: [[-12, 10], [-8, 0], [-14, -10], [-10, -18]],
                  c: false
                }
              },
              nm: "Steam Line 1"
            },
            {
              ty: "sh",
              ks: {
                a: 0,
                k: {
                  i: [[0, 0], [4, -4], [-4, 4], [0, 0]],
                  o: [[0, 0], [-4, 4], [4, -4], [0, 0]],
                  v: [[12, 10], [16, 0], [10, -10], [14, -18]],
                  c: false
                }
              },
              nm: "Steam Line 2"
            },
            {
              ty: "st",
              c: { a: 0, k: [0.99, 0.73, 0.07, 0.9] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 2.5 },
              lc: 2,
              lj: 2,
              nm: "Stroke 1"
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: 0,
              sa: 0,
              nm: "Transform"
            }
          ],
          nm: "Steam Group"
        }
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0
    },

    // Layer 6: Drumstick Bone & Crispy Meat
    {
      ddd: 0,
      ind: 6,
      ty: 4,
      nm: "Crispy Chicken Drumstick",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [-10], h: 0 },
            { t: 30, s: [10], h: 0 },
            { t: 60, s: [-10], h: 0 },
            { t: 90, s: [10], h: 0 },
            { t: 120, s: [-10], h: 0 }
          ]
        },
        p: { a: 0, k: [150, 155, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [100, 100, 100], h: 0 },
            { t: 30, s: [110, 110, 100], h: 0 },
            { t: 60, s: [100, 100, 100], h: 0 },
            { t: 90, s: [110, 110, 100], h: 0 },
            { t: 120, s: [100, 100, 100], h: 0 }
          ]
        }
      },
      ao: 0,
      shapes: [
        // Drumstick Meat
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              d: 1,
              p: { a: 0, k: [-4, -8] },
              s: { a: 0, k: [38, 44] },
              nm: "Meat Bulb"
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.89, 0.52, 0.08, 1] }, // Crispy golden brown
              o: { a: 0, k: 100 },
              nm: "Meat Fill"
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: 0,
              sa: 0,
              nm: "Transform"
            }
          ],
          nm: "Meat"
        },
        // Drumstick Crispy Highlight
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              d: 1,
              p: { a: 0, k: [-9, -12] },
              s: { a: 0, k: [16, 20] },
              nm: "Crispy Crunch Highlight"
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.99, 0.73, 0.07, 1] }, // Gold highlight
              o: { a: 0, k: 100 },
              nm: "Highlight Fill"
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: 0,
              sa: 0,
              nm: "Transform"
            }
          ],
          nm: "Highlight"
        },
        // Bone Shaft
        {
          ty: "gr",
          it: [
            {
              ty: "rc",
              d: 1,
              s: { a: 0, k: [8, 26] },
              p: { a: 0, k: [14, 12] },
              r: { a: 0, k: 4 },
              nm: "Bone Bar"
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.94, 0.92, 0.88, 1] }, // Off-white bone
              o: { a: 0, k: 100 },
              nm: "Bone Fill"
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 45 },
              o: { a: 0, k: 100 },
              sk: 0,
              sa: 0,
              nm: "Transform"
            }
          ],
          nm: "Bone"
        },
        // Bone Knobs
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              d: 1,
              p: { a: 0, k: [18, 22] },
              s: { a: 0, k: [10, 10] },
              nm: "Knob 1"
            },
            {
              ty: "el",
              d: 1,
              p: { a: 0, k: [23, 17] },
              s: { a: 0, k: [10, 10] },
              nm: "Knob 2"
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.94, 0.92, 0.88, 1] },
              o: { a: 0, k: 100 },
              nm: "Knobs Fill"
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: 0,
              sa: 0,
              nm: "Transform"
            }
          ],
          nm: "Bone Knobs"
        }
      ],
      ip: 0,
      op: 120,
      st: 0,
      bm: 0
    }
  ]
};
