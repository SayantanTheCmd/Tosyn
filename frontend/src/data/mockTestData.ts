export interface MockQuestion {
  id: number;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface ChapterMockTest {
  id: string;
  title: string;
  subject: "physics" | "chemistry" | "mathematics" | "biology";
  classLevel: "11" | "12";
  chapter: string;
  questionsCount: number;
  durationMinutes: number;
  difficulty: "Easy" | "Moderate" | "High Yield" | "Advanced";
  examTrack: "JEE" | "NEET" | "BOTH";
  questions: MockQuestion[];
}

export const CHAPTER_MOCK_TESTS: ChapterMockTest[] = [
  // ==================== CLASS 11 TESTS (10 TESTS) ====================
  {
    id: "c11-phy-kinematics",
    title: "Class 11 Physics: Kinematics & Motion 1D/2D",
    subject: "physics",
    classLevel: "11",
    chapter: "Kinematics & Motion",
    questionsCount: 5,
    durationMinutes: 15,
    difficulty: "High Yield",
    examTrack: "BOTH",
    questions: [
      {
        id: 1,
        question: "A ball is dropped from a height H. At the same instant, another ball is thrown upwards with velocity U. They meet at a height H/2. The initial velocity U of the second ball is:",
        options: ["√(gH)", "√(2gH)", "2√(gH)", "√(gH/2)"],
        correctOptionIndex: 0,
        explanation: "Time taken for 1st ball to fall H/2: H/2 = ½ gt² ⇒ t = √(H/g). Distance traveled by 2nd ball in time t: H/2 = Ut - ½ gt² = U√(H/g) - H/2. Thus U√(H/g) = H ⇒ U = √(gH)."
      },
      {
        id: 2,
        question: "A projectile is fired at an angle of 45° to the horizontal. If the radius of curvature of its trajectory at the highest point is R, the initial velocity is:",
        options: ["√(2gR)", "√(gR)", "2√(gR)", "√(gR/2)"],
        correctOptionIndex: 0,
        explanation: "At the highest point, speed is v = u cos 45° = u/√2. Centripetal acceleration at top is g. Radius of curvature R = v²/g = (u²/2)/g = u²/(2g). Hence u = √(2gR)."
      },
      {
        id: 3,
        question: "A particle moves along x-axis such that its position is given by x = 3t² - 12t + 5 (in meters). The speed of the particle at t = 3 seconds is:",
        options: ["6 m/s", "12 m/s", "0 m/s", "18 m/s"],
        correctOptionIndex: 0,
        explanation: "Velocity v = dx/dt = 6t - 12. At t = 3 s: v = 6(3) - 12 = 18 - 12 = 6 m/s."
      },
      {
        id: 4,
        question: "The angle of projection for a projectile for which the horizontal range and maximum height are equal is:",
        options: ["tan⁻¹(4)", "45°", "60°", "tan⁻¹(2)"],
        correctOptionIndex: 0,
        explanation: "Range R = (u² sin 2θ)/g = 2u² sin θ cos θ / g. Max height H = u² sin² θ / (2g). Setting R = H: 2 sin θ cos θ = sin² θ / 2 ⇒ tan θ = 4 ⇒ θ = tan⁻¹(4)."
      },
      {
        id: 5,
        question: "A car accelerates from rest at 2 m/s² for 10 s and then decelerates at 1 m/s² until it stops. Total distance traveled by the car is:",
        options: ["300 m", "200 m", "150 m", "400 m"],
        correctOptionIndex: 0,
        explanation: "Phase 1: v_max = 0 + 2(10) = 20 m/s. Distance s₁ = ½(2)(10²) = 100 m. Phase 2: Deceleration from 20 m/s to 0 at 1 m/s²: 0 = 20² - 2(1)s₂ ⇒ s₂ = 200 m. Total distance = 100 + 200 = 300 m."
      }
    ]
  },
  {
    id: "c11-phy-nlms",
    title: "Class 11 Physics: Laws of Motion & Friction",
    subject: "physics",
    classLevel: "11",
    chapter: "Laws of Motion & Friction",
    questionsCount: 5,
    durationMinutes: 15,
    difficulty: "Moderate",
    examTrack: "BOTH",
    questions: [
      {
        id: 1,
        question: "A block of mass 2 kg rests on a rough horizontal surface with coefficient of friction μ = 0.4. If a horizontal force of 6 N is applied, the frictional force acting on the block is (g = 10 m/s²):",
        options: ["6 N", "8 N", "4 N", "0 N"],
        correctOptionIndex: 0,
        explanation: "Limiting friction f_lim = μ m g = 0.4 × 2 × 10 = 8 N. Applied force (6 N) < f_lim (8 N). Since applied force is less than limiting friction, static friction adjusts to balance applied force, so f = 6 N."
      },
      {
        id: 2,
        question: "Two blocks of masses 4 kg and 6 kg connected by a light string rest on a smooth surface. A force of 20 N pulls the 6 kg block. The tension in the string is:",
        options: ["8 N", "12 N", "10 N", "4 N"],
        correctOptionIndex: 0,
        explanation: "Total mass = 4 + 6 = 10 kg. Acceleration a = F / total mass = 20 / 10 = 2 m/s². Tension T pulling the 4 kg block: T = 4 × a = 4 × 2 = 8 N."
      },
      {
        id: 3,
        question: "A lift of mass 1000 kg is moving upwards with an acceleration of 2 m/s². The tension in the supporting cable is (g = 9.8 m/s²):",
        options: ["11800 N", "9800 N", "7800 N", "12000 N"],
        correctOptionIndex: 0,
        explanation: "Tension T - mg = ma ⇒ T = m(g + a) = 1000 × (9.8 + 2) = 1000 × 11.8 = 11800 N."
      },
      {
        id: 4,
        question: "A body of mass 5 kg is suspended by two light strings making angles 30° and 60° with the vertical. The tension in the string making 30° with vertical is (g = 10 m/s²):",
        options: ["25√3 N", "25 N", "50 N", "50√3 N"],
        correctOptionIndex: 0,
        explanation: "Using Lami's theorem or resolving components: T₁ cos 30° + T₂ cos 60° = W = 50 N, and T₁ sin 30° = T₂ sin 60°. T₂ = T₁ / √3. T₁(√3/2) + (T₁/√3)(1/2) = 50 ⇒ T₁ [ (3 + 1)/(2√3) ] = 50 ⇒ T₁ = 25√3 N."
      },
      {
        id: 5,
        question: "The banking angle for a curved road of radius 50 m to negotiate a speed of 10 m/s safely without relying on friction is (g = 10 m/s²):",
        options: ["tan⁻¹(0.2)", "tan⁻¹(0.5)", "30°", "45°"],
        correctOptionIndex: 0,
        explanation: "Banking formula tan θ = v² / (r g) = 10² / (50 × 10) = 100 / 500 = 0.2 ⇒ θ = tan⁻¹(0.2)."
      }
    ]
  },
  {
    id: "c11-chem-bonding",
    title: "Class 11 Chemistry: Chemical Bonding & Hybridization",
    subject: "chemistry",
    classLevel: "11",
    chapter: "Chemical Bonding & VSEPR",
    questionsCount: 5,
    durationMinutes: 15,
    difficulty: "High Yield",
    examTrack: "BOTH",
    questions: [
      {
        id: 1,
        question: "The shape and hybridization of PCl₅ in gas phase according to VSEPR theory are:",
        options: ["Trigonal bipyramidal, sp³d", "Square pyramidal, sp³d", "Octahedral, sp³d²", "Tetrahedral, sp³"],
        correctOptionIndex: 0,
        explanation: "PCl₅ has 5 bonding pairs and 0 lone pairs on Phosphorus. Steric number = 5 (sp³d hybridization), giving a Trigonal Bipyramidal shape."
      },
      {
        id: 2,
        question: "Which of the following molecules has a non-zero dipole moment?",
        options: ["NH₃", "BF₃", "CCl₄", "CO₂"],
        correctOptionIndex: 0,
        explanation: "BF₃ (trigonal planar), CCCl₄ (tetrahedral), and CO₂ (linear) are symmetrical and their bond dipoles cancel to yield zero net dipole moment. NH₃ is pyramidal with a lone pair, giving a net dipole moment of 1.47 D."
      },
      {
        id: 3,
        question: "According to Molecular Orbital Theory (MOT), the bond order of O₂⁺ ion is:",
        options: ["2.5", "2.0", "1.5", "3.0"],
        correctOptionIndex: 0,
        explanation: "O₂ has 16 electrons (bond order = 2.0). O₂⁺ has 15 electrons, removing 1 electron from antibonding π* orbital. Bond order = ½ (N_b - N_a) = ½ (10 - 5) = 2.5."
      },
      {
        id: 4,
        question: "The compound exhibiting intramolecular hydrogen bonding is:",
        options: ["o-Nitrophenol", "p-Nitrophenol", "Water", "Ethanol"],
        correctOptionIndex: 0,
        explanation: "o-Nitrophenol forms a 6-membered chelate ring via intramolecular hydrogen bonding between the -OH group and adjacent -NO₂ group."
      },
      {
        id: 5,
        question: "Hybridization of Iodine in IF₇ is:",
        options: ["sp³d³", "sp³d²", "sp³d", "sp³"],
        correctOptionIndex: 0,
        explanation: "IF₇ has 7 bonding pairs and 0 lone pairs. Steric number = 7, corresponding to sp³d³ hybridization (Pentagonal Bipyramidal geometry)."
      }
    ]
  },
  {
    id: "c11-math-quadratics",
    title: "Class 11 Mathematics: Quadratic Equations & Sequences",
    subject: "mathematics",
    classLevel: "11",
    chapter: "Quadratic Equations & Sequences",
    questionsCount: 5,
    durationMinutes: 15,
    difficulty: "Moderate",
    examTrack: "JEE",
    questions: [
      {
        id: 1,
        question: "If roots of equation x² - px + q = 0 differ by 1, then p² is equal to:",
        options: ["4q + 1", "4q - 1", "2q + 1", "q² + 1"],
        correctOptionIndex: 0,
        explanation: "|α - β| = 1 ⇒ (α - β)² = 1. We know (α - β)² = (α + β)² - 4αβ = p² - 4q = 1 ⇒ p² = 4q + 1."
      },
      {
        id: 2,
        question: "The sum to infinity of the geometric progression 1 + 1/3 + 1/9 + 1/27 + ... is:",
        options: ["3 / 2", "2 / 3", "3", "2"],
        correctOptionIndex: 0,
        explanation: "Sum S_∞ = a / (1 - r). Here a = 1 and r = 1/3. S_∞ = 1 / (1 - 1/3) = 1 / (2/3) = 3/2."
      },
      {
        id: 3,
        question: "If A and G are the Arithmetic Mean and Geometric Mean of two positive numbers, then the numbers are:",
        options: ["A ± √(A² - G²)", "A ± √(A² + G²)", "G ± √(A² - G²)", "A ± G"],
        correctOptionIndex: 0,
        explanation: "Let numbers be x, y. x+y = 2A, xy = G². Quadratic equation whose roots are x, y: t² - 2At + G² = 0. Roots t = A ± √(A² - G²)."
      },
      {
        id: 4,
        question: "Number of real solutions of x² - 3|x| + 2 = 0 is:",
        options: ["4", "2", "3", "0"],
        correctOptionIndex: 0,
        explanation: "(|x| - 1)(|x| - 2) = 0 ⇒ |x| = 1 or |x| = 2. x = ±1, ±2 (4 solutions)."
      },
      {
        id: 5,
        question: "The 10th term of AP 2, 7, 12, ... is:",
        options: ["47", "52", "42", "57"],
        correctOptionIndex: 0,
        explanation: "a = 2, d = 5. T₁₀ = a + 9d = 2 + 9(5) = 2 + 45 = 47."
      }
    ]
  },
  {
    id: "c11-bio-cell",
    title: "Class 11 Biology: Cell Unit of Life & Cell Cycle",
    subject: "biology",
    classLevel: "11",
    chapter: "Cell Structure & Division",
    questionsCount: 5,
    durationMinutes: 15,
    difficulty: "High Yield",
    examTrack: "NEET",
    questions: [
      {
        id: 1,
        question: "Which of the following cell organelles is known as the 'powerhouse of the cell'?",
        options: ["Mitochondria", "Chloroplast", "Golgi Body", "Lysosome"],
        correctOptionIndex: 0,
        explanation: "Mitochondria produce cellular energy in the form of ATP via aerobic respiration and oxidative phosphorylation."
      },
      {
        id: 2,
        question: "Crossing over occurs during which stage of Prophase-I in Meiosis?",
        options: ["Pachytene", "Leptotene", "Zygotene", "Diplotene"],
        correctOptionIndex: 0,
        explanation: "Crossing over between non-sister chromatids of homologous chromosomes occurs during the Pachytene stage, mediated by enzyme recombinase."
      },
      {
        id: 3,
        question: "The 9+2 arrangement of microtubules is characteristic of:",
        options: ["Cilia and Flagella", "Centriole", "Basal Body", "Spindle Fibers"],
        correctOptionIndex: 0,
        explanation: "Eukaryotic cilia and flagella possess an axoneme showing 9 peripheral doublets and 2 central singlets (9+2 pattern)."
      },
      {
        id: 4,
        question: "Histone proteins present in eukaryotic chromatin are rich in basic amino acids:",
        options: ["Lysine and Arginine", "Valine and Leucine", "Alanine and Glycine", "Glutamic acid and Aspartic acid"],
        correctOptionIndex: 0,
        explanation: "Histones carry positive charges due to abundance of basic amino acid residues Lysine and Arginine, allowing tight binding to negatively charged DNA."
      },
      {
        id: 5,
        question: "Fluid Mosaic Model of cell membrane was proposed by Singer and Nicolson in:",
        options: ["1972", "1950", "1985", "1960"],
        correctOptionIndex: 0,
        explanation: "Singer and Nicolson proposed the widely accepted Fluid Mosaic Model of plasma membrane structure in 1972."
      }
    ]
  },
  {
    id: "c11-phy-thermo",
    title: "Class 11 Physics: Thermodynamics & KTG",
    subject: "physics",
    classLevel: "11",
    chapter: "Thermodynamics & KTG",
    questionsCount: 5,
    durationMinutes: 15,
    difficulty: "Advanced",
    examTrack: "BOTH",
    questions: [
      {
        id: 1,
        question: "Efficiency of a Carnot engine working between temperatures 127°C and 27°C is:",
        options: ["25%", "33%", "50%", "75%"],
        correctOptionIndex: 0,
        explanation: "T₁ = 127 + 273 = 400 K, T₂ = 27 + 273 = 300 K. η = 1 - T₂/T₁ = 1 - 300/400 = 1/4 = 25%."
      },
      {
        id: 2,
        question: "For an ideal diatomic gas, the molar specific heat capacity at constant volume C_v is:",
        options: ["(5/2) R", "(3/2) R", "(7/2) R", "3 R"],
        correctOptionIndex: 0,
        explanation: "Diatomic gas has 5 degrees of freedom at room temperature. C_v = (f/2) R = (5/2) R."
      },
      {
        id: 3,
        question: "In an adiabatic expansion of an ideal gas, the relationship between Pressure P and Volume V is given by (γ = C_p/C_v):",
        options: ["P V^γ = constant", "P V = constant", "P/V = constant", "T V^γ = constant"],
        correctOptionIndex: 0,
        explanation: "The equation of state for a reversible adiabatic process is P V^γ = constant."
      },
      {
        id: 4,
        question: "The root mean square (rms) speed of gas molecules of mass m at temperature T is proportional to:",
        options: ["√T", "T", "T²", "1/√T"],
        correctOptionIndex: 0,
        explanation: "v_rms = √(3RT/M), which is directly proportional to √T."
      },
      {
        id: 5,
        question: "Work done by an ideal gas in an isothermal expansion from volume V to 2V at temperature T is:",
        options: ["n R T ln(2)", "n R T", "zero", "2 n R T"],
        correctOptionIndex: 0,
        explanation: "W = n R T ln(V₂/V₁) = n R T ln(2V/V) = n R T ln(2)."
      }
    ]
  },
  {
    id: "c11-chem-goc",
    title: "Class 11 Chemistry: Organic Chemistry & Reaction Effects",
    subject: "chemistry",
    classLevel: "11",
    chapter: "General Organic Chemistry",
    questionsCount: 5,
    durationMinutes: 15,
    difficulty: "High Yield",
    examTrack: "BOTH",
    questions: [
      {
        id: 1,
        question: "Which of the following carbocations is the most stable?",
        options: ["(CH₃)₃C⁺", "(CH₃)₂CH⁺", "CH₃CH₂⁺", "CH₃⁺"],
        correctOptionIndex: 0,
        explanation: "Tertiary carbocation (CH₃)₃C⁺ has 9 hyperconjugative α-hydrogens and strong +I inductive effect from 3 methyl groups, making it the most stable."
      },
      {
        id: 2,
        question: "The IUPAC name of CH₃-CH(OH)-CH₂-COOH is:",
        options: ["3-Hydroxybutanoic acid", "2-Hydroxybutanoic acid", "3-Hydroxybutan-1-ol", "Butan-3-ol-1-oic acid"],
        correctOptionIndex: 0,
        explanation: "Principal functional group is -COOH (C1). C3 bears the -OH hydroxyl substituent. IUPAC name = 3-Hydroxybutanoic acid."
      },
      {
        id: 3,
        question: "Inductive effect involves complete transfer of:",
        options: ["Shift of σ-electrons along carbon chain", "Transfer of π-electrons", "Unshared lone pair electrons", "Protons"],
        correctOptionIndex: 0,
        explanation: "Inductive effect is a permanent displacement of σ-bonded electrons along a carbon chain due to electronegativity difference."
      },
      {
        id: 4,
        question: "Which of the following exhibits geometrical isomerism?",
        options: ["But-2-ene", "Propene", "Ethene", "2-Methylpropene"],
        correctOptionIndex: 0,
        explanation: "But-2-ene (CH₃-CH=CH-CH₃) has non-identical groups on both double-bonded carbons, exhibiting Cis and Trans isomers."
      },
      {
        id: 5,
        question: "Hyperconjugation involves delocalization of electrons of:",
        options: ["C-H σ bond of an alkyl group directly attached to unsaturated system", "Lone pair electrons", "C-C σ bonds", "Benzene ring π bonds"],
        correctOptionIndex: 0,
        explanation: "Hyperconjugation (Baker-Nathan effect) involves σ(C-H) → π* or empty p-orbital electron delocalization."
      }
    ]
  },
  {
    id: "c11-math-trig",
    title: "Class 11 Mathematics: Trigonometric Functions & Identities",
    subject: "mathematics",
    classLevel: "11",
    chapter: "Trigonometry & Formulas",
    questionsCount: 5,
    durationMinutes: 15,
    difficulty: "Moderate",
    examTrack: "JEE",
    questions: [
      {
        id: 1,
        question: "Value of sin(75°) is equal to:",
        options: ["(√6 + √2) / 4", "(√6 - √2) / 4", "(√3 + 1) / 2", "(√3 - 1) / 2"],
        correctOptionIndex: 0,
        explanation: "sin(75°) = sin(45° + 30°) = sin 45° cos 30° + cos 45° sin 30° = (1/√2)(√3/2) + (1/√2)(1/2) = (√3 + 1) / (2√2) = (√6 + √2) / 4."
      },
      {
        id: 2,
        question: "Maximum value of 3 sin x + 4 cos x is:",
        options: ["5", "7", "1", "25"],
        correctOptionIndex: 0,
        explanation: "Max value of a sin x + b cos x is √(a² + b²) = √(3² + 4²) = √(9 + 16) = 5."
      },
      {
        id: 3,
        question: "General solution of sin x = 1/2 is:",
        options: ["nπ + (-1)ⁿ (π/6)", "nπ + (π/6)", "2nπ ± (π/6)", "nπ"],
        correctOptionIndex: 0,
        explanation: "sin x = sin(π/6) ⇒ x = nπ + (-1)ⁿ (π/6), where n ∈ ℤ."
      },
      {
        id: 4,
        question: "Value of cos 20° cos 40° cos 80° is:",
        options: ["1 / 8", "1 / 4", "1 / 2", "1 / 16"],
        correctOptionIndex: 0,
        explanation: "Using product identity cos A cos 2A cos 4A = sin(2³ A) / (2³ sin A). For A = 20°: sin(80°) / (8 sin 20°) = sin(160°) / (8 sin 20°) = sin 20° / (8 sin 20°) = 1/8."
      },
      {
        id: 5,
        question: "If tan A = 1/2 and tan B = 1/3, then value of A + B is:",
        options: ["45° (π/4)", "30°", "60°", "90°"],
        correctOptionIndex: 0,
        explanation: "tan(A + B) = (tan A + tan B) / (1 - tan A tan B) = (1/2 + 1/3) / (1 - 1/6) = (5/6) / (5/6) = 1 ⇒ A + B = 45°."
      }
    ]
  },
  {
    id: "c11-bio-plant",
    title: "Class 11 Biology: Plant Physiology & Photosynthesis",
    subject: "biology",
    classLevel: "11",
    chapter: "Plant Physiology & Photosynthesis",
    questionsCount: 5,
    durationMinutes: 15,
    difficulty: "High Yield",
    examTrack: "NEET",
    questions: [
      {
        id: 1,
        question: "Primary CO₂ acceptor in C₄ plants is:",
        options: ["Phosphoenolpyruvate (PEP)", "RuBP", "OAA", "PGA"],
        correctOptionIndex: 0,
        explanation: "In C₄ plants, CO₂ is accepted in mesophyll cells by Phosphoenolpyruvate (PEP), catalyzed by PEP carboxylase."
      },
      {
        id: 2,
        question: "Kranz anatomy is a characteristic anatomical feature of leaves of:",
        options: ["C₄ plants (e.g. Maize, Sugarcane)", "C₃ plants (e.g. Wheat)", "CAM plants", "Hydrophytes"],
        correctOptionIndex: 0,
        explanation: "Kranz anatomy (bundle sheath cells arranged in wreath-like manner around vascular bundles) is unique to C₄ plants."
      },
      {
        id: 3,
        question: "The primary enzyme responsible for carbon fixation in C₃ cycle (Calvin Cycle) is:",
        options: ["RuBisCO", "PEP carboxylase", "Carbonic anhydrase", "ATP synthase"],
        correctOptionIndex: 0,
        explanation: "RuBisCO (Ribulose-1,5-bisphosphate carboxylase-oxygenase) fixes CO₂ onto RuBP during carboxylation phase of Calvin cycle."
      },
      {
        id: 4,
        question: "Oxygen released during photosynthesis originates from splitting of:",
        options: ["Water (H₂O)", "Carbon dioxide (CO₂)", "Glucose", "PGA"],
        correctOptionIndex: 0,
        explanation: "Photolysis of water at Photosystem II (PS II) releases O₂, H⁺ ions, and electrons."
      },
      {
        id: 5,
        question: "Plant hormone responsible for ripening of fruits is:",
        options: ["Ethylene", "Auxin", "Gibberellin", "Cytokinin"],
        correctOptionIndex: 0,
        explanation: "Ethylene (gaseous hormone) promotes fruit ripening and senescence."
      }
    ]
  },
  {
    id: "c11-phy-shm",
    title: "Class 11 Physics: Simple Harmonic Motion & Waves",
    subject: "physics",
    classLevel: "11",
    chapter: "Simple Harmonic Motion & Waves",
    questionsCount: 5,
    durationMinutes: 15,
    difficulty: "Moderate",
    examTrack: "BOTH",
    questions: [
      {
        id: 1,
        question: "Time period of a simple pendulum of length L is T. If length is quadrupled, new time period becomes:",
        options: ["2T", "4T", "T/2", "T"],
        correctOptionIndex: 0,
        explanation: "T = 2π √(L/g). T' = 2π √(4L/g) = 2 (2π √(L/g)) = 2T."
      },
      {
        id: 2,
        question: "A particle executes SHM with amplitude A. At what displacement from mean position is kinetic energy equal to potential energy?",
        options: ["A / √2", "A / 2", "A / √3", "A"],
        correctOptionIndex: 0,
        explanation: "KE = ½ m ω² (A² - x²), PE = ½ m ω² x². Setting KE = PE: A² - x² = x² ⇒ 2x² = A² ⇒ x = A / √2."
      },
      {
        id: 3,
        question: "Equation of a wave is y = 0.05 sin(200 t - 4 x). The velocity of the wave is:",
        options: ["50 m/s", "800 m/s", "200 m/s", "25 m/s"],
        correctOptionIndex: 0,
        explanation: "Wave equation format y = A sin(ω t - k x). Here ω = 200 rad/s and k = 4 rad/m. Wave velocity v = ω / k = 200 / 4 = 50 m/s."
      },
      {
        id: 4,
        question: "Fundamental frequency of an open organ pipe of length L is f. If one end is closed, fundamental frequency becomes:",
        options: ["f / 2", "2f", "f", "3f"],
        correctOptionIndex: 0,
        explanation: "Open pipe fundamental: f_open = v / (2L). Closed pipe fundamental: f_closed = v / (4L) = ½ (v / (2L)) = f / 2."
      },
      {
        id: 5,
        question: "Beats are produced by two sound sources of frequencies 256 Hz and 260 Hz. Number of beats heard per second is:",
        options: ["4", "2", "8", "1"],
        correctOptionIndex: 0,
        explanation: "Beat frequency f_beat = |f₁ - f₂| = |260 - 256| = 4 beats/s."
      }
    ]
  },

  // ==================== CLASS 12 TESTS (10 TESTS) ====================
  {
    id: "c12-phy-electrostatics",
    title: "Class 12 Physics: Electrostatics & Potential",
    subject: "physics",
    classLevel: "12",
    chapter: "Electrostatics & Capacitors",
    questionsCount: 5,
    durationMinutes: 15,
    difficulty: "High Yield",
    examTrack: "BOTH",
    questions: [
      {
        id: 1,
        question: "Electric field at a distance r from an infinitely long straight wire carrying uniform charge density λ is:",
        options: ["λ / (2π ε₀ r)", "λ / (4π ε₀ r²)", "2λ / (ε₀ r)", "λ r / (2π ε₀)"],
        correctOptionIndex: 0,
        explanation: "Using Gauss's Law: E (2π r L) = (λ L) / ε₀ ⇒ E = λ / (2π ε₀ r)."
      },
      {
        id: 2,
        question: "Two point charges +q and -q are separated by distance 2a. The electric potential at mid-point between them is:",
        options: ["Zero", "q / (2π ε₀ a)", "q / (4π ε₀ a²)", "2q / (4π ε₀ a)"],
        correctOptionIndex: 0,
        explanation: "Potential at midpoint: V = V₁ + V₂ = (1/4πε₀)(q/a) + (1/4πε₀)(-q/a) = 0."
      },
      {
        id: 3,
        question: "Work done in moving a charge of 5 C between two points having potential difference 12 V is:",
        options: ["60 J", "2.4 J", "17 J", "300 J"],
        correctOptionIndex: 0,
        explanation: "W = q ΔV = 5 × 12 = 60 Joules."
      },
      {
        id: 4,
        question: "Energy stored in a capacitor of capacitance C charged to potential V is:",
        options: ["½ C V²", "C V²", "½ C² V", "C / V²"],
        correctOptionIndex: 0,
        explanation: "Electrostatic potential energy stored in capacitor U = ½ C V² = ½ Q V = Q² / (2C)."
      },
      {
        id: 5,
        question: "SI unit of dielectric constant K is:",
        options: ["Dimensionless (No units)", "C²/N-m²", "F/m", "N/C"],
        correctOptionIndex: 0,
        explanation: "Dielectric constant K = ε / ε₀ is the ratio of two identical quantities, hence dimensionless."
      }
    ]
  },
  {
    id: "c12-phy-current",
    title: "Class 12 Physics: Current Electricity & Circuits",
    subject: "physics",
    classLevel: "12",
    chapter: "Current Electricity & Magnetism",
    questionsCount: 5,
    durationMinutes: 15,
    difficulty: "High Yield",
    examTrack: "BOTH",
    questions: [
      {
        id: 1,
        question: "Drift velocity v_d of electrons in a conductor is related to electric field E by:",
        options: ["v_d ∝ E", "v_d ∝ E²", "v_d ∝ 1/E", "v_d is independent of E"],
        correctOptionIndex: 0,
        explanation: "Drift velocity formula v_d = (e E τ) / m, directly proportional to E."
      },
      {
        id: 2,
        question: "Wheatstone bridge is most sensitive when all four resistance arms are:",
        options: ["Equal in magnitude", "Very high", "Very low", "Unequal"],
        correctOptionIndex: 0,
        explanation: "Maximum sensitivity of a Wheatstone bridge is achieved when all four resistors P, Q, R, S are nearly equal."
      },
      {
        id: 3,
        question: "Three resistors of 2 Ω, 3 Ω, and 6 Ω connected in parallel give equivalent resistance:",
        options: ["1 Ω", "11 Ω", "2 Ω", "0.5 Ω"],
        correctOptionIndex: 0,
        explanation: "1/R_eq = 1/2 + 1/3 + 1/6 = (3 + 2 + 1)/6 = 6/6 = 1 ⇒ R_eq = 1 Ω."
      },
      {
        id: 4,
        question: "Internal resistance of an ideal voltmeter is:",
        options: ["Infinite", "Zero", "100 Ω", "10,000 Ω"],
        correctOptionIndex: 0,
        explanation: "An ideal voltmeter has infinite resistance so it draws no current from the circuit."
      },
      {
        id: 5,
        question: "Kirchhoff's First Law (Junction Rule) is based on conservation of:",
        options: ["Charge", "Energy", "Momentum", "Mass"],
        correctOptionIndex: 0,
        explanation: "Junction rule (Σ I = 0) expresses conservation of electric charge."
      }
    ]
  },
  {
    id: "c12-chem-kinetics",
    title: "Class 12 Chemistry: Chemical Kinetics & Rates",
    subject: "chemistry",
    classLevel: "12",
    chapter: "Chemical Kinetics & Rates",
    questionsCount: 5,
    durationMinutes: 15,
    difficulty: "High Yield",
    examTrack: "BOTH",
    questions: [
      {
        id: 1,
        question: "Half-life of a first order reaction is independent of:",
        options: ["Initial concentration of reactant", "Temperature", "Rate constant", "Catalyst"],
        correctOptionIndex: 0,
        explanation: "For 1st order reaction, t_{1/2} = 0.693 / k, which is independent of initial concentration."
      },
      {
        id: 2,
        question: "Unit of rate constant for a second-order reaction is:",
        options: ["mol⁻¹ L s⁻¹", "s⁻¹", "mol L⁻¹ s⁻¹", "mol⁻² L² s⁻¹"],
        correctOptionIndex: 0,
        explanation: "General unit for nth order k is (mol/L)^(1-n) s⁻¹. For n = 2: (mol L⁻¹)⁻¹ s⁻¹ = L mol⁻¹ s⁻¹."
      },
      {
        id: 3,
        question: "Arrhenius equation showing temperature dependence of rate constant is:",
        options: ["k = A e^(-E_a / RT)", "k = A e^(E_a / RT)", "k = A / (RT)", "k = A ln(E_a)"],
        correctOptionIndex: 0,
        explanation: "Arrhenius formula k = A exp(-E_a / RT), where E_a is activation energy."
      },
      {
        id: 4,
        question: "A catalyst increases the rate of reaction by:",
        options: ["Decreasing activation energy", "Increasing activation energy", "Increasing enthalpy ΔH", "Decreasing temperature"],
        correctOptionIndex: 0,
        explanation: "A catalyst provides an alternate reaction pathway with lower activation energy."
      },
      {
        id: 5,
        question: "If rate law is Rate = k [A]² [B], overall order of reaction is:",
        options: ["3", "2", "1", "0"],
        correctOptionIndex: 0,
        explanation: "Overall order = sum of exponents = 2 + 1 = 3 (Third order)."
      }
    ]
  },
  {
    id: "c12-chem-coordination",
    title: "Class 12 Chemistry: Coordination Compounds & Isomerism",
    subject: "chemistry",
    classLevel: "12",
    chapter: "Coordination Compounds",
    questionsCount: 5,
    durationMinutes: 15,
    difficulty: "Moderate",
    examTrack: "BOTH",
    questions: [
      {
        id: 1,
        question: "IUPAC name of complex [Co(NH₃)₆]Cl₃ is:",
        options: ["Hexaamminecobalt(III) chloride", "Hexaamminecobalt(II) chloride", "Cobalt hexaammine chloride", "Hexaamminecobaltic chloride"],
        correctOptionIndex: 0,
        explanation: "Complex cation: Co is in +3 oxidation state [x + 0 = +3]. Cation named first: Hexaamminecobalt(III), followed by anion: chloride."
      },
      {
        id: 2,
        question: "Which of the following ligands is a bidentate ligand?",
        options: ["Oxalate ion (C₂O₄²⁻)", "Ammonia (NH₃)", "Water (H₂O)", "Cyanide ion (CN⁻)"],
        correctOptionIndex: 0,
        explanation: "Oxalate ion C₂O₄²⁻ (ox) coordinates via two oxygen donor atoms, making it bidentate."
      },
      {
        id: 3,
        question: "Hybridization and geometry of [Ni(CN)₄]²⁻ complex are:",
        options: ["dsp², Square planar", "sp³, Tetrahedral", "sp³d², Octahedral", "d²sp³, Octahedral"],
        correctOptionIndex: 0,
        explanation: "CN⁻ is a strong field ligand causing pairing of d-electrons in Ni²⁺ (3d⁸). Hybridization = dsp², geometry = Square Planar (diamagnetic)."
      },
      {
        id: 4,
        question: "Coordination number of Fe in [Fe(EDTA)]⁻ complex is:",
        options: ["6", "4", "2", "8"],
        correctOptionIndex: 0,
        explanation: "EDTA⁴⁻ is a hexadentate ligand possessing 6 donor atoms (2 Nitrogen + 4 Oxygen), so coordination number of Fe is 6."
      },
      {
        id: 5,
        question: "Which type of isomerism is shown by [Co(NH₃)₅(SO₄)]Br and [Co(NH₃)₅Br]SO₄?",
        options: ["Ionization isomerism", "Linkage isomerism", "Coordination isomerism", "Hydrate isomerism"],
        correctOptionIndex: 0,
        explanation: "Ionization isomers yield different ions in solution upon dissociation (Br⁻ vs SO₄²⁻)."
      }
    ]
  },
  {
    id: "c12-math-calculus",
    title: "Class 12 Mathematics: Differential Calculus & Derivatives",
    subject: "mathematics",
    classLevel: "12",
    chapter: "Differential Calculus",
    questionsCount: 5,
    durationMinutes: 15,
    difficulty: "Advanced",
    examTrack: "JEE",
    questions: [
      {
        id: 1,
        question: "Derivative of e^(x²) with respect to x is:",
        options: ["2x e^(x²)", "e^(x²)", "x e^(x²)", "2e^(x²)"],
        correctOptionIndex: 0,
        explanation: "Using Chain Rule: d/dx [e^(x²)] = e^(x²) × d/dx [x²] = 2x e^(x²)."
      },
      {
        id: 2,
        question: "If y = ln(sin x), then dy/dx is:",
        options: ["cot x", "tan x", "cos x", "1 / sin x"],
        correctOptionIndex: 0,
        explanation: "dy/dx = (1 / sin x) × cos x = cot x."
      },
      {
        id: 3,
        question: "The slope of tangent to the curve y = x³ - x at x = 2 is:",
        options: ["11", "6", "12", "8"],
        correctOptionIndex: 0,
        explanation: "dy/dx = 3x² - 1. At x = 2: Slope = 3(2²) - 1 = 3(4) - 1 = 11."
      },
      {
        id: 4,
        question: "Maximum value of function f(x) = x(1 - x) on interval [0, 1] occurs at x equal to:",
        options: ["1 / 2", "1 / 4", "1", "0"],
        correctOptionIndex: 0,
        explanation: "f(x) = x - x². f'(x) = 1 - 2x = 0 ⇒ x = 1/2. f''(x) = -2 < 0 (Maximum at x = 1/2)."
      },
      {
        id: 5,
        question: "If f(x) = |x|, then derivative f'(0) is:",
        options: ["Does not exist", "0", "1", "-1"],
        correctOptionIndex: 0,
        explanation: "Left-hand derivative at 0 is -1, Right-hand derivative at 0 is +1. Since LHD ≠ RHD, f'(0) does not exist."
      }
    ]
  },
  {
    id: "c12-bio-genetics",
    title: "Class 12 Biology: Genetics & Molecular Inheritance",
    subject: "biology",
    classLevel: "12",
    chapter: "Genetics & Inheritance",
    questionsCount: 5,
    durationMinutes: 15,
    difficulty: "High Yield",
    examTrack: "NEET",
    questions: [
      {
        id: 1,
        question: "Mendelian dihybrid cross phenotypic ratio in F₂ generation is:",
        options: ["9 : 3 : 3 : 1", "3 : 1", "1 : 2 : 1", "9 : 7"],
        correctOptionIndex: 0,
        explanation: "Mendel's dihybrid cross yields a phenotypic ratio of 9 (Dominant-Dominant) : 3 (Dominant-Recessive) : 3 (Recessive-Dominant) : 1 (Recessive-Recessive)."
      },
      {
        id: 2,
        question: "The enzyme that unwinds DNA double helix during replication is:",
        options: ["DNA Helicase", "DNA Polymerase", "DNA Ligase", "RNA Primase"],
        correctOptionIndex: 0,
        explanation: "Helicase unwinds and separates parental DNA strands by breaking hydrogen bonds."
      },
      {
        id: 3,
        question: "Initiation codon that codes for Methionine during translation is:",
        options: ["AUG", "UAA", "UAG", "UGA"],
        correctOptionIndex: 0,
        explanation: "AUG is universal initiation codon coding for Methionine in eukaryotes."
      },
      {
        id: 4,
        question: "Human ABO blood grouping is an example of:",
        options: ["Multiple allelism and Co-dominance", "Incomplete dominance", "Polygenic inheritance", "Pleiotropy"],
        correctOptionIndex: 0,
        explanation: "ABO blood group is governed by gene I with 3 alleles (Iᴬ, Iᴮ, i) showing Multiple Allelism and Co-dominance."
      },
      {
        id: 5,
        question: "Haemophilia is a genetic disorder inherited as:",
        options: ["Sex-linked recessive disorder", "Autosomal dominant disorder", "Autosomal recessive disorder", "Sex-linked dominant disorder"],
        correctOptionIndex: 0,
        explanation: "Haemophilia is an X-linked sex-linked recessive blood-clotting disorder."
      }
    ]
  },
  {
    id: "c12-phy-optics",
    title: "Class 12 Physics: Ray & Wave Optics",
    subject: "physics",
    classLevel: "12",
    chapter: "Ray & Wave Optics",
    questionsCount: 5,
    durationMinutes: 15,
    difficulty: "High Yield",
    examTrack: "BOTH",
    questions: [
      {
        id: 1,
        question: "Focal length of a convex lens of power +4 D is:",
        options: ["25 cm", "50 cm", "100 cm", "10 cm"],
        correctOptionIndex: 0,
        explanation: "Power P = 1 / f(in meters). f = 1 / +4 = 0.25 m = 25 cm."
      },
      {
        id: 2,
        question: "Critical angle for total internal reflection from glass (μ = 1.5) to air is approx:",
        options: ["41.8°", "30°", "45°", "60°"],
        correctOptionIndex: 0,
        explanation: "sin i_c = 1 / μ = 1 / 1.5 = 2 / 3 ≈ 0.6667 ⇒ i_c = sin⁻¹(0.6667) ≈ 41.8°."
      },
      {
        id: 3,
        question: "Phenomenon proving transverse nature of light waves is:",
        options: ["Polarization", "Interference", "Diffraction", "Refraction"],
        correctOptionIndex: 0,
        explanation: "Polarization occurs only in transverse waves, proving light is a transverse wave."
      },
      {
        id: 4,
        question: "A astronomical telescope has objective of focal length 100 cm and eyepiece of focal length 5 cm. Magnifying power in normal adjustment is:",
        options: ["20", "500", "105", "95"],
        correctOptionIndex: 0,
        explanation: "Magnifying power m = f_o / f_e = 100 / 5 = 20."
      },
      {
        id: 5,
        question: "Diffraction of light is observed when obstacle size is:",
        options: ["Comparable to wavelength of light", "Much larger than wavelength", "Infinitely large", "Zero"],
        correctOptionIndex: 0,
        explanation: "Noticeable diffraction occurs when aperture/obstacle size is comparable to wavelength λ."
      }
    ]
  },
  {
    id: "c12-chem-organic-reactions",
    title: "Class 12 Chemistry: Haloalkanes, Amines & Polymers",
    subject: "chemistry",
    classLevel: "12",
    chapter: "Organic Chemistry 12th",
    questionsCount: 5,
    durationMinutes: 15,
    difficulty: "Moderate",
    examTrack: "BOTH",
    questions: [
      {
        id: 1,
        question: "Primary aromatic amines on reaction with nitrous acid (HNO₂ + HCl) at 0-5°C form:",
        options: ["Diazonium salts", "Phenols", "Nitrobenzene", "Aniline"],
        correctOptionIndex: 0,
        explanation: "Diazotization reaction: Ar-NH₂ + HNO₂ + HCl (0-5°C) → Ar-N₂⁺ Cl⁻ + 2 H₂O."
      },
      {
        id: 2,
        question: "Hofmann bromamide degradation reaction converts primary amides into:",
        options: ["Primary amines with one less carbon atom", "Secondary amines", "Nitriles", "Carboxylic acids"],
        correctOptionIndex: 0,
        explanation: "R-CONH₂ + Br₂ + 4 NaOH → R-NH₂ + Na₂CO₃ + 2 NaBr + 2 H₂O (carbon chain shortened by 1)."
      },
      {
        id: 3,
        question: "Reaction of alkyl halides with sodium metal in dry ether to form alkanes is known as:",
        options: ["Wurtz reaction", "Fittig reaction", "Kolbe reaction", "Reimer-Tiemann reaction"],
        correctOptionIndex: 0,
        explanation: "2 R-X + 2 Na (dry ether) → R-R + 2 NaX is the Wurtz reaction."
      },
      {
        id: 4,
        question: "S_N2 reaction proceeds with complete:",
        options: ["Inversion of configuration (Walden inversion)", "Retention of configuration", "Racemization", "No change"],
        correctOptionIndex: 0,
        explanation: "S_N2 is a single-step backside nucleophilic attack producing 100% inversion of stereochemical configuration."
      },
      {
        id: 5,
        question: "Which test is used to distinguish primary amines from secondary and tertiary amines?",
        options: ["Carbylamine test", "Lucas test", "Tollens test", "Iodoform test"],
        correctOptionIndex: 0,
        explanation: "Carbylamine test (CHCl₃ + KOH) is given only by 1° aliphatic/aromatic amines forming foul-smelling isocyanides."
      }
    ]
  },
  {
    id: "c12-math-integration",
    title: "Class 12 Mathematics: Integrals & Differential Equations",
    subject: "mathematics",
    classLevel: "12",
    chapter: "Integral Calculus",
    questionsCount: 5,
    durationMinutes: 15,
    difficulty: "Advanced",
    examTrack: "JEE",
    questions: [
      {
        id: 1,
        question: "∫ (1 / x) dx is equal to:",
        options: ["ln|x| + C", "-1/x² + C", "x² / 2 + C", "e^x + C"],
        correctOptionIndex: 0,
        explanation: "Indefinite integral of 1/x is natural logarithm ln|x| + C."
      },
      {
        id: 2,
        question: "Value of ∫₀¹ x e^x dx is:",
        options: ["1", "e", "e - 1", "2e"],
        correctOptionIndex: 0,
        explanation: "Integration by parts: ∫ x e^x dx = x e^x - ∫ e^x dx = x e^x - e^x. Evaluated [x e^x - e^x]₀¹ = (1 e¹ - e¹) - (0 - e⁰) = 0 - (-1) = 1."
      },
      {
        id: 3,
        question: "Order and degree of differential equation (d²y/dx²)³ + (dy/dx)² + y = 0 are:",
        options: ["Order 2, Degree 3", "Order 3, Degree 2", "Order 2, Degree 2", "Order 1, Degree 3"],
        correctOptionIndex: 0,
        explanation: "Highest order derivative is d²y/dx² (Order = 2). Exponent of highest derivative is 3 (Degree = 3)."
      },
      {
        id: 4,
        question: "Integrating factor (I.F.) of linear differential equation dy/dx + P(x) y = Q(x) is:",
        options: ["e^(∫ P dx)", "e^(∫ Q dx)", "∫ P dx", "ln(P)"],
        correctOptionIndex: 0,
        explanation: "Integrating factor for 1st order linear differential equation is I.F. = exp(∫ P(x) dx)."
      },
      {
        id: 5,
        question: "∫ sec² x dx is equal to:",
        options: ["tan x + C", "sec x + C", "-cot x + C", "ln|sec x| + C"],
        correctOptionIndex: 0,
        explanation: "d/dx (tan x) = sec² x, hence ∫ sec² x dx = tan x + C."
      }
    ]
  },
  {
    id: "c12-bio-biotech",
    title: "Class 12 Biology: Biotechnology & Ecology",
    subject: "biology",
    classLevel: "12",
    chapter: "Biotechnology & Ecology",
    questionsCount: 5,
    durationMinutes: 15,
    difficulty: "High Yield",
    examTrack: "NEET",
    questions: [
      {
        id: 1,
        question: "Restriction enzymes ('Molecular Scissors') cut DNA at specific palindromic sequences by cleaving:",
        options: ["Phosphodiester bonds", "Hydrogen bonds", "Glycosidic bonds", "Peptide bonds"],
        correctOptionIndex: 0,
        explanation: "Restriction endonucleases cleave phosphodiester backbone of DNA double helix."
      },
      {
        id: 2,
        question: "Polymerase Chain Reaction (PCR) technique was developed by:",
        options: ["Kary Mullis", "Paul Berg", "Stanley Cohen", "Alec Jeffreys"],
        correctOptionIndex: 0,
        explanation: "Kary Mullis invented PCR in 1983 for amplifying target DNA sequences, earning Nobel Prize."
      },
      {
        id: 3,
        question: "Thermostable DNA Polymerase used in PCR is Taq Polymerase, isolated from bacteria:",
        options: ["Thermus aquaticus", "Escherichia coli", "Agrobacterium tumefaciens", "Bacillus thuringiensis"],
        correctOptionIndex: 0,
        explanation: "Taq polymerase is extracted from thermophilic bacterium Thermus aquaticus."
      },
      {
        id: 4,
        question: "First transgenic crop produced commercially was:",
        options: ["Flavr Savr Tomato / Tobacco", "Bt Cotton", "Golden Rice", "Bt Brinjal"],
        correctOptionIndex: 0,
        explanation: "Transgenic tobacco / Flavr Savr tomato with delayed ripening were early commercial GM crops."
      },
      {
        id: 5,
        question: "Which ecological pyramid is ALWAYS upright in all ecosystems?",
        options: ["Pyramid of Energy", "Pyramid of Biomass", "Pyramid of Numbers", "Pyramid of Height"],
        correctOptionIndex: 0,
        explanation: "Pyramid of Energy is always upright because energy is lost as heat at each trophic level (10% law)."
      }
    ]
  }
];
