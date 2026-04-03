import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SurveyForm } from "@/components/survey-form";
import { 
  ChevronDown, 
  BrainCircuit, 
  EyeOff, 
  Hourglass, 
  Video, 
  Camera, 
  PenTool, 
  FileText, 
  Zap, 
  Trophy, 
  Globe, 
  Heart, 
  Award, 
  Medal, 
  Crown,
  Play,
  ArrowRight
} from "lucide-react";

function TypingEffect({ words }: { words: string[] }) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(word.substring(0, text.length + 1));
        if (text === word) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setText(word.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  return (
    <span className="inline-block border-r-4 border-primary pr-1 min-h-[1.2em] text-gradient">
      {text}
    </span>
  );
}

function AnimatedCounter({ end, duration = 2, suffix = "", prefix = "" }: { end: number, duration?: number, suffix?: string, prefix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, end, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, end, count, duration]);
  
  useEffect(() => {
    return rounded.on("change", (v) => setDisplay(v));
  }, [rounded]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  const currentYear = new Date().getFullYear();

  const scrollToSurvey = () => {
    document.getElementById("survey")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="surface-hero w-full flex flex-col items-center bg-background min-h-screen overflow-x-hidden relative">
      <div className="soft-blob bg-primary/35 w-80 h-80 top-12 -left-24 float-slower" />
      <div className="soft-blob bg-destructive/30 w-104 h-104 top-112 -right-30 float-slow" />
      <div className="soft-blob bg-accent/35 w-72 h-72 bottom-20 left-[12%] float-slower" />
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-dvh flex flex-col justify-center items-center text-center px-4 pt-20 pb-10 overflow-hidden">
        <motion.div
          aria-hidden="true"
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
          className="absolute top-20 right-[8%] w-10 h-10 rounded-2xl bg-secondary/30 rotate-12"
        />
        <motion.div
          aria-hidden="true"
          initial={{ y: 0 }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
          className="absolute bottom-24 left-[10%] w-12 h-12 rounded-full bg-accent/30"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="z-10 section-wrap px-2 flex flex-col items-center"
        >
          <motion.img
            src="/favicon.png"
            alt="Dojo Kids logo"
            className="w-36 h-32 md:w-44 md:h-40 mb-5 scale-x-105 md:scale-x-110 drop-shadow-[0_10px_24px_rgba(74,144,226,0.24)]"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5.8, ease: "easeInOut", repeat: Infinity }}
          />

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-medium mb-8 border-primary/30 text-primary">
            <Zap className="w-4 h-4" /> The internet your kids deserve
          </div>
          
          <h1 className="text-gradient text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight mb-5 font-display">
            DOJO KIDS
          </h1>

          <p className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
            Make things. Not scroll.
          </p>
          
          <div className="text-3xl md:text-5xl font-bold mb-8 h-16 md:h-20 text-foreground">
            <TypingEffect words={["Play. Build. Grow.", "Make things. Not scroll.", "Earn your screen time."]} />
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-6">
            We are building a better internet for kids. A creation-first platform where building ideas earns the right to explore.
          </p>

          <p className="text-sm md:text-base text-muted-foreground max-w-3xl mb-10">
            Ensure the design visually matches the energy and colors of the Dojo Kids logo and feels inviting within the first 3 seconds.
          </p>
          
          <Button 
            onClick={scrollToSurvey}
            size="lg" 
            className="h-16 px-10 text-xl"
          >
            Help Us Build It <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center text-muted-foreground float-slow cursor-pointer"
          onClick={() => document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="text-sm mb-2 uppercase tracking-widest">Discover the Problem</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* 2. PROBLEM SECTION */}
      <section id="problem" className="w-full py-32 px-4 relative">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-destructive/5 to-transparent pointer-events-none" />
        <div className="section-wrap">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-destructive mb-4">The Passive Pandemic</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">The current digital ecosystem is designed to extract attention, not cultivate it.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeIn} className="alert-card p-8 rounded-3xl flex flex-col items-center text-center">
              <Hourglass className="w-12 h-12 text-destructive mb-6" />
              <div className="text-6xl font-black text-foreground mb-2">
                <AnimatedCounter end={4.5} suffix="h" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Daily Screen Time</h3>
              <p className="text-destructive/80">Average hours kids spend passively consuming content every single day.</p>
            </motion.div>

            <motion.div variants={fadeIn} className="alert-card p-8 rounded-3xl flex flex-col items-center text-center">
              <BrainCircuit className="w-12 h-12 text-destructive mb-6" />
              <div className="text-6xl font-black text-foreground mb-2">
                <AnimatedCounter end={33} suffix="%" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Attention Drop</h3>
              <p className="text-destructive/80">Decline in average adolescent attention spans over the last decade.</p>
            </motion.div>

            <motion.div variants={fadeIn} className="alert-card p-8 rounded-3xl flex flex-col items-center text-center">
              <EyeOff className="w-12 h-12 text-destructive mb-6" />
              <div className="text-6xl font-black text-foreground mb-2">
                <AnimatedCounter end={1} prefix="1 in " />
              </div>
              <h3 className="text-xl font-semibold mb-2">Actually Create</h3>
              <p className="text-destructive/80">Versus 9 in 10 who only consume. The creator class is shrinking.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. WHAT KIDS ARE LOSING */}
      <section className="w-full py-24 px-4">
        <div className="section-wrap">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            <motion.div variants={fadeIn} className="glass-card p-10 rounded-3xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-2xl font-bold mb-4 opacity-50">01</h3>
              <h4 className="text-3xl font-bold mb-4 text-primary">Unfinished Ideas</h4>
              <p className="text-muted-foreground text-lg">Brilliant sparks of imagination buried under the next algorithmic swipe.</p>
            </motion.div>

            <motion.div variants={fadeIn} className="glass-card p-10 rounded-3xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-2xl font-bold mb-4 opacity-50">02</h3>
              <h4 className="text-3xl font-bold mb-4 text-accent">Hidden Creativity</h4>
              <p className="text-muted-foreground text-lg">Skills that atrophy because platforms reward consumption over production.</p>
            </motion.div>

            <motion.div variants={fadeIn} className="glass-card p-10 rounded-3xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-2xl font-bold mb-4 opacity-50">03</h3>
              <h4 className="text-3xl font-bold mb-4 text-secondary">Lost Curiosity</h4>
              <p className="text-muted-foreground text-lg">The deep desire to know "how it works" replaced by "what's next".</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="w-full py-32 px-4 relative overflow-hidden">
        <div className="section-wrap">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">The Dojo Loop</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We reverse the paradigm. Creation is the key that unlocks consumption.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-linear-to-r from-primary via-secondary to-accent -translate-y-1/2 opacity-30" />
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 relative z-10"
            >
              {[
                { title: "Prompt", icon: Zap, color: "text-primary", bg: "bg-primary/10" },
                { title: "Create", icon: PenTool, color: "text-accent", bg: "bg-accent/10" },
                { title: "Share", icon: Globe, color: "text-secondary", bg: "bg-secondary/10" },
                { title: "Earn", icon: Trophy, color: "text-destructive", bg: "bg-destructive/10" },
                { title: "Unlock", icon: Play, color: "text-primary", bg: "bg-primary/10" },
              ].map((step, i) => (
                <motion.div key={i} variants={fadeIn} className="flex flex-col items-center text-center">
                  <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl glass-card flex items-center justify-center mb-6 relative group cursor-default`}>
                    <div className={`absolute inset-0 ${step.bg} rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity`} />
                    <step.icon className={`w-10 h-10 ${step.color} relative z-10`} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                  <div className="w-8 h-1 bg-secondary/30 rounded-full" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. FEATURES SECTION */}
      <section className="w-full py-32 px-4 bg-background border-t border-secondary/10">
        <div className="section-wrap">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">A Toolkit for Builders</h2>
            <p className="text-xl text-muted-foreground">Everything needed to express ideas, structured to build discipline.</p>
          </motion.div>

          <div className="space-y-12">
            
            {/* 5a. Content Types */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6 max-w-4xl"
            >
              <h3 className="text-2xl font-semibold flex items-center gap-3"><Camera className="text-primary" /> Modes of Creation</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-panel p-6 rounded-2xl hover:bg-secondary/10 transition-colors">
                  <Video className="w-8 h-8 text-primary mb-4" />
                  <h4 className="font-bold mb-1">Reels</h4>
                  <p className="text-sm text-muted-foreground">Max 3 minutes. No filler.</p>
                </div>
                <div className="glass-panel p-6 rounded-2xl hover:bg-secondary/10 transition-colors">
                  <Camera className="w-8 h-8 text-accent mb-4" />
                  <h4 className="font-bold mb-1">Photo + Story</h4>
                  <p className="text-sm text-muted-foreground">Context required.</p>
                </div>
                <div className="glass-panel p-6 rounded-2xl hover:bg-secondary/10 transition-colors">
                  <PenTool className="w-8 h-8 text-secondary mb-4" />
                  <h4 className="font-bold mb-1">"How I Made It"</h4>
                  <p className="text-sm text-muted-foreground">Break down the process.</p>
                </div>
                <div className="glass-panel p-6 rounded-2xl hover:bg-secondary/10 transition-colors">
                  <FileText className="w-8 h-8 text-destructive mb-4" />
                  <h4 className="font-bold mb-1">Written Posts</h4>
                  <p className="text-sm text-muted-foreground">Long-form thought.</p>
                </div>
              </div>
            </motion.div>

            {/* 5c. Time System */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="space-y-6"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-semibold text-secondary">
                  <Hourglass className="w-4 h-4" /> Adaptive Time Engine
                </div>
                <h3 className="text-3xl font-bold">Not screen time. Smart time.</h3>
                <p className="text-muted-foreground text-lg">Time adjusts to how you learn, think, and create.</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-3xl space-y-5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-foreground">Flow Engine</h4>
                    <span className="text-xs font-semibold text-muted-foreground">Reward-driven, not restricted</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    {[
                      { label: "Watch", icon: "🎬" },
                      { label: "Quiz", icon: "🧠" },
                      { label: "Continue", icon: "⚡" },
                      { label: "Create", icon: "🎨" },
                      { label: "Extend Time", icon: "⏱️" },
                    ].map((step, i) => (
                      <div key={step.label} className="contents">
                        <motion.div
                          initial={i === 1 ? { scale: 0.94, opacity: 0.8 } : undefined}
                          animate={i === 1 ? { scale: [0.94, 1.02, 1], opacity: [0.8, 1, 1] } : undefined}
                          transition={i === 1 ? { duration: 2.8, ease: "easeInOut", repeat: Infinity } : undefined}
                          className="rounded-full border border-secondary/20 bg-white/70 px-3 py-2 font-semibold text-foreground"
                        >
                          {step.icon} {step.label}
                        </motion.div>
                        {i < 4 && (
                          <motion.span
                            animate={{ x: [0, 5, 0], opacity: [0.45, 1, 0.45] }}
                            transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
                            className="text-secondary font-bold"
                          >
                            →
                          </motion.span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="glass-panel p-4 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Smart breaks help you stay sharp</span>
                      <span>Your time grows as you learn</span>
                    </div>
                    <div className="relative h-4 rounded-full bg-secondary/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-linear-to-r from-primary via-destructive to-accent"
                        animate={{ width: ["34%", "40%", "46%", "58%", "64%"] }}
                        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute top-0.5 w-3 h-3 rounded-full bg-secondary/70"
                        animate={{ left: ["30%", "31%", "31%", "53%", "53%"] }}
                        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">Create more, unlock more time.</p>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-3xl space-y-4">
                  <h4 className="text-xl font-bold">Your Time Adapts to You</h4>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><Play className="w-4 h-4 mt-0.5 text-primary" /> Start with ~20 minutes</li>
                    <li className="flex items-start gap-2"><BrainCircuit className="w-4 h-4 mt-0.5 text-secondary" /> Quizzes appear based on what you watched</li>
                    <li className="flex items-start gap-2"><Zap className="w-4 h-4 mt-0.5 text-destructive" /> Correct answers = fewer interruptions</li>
                    <li className="flex items-start gap-2"><PenTool className="w-4 h-4 mt-0.5 text-accent" /> Creating things = more time unlocked</li>
                    <li className="flex items-start gap-2"><Hourglass className="w-4 h-4 mt-0.5 text-secondary" /> System adapts to your learning pace</li>
                  </ul>
                  <p className="text-sm font-semibold text-foreground/80">Intelligent, not controlling. Motivating, not limiting.</p>
                </div>
              </div>
            </motion.div>

          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {/* 5b. Sprout Moments */}
            <motion.div variants={fadeIn} className="glass-panel p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-6 border-b border-secondary/15 pb-4">Sprout Moments</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="bg-primary/20 p-2 rounded-lg mt-1"><BrainCircuit className="w-5 h-5 text-primary" /></div>
                  <div><strong className="block text-foreground">Quiz Gates</strong> Answer correctly to unlock feed time.</div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-accent/20 p-2 rounded-lg mt-1"><Zap className="w-5 h-5 text-accent" /></div>
                  <div><strong className="block text-foreground">Idea Prompts</strong> System pushes challenges when idle.</div>
                </li>
              </ul>
            </motion.div>

            {/* 5d. Point System */}
            <motion.div variants={fadeIn} className="glass-panel p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-6 border-b border-secondary/15 pb-4">Economy</h3>
              <ul className="space-y-4">
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><PenTool className="w-4 h-4 text-muted-foreground"/> Posting</span>
                  <span className="font-bold text-primary">+50 pts</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><Heart className="w-4 h-4 text-muted-foreground"/> Appreciation</span>
                  <span className="font-bold text-accent">+10 pts</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-muted-foreground"/> Cross-School Collab</span>
                  <span className="font-bold text-secondary">+100 pts</span>
                </li>
              </ul>
            </motion.div>

            {/* 5f. Rewards */}
            <motion.div variants={fadeIn} className="glass-panel p-8 rounded-3xl text-center flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-6">Real Rewards</h3>
              <div className="flex justify-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-linear-to-br from-primary to-destructive flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.08)]"><Award className="w-7 h-7 text-white" /></div>
                <div className="w-14 h-14 rounded-full bg-linear-to-br from-secondary to-destructive flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.08)]"><Medal className="w-7 h-7 text-white" /></div>
                <div className="w-14 h-14 rounded-full bg-linear-to-br from-accent to-primary flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.08)]"><Crown className="w-7 h-7 text-white" /></div>
              </div>
              <p className="text-sm text-muted-foreground">Certificates, School Recognition, and the "Young Innovator" Title.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. COMMUNITY LEADERBOARD */}
      <section className="w-full py-32 px-4 relative">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none skew-y-3 transform origin-top-left" />
        <div className="section-wrap relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Community Leaderboard</h2>
            <p className="text-lg text-muted-foreground mb-6">See how young creators are progressing together</p>
            <div className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary font-bold tracking-widest uppercase text-sm mb-8">
              Monthly Creator Challenge
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="md:col-span-2 space-y-4"
            >
              {[
                { name: "School Alpha", score: "12,450", rank: "01" },
                { name: "School Beta", score: "11,200", rank: "02" },
                { name: "School Gamma", score: "9,840", rank: "03" }
              ].map((school, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className="glass-card p-5 md:p-6 rounded-2xl border border-secondary/20 flex items-center justify-between transition-transform hover:scale-[1.01] cursor-default"
                >
                  <div className="flex items-center gap-5">
                    <div className="text-lg md:text-xl font-black text-muted-foreground">{school.rank}</div>
                    <div className="text-xl md:text-2xl font-bold text-foreground">{school.name}</div>
                  </div>
                  <div className="text-lg md:text-xl font-mono text-muted-foreground">{school.score} pts</div>
                </motion.div>
              ))}

              <p className="text-sm text-muted-foreground px-1">Final rankings will reflect real schools after launch.</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="glass-card p-6 rounded-2xl border border-secondary/20"
            >
              <h3 className="text-xl font-bold mb-3">How this works</h3>
              <p className="text-muted-foreground leading-relaxed">
                Students earn points by creating and learning. Schools accumulate points based on student activity. Rankings highlight collective creativity and growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. WHY THIS IS DIFFERENT */}
      <section className="w-full py-32 px-4">
        <div className="section-wrap">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold">The Paradigm Shift</h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="glass-card rounded-3xl overflow-hidden"
          >
            <div className="grid grid-cols-2 text-center border-b border-secondary/15 bg-secondary/10">
              <div className="p-6 md:p-8 text-xl md:text-2xl font-bold text-muted-foreground">Current Apps</div>
              <div className="p-6 md:p-8 text-xl md:text-2xl font-bold text-primary bg-primary/10">Dojo Kids</div>
            </div>
            
            {[
              { old: "Endless Scroll", new: "Creation-First" },
              { old: "Passive", new: "Active" },
              { old: "Addictive", new: "Productive" },
              { old: "Algorithmic Feed", new: "Merit-based Unlocks" }
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-2 text-center border-b border-secondary/10 last:border-0">
                <div className="p-6 text-lg text-muted-foreground/70">{row.old}</div>
                <div className="p-6 text-lg font-semibold text-foreground bg-primary/5">{row.new}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8. SURVEY SECTION */}
      <section id="survey" className="w-full py-32 px-4 relative bg-background">
        <div className="absolute inset-0 bg-linear-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="section-wrap relative z-10">
          <SurveyForm />
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="w-full py-12 text-center text-muted-foreground border-t border-secondary/15 mt-20">
        <p className="font-bold text-foreground mb-2">Dojo Kids</p>
        <p className="text-sm">Building a better internet for the next generation.</p>
        <p className="text-sm mt-2">© {currentYear} Dojo Kids. All rights reserved.</p>
      </footer>
    </div>
  );
}
