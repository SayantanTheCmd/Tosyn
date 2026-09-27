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
    questionsCount: 15,
    durationMinutes: 45,
    difficulty: "High Yield",
    examTrack: "BOTH",
    questions: [
      {
        id: 1,
        question: "A ball is dropped from a height H. At the same instant, another ball is thrown upwards with velocity U. They meet at a height H/2. The initial velocity U of the second ball is:",
        options: ["√(gH)", "√(2gH)", "2√(gH)", "√(gH/2)"],
        correctOptionIndex: 0,
        explanation: "Time for 1st ball: H/2 = ½ gt² ⇒ t = √(H/g). Distance for 2nd ball: H/2 = U t - ½ gt² = U √(H/g) - H/2 ⇒ U √(H/g) = H ⇒ U = √(gH)."
      },
      {
        id: 2,
        question: "A projectile is fired at an angle of 45° to the horizontal. If the radius of curvature of its trajectory at the highest point is R, the initial velocity is:",
        options: ["√(2gR)", "√(gR)", "2√(gR)", "√(gR/2)"],
        correctOptionIndex: 0,
        explanation: "At highest point v = u cos 45° = u/√2. Centripetal acceleration is g. R = v²/g = (u²/2)/g ⇒ u = √(2gR)."
      },
      {
        id: 3,
        question: "A particle moves along x-axis such that x = 3t² - 12t + 5 (in meters). The speed of the particle at t = 3 seconds is:",
        options: ["6 m/s", "12 m/s", "0 m/s", "18 m/s"],
        correctOptionIndex: 0,
        explanation: "v = dx/dt = 6t - 12. At t = 3 s: v = 6(3) - 12 = 6 m/s."
      },
      {
        id: 4,
        question: "Angle of projection for which horizontal range and maximum height are equal is:",
        options: ["tan⁻¹(4)", "45°", "60°", "tan⁻¹(2)"],
        correctOptionIndex: 0,
        explanation: "Range R = 2u² sin θ cos θ / g. H = u² sin² θ / (2g). R = H ⇒ 2 sin θ cos θ = sin² θ / 2 ⇒ tan θ = 4 ⇒ θ = tan⁻¹(4)."
      },
      {
        id: 5,
        question: "A car accelerates from rest at 2 m/s² for 10 s and then decelerates at 1 m/s² until it stops. Total distance traveled is:",
        options: ["300 m", "200 m", "150 m", "400 m"],
        correctOptionIndex: 0,
        explanation: "v_max = 20 m/s. s₁ = ½(2)(10²) = 100 m. Deceleration s₂ = 20² / (2×1) = 200 m. Total = 100 + 200 = 300 m."
      },
      {
        id: 6,
        question: "Displacement x of a particle varies with time as x = a e^(-α t) + b e^(β t). Its velocity will:",
        options: ["Go on increasing with time", "Go on decreasing with time", "Be independent of time", "Be zero at t = 0"],
        correctOptionIndex: 0,
        explanation: "v = dx/dt = -a α e^(-α t) + b β e^(β t). Acceleration a_acc = d²x/dt² = a α² e^(-α t) + b β² e^(β t) > 0 for all t, so velocity increases."
      },
      {
        id: 7,
        question: "Ratio of numerical values of average velocity to average speed of a body is always:",
        options: ["Equal to or less than 1", "Equal to or greater than 1", "Equal to 1", "Less than 1"],
        correctOptionIndex: 0,
        explanation: "Displacement ≤ Distance. Hence |Average Velocity| / Average Speed ≤ 1."
      },
      {
        id: 8,
        question: "A person travels first half distance with speed v₁ and second half with speed v₂. Average speed is:",
        options: ["2 v₁ v₂ / (v₁ + v₂)", "(v₁ + v₂) / 2", "√(v₁ v₂)", "(v₁² + v₂²) / (v₁ + v₂)"],
        correctOptionIndex: 0,
        explanation: "v_avg = Total Distance / Total Time = S / ( (S/2)/v₁ + (S/2)/v₂ ) = 2 v₁ v₂ / (v₁ + v₂)."
      },
      {
        id: 9,
        question: "Two vectors A and B have equal magnitudes M. If magnitude of (A + B) is M, angle between them is:",
        options: ["120°", "60°", "90°", "180°"],
        correctOptionIndex: 0,
        explanation: "|A + B|² = A² + B² + 2 A B cos θ ⇒ M² = M² + M² + 2 M² cos θ ⇒ 2 M² cos θ = -M² ⇒ cos θ = -1/2 ⇒ θ = 120°."
      },
      {
        id: 10,
        question: "Time of flight of a projectile is 10 seconds and range is 500 m. Maximum height reached is (g = 10 m/s²):",
        options: ["125 m", "250 m", "500 m", "62.5 m"],
        correctOptionIndex: 0,
        explanation: "T = 2 u_y / g = 10 ⇒ u_y = 50 m/s. H = u_y² / (2g) = 50² / 20 = 2500 / 20 = 125 m."
      },
      {
        id: 11,
        question: "Position vector of a particle is r = (3t i + 2t² j) m. The magnitude of acceleration of particle at t = 2 s is:",
        options: ["4 m/s²", "3 m/s²", "5 m/s²", "2 m/s²"],
        correctOptionIndex: 0,
        explanation: "v = dr/dt = 3 i + 4t j. a = dv/dt = 0 i + 4 j m/s². Magnitude = 4 m/s²."
      },
      {
        id: 12,
        question: "A stone tied to a string of length 1 m is whirled in a horizontal circle at constant speed 4 m/s. Centripetal acceleration is:",
        options: ["16 m/s²", "4 m/s²", "8 m/s²", "2 m/s²"],
        correctOptionIndex: 0,
        explanation: "a_c = v² / r = 4² / 1 = 16 m/s²."
      },
      {
        id: 13,
        question: "A swimmer can swim with speed 4 km/h in still water. He crosses a river 1 km wide flowing at 3 km/h in shortest time. Time taken is:",
        options: ["15 minutes", "20 minutes", "12 minutes", "30 minutes"],
        correctOptionIndex: 0,
        explanation: "Shortest time = Width / v_swimmer = 1 / 4 hour = 15 minutes."
      },
      {
        id: 14,
        question: "Angle between velocity and acceleration at highest point of projectile motion is:",
        options: ["90°", "0°", "180°", "45°"],
        correctOptionIndex: 0,
        explanation: "At highest point, velocity is horizontal (u cos θ i) and acceleration is downward (-g j), making an angle of 90°."
      },
      {
        id: 15,
        question: "A body starts from rest with uniform acceleration. Ratio of distances covered in 1st, 2nd, and 3rd seconds is:",
        options: ["1 : 3 : 5", "1 : 2 : 3", "1 : 4 : 9", "1 : 1 : 1"],
        correctOptionIndex: 0,
        explanation: "Distance in nth second s_n = u + ½ a (2n - 1) = ½ a (2n - 1). Ratio s₁ : s₂ : s₃ = 1 : 3 : 5."
      }
    ]
  },
  {
    id: "c11-phy-nlms",
    title: "Class 11 Physics: Laws of Motion & Friction",
    subject: "physics",
    classLevel: "11",
    chapter: "Laws of Motion & Friction",
    questionsCount: 15,
    durationMinutes: 45,
    difficulty: "Moderate",
    examTrack: "BOTH",
    questions: [
      {
        id: 1,
        question: "Block of mass 2 kg rests on rough horizontal surface (μ = 0.4). Horizontal force of 6 N is applied. Frictional force is (g = 10 m/s²):",
        options: ["6 N", "8 N", "4 N", "0 N"],
        correctOptionIndex: 0,
        explanation: "f_lim = μ N = 0.4 × 20 = 8 N. Applied force 6 N < 8 N ⇒ friction = 6 N."
      },
      {
        id: 2,
        question: "Two blocks 4 kg and 6 kg connected by string rest on smooth surface. Pulling force 20 N acts on 6 kg block. Tension in string is:",
        options: ["8 N", "12 N", "10 N", "4 N"],
        correctOptionIndex: 0,
        explanation: "a = 20 / 10 = 2 m/s². Tension T = 4 × 2 = 8 N."
      },
      {
        id: 3,
        question: "Lift of mass 1000 kg accelerates upwards at 2 m/s². Tension in cable is (g = 9.8 m/s²):",
        options: ["11800 N", "9800 N", "7800 N", "12000 N"],
        correctOptionIndex: 0,
        explanation: "T = m(g + a) = 1000 × 11.8 = 11800 N."
      },
      {
        id: 4,
        question: "Mass 5 kg suspended by two strings at 30° and 60° with vertical. Tension in string at 30° with vertical is (g = 10 m/s²):",
        options: ["25√3 N", "25 N", "50 N", "50√3 N"],
        correctOptionIndex: 0,
        explanation: "T₁ cos 30° + T₂ cos 60° = 50 N. Resolving gives T₁ = 25√3 N."
      },
      {
        id: 5,
        question: "Banking angle for road radius 50 m to negotiate speed 10 m/s without friction is (g = 10 m/s²):",
        options: ["tan⁻¹(0.2)", "tan⁻¹(0.5)", "30°", "45°"],
        correctOptionIndex: 0,
        explanation: "tan θ = v² / (rg) = 100 / 500 = 0.2 ⇒ θ = tan⁻¹(0.2)."
      },
      {
        id: 6,
        question: "Impulse imparted by a force of 10 N acting on a body for 0.1 seconds is:",
        options: ["1 N·s", "10 N·s", "100 N·s", "0.1 N·s"],
        correctOptionIndex: 0,
        explanation: "Impulse I = F × Δt = 10 × 0.1 = 1 N·s."
      },
      {
        id: 7,
        question: "Recoil velocity of a gun of mass 4 kg firing a bullet of mass 20 g at 400 m/s is:",
        options: ["-2 m/s", "-4 m/s", "-1 m/s", "-0.5 m/s"],
        correctOptionIndex: 0,
        explanation: "Conservation of momentum: M V + m v = 0 ⇒ 4 V + (0.02)(400) = 0 ⇒ 4 V + 8 = 0 ⇒ V = -2 m/s."
      },
      {
        id: 8,
        question: "A ball of mass 0.2 kg strikes a wall normally at 10 m/s and rebounds at same speed. Change in momentum is:",
        options: ["-4 kg m/s", "-2 kg m/s", "0", "-8 kg m/s"],
        correctOptionIndex: 0,
        explanation: "Δp = m v_final - m v_initial = (0.2)(-10) - (0.2)(10) = -2 - 2 = -4 kg m/s."
      },
      {
        id: 9,
        question: "Maximum angle of incline θ for a block to remain at rest on an inclined plane with friction coefficient μ is:",
        options: ["θ = tan⁻¹(μ)", "θ = sin⁻¹(μ)", "θ = cos⁻¹(μ)", "θ = cot⁻¹(μ)"],
        correctOptionIndex: 0,
        explanation: "Angle of repose θ = tan⁻¹(μ)."
      },
      {
        id: 10,
        question: "A monkey of mass 20 kg climbs up a light rope attached to a tree branch. Maximum tension rope can withstand is 250 N. Max acceleration is (g = 10 m/s²):",
        options: ["2.5 m/s²", "5 m/s²", "1.25 m/s²", "10 m/s²"],
        correctOptionIndex: 0,
        explanation: "T_max = m(g + a) ⇒ 250 = 20(10 + a) ⇒ 12.5 = 10 + a ⇒ a = 2.5 m/s²."
      },
      {
        id: 11,
        question: "Coefficient of static friction between two surfaces depends on:",
        options: ["Nature of surfaces in contact", "Area of contact", "Normal reaction", "Speed"],
        correctOptionIndex: 0,
        explanation: "Friction coefficient μ depends only on material roughness and nature of contacting surfaces."
      },
      {
        id: 12,
        question: "A rocket of initial mass 1000 kg burns fuel at rate 10 kg/s with exhaust velocity 50 m/s. Initial thrust force is:",
        options: ["500 N", "1000 N", "5000 N", "100 N"],
        correctOptionIndex: 0,
        explanation: "Thrust F = v_rel (dm/dt) = 50 × 10 = 500 N."
      },
      {
        id: 13,
        question: "Action and Reaction forces according to Newton's Third Law:",
        options: ["Act on two different bodies", "Act on same body", "Cancel each other", "Act along different lines"],
        correctOptionIndex: 0,
        explanation: "Action and reaction forces act simultaneously on different interacting bodies."
      },
      {
        id: 14,
        question: "A block slides down an inclined plane of 45° with acceleration g / (2√2). Coefficient of kinetic friction μ_k is:",
        options: ["0.5", "0.25", "0.75", "0.1"],
        correctOptionIndex: 0,
        explanation: "a = g(sin θ - μ_k cos θ) ⇒ g / (2√2) = g(1/√2 - μ_k / √2) ⇒ 1/2 = 1 - μ_k ⇒ μ_k = 0.5."
      },
      {
        id: 15,
        question: "Centripetal force on a car of mass m traveling on a circular flat track of radius r at speed v is provided by:",
        options: ["Frictional force between tires and road", "Normal reaction", "Gravitational force", "Engine thrust"],
        correctOptionIndex: 0,
        explanation: "Static friction between car tires and road provides necessary centripetal force f_s = m v² / r."
      }
    ]
  },
  {
    id: "c11-chem-bonding",
    title: "Class 11 Chemistry: Chemical Bonding & Hybridization",
    subject: "chemistry",
    classLevel: "11",
    chapter: "Chemical Bonding & VSEPR",
    questionsCount: 15,
    durationMinutes: 45,
    difficulty: "High Yield",
    examTrack: "BOTH",
    questions: [
      {
        id: 1,
        question: "Shape and hybridization of PCl₅ in gas phase according to VSEPR theory are:",
        options: ["Trigonal bipyramidal, sp³d", "Square pyramidal, sp³d", "Octahedral, sp³d²", "Tetrahedral, sp³"],
        correctOptionIndex: 0,
        explanation: "5 bonding pairs, 0 lone pairs. Steric number = 5 (sp³d), Trigonal Bipyramidal shape."
      },
      {
        id: 2,
        question: "Which of the following molecules has non-zero dipole moment?",
        options: ["NH₃", "BF₃", "CCl₄", "CO₂"],
        correctOptionIndex: 0,
        explanation: "NH₃ is pyramidal with net dipole moment 1.47 D, whereas BF₃, CCl₄, and CO₂ are symmetric with zero dipole moment."
      },
      {
        id: 3,
        question: "Bond order of O₂⁺ ion according to Molecular Orbital Theory is:",
        options: ["2.5", "2.0", "1.5", "3.0"],
        correctOptionIndex: 0,
        explanation: "O₂⁺ has 15 electrons. Bond order = ½ (10 - 5) = 2.5."
      },
      {
        id: 4,
        question: "Compound exhibiting intramolecular hydrogen bonding is:",
        options: ["o-Nitrophenol", "p-Nitrophenol", "Water", "Ethanol"],
        correctOptionIndex: 0,
        explanation: "o-Nitrophenol forms a 6-membered chelate ring via intramolecular hydrogen bonding."
      },
      {
        id: 5,
        question: "Hybridization of Iodine in IF₇ is:",
        options: ["sp³d³", "sp³d²", "sp³d", "sp³"],
        correctOptionIndex: 0,
        explanation: "7 bonding pairs, 0 lone pairs. Steric number = 7 (sp³d³), Pentagonal Bipyramidal."
      },
      {
        id: 6,
        question: "Bond angle in H₂O molecule is approximately:",
        options: ["104.5°", "109.5°", "120°", "180°"],
        correctOptionIndex: 0,
        explanation: "H₂O has 2 bonding pairs and 2 lone pairs. Lone pair-lone pair repulsion reduces ideal tetrahedral angle 109.5° to 104.5°."
      },
      {
        id: 7,
        question: "Which species is paramagnetic?",
        options: ["O₂", "N₂", "CO", "CN⁻"],
        correctOptionIndex: 0,
        explanation: "O₂ has 2 unpaired electrons in degenerate antibonding π*2p orbitals, making it paramagnetic."
      },
      {
        id: 8,
        question: "Lattice energy of ionic crystals increases with:",
        options: ["Increased ionic charge and smaller ionic radii", "Decreased ionic charge", "Larger ionic radii", "Low electronegativity"],
        correctOptionIndex: 0,
        explanation: "Lattice energy U ∝ (q₁ q₂) / (r₊ + r₋). Higher charge and smaller ions increase lattice energy."
      },
      {
        id: 9,
        question: "The formal charge on central oxygen atom in Ozone (O₃) is:",
        options: ["+1", "0", "-1", "+2"],
        correctOptionIndex: 0,
        explanation: "Formal Charge = V - L - ½ B = 6 - 2 - ½(6) = 6 - 2 - 3 = +1."
      },
      {
        id: 10,
        question: "Hybridization of central carbon in carbon dioxide (CO₂) is:",
        options: ["sp", "sp²", "sp³", "sp³d"],
        correctOptionIndex: 0,
        explanation: "CO₂ has 2 σ bonds and 0 lone pairs on central C. Hybridization = sp (Linear geometry)."
      },
      {
        id: 11,
        question: "Resonance structures of a molecule have same:",
        options: ["Position of atomic nuclei and total electrons", "Energy", "Bond length", "Hybridization"],
        correctOptionIndex: 0,
        explanation: "Resonating structures differ only in electron distribution; atomic nuclear positions remain fixed."
      },
      {
        id: 12,
        question: "Maximum number of hydrogen bonds a single H₂O molecule can form is:",
        options: ["4", "2", "3", "6"],
        correctOptionIndex: 0,
        explanation: "Each H₂O forms 4 hydrogen bonds in ice structure (2 via lone pairs of Oxygen + 2 via Hydrogen atoms)."
      },
      {
        id: 13,
        question: "Shape of SF₄ molecule according to VSEPR theory is:",
        options: ["See-saw", "Tetrahedral", "Square planar", "Trigonal planar"],
        correctOptionIndex: 0,
        explanation: "SF₄ has 4 bonding pairs and 1 lone pair on Sulfur (Steric number 5, sp³d), resulting in a See-saw shape."
      },
      {
        id: 14,
        question: "Species having zero dipole moment is:",
        options: ["BF₃", "NF₃", "SO₂", "H₂S"],
        correctOptionIndex: 0,
        explanation: "BF₃ is trigonal planar (sp²), symmetrical with zero dipole moment."
      },
      {
        id: 15,
        question: "Bond length order among single, double, and triple carbon-carbon bonds is:",
        options: ["C-C > C=C > C≡C", "C≡C > C=C > C-C", "C=C > C-C > C≡C", "C-C > C≡C > C=C"],
        correctOptionIndex: 0,
        explanation: "Higher bond multiplicity increases electron density pulling nuclei closer: Single (1.54 Å) > Double (1.34 Å) > Triple (1.20 Å)."
      }
    ]
  },
  {
    id: "c11-math-quadratics",
    title: "Class 11 Mathematics: Quadratic Equations & Sequences",
    subject: "mathematics",
    classLevel: "11",
    chapter: "Quadratic Equations & Sequences",
    questionsCount: 15,
    durationMinutes: 45,
    difficulty: "Moderate",
    examTrack: "JEE",
    questions: [
      {
        id: 1,
        question: "If roots of equation x² - px + q = 0 differ by 1, then p² is equal to:",
        options: ["4q + 1", "4q - 1", "2q + 1", "q² + 1"],
        correctOptionIndex: 0,
        explanation: "(α - β)² = 1 ⇒ (α + β)² - 4αβ = 1 ⇒ p² - 4q = 1 ⇒ p² = 4q + 1."
      },
      {
        id: 2,
        question: "Sum to infinity of geometric progression 1 + 1/3 + 1/9 + 1/27 + ... is:",
        options: ["3 / 2", "2 / 3", "3", "2"],
        correctOptionIndex: 0,
        explanation: "S_∞ = a / (1 - r) = 1 / (1 - 1/3) = 3/2."
      },
      {
        id: 3,
        question: "If A and G are Arithmetic and Geometric Means of two positive numbers, the numbers are:",
        options: ["A ± √(A² - G²)", "A ± √(A² + G²)", "G ± √(A² - G²)", "A ± G"],
        correctOptionIndex: 0,
        explanation: "t² - 2At + G² = 0 ⇒ t = A ± √(A² - G²)."
      },
      {
        id: 4,
        question: "Number of real solutions of x² - 3|x| + 2 = 0 is:",
        options: ["4", "2", "3", "0"],
        correctOptionIndex: 0,
        explanation: "(|x| - 1)(|x| - 2) = 0 ⇒ |x| = 1 or 2 ⇒ x = ±1, ±2 (4 solutions)."
      },
      {
        id: 5,
        question: "The 10th term of AP 2, 7, 12, ... is:",
        options: ["47", "52", "42", "57"],
        correctOptionIndex: 0,
        explanation: "T₁₀ = 2 + 9(5) = 47."
      },
      {
        id: 6,
        question: "If roots of quadratic equation a x² + b x + c = 0 are equal, discriminant D is:",
        options: ["0", "> 0", "< 0", "1"],
        correctOptionIndex: 0,
        explanation: "D = b² - 4ac = 0 for real and equal roots."
      },
      {
        id: 7,
        question: "Sum of first n natural numbers is given by formula:",
        options: ["n(n + 1) / 2", "n(n - 1) / 2", "n²", "n(n + 1)(2n + 1) / 6"],
        correctOptionIndex: 0,
        explanation: "Σ n = n(n + 1) / 2."
      },
      {
        id: 8,
        question: "Common ratio of GP 3, 6, 12, 24, ... is:",
        options: ["2", "3", "1/2", "6"],
        correctOptionIndex: 0,
        explanation: "r = 6 / 3 = 2."
      },
      {
        id: 9,
        question: "If α and β are roots of x² - 5x + 6 = 0, value of α² + β² is:",
        options: ["13", "25", "12", "19"],
        correctOptionIndex: 0,
        explanation: "α + β = 5, αβ = 6. α² + β² = (α + β)² - 2αβ = 25 - 12 = 13."
      },
      {
        id: 10,
        question: "Minimum value of quadratic expression x² - 4x + 7 is:",
        options: ["3", "7", "4", "0"],
        correctOptionIndex: 0,
        explanation: "x² - 4x + 7 = (x - 2)² + 3. Minimum value occurs at x = 2, which is 3."
      },
      {
        id: 11,
        question: "If 3rd and 7th terms of an AP are 12 and 24, the common difference d is:",
        options: ["3", "4", "2", "6"],
        correctOptionIndex: 0,
        explanation: "T₇ - T₃ = 4d = 24 - 12 = 12 ⇒ d = 3."
      },
      {
        id: 12,
        question: "Harmonic Mean (HM) of two numbers 4 and 16 is:",
        options: ["6.4", "10", "8", "5"],
        correctOptionIndex: 0,
        explanation: "HM = 2 ab / (a + b) = 2(4)(16) / (4 + 16) = 128 / 20 = 6.4."
      },
      {
        id: 13,
        question: "If α, β are roots of x² + x + 1 = 0, value of α³ is:",
        options: ["1", "-1", "i", "0"],
        correctOptionIndex: 0,
        explanation: "Roots are complex cube roots of unity ω and ω². ω³ = 1."
      },
      {
        id: 14,
        question: "Sum of n terms of AP 1, 3, 5, 7, ... is:",
        options: ["n²", "n(n + 1)", "2n²", "n² / 2"],
        correctOptionIndex: 0,
        explanation: "Sum of first n odd natural numbers = n²."
      },
      {
        id: 15,
        question: "Condition for quadratic equation ax² + bx + c = 0 to have purely imaginary roots is:",
        options: ["b = 0 and ac > 0", "b = 0 and ac < 0", "a = 0", "c = 0"],
        correctOptionIndex: 0,
        explanation: "If b = 0, x² = -c/a. For imaginary roots, -c/a < 0 ⇒ ac > 0."
      }
    ]
  },
  {
    id: "c11-bio-cell",
    title: "Class 11 Biology: Cell Unit of Life & Cell Cycle",
    subject: "biology",
    classLevel: "11",
    chapter: "Cell Structure & Division",
    questionsCount: 15,
    durationMinutes: 45,
    difficulty: "High Yield",
    examTrack: "NEET",
    questions: [
      {
        id: 1,
        question: "Which cell organelle is known as the 'powerhouse of the cell'?",
        options: ["Mitochondria", "Chloroplast", "Golgi Body", "Lysosome"],
        correctOptionIndex: 0,
        explanation: "Mitochondria produce ATP through oxidative phosphorylation."
      },
      {
        id: 2,
        question: "Crossing over occurs during which stage of Prophase-I in Meiosis?",
        options: ["Pachytene", "Leptotene", "Zygotene", "Diplotene"],
        correctOptionIndex: 0,
        explanation: "Pachytene stage is characterized by crossing over mediated by recombinase."
      },
      {
        id: 3,
        question: "9+2 arrangement of microtubules is characteristic of:",
        options: ["Cilia and Flagella", "Centriole", "Basal Body", "Spindle Fibers"],
        correctOptionIndex: 0,
        explanation: "Cilia and flagella contain 9 peripheral doublets and 2 central singlets."
      },
      {
        id: 4,
        question: "Histones in eukaryotic chromatin are rich in basic amino acids:",
        options: ["Lysine and Arginine", "Valine and Leucine", "Alanine and Glycine", "Glutamic acid"],
        correctOptionIndex: 0,
        explanation: "Histones carry positive charges due to Lysine and Arginine."
      },
      {
        id: 5,
        question: "Fluid Mosaic Model of cell membrane was proposed by Singer and Nicolson in:",
        options: ["1972", "1950", "1985", "1960"],
        correctOptionIndex: 0,
        explanation: "Singer and Nicolson proposed the model in 1972."
      },
      {
        id: 6,
        question: "Organelle known as 'suicide bags' of cell due to hydrolytic enzymes is:",
        options: ["Lysosome", "Ribosome", "Peroxisome", "Centrosome"],
        correctOptionIndex: 0,
        explanation: "Lysosomes contain acid hydrolases capable of digesting cellular components."
      },
      {
        id: 7,
        question: "Protein synthesis in cell occurs on:",
        options: ["Ribosomes", "Golgi apparatus", "Lysosomes", "Vacuoles"],
        correctOptionIndex: 0,
        explanation: "Ribosomes are protein factories of the cell."
      },
      {
        id: 8,
        question: "Synaptonemal complex formed during meiosis dissolves in stage:",
        options: ["Diplotene", "Pachytene", "Zygotene", "Diakinesis"],
        correctOptionIndex: 0,
        explanation: "Dissolution of synaptonemal complex marks beginning of Diplotene."
      },
      {
        id: 9,
        question: "S-phase (Synthesis phase) of cell cycle is characterized by:",
        options: ["DNA replication and centriole duplication", "Nuclear division", "Cytokinesis", "Cell growth only"],
        correctOptionIndex: 0,
        explanation: "During S-phase, DNA content doubles from 2C to 4C."
      },
      {
        id: 10,
        question: "Middle lamella holding plant cells together is composed primarily of:",
        options: ["Calcium pectate", "Cellulose", "Lignin", "Suberin"],
        correctOptionIndex: 0,
        explanation: "Middle lamella is made of Calcium and Magnesium pectates."
      },
      {
        id: 11,
        question: "Non-membrane bound cell organelle found in both prokaryotes and eukaryotes is:",
        options: ["Ribosome", "Mitochondria", "ER", "Nucleolus"],
        correctOptionIndex: 0,
        explanation: "Ribosomes are non-membrane bound organelles present in all cells."
      },
      {
        id: 12,
        question: "Chiasmata formation is visible manifestation of crossing over in:",
        options: ["Diplotene", "Pachytene", "Zygotene", "Leptotene"],
        correctOptionIndex: 0,
        explanation: "X-shaped chiasmata become clearly visible during Diplotene."
      },
      {
        id: 13,
        question: "Centromere divides and sister chromatids separate during:",
        options: ["Anaphase-II of Meiosis & Anaphase of Mitosis", "Metaphase-I", "Prophase-I", "Telophase"],
        correctOptionIndex: 0,
        explanation: "Splitting of centromere occurs in Mitotic Anaphase and Meiotic Anaphase-II."
      },
      {
        id: 14,
        question: "Semiconservative nature of DNA replication was experimentally proven by:",
        options: ["Meselson and Stahl", "Hershey and Chase", "Watson and Crick", "Avery, MacLeod, McCarty"],
        correctOptionIndex: 0,
        explanation: "Meselson and Stahl used ¹⁵N heavy isotope of Nitrogen in E. coli in 1958."
      },
      {
        id: 15,
        question: "G₀ phase of cell cycle represents:",
        options: ["Quiescent / Inactive stage of cell division", "Active division phase", "DNA synthesis stage", "Death stage"],
        correctOptionIndex: 0,
        explanation: "Cells in G₀ phase remain metabolically active but no longer proliferate unless called upon."
      }
    ]
  }
];
