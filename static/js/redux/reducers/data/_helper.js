/**
 * @function
 * @name componentSetDefault
 * @category Data helper
 * @param  {object} state - state data
 * @param  {payload} payload - action payload
 */
export const componentSetDefault = (state, payload) => {
  if (state[payload.dataID]) {
    return {
      ...state,
      [payload.dataID]: {
        ...state[payload.dataID],
        deps: {
          ...state[payload.dataID].deps,
          components: {
            ...state[payload.dataID].deps.components,
            [payload.componentName]: {
              ...state[payload.dataID].deps.components[payload.componentName],
              data: null,
            },
          },
        },
      },
    };
  }
  return state;
};

/**
 * @function
 * @name changeDepsComponentData
 * @category Data helper
 * @param  {object} state - state data
 * @param  {payload} payload - action payload
 */
export const changeDepsComponentData = (state, payload) => {
  if (state[payload.dataID]) {
    return {
      ...state,
      [payload.dataID]: {
        ...state[payload.dataID],
        deps: {
          ...state[payload.dataID].deps,
          components: {
            ...state[payload.dataID].deps.components,
            [payload.componentName]: {
              ...state[payload.dataID].deps.components[payload.componentName],
              data: payload.data,
            },
          },
        },
      },
    };
  }
  return state;
};

/**
 * @function
 * @name changeData
 * @category Data helper
 * @param  {object} state - state data
 * @param  {payload} payload - action payload
 */
export const changeData = (state, payload) => {
  if (state[payload.dataID]) {
    if (payload.key === false && typeof payload.value === 'object') {
      return {
        ...state,
        [payload.dataID]: {
          ...state[payload.dataID],
          data: {
            ...state[payload.dataID].data,
            ...payload.value,
          },
        },
      };
    }
    return {
      ...state,
      [payload.dataID]: {
        ...state[payload.dataID],
        data: {
          ...state[payload.dataID].data,
          [payload.key]: payload.value,
        },
      },
    };
  }
  return state;
};

/**
 * @function
 * @name changeDeps
 * @category Data deps helper
 * @param  {object} state - state data
 * @param  {payload} payload - action payload
 */
export const changeDeps = (state, payload) => {
  if (state[payload.dataID]) {
    if (payload.key === false && typeof payload.value === 'object') {
      return {
        ...state,
        [payload.dataID]: {
          ...state[payload.dataID],
          deps: {
            ...state[payload.dataID].deps,
            ...payload.value,
          },
        },
      };
    }
    return {
      ...state,
      [payload.dataID]: {
        ...state[payload.dataID],
        deps: {
          ...state[payload.dataID].deps,
          [payload.key]: payload.value,
        },
      },
    };
  }
  return state;
};

/**
 * @function
 * @name depsCreate
 * @category Data helper
 * @param  {object} state - state data
 * @param  {payload} payload - action payload
 */
export const depsCreate = (state, payload) => {
  if (state[payload.dataID]) {
    return {
      ...state,
      [payload.dataID]: {
        ...state[payload.dataID],
        deps: {
          ...state[payload.dataID].deps,
          ...payload.data,
        },
      },
    };
  }
  return state;
};
