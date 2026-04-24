import { Container, VStack, Card, CardHeader, CardContent } from "cdf-design-system-alpha";

export const PlaygroundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Container maxWidth="7xl" padding="lg">
        <VStack gap="xl" className="py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Playground
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experiment and test your ideas in this interactive workspace.
            </p>
          </div>

          <Card variant="outlined" className="w-full">
            <CardHeader
              title="🚀 Playground Area"
              subtitle="This is your space to experiment and build"
            />
            <CardContent>
              <VStack gap="md">
                <p className="text-gray-600">
                  The playground page is ready for you to add interactive
                  components, test CDF SDK integrations, and experiment with new
                  features.
                </p>
              </VStack>
            </CardContent>
          </Card>
        </VStack>
      </Container>
    </div>
  );
};

