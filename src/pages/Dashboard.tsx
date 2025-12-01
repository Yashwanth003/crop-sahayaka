import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  TrendingUp,
  Leaf,
  Shield,
  Brain,
  MapPin,
  Droplets,
  Sprout,
  Apple,
  Carrot
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, RadarChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";

// Define a type for the expected API response
interface Recommendation {
  name: string;
  category: 'Crop' | 'Vegetable' | 'Fruit';
  confidence: number;
  yield: string;
  profit: string;
  benefit: number;
}

interface ApiResult {
  metrics: {
    cropDiversity: number;
    soilHealth: number;
    resilience: number;
  };
  radarData: { category: string; value: number }[];
  recommendations: Recommendation[];
}

const Dashboard = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    district: "",
    season: "",
    rainfall: "",
    fertilizer: "",
    pesticide: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ApiResult | null>(null);
  const { language, t } = useLanguage();

  const districts = [
    "Bagalkot", "Bangalore Rural", "Bangalore Urban", "Belgaum", "Bellary",
    "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga",
    "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Gulbarga",
    "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysore",
    "Raichur", "Ramanagara", "Shimoga", "Tumkur", "Udupi", "Uttara Kannada", "Yadgir"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResults(null); // Clear previous results

    try {
      const response = await fetch("http://127.0.0.1:8000/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, language }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResult = await response.json();
      setResults(data);
      toast({
        title: "Analysis Complete!",
        description: "Your personalized crop recommendations are ready.",
      });

    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not retrieve recommendations. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== "");

  // Configuration for the Radar Chart
  const chartConfig = {
    value: {
      label: "Score",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Crop Diversification Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Enter your region parameters to get AI-powered crop recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card className="shadow-natural">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Region Parameters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="district" className="text-sm font-medium">District</Label>
                    <Select value={formData.district} onValueChange={(value) => handleInputChange("district", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="season" className="text-sm font-medium">Season</Label>
                    <Select value={formData.season} onValueChange={(value) => handleInputChange("season", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select season" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kharif">Kharif</SelectItem>
                        <SelectItem value="rabi">Rabi</SelectItem>
                        <SelectItem value="summer">Summer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="rainfall" className="text-sm font-medium flex items-center gap-1">
                      <Droplets className="h-4 w-4" />
                      Annual Rainfall (mm)
                    </Label>
                    <Input
                      id="rainfall"
                      type="number"
                      placeholder="e.g., 650"
                      value={formData.rainfall}
                      onChange={(e) => handleInputChange("rainfall", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="fertilizer" className="text-sm font-medium flex items-center gap-1">
                      <Droplets className="h-4 w-4" />
                      Fertilizer Use (kg/acre)
                    </Label>
                    <Input
                      id="fertilizer"
                      type="number"
                      placeholder="e.g., 120"
                      value={formData.fertilizer}
                      onChange={(e) => handleInputChange("fertilizer", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="pesticide" className="text-sm font-medium flex items-center gap-1">
                      <Shield className="h-4 w-4" />
                      Pesticide Use (ltr/acre)
                    </Label>
                    <Input
                      id="pesticide"
                      type="number"
                      placeholder="e.g., 2.5"
                      step="0.1"
                      value={formData.pesticide}
                      onChange={(e) => handleInputChange("pesticide", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="cta" 
                    className="w-full" 
                    disabled={!isFormValid || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Brain className="mr-2 h-4 w-4 animate-spin" />
                        {t('running_analysis')}
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2 h-4 w-4" />
                        {t('run_analysis')}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {results ? (
              <div className="space-y-8">
                {/* Top Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="text-center shadow-natural">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-4">
                        <BarChart3 className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-3xl font-bold text-foreground mb-1">
                        {results.metrics.cropDiversity}
                      </div>
                      <div className="text-sm text-muted-foreground">Crop Diversity</div>
                    </CardContent>
                  </Card>

                  <Card className="text-center shadow-natural">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-4">
                        <Leaf className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-3xl font-bold text-foreground mb-1">
                        {results.metrics.soilHealth}/10
                      </div>
                      <div className="text-sm text-muted-foreground">Soil Health Score</div>
                    </CardContent>
                  </Card>

                  <Card className="text-center shadow-natural">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-4">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-3xl font-bold text-foreground mb-1">
                        {results.metrics.resilience}/10
                      </div>
                      <div className="text-sm text-muted-foreground">Resilience Score</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Radar Chart */}
                <Card className="shadow-natural">
                  <CardHeader>
                    <CardTitle>Diversification Impact Analysis</CardTitle>
                    <CardDescription>
                      Visual representation of key performance indicators.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="mx-auto aspect-square h-80">
                      <RadarChart data={results.radarData}>
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent indicator="line" />}
                        />
                        <PolarAngleAxis dataKey="category" />
                        <PolarGrid />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar
                          dataKey="value"
                          fill="var(--color-value)"
                          fillOpacity={0.6}
                          stroke="var(--color-value)"
                        />
                      </RadarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Crop Recommendations */}
                <Card className="shadow-natural">
                  <CardHeader>
                    <CardTitle>Top Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {results.recommendations.map((item, index) => {
                        // Get icon based on category
                        const getCategoryIcon = (category: string) => {
                          switch(category) {
                            case 'Vegetable': return <Carrot className="h-4 w-4" />;
                            case 'Fruit': return <Apple className="h-4 w-4" />;
                            default: return <Leaf className="h-4 w-4" />;
                          }
                        };

                        // Get color based on category
                        const getCategoryColor = (category: string) => {
                          switch(category) {
                            case 'Vegetable': return 'bg-green-100 text-green-700';
                            case 'Fruit': return 'bg-red-100 text-red-700';
                            default: return 'bg-yellow-100 text-yellow-700';
                          }
                        };

                        return (
                          <div key={index} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center gap-3 flex-1">
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 ${getCategoryColor(item.category)}`}>
                                  {getCategoryIcon(item.category)}
                                  {item.category}
                                </span>
                              </div>
                              <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                                {item.confidence}% Confidence
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                              <div>
                                <div className="text-sm text-muted-foreground">Expected Yield</div>
                                <div className="font-semibold">{item.yield}</div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground">Estimated Profit</div>
                                <div className="font-semibold text-accent">{item.profit}</div>
                              </div>
                              <div className="col-span-2 md:col-span-1">
                                <div className="text-sm text-muted-foreground mb-1">Diversification Benefit</div>
                                <Progress value={item.benefit} className="h-2" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="shadow-natural h-96 flex items-center justify-center">
                  <CardContent className="text-center">
                    <Brain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{t('ready_for_analysis_title')}</h3>
                    <p className="text-muted-foreground">
                      {t('ready_for_analysis_description')}
                    </p>
                  </CardContent>
                </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;