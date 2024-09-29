import { cn } from "@/lib/utils";

interface ErrorMessageProps {
    message: string;
    className?: string;
}

const ErrorMessage = ({ message, className }: ErrorMessageProps) => {
    return (
        <div className={cn('text-sm text-center py-2 text-red-500', className)}>
            {message}
        </div>
    )
}

export default ErrorMessage;