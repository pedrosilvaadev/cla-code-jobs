import { Button } from "@/components/ui/button";
import { FilterSidebar } from "./filter-sidebar";
import { FilterSidebarProps } from "@/lib/types";
import { FilterIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Filter = ({
  isMobile,
  filterProps,
}: {
  isMobile: boolean;
  filterProps: FilterSidebarProps;
}) => {
  return isMobile ? (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="mb-4 w-full md:hidden">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <FilterSidebar {...filterProps} />
      </SheetContent>
    </Sheet>
  ) : (
    <div className="hidden md:block md:w-1/4">
      <FilterSidebar {...filterProps} />
    </div>
  );
};
