import clsx from 'clsx';
import { boolean } from 'zod';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    shrinkWrap?: boolean;
}

export function CheckBox({ checked } : {checked: boolean}) {
    return (
        <button className={clsx(
            'w-[25px] h-[25px] flex items-center justify-center rounded-lg text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 ',
            {
                'bg-blue-500': checked,
                'bg-grey-100': !checked
            }
        )}></button>
    );
}