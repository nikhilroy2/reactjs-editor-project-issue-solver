export function splitHead(str, sep) {
  const idx = str.indexOf(sep);
  if (idx === -1) return [str];
  return [str.slice(0, idx), str.slice(idx + sep.length)];
}

function sliceAttrData(key) {
  const newKey = key;
  if (key.includes('data-')) {
    return newKey.replace(/data-/, '');
  }

  return newKey;
}

export function unquote(str) {
  const car = str.charAt(0);
  const end = str.length - 1;
  const isQuoteStart = car === '"' || car === "'";
  if (isQuoteStart && car === str.charAt(end)) {
    return str.slice(1, end);
  }
  return str;
}

export function formatAttributes(attributes) {
  const init = {};
  attributes.map((attribute) => {
    const parts = splitHead(attribute.trim(), '=');
    let key = sliceAttrData(parts[0]);
    let value = typeof parts[1] === 'string' ? unquote(parts[1]) : null;
    if (key.includes('class')) {
      key = 'className';
      value = value.split(' ');
    }
    // eslint-disable-next-line
    return (init[key] = value);
  });

  return init;
}

export function format(nodes, options) {
  return nodes.map((node) => {
    const { type } = node;
    console.log(node)
    const outputNode = type === 'element'
      ? {
        tagName: node.tagName.toLowerCase(),
        attrs: { ...formatAttributes(node.attributes) },
        children: format(node.children, options),
      }
      : { type, content: node.content.trim() };

    // if (node.children[0] && node.children[0].type === 'text') {
    //   outputNode.text = node.children[0].content.trim();
    // }

    if (options.includePositions) {
      outputNode.position = node.position;
    }
    return outputNode;
  });
}
