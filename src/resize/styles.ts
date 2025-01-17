/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import { ColumnResizeProps } from '@table-library/react-table-library/types/resize';

const resizerStyle = (resize: ColumnResizeProps) => {
  const width =
    typeof resize === 'boolean' || resize?.resizerWidth == null ? 3 : resize.resizerWidth;

  const highlight =
    typeof resize === 'boolean' || resize?.resizerHighlight == null
      ? 'transparent'
      : resize.resizerHighlight;

  return css`
    z-index: 1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    cursor: col-resize;
    width: ${width}px;

    background-color: transparent;
    transition: background-color 0.1s linear;

    &:hover {
      background-color: ${highlight};
    }
  `;
};

export { resizerStyle };
