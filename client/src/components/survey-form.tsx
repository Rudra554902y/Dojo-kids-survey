import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, TrendingUp, Users, Heart } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
  respondentType: z.enum(["parent", "kid", "teacher"]),
  name: z.string().optional(),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  interestLevel: z.number().min(1).max(10).default(8),
  wouldUse: z.boolean().default(true),
  biggestConcern: z.string().optional(),
  wantedFeature: z.string().optional(),
  whatWouldCreate: z.string().optional(),
  openFeedback: z.string().optional(),
  featureSuggestion: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type SurveyStats = {
  totalResponses: number;
  parentResponses: number;
  kidResponses: number;
  teacherResponses: number;
  averageInterestLevel: number;
  wouldUsePercentage: number;
};

export function SurveyForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stats, setStats] = useState<SurveyStats | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      respondentType: "parent",
      interestLevel: 8,
      wouldUse: true,
      name: "",
      email: "",
      biggestConcern: "",
      wantedFeature: "",
      whatWouldCreate: "",
      openFeedback: "",
      featureSuggestion: "",
    },
  });

  const respondentType = form.watch("respondentType");

  const fetchStats = async () => {
    const response = await axios.get("/api/survey");
    setStats(response.data);
  };

  useEffect(() => {
    void fetchStats();
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/survey", data);
      setIsSubmitted(true);
      await fetchStats();
      toast({
        title: "Survey submitted successfully",
        description: "Thank you for helping us build Dojo Kids!",
      });
    } catch {
      toast({
        title: "Error submitting survey",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWouldUseLabel = () => {
    if (respondentType === "parent") return "Would you allow your child to use this platform?";
    if (respondentType === "kid") return "Would you use this platform to create things?";
    return "Do you think this would help kids learn and grow?";
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 rounded-3xl text-center space-y-6 max-w-2xl mx-auto"
      >
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-3xl font-bold">You're on the list!</h3>
        <p className="text-muted-foreground text-lg">
          Thank you for your feedback. You are helping us build a better internet for the next generation.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-12">
      <div className="glass-card p-8 md:p-12 rounded-3xl relative overflow-hidden">
        {/* Top accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-50" />
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-center">Help us build Dojo Kids</h3>
              <p className="text-center text-muted-foreground">Select who you are to see relevant questions.</p>
            </div>

            <Tabs 
              value={respondentType} 
              onValueChange={(v) => {
                form.setValue("respondentType", v as any);
                form.reset({
                  ...form.getValues(),
                  respondentType: v as any,
                  wouldUse: true,
                  biggestConcern: "",
                  wantedFeature: "",
                  whatWouldCreate: "",
                  openFeedback: "",
                  featureSuggestion: "",
                });
              }}
            >
              <TabsList className="grid w-full grid-cols-3 h-14 bg-secondary/10 rounded-xl p-1 mb-8">
                <TabsTrigger value="parent" className="rounded-lg text-base">Parent</TabsTrigger>
                <TabsTrigger value="kid" className="rounded-lg text-base">Kid</TabsTrigger>
                <TabsTrigger value="teacher" className="rounded-lg text-base">Teacher</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" className="bg-white/70 border-secondary/20 h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (Optional, for updates)</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" type="email" className="bg-white/70 border-secondary/20 h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="wouldUse"
              render={({ field }) => (
                <FormItem className="space-y-4 p-6 bg-white/50 rounded-2xl border border-secondary/15">
                  <FormLabel className="text-lg">{getWouldUseLabel()}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(val) => field.onChange(val === "yes")}
                      value={field.value ? "yes" : "no"}
                      className="flex space-x-6"
                    >
                      <FormItem className="flex items-center space-x-3">
                        <FormControl><RadioGroupItem value="yes" className="w-5 h-5" /></FormControl>
                        <FormLabel className="font-normal text-base cursor-pointer">Yes, definitely</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3">
                        <FormControl><RadioGroupItem value="no" className="w-5 h-5" /></FormControl>
                        <FormLabel className="font-normal text-base cursor-pointer">Probably not</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interestLevel"
              render={({ field }) => (
                <FormItem className="space-y-4 p-6 bg-white/50 rounded-2xl border border-secondary/15">
                  <div className="flex justify-between items-center">
                    <FormLabel className="text-lg">Interest Level</FormLabel>
                    <span className="text-2xl font-bold text-primary">{field.value}/10</span>
                  </div>
                  <FormControl>
                    <Slider
                      min={1}
                      max={10}
                      step={1}
                      value={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                      className="py-4"
                    />
                  </FormControl>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Not interested</span>
                    <span>Very excited</span>
                  </div>
                </FormItem>
              )}
            />

            {respondentType === "parent" && (
              <>
                <FormField
                  control={form.control}
                  name="biggestConcern"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Biggest concern about current kids' apps?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/70 border-secondary/20 h-12">
                            <SelectValue placeholder="Select a concern" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="addiction">Too addictive / Doomscrolling</SelectItem>
                          <SelectItem value="inappropriate">Inappropriate content</SelectItem>
                          <SelectItem value="privacy">Privacy & Data tracking</SelectItem>
                          <SelectItem value="passive">Too passive / Brain-rotting</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="wantedFeature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What is one feature you'd love to see?</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Strict screen time limits, family sharing..." className="bg-white/70 border-secondary/20 h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {respondentType === "kid" && (
              <FormField
                control={form.control}
                name="whatWouldCreate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What would you like to create?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/70 border-secondary/20 h-12">
                          <SelectValue placeholder="Select what you'd build" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="videos">Short Videos & Reels</SelectItem>
                        <SelectItem value="stories">Stories & Writing</SelectItem>
                        <SelectItem value="art">Art & Drawings</SelectItem>
                        <SelectItem value="code">Games & Code</SelectItem>
                        <SelectItem value="experiments">Science Experiments</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {respondentType === "teacher" && (
              <FormField
                control={form.control}
                name="featureSuggestion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How could this fit into a classroom?</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Share your thoughts on educational integration..." className="bg-white/70 border-secondary/20 min-h-25" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="openFeedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Any other thoughts or ideas?</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="We read every single response..." 
                      className="bg-white/70 border-secondary/20 min-h-25" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              size="lg" 
              className="w-full h-14 text-lg font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...</>
              ) : (
                "Join the waitlist"
              )}
            </Button>
          </form>
        </Form>
      </div>

      {stats && (
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
          <div className="glass-panel rounded-2xl p-4 md:p-6 text-center">
            <Users className="w-6 h-6 text-primary mx-auto mb-2 opacity-80" />
            <div className="text-2xl md:text-3xl font-bold">{stats.totalResponses}</div>
            <div className="text-xs md:text-sm text-muted-foreground mt-1">Total Responses</div>
          </div>
          <div className="glass-panel rounded-2xl p-4 md:p-6 text-center">
            <Heart className="w-6 h-6 text-accent mx-auto mb-2 opacity-80" />
            <div className="text-2xl md:text-3xl font-bold">{stats.wouldUsePercentage.toFixed(0)}%</div>
            <div className="text-xs md:text-sm text-muted-foreground mt-1">Would Use It</div>
          </div>
          <div className="glass-panel rounded-2xl p-4 md:p-6 text-center">
            <TrendingUp className="w-6 h-6 text-secondary mx-auto mb-2 opacity-80" />
            <div className="text-2xl md:text-3xl font-bold">{stats.averageInterestLevel.toFixed(1)}/10</div>
            <div className="text-xs md:text-sm text-muted-foreground mt-1">Avg Interest</div>
          </div>
        </div>
      )}
    </div>
  );
}
