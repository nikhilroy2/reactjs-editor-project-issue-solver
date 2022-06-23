export const filteredBlocks = (categories, filter) => {
  let blocks = [];
  if (filter !== 'all') {
    categories.forEach((category) => {
      if (category.id === filter) {
        blocks = category.blocks;
      }
    })
  } else {
    categories.forEach((category) => {
      blocks = blocks.concat(category.blocks);
    })
  }

  const exception = [];
  const newBlocks = [];

  blocks.forEach((item) => {
    const addSnippet = () => {
      newBlocks.forEach((block) => {
        if (block.unique_name && block.unique_name === item.unique_name) {
          if (block.location === 'sidebar' || block.location === 'navbar') {
            block.ids.navbar = item.id;
            block.snippet.push('navbar');
          } else {
            block.ids[item.location] = item.id;
            block.snippet.push(item.location);
          }
        }
      })
    };
    const pushItem = () => {
      item.snippet = [];
      item.ids = {};
      if (item.location === 'sidebar' || item.location === 'navbar') {
        item.snippet.push('navbar');
        item.ids.navbar = item.id;
      } else {
        item.ids[item.location] = item.id;
        item.snippet.push(item.location);
      }
      newBlocks.push(item);
    };
    if (item.unique_name) {
      if (!exception.includes(item.unique_name)) {
        exception.push(item.unique_name);
        pushItem()
      } else {
        addSnippet();
      }
    } else {
      pushItem()
    }
  });

  return newBlocks;
};

export const getOptions = (blocks) => {
  const defaultOptions = [
    {
      label: 'All blocks',
      value: 'all',
    },
  ];
  blocks.forEach((category) => {
    const getCount = () => {
      const exception = [];
      let counter = 0;
      category.blocks.forEach((block) => {
        if (block.unique_name) {
          if (!exception.includes(block.unique_name)) {
            exception.push(block.unique_name);
            counter++;
          }
        } else {
          counter++;
        }
      });
      return counter;
    };
    defaultOptions.push({
      label: `${category.category_name} (${getCount()})`,
      value: category.id,
    })
  });

  return defaultOptions;
};

export const getDraggableClasses = (snippets) => {
  const sortSnippets = [];
  if (snippets.includes('navbar')) {
    sortSnippets.push('drag-navbar');
  }
  if (snippets.includes('header')) {
    sortSnippets.push('drag-header');
  }
  if (snippets.includes('page')) {
    sortSnippets.push('drag-page');
  }
  if (snippets.includes('footer')) {
    sortSnippets.push('drag-footer');
  }
  let classString = '';
  sortSnippets.forEach((item) => {
    classString = `${classString ? `${classString}-${item}` : item}`;
  });
  return classString;
};
