// renderer/components/SectionsList.tsx

import { useRouter } from "next/navigation"
import { cn } from "../lib/utils"
import { Branch } from "../types"
import { ButtonNavigation } from "./ButtonNavigation"

const COL_CLASSES: Record<number,string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
}

interface SectionsListProps {
  sections: Branch[]
  mainRouter: string
  disabled?: boolean
  cols?: 1|2|3|4
}

export const SectionsList = ({
  sections,
  mainRouter = "",
  disabled = false,
  cols = 3,
}: SectionsListProps) => {
  const router = useRouter()
  const colsClass = COL_CLASSES[cols] || "grid-cols-1"

  return (
    <div
      className={cn(
        "grid w-full gap-x-2 gap-y-4 px-4 items-center",
        colsClass
      )}
    >
      {sections.length > 0 ? (
        sections.map((item) => (
          <ButtonNavigation
            key={item.route}
            disabled={disabled}
            title={item.title}
            handleRouter={() => {
              const target = mainRouter
                ? `/${mainRouter}/${item.route}`
                : item.route
              router.push(target)
            }}
          />
        ))
      ) : (
        <p className="text-gray-300 text-lg font-din-bold text-center">
          No sections
        </p>
      )}
    </div>
  )
}
