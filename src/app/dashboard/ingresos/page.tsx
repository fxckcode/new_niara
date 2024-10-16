import { searchParamsCache } from '@/lib/searchparams';
import { IncomeListingPage } from '@/sections/income/view';
import { SearchParams } from 'nuqs/parsers';

type pageProps = {
    searchParams: SearchParams;
};

export const metadata = {
    title: 'Dashboard : Ingresos'
};

function Ingresos({ searchParams }: pageProps) {
    searchParamsCache.parse(searchParams);

    return <IncomeListingPage />;
}

export default Ingresos;   
