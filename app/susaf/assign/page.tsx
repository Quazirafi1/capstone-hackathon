export default async function Page(
    { searchParams }: 
    { 
        params: { id: string },
        searchParams: {
            id?: string;
        }
    }) 
    {
    const id = searchParams?.id || '';

    return <div>
        <h1>Risk/Opportunity</h1>
        <h2>For impact: {id}</h2>
    </div>
}