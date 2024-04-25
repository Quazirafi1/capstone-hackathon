export function ProgressBar({ percentage }: { percentage: number }) {
    return <div className="p-5">
        <div className='h-[5px] w-full bg-gray-200'>
            <div className={`w-[${percentage}%] bg-blue-500 h-full`}></div>
        </div>
    </div>;
}