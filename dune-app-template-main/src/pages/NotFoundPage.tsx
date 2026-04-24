import { Container, VStack, Button } from "cdf-design-system-alpha";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Container maxWidth="lg" padding="lg">
        <VStack gap="xl" className="py-12">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Button variant="primary" onClick={() => navigate("/")}>
              Go to Home
            </Button>
          </div>
        </VStack>
      </Container>
    </div>
  );
};

