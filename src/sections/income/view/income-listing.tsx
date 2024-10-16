import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import IncomeTable from '../income-tables';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import type { SearchParams } from 'nuqs/server';
import { getIncomes } from '@/services/income.services';
import { useQuery } from '@tanstack/react-query';
import { Income } from '@/constants/data';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Income', link: '/dashboard/income' }
];


export default async function IncomeListingPage({}) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const categories = searchParamsCache.get('categories');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  // const { data: incomes = [] } = useQuery({ queryKey: ['incomes'], queryFn: getIncomes });
  const incomes : Income[] = [];
  const totalIncomes = incomes.length;

  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title={`Ingresos (${totalIncomes})`}
            description=''
          />
          {/* <Link
            href={'/dashboard/product/new'}
            className={cn(buttonVariants(), 'text-xs md:text-sm')}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link> */}
        </div>
        <Separator />
        <IncomeTable data={incomes} totalData={totalIncomes} />
      </div>
    </PageContainer>
  );
}
