import * as React from 'react';

import { Table } from '@table-library/react-table-library/table/index';
import { useTheme } from '@table-library/react-table-library/theme/index';

import { TableNode } from '@table-library/react-table-library/types/table';
import { Theme } from '@table-library/react-table-library/types/theme';
import { CompactTableProps, Column } from '@table-library/react-table-library/types/compact';

import { VirtualizedTable } from './VirtualizedTable';
import { NormalTable } from './NormalTable';
import { CompactFooter } from './CompactFooter';

const FULL_HEIGHT_THEME = {
  Table: `
    height: 100%;
  `,
};

export const CompactTable: React.FC<CompactTableProps> = React.forwardRef(
  (
    {
      columns,
      rowProps = {},
      tableOptions,
      rowOptions,
      virtualizedOptions,
      ...tableProps
    }: CompactTableProps,
    ref: any,
  ) => {
    const {
      data,
      theme: customTheme,
      layout,
      sort,
      pagination,
      select,
      tree,
      onInit = () => {},
    } = tableProps;

    let allThemes: Theme[] = [];
    if (layout?.fullHeight || virtualizedOptions) {
      allThemes = allThemes.concat(FULL_HEIGHT_THEME);
    }
    if (customTheme) {
      allThemes = allThemes.concat(customTheme);
    }

    const theme = useTheme(allThemes);

    return (
      <Table
        ref={ref}
        data={data}
        theme={theme}
        layout={layout}
        sort={sort}
        pagination={pagination}
        select={select}
        tree={tree}
        onInit={onInit}
      >
        {(tableList: TableNode[]) => (
          <React.Fragment>
            {tableOptions?.renderBeforeTable && tableOptions.renderBeforeTable()}
            {virtualizedOptions ? (
              <VirtualizedTable
                tableList={tableList}
                columns={columns}
                rowProps={rowProps}
                rowOptions={rowOptions}
                virtualizedOptions={virtualizedOptions}
                {...tableProps}
              />
            ) : (
              <NormalTable
                tableList={tableList}
                columns={columns}
                rowProps={rowProps}
                rowOptions={rowOptions}
                {...tableProps}
              />
            )}
            {columns.some((column: Column) => !!column.footer) && (
              <CompactFooter columns={columns} />
            )}
            {tableOptions?.renderAfterTable && tableOptions.renderAfterTable()}
          </React.Fragment>
        )}
      </Table>
    );
  },
);
