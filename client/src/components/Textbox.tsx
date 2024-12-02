import React from 'react';
import clsx from 'clsx';

interface TextboxProps {
    type: string;
    placeholder: string;
    name: string;
    label?: string;
    className?: string;
    register?: any;
    error?: any;
    pattern?: string;
}

const Textbox = React.forwardRef<HTMLInputElement, TextboxProps>(({
    type,
    placeholder,
    name,
    label,
    className,
    register,
    error,
    pattern
}, ref) => {
    return (
        <div className='w-full flex flex-col gap-1'>
            {label && (
                <label htmlFor={name} className='text-slate-800'>{label}</label>
            )}
            <div>
                <input
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    ref={ref}
                    {...register}
                    pattern={pattern}
                    aria-invalid={error ? "true" : "false"}
                    className={clsx(
                        "bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 focus:ring-green-500 focus:border-green-500",
                        className
                    )}
                />
            </div>
            {error && <span className='text-sm text-[#f64949fe] mt-0.5'>{error}</span>}
        </div>
    );
});

export default Textbox;
