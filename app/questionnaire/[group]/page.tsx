export default async function Page({ params }: { params: { group: string } }) {
    const group = params.group;

    return <div>
        <h1>Questionnaire</h1>
        <h2>{group}</h2>
    </div>
}