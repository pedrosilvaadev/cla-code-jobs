import { formatDistanceToNow } from "date-fns";
import {
  ExternalLink,
  Building,
  Calendar,
  Briefcase,
  Crown,
  MapPinIcon,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Job } from "@/lib/types";

export function JobCard({ job }: { job: Job }) {
  const isNew =
    new Date(job.date) >= new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 48 hours

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="justify-between items-start flex flex-col md:flex-row gap-4">
          <div>
            <div className="items-center gap-2 flex">
              <h3 className="text-xl font-semibold uppercase">{job.title}</h3>
              {isNew && <Badge className="bg-green-500">New</Badge>}
            </div>
            <div className="flex md:items-center text-muted-foreground mt-2 flex-col md:flex-row gap-4">
              <div className="flex gap-1 items-center">
                <Building className="h-4 w-4 mr-1" />
                <span className="uppercase">{job.company}</span>
              </div>

              <div className="flex gap-1 items-center">
                <Briefcase className="h-4 w-4 mr-1" />
                <span className="uppercase">{job.area}</span>
              </div>
              <div className="flex gap-1 items-center">
                <Crown className="h-4 w-4 mr-1" />
                <span className="uppercase">{job.seniority}</span>
              </div>

              {job.workMod && (
                <div className="flex gap-1 items-center">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  <span className="uppercase">{job.workMod}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center text-sm text-muted-foreground w-32">
            <Calendar className="h-4 w-4 mr-1" />
            <time dateTime={job.date}>
              {formatDistanceToNow(new Date(job.date), { addSuffix: true })}
            </time>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 px-6 py-3">
        <Button asChild variant="outline" className="ml-auto">
          <a
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            View Job <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
