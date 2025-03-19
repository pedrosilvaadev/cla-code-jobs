import { formatDistanceToNow } from "date-fns";
import {
  ExternalLink,
  Building,
  Calendar,
  Briefcase,
  Crown,
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
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold uppercase">{job.title}</h3>
              {isNew && <Badge className="bg-green-500">New</Badge>}
            </div>
            <div className="flex items-center text-muted-foreground mt-2">
              <Building className="h-4 w-4 mr-1" />
              <span className="mr-4 uppercase">{job.company}</span>
              <Briefcase className="h-4 w-4 mr-1" />
              <span className="mr-4 uppercase">{job.area}</span>
              <Crown className="h-4 w-4 mr-1" />
              <span className="uppercase">{job.seniority}</span>
            </div>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
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
