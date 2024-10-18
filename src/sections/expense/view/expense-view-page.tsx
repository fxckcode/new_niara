import { Breadcrumbs } from '@/components/breadcrumbs';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    // { title: 'Expense', link: '/dashboard/expense' },
    // { title: 'Create', link: '/dashboard/expense/create' }
];

export default function ProductViewPage() {
    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-8">
                <Breadcrumbs items={breadcrumbItems} />
            </div>
        </ScrollArea>
    );
}
