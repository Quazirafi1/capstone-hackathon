export function ActionsForm({ leading, title, children, trailing }: {
    leading?: React.ReactNode,
    title: string,
    children?: React.ReactNode,
    trailing?: React.ReactNode
}) {
    return (
        <div className='flex p-1 border border-grey-500 m-1 p-5 rounded-lg shadow-md'>
            {leading && <div className='flex w-[50px] justify-center'>{leading}</div>}
            {leading && <div className='w-[10px]'></div>}
            <div className='flex-grow'>
                <div className=''>{title}</div>
                <div>{children}</div>
            </div>
            {trailing && <div className='w-[10px]'></div>}
            {trailing && <div className='flex w-[50px] justify-center'>{trailing}</div>}
        </div>
    );
}