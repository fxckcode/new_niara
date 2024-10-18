import { searchParamsCache } from '@/lib/searchparams';
import { ExpenseListingPage } from '@/sections/expense/view';
import { SearchParams } from 'nuqs/parsers';

type pageProps = {
    searchParams: SearchParams;
};

export const metadata = {
    title: 'Dashboard : Gastos'
};

function Ingresos({ searchParams }: pageProps) {
    searchParamsCache.parse(searchParams);

    return <ExpenseListingPage />;
}

export default Ingresos;   
