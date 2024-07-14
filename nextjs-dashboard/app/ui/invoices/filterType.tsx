'use client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function FilterType() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleChange = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params}`);
  };
  return (
    <form className="mx-auto max-w-sm">
      <select
        id="type"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:focus:border-blue-500 dark:focus:ring-blue-500"
        onChange={(e) => handleChange(e.target.value)}
      >
        <option selected value="">
          Choose Type
        </option>
        <option value="paid">Paid</option>
        <option value="pending">Pending</option>
      </select>
    </form>
  );
}
