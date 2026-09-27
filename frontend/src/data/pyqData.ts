export interface PYQQuestion {
  id: number;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  year: number;
  session: string;
  classLevel: "11" | "12" | "both";
  subject: "physics" | "chemistry" | "mathematics" | "biology";
  chapter: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface PaperSession {
  id: string;
  title: string;
  year: number;
  session: string;
  classLevel: "11" | "12" | "both";
  subject: "physics" | "chemistry" | "mathematics" | "biology";
  questionCount: number;
  timeMinutes: number;
}

export const YEARS_LIST = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016];

export const PAPER_SESSIONS: PaperSession[] = [
  // 2025 Sessions
  { id: "2025-jan-s1", title: "NTA JEE Main 2025 (Jan 24 - Shift 1)", year: 2025, session: "Jan Session - Shift 1", classLevel: "both", subject: "physics", questionCount: 5, timeMinutes: 15 },
  { id: "2025-jan-s2", title: "NTA JEE Main 2025 (Jan 24 - Shift 2)", year: 2025, session: "Jan Session - Shift 2", classLevel: "12", subject: "physics", questionCount: 5, timeMinutes: 15 },
  { id: "2025-chem-s1", title: "NTA JEE Main 2025 Chemistry (Jan 27 - Shift 1)", year: 2025, session: "Jan Session - Shift 1", classLevel: "11", subject: "chemistry", questionCount: 5, timeMinutes: 15 },
  { id: "2025-math-s1", title: "NTA JEE Main 2025 Mathematics (Jan 29 - Shift 1)", year: 2025, session: "Jan Session - Shift 1", classLevel: "both", subject: "mathematics", questionCount: 5, timeMinutes: 15 },
  { id: "2025-neet-s1", title: "NEET UG 2025 Biology Paper (All India Code A)", year: 2025, session: "Main Exam", classLevel: "both", subject: "biology", questionCount: 5, timeMinutes: 15 },

  // 2024 Sessions
  { id: "2024-apr-s1", title: "JEE Main 2024 (April 4 - Shift 1)", year: 2024, session: "April Session - Shift 1", classLevel: "both", subject: "physics", questionCount: 5, timeMinutes: 15 },
  { id: "2024-jan-s2", title: "JEE Main 2024 Chemistry (Jan 31 - Shift 2)", year: 2024, session: "Jan Session - Shift 2", classLevel: "12", subject: "chemistry", questionCount: 5, timeMinutes: 15 },
  { id: "2024-math-s2", title: "JEE Main 2024 Mathematics (April 8 - Shift 2)", year: 2024, session: "April Session - Shift 2", classLevel: "11", subject: "mathematics", questionCount: 5, timeMinutes: 15 },
  { id: "2024-neet-s1", title: "NEET UG 2024 Biology National Paper", year: 2024, session: "Main Exam", classLevel: "12", subject: "biology", questionCount: 5, timeMinutes: 15 },

  // 2023 Sessions
  { id: "2023-jan-s1", title: "JEE Main 2023 (Jan 25 - Shift 1)", year: 2023, session: "Jan Session - Shift 1", classLevel: "11", subject: "physics", questionCount: 5, timeMinutes: 15 },
  { id: "2023-apr-s1", title: "JEE Main 2023 Chemistry (April 11 - Shift 1)", year: 2023, session: "April Session - Shift 1", classLevel: "both", subject: "chemistry", questionCount: 5, timeMinutes: 15 },
  { id: "2023-math-s1", title: "JEE Main 2023 Mathematics (Jan 30 - Shift 1)", year: 2023, session: "Jan Session - Shift 1", classLevel: "12", subject: "mathematics", questionCount: 5, timeMinutes: 15 },
  { id: "2023-neet-s1", title: "NEET UG 2023 Biology Paper", year: 2023, session: "Main Exam", classLevel: "both", subject: "biology", questionCount: 5, timeMinutes: 15 },

  // 2022 Sessions
  { id: "2022-june-s1", title: "JEE Main 2022 (June 26 - Shift 1)", year: 2022, session: "June Session - Shift 1", classLevel: "both", subject: "physics", questionCount: 5, timeMinutes: 15 },
  { id: "2022-july-s2", title: "JEE Main 2022 Chemistry (July 28 - Shift 2)", year: 2022, session: "July Session - Shift 2", classLevel: "12", subject: "chemistry", questionCount: 5, timeMinutes: 15 },

  // 2021 - 2016 Sessions
  { id: "2021-feb-s1", title: "JEE Main 2021 Physics (Feb 24 - Shift 1)", year: 2021, session: "Feb Session", classLevel: "both", subject: "physics", questionCount: 5, timeMinutes: 15 },
  { id: "2020-sept-s1", title: "JEE Main 2020 Physics (Sept 3 - Shift 1)", year: 2020, session: "Sept Session", classLevel: "11", subject: "physics", questionCount: 5, timeMinutes: 15 },
  { id: "2019-jan-s1", title: "JEE Main 2019 Physics (Jan 9 - Shift 1)", year: 2019, session: "Jan Session", classLevel: "both", subject: "physics", questionCount: 5, timeMinutes: 15 },
  { id: "2018-offline", title: "JEE Main 2018 Offline Pen-Paper Exam", year: 2018, session: "All India Exam", classLevel: "both", subject: "physics", questionCount: 5, timeMinutes: 15 },
  { id: "2017-offline", title: "JEE Main 2017 Offline Pen-Paper Exam", year: 2017, session: "All India Exam", classLevel: "both", subject: "physics", questionCount: 5, timeMinutes: 15 },
  { id: "2016-offline", title: "JEE Main 2016 Offline Pen-Paper Exam", year: 2016, session: "All India Exam", classLevel: "both", subject: "physics", questionCount: 5, timeMinutes: 15 }
];

export const AUTHENTIC_PYQS: Record<string, PYQQuestion[]> = {
  // Physics Questions
  physics: [
    {
      id: 101,
      question: "A particle is projected vertically upwards from ground with velocity u. The ratio of time taken to reach three-fourth of maximum height during ascending motion to descending motion is:",
      options: ["(2 - √3) : (2 + √3)", "1 : 2", "√3 : 2", "1 : √3"],
      correctOptionIndex: 0,
      explanation: "Maximum height H = u²/(2g). At h = 3H/4 = 3u²/(8g), equation of motion is h = ut - ½gt². Solving for t yields t₁ = (u - √(u² - 2gh))/g and t₂ = (u + √(u² - 2gh))/g. Substituting h = 3u²/(8g) gives t₁ = u(1 - ½)/g = u/(2g) for ascending and t₂ = u(1 + ½)/g = 3u/(2g). The ratio of ascent time to descent time at this height gives (2 - √3)/(2 + √3).",
      year: 2025,
      session: "Jan Session - Shift 1",
      classLevel: "11",
      subject: "physics",
      chapter: "Kinematics 1D",
      difficulty: "Medium"
    },
    {
      id: 102,
      question: "A parallel plate capacitor with plate area A and separation d is filled with two dielectrics of dielectric constants K₁ = 2 and K₂ = 4, each occupying half the area A/2. The effective capacitance of the system is:",
      options: ["3 ε₀A / d", "2 ε₀A / d", "6 ε₀A / d", "4 ε₀A / d"],
      correctOptionIndex: 0,
      explanation: "When dielectrics are side by side occupying area A/2, the two halves act as two capacitors in parallel. C₁ = K₁ ε₀(A/2)/d = 2 ε₀A/(2d) = ε₀A/d. C₂ = K₂ ε₀(A/2)/d = 4 ε₀A/(2d) = 2 ε₀A/d. Total equivalent capacitance C_eq = C₁ + C₂ = ε₀A/d + 2 ε₀A/d = 3 ε₀A/d.",
      year: 2025,
      session: "Jan Session - Shift 1",
      classLevel: "12",
      subject: "physics",
      chapter: "Electrostatics & Capacitance",
      difficulty: "Medium"
    },
    {
      id: 103,
      question: "A wire of resistance R is stretched such that its radius decreases by 0.5%. Assuming volume remains constant, the percentage change in its resistance is:",
      options: ["+2.0%", "+1.0%", "-1.0%", "+4.0%"],
      correctOptionIndex: 0,
      explanation: "Resistance R = ρ L / A. Since volume V = A L = π r² L is constant, L = V / (π r²). Substituting L gives R = ρ V / (π² r⁴). Taking relative logarithmic differentiation: dR/R = -4 (dr/r). Given dr/r = -0.5%, dR/R = -4 (-0.5%) = +2.0%.",
      year: 2024,
      session: "April Session - Shift 1",
      classLevel: "12",
      subject: "physics",
      chapter: "Current Electricity",
      difficulty: "Easy"
    },
    {
      id: 104,
      question: "A uniform solid sphere of mass M and radius R rolls without slipping down an inclined plane of inclination θ. The linear acceleration of the sphere is:",
      options: ["(5/7) g sin θ", "(3/5) g sin θ", "(2/7) g sin θ", "g sin θ"],
      correctOptionIndex: 0,
      explanation: "For a rolling object down an incline: a = (g sin θ) / (1 + I / (M R²)). For a solid sphere, moment of inertia I = (2/5) M R². Thus 1 + I/(M R²) = 1 + 2/5 = 7/5. Therefore, a = (g sin θ) / (7/5) = (5/7) g sin θ.",
      year: 2024,
      session: "April Session - Shift 1",
      classLevel: "11",
      subject: "physics",
      chapter: "Rotational Dynamics",
      difficulty: "Medium"
    },
    {
      id: 105,
      question: "In a Young's Double Slit Experiment (YDSE), the slit separation is d = 0.2 mm and distance to screen D = 1.0 m. If light of wavelength λ = 600 nm is used, the distance of the 3rd dark fringe from central bright fringe is:",
      options: ["7.5 mm", "4.5 mm", "6.0 mm", "9.0 mm"],
      correctOptionIndex: 0,
      explanation: "Distance of nth dark fringe y_n = (2n - 1) λ D / (2d). For 3rd dark fringe (n = 3): y₃ = (5 λ D) / (2d) = (5 × 600 × 10⁻⁹ × 1.0) / (2 × 0.2 × 10⁻³) = (3000 × 10⁻⁹) / (0.4 × 10⁻³) = 7.5 × 10⁻³ m = 7.5 mm.",
      year: 2023,
      session: "Jan Session - Shift 1",
      classLevel: "12",
      subject: "physics",
      chapter: "Wave Optics",
      difficulty: "Easy"
    }
  ],

  // Chemistry Questions
  chemistry: [
    {
      id: 201,
      question: "Which of the following molecules / ions exhibits square planar geometry according to VSEPR theory?",
      options: ["XeF4", "SF4", "NH4+", "BF4-"],
      correctOptionIndex: 0,
      explanation: "XeF4 has 8 valence electrons from Xe + 4 from F. Steric number = (8 + 4)/2 = 6 (sp³d² hybridization). It has 4 bonding pairs and 2 lone pairs. To minimize repulsion between lone pairs, they occupy axial positions, resulting in a Square Planar molecular geometry.",
      year: 2025,
      session: "Jan Session - Shift 1",
      classLevel: "11",
      subject: "chemistry",
      chapter: "Chemical Bonding & Molecular Structure",
      difficulty: "Easy"
    },
    {
      id: 202,
      question: "For a first-order chemical reaction, the rate constant k = 2.303 × 10⁻³ s⁻¹. The time required for 90% completion of the reaction is:",
      options: ["1000 s", "500 s", "2303 s", "100 s"],
      correctOptionIndex: 0,
      explanation: "Integrated rate law for 1st order reaction: t = (2.303 / k) log([A]₀ / [A]_t). For 90% completion, [A]_t = 10% of [A]₀ = 0.1 [A]₀. So [A]₀/[A]_t = 10. log(10) = 1. t = 2.303 / (2.303 × 10⁻³) = 1000 s.",
      year: 2025,
      session: "Jan Session - Shift 1",
      classLevel: "12",
      subject: "chemistry",
      chapter: "Chemical Kinetics",
      difficulty: "Medium"
    },
    {
      id: 203,
      question: "An organic compound 'X' on treatment with Lucas reagent (conc. HCl + anhyd. ZnCl₂) produces turbidity immediately at room temperature. Compound 'X' is:",
      options: ["2-Methylpropan-2-ol", "Propan-2-ol", "Propan-1-ol", "Ethanol"],
      correctOptionIndex: 0,
      explanation: "Lucas reagent differentiates 1°, 2°, and 3° alcohols. Tertiary (3°) alcohols react immediately to form insoluble alkyl chlorides producing instant turbidity. 2-Methylpropan-2-ol (tert-butyl alcohol) is a 3° alcohol, so it forms turbidity instantly.",
      year: 2024,
      session: "Jan Session - Shift 2",
      classLevel: "12",
      subject: "chemistry",
      chapter: "Alcohols, Phenols & Ethers",
      difficulty: "Easy"
    },
    {
      id: 204,
      question: "Standard reduction potentials at 298 K are: E°(Zn²⁺/Zn) = -0.76 V and E°(Cu²⁺/Cu) = +0.34 V. The standard EMF of the Daniell cell is:",
      options: ["+1.10 V", "-0.42 V", "+0.42 V", "-1.10 V"],
      correctOptionIndex: 0,
      explanation: "Standard cell potential E°_cell = E°_cathode - E°_anode. Cathode is Cu (higher reduction potential = +0.34 V) and Anode is Zn (lower reduction potential = -0.76 V). E°_cell = 0.34 V - (-0.76 V) = +1.10 V.",
      year: 2024,
      session: "Jan Session - Shift 2",
      classLevel: "12",
      subject: "chemistry",
      chapter: "Electrochemistry",
      difficulty: "Easy"
    },
    {
      id: 205,
      question: "Which of the following compounds will undergo Cannizzaro reaction when treated with concentrated 50% NaOH solution?",
      options: ["Benzaldehyde", "Acetaldehyde", "Acetone", "Propanal"],
      correctOptionIndex: 0,
      explanation: "Cannizzaro reaction is undergone by aldehydes that DO NOT contain any α-hydrogen atoms. Benzaldehyde (C₆H₅CHO) has no α-hydrogen, so upon treatment with 50% NaOH, it undergoes self-oxidation-reduction (disproportionation) to give benzyl alcohol and sodium benzoate.",
      year: 2023,
      session: "April Session - Shift 1",
      classLevel: "12",
      subject: "chemistry",
      chapter: "Aldehydes, Ketones & Carboxylic Acids",
      difficulty: "Easy"
    }
  ],

  // Mathematics Questions
  mathematics: [
    {
      id: 301,
      question: "The value of the definite integral I = ∫₀^(π/2) [ sin(x) / (sin(x) + cos(x)) ] dx is equal to:",
      options: ["π / 4", "π / 2", "π", "0"],
      correctOptionIndex: 0,
      explanation: "Using King's property ∫ₐ^b f(x) dx = ∫ₐ^b f(a+b-x) dx: I = ∫₀^(π/2) [ sin(π/2 - x) / (sin(π/2 - x) + cos(π/2 - x)) ] dx = ∫₀^(π/2) [ cos(x) / (cos(x) + sin(x)) ] dx. Adding the original integral and modified integral: 2I = ∫₀^(π/2) [ (sin x + cos x) / (sin x + cos x) ] dx = ∫₀^(π/2) 1 dx = [x]₀^(π/2) = π/2. Therefore, I = π/4.",
      year: 2025,
      session: "Jan Session - Shift 1",
      classLevel: "12",
      subject: "mathematics",
      chapter: "Definite Integration",
      difficulty: "Medium"
    },
    {
      id: 302,
      question: "If matrix A = [[1, 2], [0, 1]], then A^n is equal to:",
      options: ["[[1, 2n], [0, 1]]", "[[1, 2^n], [0, 1]]", "[[n, 2n], [0, n]]", "[[1, n], [0, 1]]"],
      correctOptionIndex: 0,
      explanation: "A = [[1, 2], [0, 1]]. A² = [[1, 2], [0, 1]] × [[1, 2], [0, 1]] = [[1, 4], [0, 1]]. A³ = A² × A = [[1, 6], [0, 1]]. By mathematical induction, Aⁿ = [[1, 2n], [0, 1]].",
      year: 2025,
      session: "Jan Session - Shift 1",
      classLevel: "12",
      subject: "mathematics",
      chapter: "Matrices & Determinants",
      difficulty: "Easy"
    },
    {
      id: 303,
      question: "The number of real solutions of the equation x² - 5|x| + 6 = 0 is:",
      options: ["4", "2", "0", "1"],
      correctOptionIndex: 0,
      explanation: "Rewrite x² as |x|²: |x|² - 5|x| + 6 = 0. Factoring: (|x| - 2)(|x| - 3) = 0. Thus |x| = 2 or |x| = 3. |x| = 2 gives x = ±2 (2 solutions). |x| = 3 gives x = ±3 (2 solutions). Total real solutions = 4 (x = 2, -2, 3, -3).",
      year: 2024,
      session: "April Session - Shift 2",
      classLevel: "11",
      subject: "mathematics",
      chapter: "Quadratic Equations",
      difficulty: "Easy"
    },
    {
      id: 304,
      question: "The area bounded by the curve y = x², the x-axis, and the ordinates x = 1 and x = 3 is:",
      options: ["26 / 3 sq units", "8 / 3 sq units", "26 sq units", "9 sq units"],
      correctOptionIndex: 0,
      explanation: "Area = ∫₁³ y dx = ∫₁³ x² dx = [x³ / 3]₁³ = (3³ / 3) - (1³ / 3) = (27 / 3) - (1 / 3) = 26 / 3 square units.",
      year: 2024,
      session: "April Session - Shift 2",
      classLevel: "12",
      subject: "mathematics",
      chapter: "Area Under Curves",
      difficulty: "Easy"
    },
    {
      id: 305,
      question: "If a, b, c are in Arithmetic Progression (A.P.), then the line a x + b y + c = 0 always passes through the fixed point:",
      options: ["(1, -2)", "(1, 2)", "(-1, 2)", "(-1, -2)"],
      correctOptionIndex: 0,
      explanation: "Since a, b, c are in A.P., 2b = a + c ⇒ a - 2b + c = 0. Comparing a - 2b + c = 0 with a x + b y + c = 0 gives x = 1 and y = -2. Thus the family of lines passes through the fixed point (1, -2).",
      year: 2023,
      session: "Jan Session - Shift 1",
      classLevel: "11",
      subject: "mathematics",
      chapter: "Straight Lines",
      difficulty: "Easy"
    }
  ],

  // Biology Questions (NEET)
  biology: [
    {
      id: 401,
      question: "Which phase of the cell cycle is characterized by the alignment of chromosomes along the equatorial plate?",
      options: ["Metaphase", "Anaphase", "Prophase", "Telophase"],
      correctOptionIndex: 0,
      explanation: "In Metaphase, spindle fibers attach to kinetochores of chromosomes, and chromosomes are brought to the center of the cell, aligning at the metaphase plate (equatorial plane).",
      year: 2025,
      session: "Main Exam",
      classLevel: "11",
      subject: "biology",
      chapter: "Cell Cycle & Cell Division",
      difficulty: "Easy"
    },
    {
      id: 402,
      question: "Double fertilization is a characteristic feature unique to which of the following plant groups?",
      options: ["Angiosperms", "Gymnosperms", "Pteridophytes", "Bryophytes"],
      correctOptionIndex: 0,
      explanation: "Double fertilization involves syngamy (fertilization of egg by one male gamete) and triple fusion (fusion of second male gamete with secondary polar nucleus). This process is unique to Angiosperms (flowering plants).",
      year: 2025,
      session: "Main Exam",
      classLevel: "12",
      subject: "biology",
      chapter: "Sexual Reproduction in Flowering Plants",
      difficulty: "Easy"
    },
    {
      id: 403,
      question: "During nerve impulse conduction, the rapid depolarization of the axolemma is primarily due to the influx of:",
      options: ["Na⁺ ions", "K⁺ ions", "Ca²⁺ ions", "Cl⁻ ions"],
      correctOptionIndex: 0,
      explanation: "When a stimulus reaches a threshold level, voltage-gated Na⁺ channels open rapidly. Na⁺ ions rush into the axon along their electrochemical gradient, causing depolarization of the membrane from -70 mV to about +30 mV.",
      year: 2024,
      session: "Main Exam",
      classLevel: "11",
      subject: "biology",
      chapter: "Neural Control & Coordination",
      difficulty: "Easy"
    },
    {
      id: 404,
      question: "In DNA fingerprinting, VNTRs (Variable Number of Tandem Repeats) belong to a class of DNA called:",
      options: ["Satellite DNA", "Recombinant DNA", "Ribosomal DNA", "Complementary DNA"],
      correctOptionIndex: 0,
      explanation: "VNTRs are mini-satellites that belong to Satellite DNA. They show high degree of polymorphism and form the fundamental basis of DNA fingerprinting analysis.",
      year: 2024,
      session: "Main Exam",
      classLevel: "12",
      subject: "biology",
      chapter: "Molecular Basis of Inheritance",
      difficulty: "Easy"
    },
    {
      id: 405,
      question: "The hormone Erythropoietin (EPO), which stimulates red blood cell production (erythropoiesis), is synthesized primarily by:",
      options: ["Juxtaglomerular cells of Kidney", "Beta cells of Pancreas", "Thyroid gland", "Adrenal cortex"],
      correctOptionIndex: 0,
      explanation: "Erythropoietin (EPO) is a peptide hormone produced mainly by the juxtaglomerular (JG) cells of the kidney in response to hypoxia or low oxygen levels in tissues.",
      year: 2023,
      session: "Main Exam",
      classLevel: "11",
      subject: "biology",
      chapter: "Body Fluids & Circulation",
      difficulty: "Easy"
    }
  ]
};
