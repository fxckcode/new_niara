import { searchParamsCache } from '@/lib/searchparams';
import { ProductListingPage } from '@/sections/income/view';
import { SearchParams } from 'nuqs/parsers';

type pageProps = {
    searchParams: SearchParams;
};

export const metadata = {
    title: 'Dashboard : Product'
};

function Ingresos({ searchParams }: pageProps) {
    searchParamsCache.parse(searchParams);

    return <ProductListingPage />;
}

export default Ingresos;   
