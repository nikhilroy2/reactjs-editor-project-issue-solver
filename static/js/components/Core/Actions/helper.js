import _ from 'lodash';
import { uuid } from 'uuidv4';
import Methods from '../../../utils/Methods/index';
import store from '../../../store';

export const getActionPosition = (action) => {
  const position = {
    classNames: {},
    styles: {},
  };

  if (action && action.position) {
    if (action.position.horizontal) {
      if (action.position.horizontal === 'left') {
        position.classNames['editor__component-action__position-horizontal-left'] = true;
      }
      if (action.position.horizontal === 'right') {
        position.classNames['editor__component-action__position-horizontal-right'] = true;
      }
      if (action.position.horizontal === 'center') {
        position.classNames['editor__component-action__position-horizontal-center'] = true;
      }
    }

    if (action.position.vertical) {
      if (action.position.vertical === 'top') {
        position.classNames['editor__component-action__position-vertical-top'] = true;
      }
      if (action.position.vertical === 'bottom') {
        position.classNames['editor__component-action__position-vertical-bottom'] = true;
      }
    }

    if (action.position.hasOwnProperty('inside')) {
      if (action.position.inside === true && action.position.vertical === 'top') {
        position.classNames['editor__component-action__position-inside-top'] = true;
      }
      if (action.position.inside === true && action.position.vertical === 'bottom') {
        position.classNames['editor__component-action__position-inside-bottom'] = true;
      }
      if (action.position.inside === false && action.position.vertical === 'top') {
        position.classNames['editor__component-action__position-outside-top'] = true;
      }
      if (action.position.inside === false && action.position.vertical === 'bottom') {
        position.classNames['editor__component-action__position-outside-bottom'] = true;
      }
    }

    if (_.isUndefined(action.position.vertical)) {
      position.classNames['editor__component-action__position-exception'] = true;
    }
  }

  return position;
};

export const getComponent = (dataID, action) => {
  const state = store.getState();

  if (dataID && action) {
    if (action.component) {
      const componentKey = action.component;
      const block = Methods.getData(dataID);
      const { deps } = block;
      if (deps.components && deps.components[componentKey]) {
        const component = deps.components[componentKey];
        return {
          currentComponentCode: component.code,
          currentComponentData: component.data,
          component: state.components.data[component.code],
        };
      }
    }
  }
  return false;
};

export const getDeps = (dataID, action) => {
  if (dataID && action) {
    if (action.component) {
      const block = Methods.getData(dataID);
      const { deps } = block;
      if (deps) {
        return deps;
      }
    }
  }
  return false;
};

export const newWysiwygID = (object) => Object.traverse(object, (node, value, key) => {
  if (key === 'type' && node.type === 'wysiwyg') {
    node.id = uuid();
  }
});
