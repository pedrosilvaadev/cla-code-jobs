"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

interface FilterSidebarProps {
  areas: string[]
  companies: string[]
  selectedAreas: string[]
  selectedCompanies: string[]
  dateFilter: string
  setSelectedAreas: (areas: string[]) => void
  setSelectedCompanies: (companies: string[]) => void
  setDateFilter: (filter: string) => void
}

export function FilterSidebar({
  areas,
  companies,
  selectedAreas,
  selectedCompanies,
  dateFilter,
  setSelectedAreas,
  setSelectedCompanies,
  setDateFilter,
}: FilterSidebarProps) {
  const handleAreaChange = (area: string, checked: boolean) => {
    if (checked) {
      setSelectedAreas([...selectedAreas, area])
    } else {
      setSelectedAreas(selectedAreas.filter((a) => a !== area))
    }
  }

  const handleCompanyChange = (company: string, checked: boolean) => {
    if (checked) {
      setSelectedCompanies([...selectedCompanies, company])
    } else {
      setSelectedCompanies(selectedCompanies.filter((c) => c !== company))
    }
  }

  const clearFilters = () => {
    setSelectedAreas([])
    setSelectedCompanies([])
    setDateFilter("all")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-3">Filter by Date</h3>
        <RadioGroup value={dateFilter} onValueChange={setDateFilter}>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">All time</Label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="last7" id="last7" />
            <Label htmlFor="last7">Last 7 days</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="last30" id="last30" />
            <Label htmlFor="last30">Last 30 days</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-3">Job Area</h3>
        <div className="space-y-2">
          {areas.map((area) => (
            <div key={area} className="flex items-center space-x-2">
              <Checkbox
                id={`area-${area}`}
                checked={selectedAreas.includes(area)}
                onCheckedChange={(checked) => handleAreaChange(area, checked as boolean)}
              />
              <Label htmlFor={`area-${area}`}>{area}</Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium mb-3">Companies</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {companies.map((company) => (
            <div key={company} className="flex items-center space-x-2">
              <Checkbox
                id={`company-${company}`}
                checked={selectedCompanies.includes(company)}
                onCheckedChange={(checked) => handleCompanyChange(company, checked as boolean)}
              />
              <Label htmlFor={`company-${company}`}>{company}</Label>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={clearFilters}
        disabled={selectedAreas.length === 0 && selectedCompanies.length === 0 && dateFilter === "all"}
      >
        Clear Filters
      </Button>
    </div>
  )
}

