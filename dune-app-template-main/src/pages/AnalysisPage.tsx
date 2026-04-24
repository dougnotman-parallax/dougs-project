import { Container, VStack, Card, CardHeader, CardContent } from "cdf-design-system-alpha";

export const AnalysisPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Container maxWidth="7xl" padding="lg">
        <VStack gap="xl" className="py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Analysis
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Analyze your data and generate insights from Cognite Data Fusion.
            </p>
          </div>

          <Card variant="outlined" className="w-full">
            <CardHeader
              title="📊 Analysis Dashboard"
              subtitle="Data analysis and visualization tools"
            />
            <CardContent>
              <VStack gap="md">
                <p className="text-gray-600">
                  The analysis page is ready for you to add data visualization
                  components, charts, tables, and analytical tools to explore
                  your CDF data.
                </p>
              </VStack>
            </CardContent>
          </Card>
        </VStack>
      </Container>
    </div>
  );
};

