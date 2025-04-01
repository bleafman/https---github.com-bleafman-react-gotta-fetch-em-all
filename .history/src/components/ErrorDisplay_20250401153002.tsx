import { Alert, AlertTitle, Box } from "@mui/material";

interface ErrorDisplayProps {
  error: Error | null;
  message?: string;
}

export const ErrorDisplay = ({ error, message }: ErrorDisplayProps) => {
  if (!error) return null;

  return (
    <Box sx={{ my: 2 }}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {message || error.message}
      </Alert>
    </Box>
  );
};

export default ErrorDisplay;
