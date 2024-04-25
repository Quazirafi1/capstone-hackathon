import clsx from 'clsx';
import { boolean } from 'zod';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    shrinkWrap?: boolean;
}

export function Button({ text, shrinkWrap, className, ...rest }: ButtonProps) {
    return (
        <button
            {...rest}
            className={clsx(
                'flex h-10 items-center justify-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
                className,
                {
                    'w-[100%]': shrinkWrap == false || shrinkWrap == undefined,
                }
            )}
        >
            <div>{text}</div>
        </button>
    );
}