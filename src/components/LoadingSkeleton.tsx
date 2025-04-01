import { Card, CardContent, Grid, Skeleton } from "@mui/material";

interface LoadingSkeletonProps {
  count?: number;
  variant?: "card" | "detail";
}

export const LoadingSkeleton = ({
  count = 1,
  variant = "card",
}: LoadingSkeletonProps) => {
  if (variant === "detail") {
    return (
      <div>
        <Skeleton variant="rectangular" height={300} sx={{ mb: 2 }} />
        <Skeleton variant="text" height={60} sx={{ mb: 1 }} />
        <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
        <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {[...Array(6)].map((_, i) => (
            <Grid size={6} key={i}>
              <Skeleton variant="text" height={30} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }

  return (
    <Grid container spacing={2}>
      {[...Array(count)].map((_, i) => (
        <Grid size={12} key={i}>
          <Card>
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
              <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={24} width="60%" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default LoadingSkeleton;
