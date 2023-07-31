import React from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';



interface CreateToastProps {
    heading: string;
    message: string | React.ReactNode;
    duration?: number;
}

const CreateToast = ({ heading, message, duration = 6 }: CreateToastProps) => {

    // custom toast component
    const Toast = (
        <div className={`overflow-hidden shadow-md text-white relative cursor-default flex flex-col gap-1 bg-primary p-4 rounded-[20px] w-full`}>

            {/* toast heading */}
            <h1 className="text-base font-semibold select-none">{heading}</h1>

            {/* toast message */}
            <p className="text-xs select-none">{message}</p>

            {/* animated close button */}
            <button
                onClick={() => toast.dismiss(id)}
                className="absolute flex justify-center w-5 top-4 right-4 group">

                {/* close button strokes */}
                <span className="w-[2px] rounded-full h-4 bg-white relative border duration-300 group-hover:rotate-[90deg] rotate-45"></span>
                <span className="w-[2px] rounded-full h-4 bg-white absolute top-0 duration-300 group-hover:rotate-[90deg] rotate-[-45deg]"></span>
            </button>

            {/* duration animated line */}
            {duration && (
                <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: duration }}
                    className={`h-1 w-full bg-white absolute bottom-0 left-0`}
                >
                </motion.span>
            )}
        </div>
    )

    // creating random id for each toast
    const id = Math.random() * 1000;

    // optional changes for toast
    const toastOptions = {
        id: id,
        duration: duration ? duration * 1000 : 3000,

        // overriding default toast style
        style: {
            border: 'none',
            boxShadow: 'none',
            height: 'auto',
            padding: 0,
            background: 'rgba(37, 117, 252, 0.1)', // stack effect or container background
            borderRadius: '20px',
        },
    };

    return toast(Toast, toastOptions);
}

export default CreateToast;