/* eslint-disable */
import _ from 'lodash';
import Methods from '../utils/Methods/index';
import { getSourceValue, getObjectSource } from './SourceValue';

export const CSSJSON = new (function() {
  var base = this;

  base.init = function() {
    // String functions
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, '');
    };

    String.prototype.repeat = function(n) {
      return new Array(1 + n).join(this);
    };
  };
  base.init();

  // var selX = /([^\s\;\{\}][^\;\{\}]*)\{/g;
  // var endX = /\}/g;
  // var lineX = /([^\;\{\}]*)\;/g;
  var commentX = /\/\*[\s\S]*?\*\//g;
  var lineAttrX = /([^\:]+):([^\;]*);/;

  // This is used, a concatenation of all above. We use alternation to
  // capture.
  var altX = /(\/\*[\s\S]*?\*\/)|([^\s\;\{\}][^\;\{\}]*(?=\{))|(\})|([^\;\{\}]+\;(?!\s*\*\/))/gim;

  // Capture groups
  var capComment = 1;
  var capSelector = 2;
  var capEnd = 3;
  var capAttr = 4;

  var isEmpty = function(x) {
    return typeof x == 'undefined' || x.length == 0 || x == null;
  };

  var isCssJson = function(node) {
    return !isEmpty(node) ? node.attributes && node.children : false;
  };

  /**
   * Input is css string and current pos, returns JSON object
   *
   * @param cssString
   *            The CSS string.
   * @param args
   *            An optional argument object. ordered: Whether order of
   *            comments and other nodes should be kept in the output. This
   *            will return an object where all the keys are numbers and the
   *            values are objects containing "name" and "value" keys for each
   *            node. comments: Whether to capture comments. split: Whether to
   *            split each comma separated list of selectors.
   */
  base.toJSON = function(cssString, args) {
    var node = {
      children: {},
      attributes: {},
    };
    var match = null;
    var count = 0;

    if (typeof args == 'undefined') {
      var args = {
        ordered: false,
        comments: false,
        stripComments: false,
        split: false,
      };
    }
    if (args.stripComments) {
      args.comments = false;
      cssString = cssString.replace(commentX, '');
    }

    while ((match = altX.exec(cssString)) != null) {
      if (!isEmpty(match[capComment]) && args.comments) {
        // Comment
        var add = match[capComment].trim();
        node[count++] = add;
      } else if (!isEmpty(match[capSelector])) {
        // New node, we recurse
        var name = match[capSelector].trim();
        // This will return when we encounter a closing brace
        var newNode = base.toJSON(cssString, args);
        if (args.ordered) {
          var obj = {};
          obj['name'] = name;
          obj['value'] = newNode;
          // Since we must use key as index to keep order and not
          // name, this will differentiate between a Rule Node and an
          // Attribute, since both contain a name and value pair.
          obj['type'] = 'rule';
          node[count++] = obj;
        } else {
          if (args.split) {
            var bits = name.split(',');
          } else {
            var bits = [name];
          }
          for (let i in bits) {
            var sel = bits[i].trim();
            if (sel in node.children) {
              for (var att in newNode.attributes) {
                node.children[sel].attributes[att] = newNode.attributes[att];
              }
            } else {
              node.children[sel] = newNode;
            }
          }
        }
      } else if (!isEmpty(match[capEnd])) {
        // Node has finished
        return node;
      } else if (!isEmpty(match[capAttr])) {
        var line = match[capAttr].trim();
        var attr = lineAttrX.exec(line);
        if (attr) {
          // Attribute
          var name = attr[1].trim();
          var value = attr[2].trim();
          if (args.ordered) {
            var obj = {};
            obj['name'] = name;
            obj['value'] = value;
            obj['type'] = 'attr';
            node[count++] = obj;
          } else {
            if (name in node.attributes) {
              var currVal = node.attributes[name];
              if (!(currVal instanceof Array)) {
                node.attributes[name] = [currVal];
              }
              node.attributes[name].push(value);
            } else {
              node.attributes[name] = value;
            }
          }
        } else {
          // Semicolon terminated line
          node[count++] = line;
        }
      }
    }

    return node;
  };

  /**
   * @param node
   *            A JSON node.
   * @param depth
   *            The depth of the current node; used for indentation and
   *            optional.
   * @param breaks
   *            Whether to add line breaks in the output.
   * @param prefix
   * @param data
   */
  base.toCSS = function(node, depth, breaks, prefix = '', data = false, defaultBlocksID = []) {
    var cssString = '';
    if (typeof depth == 'undefined') {
      depth = 0;
    }
    if (typeof breaks == 'undefined') {
      breaks = false;
    }
    if (node.attributes) {
      for (let i in node.attributes) {
        var att = node.attributes[i];
        if (att instanceof Array) {
          for (var j = 0; j < att.length; j++) {
            cssString += strAttr(i, att[j], depth, prefix, data);
          }
        } else {
          cssString += strAttr(i, att, depth, prefix, data);
        }
      }
    }
    if (node.children) {
      var first = true;
      for (let i in node.children) {

        if (breaks && !first) {
          cssString += '\n';
        } else {
          first = false;
        }

        /* TODO fix For landing */
       const addBlockId = () => {
          if (defaultBlocksID && node.children[i].defaultBlockID) {
            const findDefaultBlock = defaultBlocksID.find((item) => {
              if (`${item.default_id}` === node.children[i].defaultBlockID) {
                return true;
              }
            })
            if (findDefaultBlock) {
              return `#block_${findDefaultBlock.id}`
            }
          }
          return false;
        }

         const isRemoveBlockIdSelector = node.children[i].defaultBlockID && !addBlockId();
        if (isRemoveBlockIdSelector) {
          cssString += '';
        } else {
          cssString += `${
            node.children[i].cleanSelector ? (addBlockId() ? addBlockId() : '') : node.children[i].trim ? prefix.replace(/\s/g, '') : prefix
          } ${strNode(i, node.children[i], depth, prefix, data)}`;
        }
      }
    }
    return cssString;
  };

  /**
   * @param data
   *            You can pass css string or the CSSJS.toJSON return value.
   * @param id (Optional)
   *            To identify and easy removable of the style element
   * @param replace (Optional. defaults to TRUE)
   *            Whether to remove or simply do nothing
   * @return HTMLLinkElement
   */
  base.toHEAD = function(data, id, replace) {
    var head = document.getElementsByTagName('head')[0];
    var xnode = document.getElementById(id);
    var _xnodeTest = xnode !== null && xnode instanceof HTMLStyleElement;

    if (isEmpty(data) || !(head instanceof HTMLHeadElement)) return;
    if (_xnodeTest) {
      if (replace === true || isEmpty(replace)) {
        xnode.removeAttribute('id');
      } else return;
    }
    if (isCssJson(data)) {
      data = base.toCSS(data);
    }

    var node = document.createElement('style');
    node.type = 'text/css';

    if (!isEmpty(id)) {
      node.id = id;
    } else {
      node.id = 'cssjson_' + timestamp();
    }
    if (node.styleSheet) {
      node.styleSheet.cssText = data;
    } else {
      node.appendChild(document.createTextNode(data));
    }

    head.appendChild(node);

    if (isValidStyleNode(node)) {
      if (_xnodeTest) {
        xnode.parentNode.removeChild(xnode);
      }
    } else {
      node.parentNode.removeChild(node);
      if (_xnodeTest) {
        xnode.setAttribute('id', id);
        node = xnode;
      } else return;
    }

    return node;
  };

  // Alias

  if (typeof window != 'undefined') {
    window.createCSS = base.toHEAD;
  }

  // Helpers

  var isValidStyleNode = function(node) {
    return node instanceof HTMLStyleElement && node.sheet.cssRules.length > 0;
  };

  var timestamp = function() {
    return Date.now() || +new Date();
  };

  var strAttr = function(name, value, depth, prefix, data) {
    if (typeof value === 'object') {
      let newValue = '';

      const val = getObjectSource(data, value.value);

      if (val !== 'not found') {
        if (_.isObject(val)) {
          if (val.id && val.type === 'filesmanager') {
            const image = Methods.getFile(val.id);
            newValue = `url(${image.url})`;
          }
        } else {
          newValue = val;
        }

        if (value.important) {
          newValue = `${newValue}!important`;
        }
      }

      return '\t'.repeat(depth) + name + ': ' + newValue + ';\n';
    }
    return '\t'.repeat(depth) + name + ': ' + value + ';\n';
  };

  var strNode = function(name, value, depth, prefix, data) {
    if (value.isData) {
      const val = getSourceValue(
        {
          typeData: 'data',
          value: value.isData,
        },
        data
      );

      if (!val) {
        return '';
      }
    }
    var cssString = '\t'.repeat(depth) + name + ' {\n';
    cssString += base.toCSS(value, depth + 1, null, prefix, data);
    cssString += '\t'.repeat(depth) + '}\n';
    return cssString;
  };
})();
