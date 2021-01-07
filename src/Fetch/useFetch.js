import React from 'react';

const useFetch = ({
  // general
  tableState,
  item,
  parentItem,
  lastRow,
  // options
  panelShowCondition,
  idlePanel,
  loadingPanel,
  // context
  fetching,
  // tree specific
  treeDepthLevel = 0,
  treeColumnLevel = 1
}) => {
  const idlePanelElement = idlePanel
    ? idlePanel(parentItem, {
        treeDepthLevel,
        treeColumnLevel
      })
    : null;

  const loadingPanelElement = loadingPanel
    ? loadingPanel(parentItem, {
        treeDepthLevel,
        treeColumnLevel
      })
    : null;

  const fetchPanel = {
    false: React.cloneElement(idlePanelElement, {
      onClick: async () => {
        fetching.onAddById(item.id);
        await idlePanelElement.props.onClick(tableState, parentItem);
        fetching.onRemoveById(item.id);
      }
    }),
    true: loadingPanelElement
  }[fetching.isFetching];

  const showFetchPanel = lastRow && panelShowCondition(parentItem);

  return {
    name: 'fetchPlugin',
    theme: '',
    className: '',
    onClick: () => {},
    fetching: {
      fetchPanel: showFetchPanel ? fetchPanel : null
    }
  };
};

export { useFetch };
