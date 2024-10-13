'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { Icome } from '@/constants/data';
import {
    useIcomeTableFilters
} from './use-product-table-filters';
import { columns } from './columns';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/services/contegory.services';

export default function IcomeTable({
    data,
    totalData
}: {
    data: Icome[];
    totalData: number;
}) {
    const {
        categoriesFilter,
        setCategoriesFilter,
        isAnyFilterActive,
        resetFilters,
        searchQuery,
        setPage,
        setSearchQuery
    } = useIcomeTableFilters();

    const { data: CATEGORY_OPTIONS } = useQuery({ queryKey: ['categories'], queryFn: getCategories})

    return (
        <div className="space-y-4 ">
            <div className="flex flex-wrap items-center gap-4">
                <DataTableSearch
                    searchKey="name"
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    setPage={setPage}
                />
                <DataTableFilterBox
                    filterKey="categories"
                    title="Categories"
                    options={CATEGORY_OPTIONS || []}
                    setFilterValue={setCategoriesFilter}
                    filterValue={categoriesFilter}
                />
                <DataTableResetFilter
                    isFilterActive={isAnyFilterActive}
                    onReset={resetFilters}
                />
            </div>
            <DataTable columns={columns} data={data} totalItems={totalData} />
        </div>
    );
}
