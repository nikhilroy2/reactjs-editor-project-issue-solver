export const dividersList = [
  {
    id: 1,
    source: false,
  },
  {
    id: 2,
    source: {
      top: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M1280 69.65l-320 49.24L320 20.4 0 69.65V0h1280v69.65z"/></g></svg>',
      bottom: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M0 70.35l320-49.24 640 98.49 320-49.25V140H0V70.35z"/></g></svg>',
    },
  },
  {
    id: 3,
    source: {
      top: `<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <g fill="{{ fill }}">
                <path d="M0 90.72l140-28.28 315.52 24.14L796.48 65.8 1140 104.89l140-14.17V0H0v90.72z" fill-opacity=".5"/>
                <path d="M0 0v47.44L170 0l626.48 94.89L1110 87.11l170-39.67V0H0z"/>
              </g>
            </svg>`,
      bottom: `<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <g fill="{{ fill }}">
                <path d="M0 47.44L170 0l626.48 94.89L1110 87.11l170-39.67V140H0V47.44z" fill-opacity=".5"/>
                <path d="M0 90.72l140-28.28 315.52 24.14L796.48 65.8 1140 104.89l140-14.17V140H0V90.72z"/>
              </g>
            </svg>`,
    },
  },
  {
    id: 4,
    source: {
      top: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M0 0v100c20 17.3 40 29.51 80 29.51 51.79 0 74.69-48.57 151.75-48.57 73.72 0 91 54.88 191.56 54.88C543.95 135.8 554 14 665.69 14c109.46 0 98.85 87 188.2 87 70.37 0 69.81-33.73 115.6-33.73 55.85 0 62 39.62 115.6 39.62 58.08 0 57.52-46.59 115-46.59 39.8 0 60 22.48 79.89 39.69V0z"/></g></svg>',
      bottom: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M1280 86c-19.9-17.21-40.08-39.69-79.89-39.69-57.49 0-56.93 46.59-115 46.59-53.61 0-59.76-39.62-115.6-39.62C923.7 53.27 924.26 87 853.89 87c-89.35 0-78.74-87-188.2-87C554 0 543.95 121.8 423.32 121.8c-100.52 0-117.84-54.88-191.56-54.88-77.06 0-100 48.57-151.75 48.57-40 0-60-12.21-80-29.51v54H1280z"/></g></svg>',
    },
  },
  {
    id: 5,
    source: {
      top: `<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <g fill="{{ fill }}">
                <path d="M504.854,80.066c7.812,0,14.893,0.318,21.41,0.879 c-25.925,22.475-56.093,40.852-102.946,40.852c-20.779,0-37.996-2.349-52.898-6.07C413.517,107.295,434.056,80.066,504.854,80.066z M775.938,51.947c19.145,18.596,39.097,35.051,77.956,35.051c46.907,0,62.299-14.986,80.912-24.98 c-21.357-15.783-46.804-28.348-85.489-28.348C816.829,33.671,794.233,41.411,775.938,51.947z" fill-opacity=".3"/>
                <path d="M1200.112,46.292c39.804,0,59.986,22.479,79.888,39.69v16.805 c-19.903-10.835-40.084-21.777-79.888-21.777c-72.014,0-78.715,43.559-147.964,43.559c-56.84,0-81.247-35.876-117.342-62.552 c9.309-4.998,19.423-8.749,34.69-8.749c55.846,0,61.99,39.617,115.602,39.617C1143.177,92.887,1142.618,46.292,1200.112,46.292z M80.011,115.488c-40.006,0-60.008-12.206-80.011-29.506v16.806c20.003,10.891,40.005,21.782,80.011,21.782 c80.004,0,78.597-30.407,137.669-30.407c55.971,0,62.526,24.026,126.337,24.026c9.858,0,18.509-0.916,26.404-2.461 c-57.186-14.278-80.177-48.808-138.66-48.808C154.698,66.919,131.801,115.488,80.011,115.488z M526.265,80.945 c56.848,4.902,70.056,28.726,137.193,28.726c54.001,0,73.43-35.237,112.48-57.724C751.06,27.782,727.548,0,665.691,0 C597.381,0,567.086,45.555,526.265,80.945z" fill-opacity=".5"/>
                <path d="M0,0v85.982c20.003,17.3,40.005,29.506,80.011,29.506c51.791,0,74.688-48.569,151.751-48.569 c58.482,0,81.473,34.531,138.66,48.808c43.096-8.432,63.634-35.662,134.433-35.662c7.812,0,14.893,0.318,21.41,0.879 C567.086,45.555,597.381,0,665.691,0c61.856,0,85.369,27.782,110.246,51.947c18.295-10.536,40.891-18.276,73.378-18.276 c38.685,0,64.132,12.564,85.489,28.348c9.309-4.998,19.423-8.749,34.69-8.749c55.846,0,61.99,39.617,115.602,39.617 c58.08,0,57.521-46.595,115.015-46.595c39.804,0,59.986,22.479,79.888,39.69V0H0z"/>
              </g>
            </svg>`,
      bottom: `<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <g fill="{{ fill }}">
                <path d="M853.893,86.998c-38.859,0-58.811-16.455-77.956-35.051c18.295-10.536,40.891-18.276,73.378-18.276 c38.685,0,64.132,12.564,85.489,28.347C916.192,72.012,900.8,86.998,853.893,86.998z M526.265,80.945 c-6.517-0.562-13.599-0.879-21.41-0.879c-70.799,0-91.337,27.229-134.433,35.662c14.901,3.72,32.118,6.07,52.898,6.07 C470.171,121.797,500.34,103.421,526.265,80.945z" fill-opacity=".3"/>
                <path d="M663.458,109.671c-67.137,0-80.345-23.824-137.193-28.726C567.086,45.555,597.381,0,665.691,0 c61.857,0,85.369,27.782,110.246,51.947C736.888,74.434,717.459,109.671,663.458,109.671z M217.68,94.163 c55.971,0,62.526,24.026,126.337,24.026c9.858,0,18.508-0.916,26.404-2.461c-57.186-14.278-80.177-48.808-138.659-48.808 c-77.063,0-99.96,48.569-151.751,48.569c-40.006,0-60.008-12.206-80.011-29.506v16.806c20.003,10.891,40.005,21.782,80.011,21.782 C160.014,124.57,158.608,94.163,217.68,94.163z M1200.112,46.292c-57.493,0-56.935,46.595-115.015,46.595 c-53.612,0-59.755-39.618-115.602-39.618c-15.267,0-25.381,3.751-34.69,8.749c36.096,26.675,60.503,62.552,117.342,62.552 c69.249,0,75.951-43.559,147.964-43.559c39.804,0,59.986,10.943,79.888,21.777V85.982 C1260.097,68.771,1239.916,46.292,1200.112,46.292z" fill-opacity=".5"/>
                <path d="M1052.147,124.57c-56.84,0-81.247-35.876-117.342-62.552c-18.613,9.994-34.005,24.98-80.912,24.98 c-38.859,0-58.811-16.455-77.956-35.051c-39.05,22.487-58.479,57.724-112.48,57.724c-67.137,0-80.345-23.824-137.193-28.726 c-25.925,22.475-56.093,40.852-102.946,40.852c-20.779,0-37.996-2.349-52.898-6.07c-7.895,1.545-16.546,2.461-26.404,2.461 c-63.811,0-70.366-24.026-126.337-24.026c-59.072,0-57.665,30.407-137.669,30.407c-40.006,0-60.008-10.891-80.011-21.782V140h1280 v-37.212c-19.903-10.835-40.084-21.777-79.888-21.777C1128.098,81.011,1121.397,124.57,1052.147,124.57z"/>
              </g>
            </svg>`,
    },
  },
  {
    id: 6,
    source: {
      top: `<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <g fill="{{ fill }}">
                <path d="M640 140L1280 0H0z" fill-opacity=".5"/>
                <path d="M640 98l640-98H0z"/>
              </g>
            </svg>`,
      bottom: `<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                  <g fill="{{ fill }}">
                    <path d="M640 139L0 0v140h1280V0L640 139z" fill-opacity=".5"/>
                    <path d="M640 139L0 42v98h1280V42l-640 97z"/>
                  </g>
              </svg>`,
    },
  },
  {
    id: 7,
    source: {
      top: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M1280 140V0H0l1280 140z"/></g></svg>',
      bottom: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M0 0v140h1280L0 0z"/></g></svg>',
    },
  },
  {
    id: 8,
    source: {
      top: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M1280 140V0H0l1280 140z" fill-opacity=".5"/><path d="M1280 98V0H0l1280 98z"/></g></svg>',
      bottom: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M0 0v140h1280L0 0z" fill-opacity=".5"/><path d="M0 42v98h1280L0 42z"/></g></svg>',
    },
  },
  {
    id: 9,
    source: {
      top: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M640 140L1280 0H0z"/></g></svg>',
      bottom: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M640 139L0 0v140h1280V0L640 139z"/></g></svg>',
    },
  },
  {
    id: 10,
    source: {
      top: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M1280 0L640 70 0 0v140l640-70 640 70V0z" fill-opacity=".5"/><path d="M1280 0H0l640 70 640-70z"/></g></svg>',
      bottom: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M0 140l640-70 640 70V0L640 70 0 0v140z" fill-opacity=".5"/><path d="M0 140h1280L640 70 0 140z"/></g></svg>',
    },
  },
  {
    id: 11,
    source: {
      top: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M0 0s573.08 140 1280 140V0z"/></g></svg>',
      bottom: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M0 140h1280C573.08 140 0 0 0 0z"/></g></svg>',
    },
  },
  {
    id: 12,
    source: {
      top: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M0 0v60s573.09 80 1280 80V0z" fill-opacity=".3"/><path d="M0 0v30s573.09 110 1280 110V0z" fill-opacity=".5"/><path d="M0 0s573.09 140 1280 140V0z"/></g></svg>',
      bottom: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M0 140h1280C573.08 140 0 0 0 0z" fill-opacity=".3"/><path d="M0 140h1280C573.08 140 0 30 0 30z" fill-opacity=".5"/><path d="M0 140h1280C573.08 140 0 60 0 60z"/></g></svg>',
    },
  },
  {
    id: 13,
    source: {
      top: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M640 140C286.54 140 0 0 0 0h1280S993.46 140 640 140z"/></g></svg>',
      bottom: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M1280 140V0S993.46 140 640 139 0 0 0 0v140z"/></g></svg>',
    },
  },
  {
    id: 14,
    source: {
      top: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M0 0v.48C18.62 9.38 297.81 140 639.5 140 993.24 140 1280 0 1280 0z" fill-opacity=".3"/><path d="M0 .6c14 8.28 176.54 99.8 555.45 119.14C952.41 140 1280 0 1280 0H0z" fill-opacity=".5"/><path d="M726.29 101.2C1126.36 79.92 1281 0 1281 0H1c.05 0 325.25 122.48 725.29 101.2z"/></g></svg>',
      bottom: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M725.29 101.2C325.22 122.48 0 0 0 0v140h1280V0s-154.64 79.92-554.71 101.2z" fill-opacity=".3"/><path d="M556.45 119.74C953.41 140 1280 14 1280 14v126H0V0s159.5 99.48 556.45 119.74z" fill-opacity=".5"/><path d="M640 140c353.46 0 640-140 640-139v140H0V0s286.54 140 640 140z"/></g></svg>',
    },
  },
  {
    id: 15,
    source: {
      top: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M320 28C160 28 80 49 0 70V0h1280v70c-80 21-160 42-320 42-320 0-320-84-640-84z"/></g></svg>',
      bottom: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M320 28c320 0 320 84 640 84 160 0 240-21 320-42v70H0V70c80-21 160-42 320-42z"/></g></svg>',
    },
  },
  {
    id: 16,
    source: {
      top: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M0 51.76c36.21-2.25 77.57-3.58 126.42-3.58 320 0 320 57 640 57 271.15 0 312.58-40.91 513.58-53.4V0H0z" fill-opacity=".3"/><path d="M0 24.31c43.46-5.69 94.56-9.25 158.42-9.25 320 0 320 89.24 640 89.24 256.13 0 307.28-57.16 481.58-80V0H0z" fill-opacity=".5"/><path d="M0 0v3.4C28.2 1.6 59.4.59 94.42.59c320 0 320 84.3 640 84.3 285 0 316.17-66.85 545.58-81.49V0z"/></g></svg>',
      bottom: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M1280 3.4C1050.59 18 1019.4 84.89 734.42 84.89c-320 0-320-84.3-640-84.3C59.4.59 28.2 1.6 0 3.4V140h1280z" fill-opacity=".3"/><path d="M0 24.31c43.46-5.69 94.56-9.25 158.42-9.25 320 0 320 89.24 640 89.24 256.13 0 307.28-57.16 481.58-80V140H0z" fill-opacity=".5"/><path d="M1280 51.76c-201 12.49-242.43 53.4-513.58 53.4-320 0-320-57-640-57-48.85.01-90.21 1.35-126.42 3.6V140h1280z"/></g></svg>',
    },
  },
  {
    id: 17,
    source: {
      top: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M978.81 122.25L0 0h1280l-262.1 116.26a73.29 73.29 0 0 1-39.09 5.99z"/></g></svg>',
      bottom: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M1280 0l-262.1 116.26a73.29 73.29 0 0 1-39.09 6L0 0v140h1280z"/></g></svg>',
    },
  },
  {
    id: 18,
    source: {
      top: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M978.81 122.25L0 0h1280l-262.1 116.26a73.29 73.29 0 0 1-39.09 5.99z" fill-opacity=".5"/><path d="M983.19 95.23L0 0h1280l-266 91.52a72.58 72.58 0 0 1-30.81 3.71z"/></g></svg>',
      bottom: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M1280 0l-266 91.52a72.59 72.59 0 0 1-30.76 3.71L0 0v140h1280z" fill-opacity=".5"/><path d="M1280 0l-262.1 116.26a73.29 73.29 0 0 1-39.09 6L0 0v140h1280z"/></g></svg>',
    },
  },
  {
    id: 19,
    source: {
      top: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M1280 0l-131.81 111.68c-16.47 14-35.47 21-54.71 20.17L173 94a76.85 76.85 0 0 1-36.79-11.46L0 0z"/></g></svg>',
      bottom: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M1093.48 131.85L173 94a76.85 76.85 0 0 1-36.79-11.46L0 0v140h1280V0l-131.81 111.68c-16.47 13.96-35.47 20.96-54.71 20.17z"/></g></svg>',
    },
  },
  {
    id: 20,
    source: {
      top: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M1093.48 131.85L173 94a76.85 76.85 0 0 1-36.79-11.46L0 0h1280l-131.81 111.68c-16.47 13.96-35.47 20.96-54.71 20.17z" fill-opacity=".5"/><path d="M1094.44 119L172.7 68.72a74.54 74.54 0 0 1-25.19-5.95L0 0h1280l-133.85 102c-15.84 12.09-33.7 17.95-51.71 17z"/></g></svg>',
      bottom: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M1094.44 119L172.7 68.72a74.54 74.54 0 0 1-25.19-5.95L0 0v140h1280V0l-133.85 102c-15.84 12.09-33.7 17.95-51.71 17z" fill-opacity=".5"/><path d="M1093.48 131.85L173 94a76.85 76.85 0 0 1-36.79-11.46L0 0v140h1280V0l-131.81 111.68c-16.47 13.96-35.47 20.96-54.71 20.17z"/></g></svg>',
    },
  },
  {
    id: 21,
    source: {
      top: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M156.258 127.903l86.363-18.654 78.684 13.079L411.441 99.4l94.454 10.303L582.82 93.8l82.664 18.728 76.961-11.39L816.109 71.4l97.602 9.849L997.383 50.4l66.285 14.694 70.793-24.494h79.863L1280 0H0v122.138l60.613 9.965z"/></g></svg>',
      bottom: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M0 122.138l60.614 9.965 95.644-4.2 86.363-18.654 78.684 13.079L411.442 99.4l94.453 10.303L582.821 93.8l82.664 18.728 76.961-11.39L816.11 71.4l97.601 9.849L997.383 50.4l66.285 14.694 70.793-24.494h79.863L1280 0v140H0z"/></g></svg>',
    },
  },
  {
    id: 22,
    source: {
      top: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M1214.323 66.051h-79.863l-70.793 18.224-66.285-10.933-83.672 22.953-97.601-7.328-73.664 22.125-76.961 8.475-82.664-13.934-76.926 11.832-94.453-7.666-90.137 17.059-78.684-9.731-86.363 13.879-95.644 3.125L0 126.717V0h1280l-.001 35.844z" fill-opacity=".5"/><path d="M0 0h1280v.006l-70.676 36.578-74.863 4.641-70.793 23.334-66.285-11.678-83.672 29.618-97.602-7.07-63.664 21.421-76.961 12.649-91.664-20.798-77.926 17.66-94.453-7.574-90.137 21.595-78.683-9.884-86.363 16.074-95.645 6.211L0 127.905z"/></g></svg>',
      bottom: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M0 127.899l60.613 4.878 95.645-6.211 86.363-16.074 78.684 9.883 90.136-21.594 94.454 7.574 77.925-17.66 91.664 20.798 76.961-12.649 63.664-21.422 97.602 7.07 83.672-29.617 66.285 11.678 70.793-23.334 74.863-4.641L1280 0v140H0z" fill-opacity=".5"/><path d="M0 126.71l60.613 7.415L156.257 131l86.364-13.879 78.683 9.731 90.137-17.059 94.453 7.666 76.926-11.833 82.664 13.935 76.961-8.475 73.664-22.126 97.601 7.328 83.672-22.952 66.285 10.933 70.794-18.224h79.862L1280 35.838V140H0z"/></g></svg>',
    },
  },
  {
    id: 23,
    source: {
      top: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M156 35.51l95.46 34.84 120.04.24 71.5 33.35 90.09-3.91L640 137.65l102.39-37.17 85.55 10.65 88.11-7.19L992 65.28l73.21 5.31 66.79-22.1 77-.42L1280 0H0l64.8 38.69 91.2-3.18z"/></g></svg>',
      bottom: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M0 0l64.8 38.69 91.2-3.18 95.45 34.84 120.04.24 71.5 33.35 90.08-3.91 106.91 37.62 102.38-37.17 85.55 10.65 88.11-7.19 75.95-38.66 73.21 5.31 66.78-22.1 77-.42 71-48.07v140H0V0z"/></g></svg>',
    },
  },
  {
    id: 24,
    source: {
      top: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M156 35.41l95.46 34.73 120.04.25 71.5 33.24 90.09-3.89L640 137.25l102.39-37.06 85.55 10.61 88.11-7.17L992 65.08l73.21 5.31L1132 48.35l77-.42L1280 0H0l64.8 38.57 91.2-3.16z" fill-opacity=".5"/><path d="M156 28.32l95.46 27.79 120.04.2L443 82.9l90.09-3.11L640 109.8l102.39-29.65 85.55 8.49 88.11-5.74L992 52.07l73.21 4.24L1132 38.68l77-.34L1280 0H0l64.8 30.86 91.2-2.54z"/></g></svg>',
      bottom: '<svg width="100%" height="100px" viewBox="0 0 1280 140" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g fill="{{ fill }}"><path d="M0 0l64.8 30.95 91.2-2.54 95.46 27.87 120.04.2L443 83.15l90.09-3.12L640 110.12l102.39-29.73 85.55 8.51 88.11-5.75L992 52.22l73.21 4.26L1132 38.79l77-.33L1280 0v140H0V0z" fill-opacity=".5"/><path d="M0 0l64.8 38.69 91.2-3.18 95.46 34.84 120.04.24 71.5 33.35 90.09-3.91L640 137.65l102.39-37.17 85.55 10.65 88.11-7.19L992 65.28l73.21 5.31 66.79-22.1 77-.41L1280 0v140H0V0z"/></g></svg>',
    },
  },
];
