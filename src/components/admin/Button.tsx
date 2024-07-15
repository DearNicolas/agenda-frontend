type Props = {
    value: string;
    onClick: () => void;
    disabled?: boolean;
}

export const Button = ({ value, onClick, disabled }: Props) => {
    return (
        <button
            onClick={onClick}
            className="w-full my-3 p-3 rounded
            text-white text-center uppercase font-bold
            transition ease-in-out delay-0 bg-zinc-900 hover:-translate-y-1 hover:scale-110 hover:bg-zinc-700 duration-50 
            hover:border-gray-300 hover:border-y-zinc-800
            border-4 border-gray-300 border-x-zinc-800 
            md:transform-none"
            disabled={disabled}
        >{value}</button>
    )
}