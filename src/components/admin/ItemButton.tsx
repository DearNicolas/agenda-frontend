import Link from "next/link";
import { IconType } from "react-icons";

type Props = {
    IconElement: IconType;
    label?: string;
    onClick?: () => void;
    href?: string;
    target?: string;
    replace?: boolean;
}
export const ItemButton = ({ IconElement, label, onClick, href, }: Props) => {

    const content = (
        <div className="p-3 flex flex-col justify-center items-center gap-2 md:flex-row ">
            <div><IconElement /></div>
            {label && <div>{label}</div>}
        </div>
    )

    return (
        <div className="rounded hover:transition-transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
            {!href && onClick &&
                <div onClick={onClick} className="cursor-pointer">{content}</div>
            }
        </div>
    );
}