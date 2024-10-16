'use client';
import { Income } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Income>[] = [
    {
        accessorKey: 'categoria',
        header: 'CATEGORIA'
    },
    {
        accessorKey: 'descripcion',
        header: 'DESCRIPCION'
    },
    {
        accessorKey: 'valor',
        header: 'VALOR'
    },
    {
        accessorKey: 'fecha',
        header: 'FECHA'
    },
    // {
    //     id: 'actions',
    //     cell: ({ row }) => <CellAction data={row.original} />
    // }
];
