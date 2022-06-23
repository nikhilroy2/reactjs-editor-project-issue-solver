import _ from 'lodash';
import arrayMove from 'array-move';
import store from '../../store';
import { getSourceValue, getParentKey } from '../SourceValue';
import { convertFromRawToEditorState, convertEditorStateToHTML, checkIsDraftData } from '../../components/Core/RichTextInline/helper';
import NoImage from '../../assets/img/img-placeholder-1.png';
import BlogPosts from '../../components/Core/EmptyStates/BlogPosts';

/**
 * @name dataFormation
 * @function
 * @description data + blocks
 * @param {object} data - data добавленного блока
 */
const dataFormation = (data) => {
  const state = store.getState();
  if (data) {
    const blocks = state.blocks.data;
    for (let i = 0; i < blocks.length; i++) {
      for (let j = 0; j < blocks[i].blocks.length; j++) {
        const block = blocks[i].blocks[j];
        if (Number(block.id) === Number(data.block_id)) {
          const newData = {
            id: data.id,
            block_id: data.block_id,
            default_id: data.default_id,
            position: data.position,
            data: data.data,
            location: block.location === 'sidebar' ? 'sidebar_navbar' : block.location,
            deps: _.isArray(data.deps) ? {} : data.deps,
            title: block.title,
            template: block.template,
            styles: block.styles,
            settings: block.settings,
          };
          newData.deps.components = data.components;
          return newData;
        }
      }
    }
  }
  return false;
};

/**
 * @name getData
 * @function
 * @description data добавленного блока
 * @param {string} dataID - ID добавленного блока
 */
const getData = (dataID) => {
  const state = store.getState();
  if (state.data && state.data.blocks) {
    const { blocks } = state.data;
    for (const snippet in blocks) {
      if (blocks.hasOwnProperty(snippet)) {
        const data = blocks[snippet];
        for (const id in data) {
          if (data.hasOwnProperty(id)) {
            if (Number(id) === Number(dataID)) {
              return data[id];
            }
          }
        }
      }
    }
  }
  return false;
};

/**
 * @name getDeps
 * @function
 * @description deps (бек данные) добавленного блока
 * @param {string} dataID - ID добавленного блока
 */
const getDeps = (dataID) => {
  const state = store.getState();
  if (state.data && state.data.blocks) {
    const { blocks } = state.data;
    for (const snippet in blocks) {
      if (blocks.hasOwnProperty(snippet)) {
        const data = blocks[snippet];
        for (const id in data) {
          if (data.hasOwnProperty(id)) {
            if (Number(id) === Number(dataID)) {
              if (data[id].hasOwnProperty('deps')) {
                return data[id].deps;
              }
            }
          }
        }
      }
    }
  }
  return false;
};

/**
 * @name getBlock
 * @function
 * @description json дефолтного блока
 * @param {string} blockID - ID блока
 */
const getBlock = (blockID) => {
  const state = store.getState();
  if (state.blocks) {
    for (let i = 0; i < state.blocks.length; i++) {
      if (Number(blockID) === Number(state.blocks[i].id)) {
        return state.blocks[i];
      }
    }
  }
  return false;
};

/**
 * @name getDefaultLanguage
 * @function
 * @description Дефолтный язык
 */
const getDefaultLanguage = () => {
  const state = store.getState();
  if (state.languages && state.languages.data && state.languages.data.length) {
    const { data } = state.languages;
    const findDefaultLang = data.find((item) => item.default);
    if (findDefaultLang) {
      return findDefaultLang;
    }
  }
  return false;
};

/**
 * @name getComponentData
 * @function
 * @description data компонента добавленного блока
 * @param {string} code - Код компонента
 */
const getComponentData = (code) => {
  const state = store.getState();
  if (code) {
    const { data } = state.components;
    if (data[code]) {
      return data[code].data;
    }
  }
  return false;
};

/**
 * @name demoDuplicateData
 * @function
 * @description случайные данные для Демо режима
 * @param {string} id - ID блока
 */
const demoDuplicateData = (id) => {
  const dataBLock = _.cloneDeep(getData(id));
  dataBLock.position++;
  dataBLock.id = _.random(10000, 100000);
  return dataBLock;
};

/**
 * @name createDataList
 * @function
 * @description Структура для Recursion
 * @param {object} data - data всех блоков
 */
const createDataList = (data) => {
  if (data) {
    const list = {
      navbar: {},
      header: {},
      footer: {},
      page: {},
    };

    if (data.navbar) {
      data.navbar.forEach((item) => {
        const dataFormat = dataFormation(item);
        if (dataFormat) {
          list.navbar[dataFormat.id] = dataFormat;
        }
      });
    }

    if (data.sidebar) {
      data.sidebar.forEach((item) => {
        const dataFormat = dataFormation(item);
        if (dataFormat) {
          list.navbar[dataFormat.id] = dataFormat;
        }
      });
    }

    if (data.header) {
      data.header.forEach((item) => {
        const dataFormat = dataFormation(item);
        if (dataFormat) {
          list.header[dataFormat.id] = dataFormat;
        }
      });
    }

    if (data.footer) {
      data.footer.forEach((item) => {
        const dataFormat = dataFormation(item);
        if (dataFormat) {
          list.footer[dataFormat.id] = dataFormat;
        }
      });
    }

    if (data.page) {
      data.page.forEach((item) => {
        const dataFormat = dataFormation(item);
        if (dataFormat) {
          list.page[dataFormat.id] = dataFormat;
        }
      });
    }

    return list;
  }
  return false;
};

/**
 * @name addData
 * @function
 * @description Добавление блока на страницу с учетом позиции в секции
 * @param {object} block - блок который надо добавить
 * @param {string} snippet - секция, куда будет добавлен блок
 */
const addData = (block, snippet) => {
  const state = store.getState();
  if (block && snippet) {
    const data = _.cloneDeep(state.data.blocks[snippet]);
    const newDataBlockPosition = Number(block.position);

    data[block.id] = block;

    if (newDataBlockPosition) {
      for (const dataID in data) {
        if (data.hasOwnProperty(dataID) && data[dataID].position) {
          const oldDataBlockPosition = Number(data[dataID].position);
          if (newDataBlockPosition <= oldDataBlockPosition && Number(dataID) !== Number(block.id)) {
            data[dataID].position++;
          }
        }
      }
    }
    return data;
  }

  return false;
};

/**
 * @name deleteData
 * @function
 * @description Удаление добавленного блока с секции
 * @param {number} id - id data блока
 * @param {object} snippet - секция, где удаляется блок
 */
const deleteData = (id, snippet) => {
  const state = store.getState();
  if (id && snippet) {
    const data = _.cloneDeep(state.data.blocks[snippet]);
    const deletedBlockPosition = Number(data[id].position);
    const newData = _.omit(data, [id]);

    for (const dataID in newData) {
      if (newData.hasOwnProperty(dataID)) {
        const position = Number(newData[dataID].position);
        if (position >= deletedBlockPosition) {
          newData[dataID].position = position - 1;
        }
      }
    }
    return newData;
  }

  return false;
};

/**
 * @name sortableData
 * @function
 * @description Сортировка добавленных блоков на странице по параметру position
 * @param {object} data - секция, где удаляется блок
 */
const sortableData = (data) => {
  if (data) {
    if (_.isObject(data)) {
      const obj = Object.values(data);

      if (obj.length) {
        const sortCompare = (a, b) => {
          const bandA = a.position;
          const bandB = b.position;

          let comparison = 0;
          if (bandA > bandB) {
            comparison = 1;
          } else if (bandA < bandB) {
            comparison = -1;
          }
          return comparison;
        };

        return obj.sort(sortCompare);
      }
    }
  }
  return false;
};

/**
 * @name getSortableData
 * @function
 * @description Смена позиции добавленного блока (data)
 * @param {number} oldIndex - старая позиция блока
 * @param {number} newIndex - новая позиция блока
 * @param {string} snippet - секция, где удаляется блок
 */
const getSortableData = (oldIndex, newIndex, snippet) => {
  const state = store.getState();
  if (snippet) {
    const data = _.cloneDeep(state.data.blocks[snippet]);
    if (data) {
      const sortable = sortableData(data);
      const arrayAfterSortable = arrayMove(sortable, oldIndex, newIndex);
      const arrayNewPositions = arrayAfterSortable.map((item, index) => {
        item.position = index + 1;
        return item;
      });
      arrayNewPositions.forEach((item) => {
        if (data[item.id]) {
          data[item.id].position = item.position;
        }
      });
      return {
        data,
        request: {
          snippet,
          positions: arrayNewPositions.map((item) => {
            const { id, position } = item;
            return {
              id,
              position,
            };
          }),
        },
      };
    }
  }
  return false;
};

/**
 * @name getFile
 * @function
 * @description Файл из файлового менеджера
 * @param {number} fileID - ID файла
 */
const getFile = (fileID) => {
  if (fileID) {
    const state = store.getState();
    const files = state.filesmanager.data;

    if (_.isArray(files) && files.length) {
      for (let i = 0; i < files.length; i++) {
        if (Number(files[i].id) === Number(fileID)) {
          return files[i];
        }
      }
    }
  }
  return false;
};

/**
 * @name forDomElements
 * @function
 * @description цикл for для temaplate.json
 * @param {object} domElement - Template JSON
 * @param {string} dataID - ID добавленного блока
 */
const forDomElements = (domElement, dataID) => {
  if (domElement.for) {
    const forData = domElement.for.data;
    const forChildren = domElement.for.children;
    const childrenData = getSourceValue(forData.source, dataID) !== 'not found' ? getSourceValue(forData.source, dataID) : false;

    if (childrenData) {
      if (childrenData && _.isArray(childrenData)) {
        const childItems = [];
        childrenData.forEach((item, index) => {
          forChildren.forEach((childItem) => {
            childItems.push(
              Object.traverse(_.cloneDeep(childItem), (node, value, key) => {
                if (key === 'source') {
                  node[key].value = node[key].value.replace(/\[index\]/, `[${index}]`);
                }
              }),
            );
          });
        });

        if (domElement.actions) {
          // Empty state Totals block
          if (domElement.actions.totals) {
            const atLeastOneVisible = childrenData.find((total) => total.visibility);
            if (!atLeastOneVisible) {
              childItems.push({
                tagName: 'div',
                attrs: {
                  className: [
                    'w-100',
                    'alert',
                    'text-center',
                  ],
                },
                text: 'Counters values are disabled. To enable them, open "Counters" settings.',
              })
            }
          }
        }
        return childItems;
      }
    }
  }

  return false;
};

/**
 * @name blocksToObject
 * @function
 * @description перевод блока из массива в объект
 */
const blocksToObject = () => {
  const state = store.getState();

  if (state.blocks && _.isArray(state.blocks)) {
    const { blocks } = state;
    const blocksID = {};

    blocks.forEach((block) => {
      if (block.id) {
        blocksID[block.id] = block;
      }
    });

    return blocksID;
  }

  return false;
};

/**
 * @name sortByPosition
 * @function
 * @description сортировка по позиции
 * @param {object} data - добавленный блок
 */
const sortByPosition = (data) => {
  if (data && _.isObject(data)) {
    return Object.values(data).sort((a, b) => a.position - b.position);
  }
  throw new Error(`data is empty [${typeof data}]`);
};

/**
 * @name getEmptyComponent
 * @function
 * @description Empty компоненты для блока
 * @param {string} type - ключ empty компонента
 */
const getEmptyComponent = (type) => {
  switch (type) {
    case 'blog_posts':
      return BlogPosts;
    default:
      return false;
  }
};

/**
 * @name getEmptyState
 * @function
 * @description Empty компонент для getEmptyComponent
 * @param {object} settings - настройки блока settings.json
 */
const getEmptyState = (settings, dataID) => {
  if (settings && settings.hasOwnProperty('preloader') && dataID) {
    const { preloader } = settings;
    if (preloader.hasOwnProperty('source') && preloader.hasOwnProperty('type')) {
      const { source, type } = preloader;

      const value = getSourceValue(source, dataID);
      const component = getEmptyComponent(type);
      if (component && (value === 'not found' || (_.isArray(value) && !value.length) || value === false)) {
        return component;
      }
    }
  }
  return false;
};

/**
 * @name getAttrs
 * @function
 * @description формирование атрибутов (классы, стили, картинки и т.д)
 * @param {object} domElement - template блока
 * @param {number} dataID - id блока
 */
const getAttrs = (domElement, dataID) => {
  const newAttrs = {};
  const { attrs } = domElement;
  const state = store.getState();

  if (domElement && _.isObject(domElement)) {
    if (attrs) {
      if (Object.keys(attrs).length) {
        for (const i in attrs) {
          if (attrs.hasOwnProperty(i)) {
            if (i === 'style') {
              newAttrs[i] = {};

              if (_.isArray(attrs[i])) {
                attrs[i].forEach((style) => {
                  Object.keys(style).forEach((styleKey) => {
                    if (style[styleKey].source) {
                      const value = getSourceValue(style[styleKey].source, dataID);

                      if (!_.isNull(value) && !_.isUndefined(value)) {
                        if (_.isObject(value) && value.type === 'filesmanager') {
                          const file = getFile(value.id);

                          if (file) {
                            newAttrs[i][styleKey] = `url(${file.url})`;
                          } else {
                            newAttrs[i][styleKey] = `url(${NoImage})`;
                          }
                        } else {
                          if (styleKey === 'backgroundImage' && _.isString(value)) {
                            newAttrs[i][styleKey] = `url(${value}`;
                          } else {
                            newAttrs[i][styleKey] = value;
                          }
                        }
                      }
                    } else {
                      newAttrs[i][styleKey] = style[styleKey];
                    }
                  });
                });
              }
            } else if (i === 'item') {
              console.log(i);
            } else if (i === 'readonly') {
              newAttrs.readOnly = true;
            } else if (i === 'className') {
              attrs.className.forEach((className) => {
                if (_.isObject(className)) {
                  // If source
                  if (className.source) {
                    const value = getSourceValue(className.source, dataID);
                    if (value !== 'not found') {
                      newAttrs[i] = `${newAttrs[i] || ' '} ${value}`;
                    }
                  } else {
                    const classes = Object.keys(className);
                    if (classes.length) {
                      classes.forEach((classKey) => {
                        if (className[classKey] === 'rtl' && state.configuration && state.configuration.rtl) {
                          newAttrs[i] = `${newAttrs[i] || ' '} ${classKey}`;
                        }
                      });
                    }
                  }
                }
                if (_.isString(className)) {
                  newAttrs[i] = `${newAttrs[i] || ' '} ${className}`;
                }
              });

              if (domElement.resize) {
                newAttrs[i] = `${newAttrs.className || ' '} editor__resizebox`;
              }

              if (domElement.resizeBox) {
                newAttrs[i] = `${newAttrs.className || ' '} editor__resize-box`;
              }

              if ((domElement.popup && domElement.popup.icon) || (domElement.popup && domElement.popup.image) || domElement.transform) {
                newAttrs[i] = `${newAttrs.className || ' '} editor__action-element`;
              }

              if (domElement.text && domElement.text.resize) {
                newAttrs[i] = `${newAttrs.className || ' '} editor__node-text-resize`;
              }

              if (domElement.text && domElement.text.source && domElement.text.source.typeData === 'currency') {
                newAttrs.value = state.configuration?.currency_template?.replace('{{value}}', domElement.text.source.value) || '';
              }
            } else if (i === 'src') {
              const src = attrs[i];
              if (_.isObject(src)) {
                const value = getSourceValue(src.source, dataID);

                if (value !== 'not found') {
                  if (_.isObject(value) && value.hasOwnProperty('id')) {
                    const file = getFile(value.id);
                    if (file) {
                      newAttrs[i] = file.url;
                    } else {
                      newAttrs[i] = NoImage;
                    }
                  } else if (_.isString(value)) {
                    newAttrs[i] = value;
                  } else {
                    newAttrs[i] = NoImage;
                  }
                }
              }

              if (src && _.isString(src)) {
                newAttrs[i] = src;
              }
            } else if (i === 'collapse-id') {
              newAttrs['collapse-id'] = dataID + Number(getParentKey(attrs[i].source).currentKey);
            } else if (i === 'collapse-target') {
              newAttrs['collapse-target'] = dataID + Number(getParentKey(attrs[i].source).currentKey);
            } else if (i === 'collapse-params') {
              newAttrs['collapse-params'] = dataID + Number(getParentKey(attrs[i].source).currentKey);
            } else {
              newAttrs[i] = attrs[i];
            }
          }
        }
      }
    }

    if (domElement.actions) {
      newAttrs.className = `${newAttrs.className || ' '} editor__component-wrapper`;
    }

    if (domElement.tagName === 'a') {
      newAttrs.className = `${newAttrs.className || ' '} editor__element-link`;
    }

    if (domElement.component) {
      if (domElement.component && _.isString(domElement.component)) {
        const id = getSourceValue(
          {
            typeData: 'deps',
            value: `components.${domElement.component}`,
          },
          dataID,
        );

        if (id !== 'not found') {
          newAttrs.className = `${newAttrs.className || ' '} component_${domElement.component}`.trimStart();
        }
      } else if (domElement.component && _.isArray(domElement.component)) {
        domElement.component.forEach((component) => {
          const id = getSourceValue(
            {
              typeData: 'deps',
              value: `components.${component}`,
            },
            dataID,
          );

          if (id !== 'not found') {
            newAttrs.className = `${newAttrs.className || ' '} component_${component}`.trimStart();
          }
        });
      }
    }
  }

  return newAttrs;
};

/**
 * @name paginationDomElements
 * @function
 * @description формирование template для pagination = true
 * @param {object} domElement - template
 * @param {string} dataID - ID блока
 */
const paginationDomElements = (domElement, dataID) => {
  if (domElement && domElement.pagination) {
    const isSourcePagination = domElement.pagination.hasOwnProperty('source') && _.isObject(domElement.pagination.source);
    const isBlankPagination = domElement.pagination.hasOwnProperty('blank');
    const isOptionsPagination = domElement.pagination.hasOwnProperty('options');
    if (isSourcePagination && isBlankPagination) {
      const paginationData = getSourceValue(domElement.pagination.source, dataID);
      const options = {
        arrowLeft: isOptionsPagination && domElement.pagination.options.arrowLeft ? domElement.pagination.options.arrowLeft : false,
        arrowRight: isOptionsPagination && domElement.pagination.options.arrowRight ? domElement.pagination.options.arrowRight : false,
        activeClass: isOptionsPagination && domElement.pagination.options.activeClass ? domElement.pagination.options.activeClass : false,
      };
      // count_items: 3
      // current_page: 1
      // page_size: 10
      // pages: 1
      // total_count: 3
      const domElementsFormat = (children, text, link, active) => Object.traverse(_.cloneDeep(children), (node, value, key) => {
        if (value === '[pagination_link]') {
          node[key] = link.toString();
        }
        if (value === '[pagination_content]') {
          node[key] = text.toString();
        }
        if (value === '[pagination_class_active]') {
          node[key] = active || '';
        }
      });
      const children = _.cloneDeep(domElement.pagination.blank);
      const { pages, current_page } = paginationData;
      const childItems = [];

      if (options.arrowLeft) {
        const link = Number(current_page) === 1 ? 1 : Number(current_page) - 1;
        childItems.unshift(domElementsFormat(children, options.arrowLeft, link, false));
      }

      for (let i = 1; i <= pages; i++) {
        childItems.push(domElementsFormat(children, i, i, i === Number(current_page) ? options.activeClass : false));
        if (i === pages && options.arrowRight) {
          const link = Number(pages) === Number(current_page) ? pages : Number(current_page) + 1;
          childItems.push(domElementsFormat(children, options.arrowRight, link, false));
        }
      }
      return childItems;
    }
  }
  return false;
};

/**
 * @name dataConvertToPublish
 * @function
 * @description конвертация wysiwyg текста для твига
 * @param {object} data - data блока
 */
const dataConvertToPublish = (data) => {
  if (data) {
    // eslint-disable-next-line consistent-return
    return Object.traverse(_.cloneDeep(data), (node, value, key) => {
      try {
        if (node[key].type && node[key].type === 'wysiwyg') {
          if (node[key].hasOwnProperty('data') && _.isObject(node[key].data)) {
            const isDraftData = checkIsDraftData(node[key].data);
            if (isDraftData) {
              const editorState = convertFromRawToEditorState(node[key].data);
              if (editorState) {
                node[key] = convertEditorStateToHTML(editorState);
              }
            } else {
              const newData = {};
              for (const languageKey in node[key].data) {
                if (node[key].data.hasOwnProperty(languageKey)) {
                  const editorState = convertFromRawToEditorState(node[key].data[languageKey]);
                  if (editorState) {
                    newData[languageKey] = convertEditorStateToHTML(editorState);
                  }
                }
              }
              node[key] = newData;
            }
          } else if (node[key].hasOwnProperty('data') && _.isString(node[key].data)) {
            node[key] = node[key].data;
          }
        }
      } catch (error) {
        // console.log('error convert')
      }
    });
  }
  return false;
};

/**
 * @name getPublishData
 * @function
 * @description создаем data для Редактора и для Twig
 * @param {number} id - id блока
 */
const getPublishData = (id) => {
  if (id) {
    const state = store.getState();
    const { blocks } = state.data;
    const blocksArray = Object.values(blocks);
    let data;
    for (let i = 0; i < blocksArray.length; i++) {
      if (blocksArray[i][id]) {
        data = _.cloneDeep(blocksArray[i][id].data);
        break;
      }
    }

    const publish = dataConvertToPublish(data);

    if (publish) {
      return {
        draft: data,
        publish,
      };
    }
  }
  return false;
};

export default {
  getData,
  getDeps,
  getBlock,
  createDataList,
  dataFormation,
  addData,
  deleteData,
  getSortableData,
  forDomElements,
  paginationDomElements,
  blocksToObject,
  sortByPosition,
  sortableData,
  getAttrs,
  getFile,
  getPublishData,
  dataConvertToPublish,
  getComponentData,
  demoDuplicateData,
  getEmptyState,
  getDefaultLanguage,
};
