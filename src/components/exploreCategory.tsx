'use client'
import React from 'react';
import { getAllCategories } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import { CategoryType } from '@/lib/types';

const ExploreCategory = () => {
  const [data, setData] = React.useState<CategoryType[]>([]);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getAllCategories()
      .then((data) => {
        setLoading(false); // Set loading to false when data is fetched
        setData(data);
      })
      .catch((error) => {
        setError(true);
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <div>
      <h1 className="my-16  uppercase text-center text-xl font-bold">Explore Category</h1>
      {/* <Separator className="mb-3" /> */}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error occurred while fetching data</div>
      ) : (
        <div className="flex gap-4 uppercase cursor-pointer items-center justify-between">
          {/* <h3 className='bg-black text-white p-2 rounded-md'>All</h3> */}
          {data.map((category) => (
            <div key={category.id} className="cursor-pointer">
              <h1>{category.name}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreCategory;
