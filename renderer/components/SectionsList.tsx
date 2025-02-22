import { useRouter } from "next/navigation";
import { Branch } from "../types";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";



interface SectionsListProps {
    sections: Branch[];
    mainRouter: string;
    disabled?: boolean;
    cols?: number;
};

export const SectionsList = ({ sections, mainRouter, disabled = false, cols = 3 }: SectionsListProps) => {
    const router = useRouter();
    return (
        <div className={cn("grid w-full gap-x-4 gap-y-6 px-4 items-center", `grid-cols-${cols}`)}>
            {sections.length > 0 ?
                sections.map(item => (
                    <Button
                        disabled={disabled}
                        onClick={() => router.push(`/${mainRouter}/${item.route}`)}
                        className="col-span-1 w-full py-8 border border-gray-200 text-gray-300 rounded-lg
                                     bg-transparent hover:bg-blue-700 hover:border-none duration-500 transition-all ease-out"
                    >
                        <p className="font-din-bold text-2xl text-right ">
                            {item.title}
                        </p>
                    </Button>
                )) : (
                    <p className="text-gray-300 text-lg font-din-bold text-center">No sections
                    </p>
                )
            }
        </div>
    );
};