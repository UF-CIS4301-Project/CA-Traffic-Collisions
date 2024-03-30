import Link from 'next/link';

function QueriesPage() {
  const queries = [{'key': "at-fault", 'value':'At-fault Party Demographics and Fatality Rates'},
    {'key': 'causes', 'value':'Possible Causes of Accidents compared to Budgets'}, {'key': 'geographic', 'value':'Geographic Analysis - What areas are more prone to accients over time?'}, {'key': 'vehicle-type', 'value': 'Effect of Vehicle Type and Age of Fatality Rates'}, {'key':'road', 'value':'Effect of Road Conditions and Population Density of Traffic Collision Severity'}, {'key':'custom', 'value':'Create Custom Query'}]
  return (
    <div className="">

      <div className='flex flex-row h-[75vh] justify-center mt-40'>

        <ul className='text-xl flex-col space-y-12 p-6'>
          {/* <span className="text-3xl">Queries</span> */}
          {queries.map((queryName) => (
            <li className="text-2xl text-center bg-white hover:bg-black text-black font-semibold hover:text-white py-4 px-4 hover:border-transparent rounded shadow-lg" key={queryName.key}>
              <Link href={`/queries/${queryName.key}`} key="" className="">
                <span className="relative after:bg-white after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">{queryName.value}</span></Link></li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default QueriesPage