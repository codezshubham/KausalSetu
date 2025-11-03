export const governmentExamsData = [
    {
        id: 1,
        examName: "Civil Services Examination (CSE)",
        conductingBody: "Union Public Service Commission (UPSC)",
        domain: "Civil Services",
        posts: ["Indian Administrative Service (IAS)", "Indian Police Service (IPS)", "Indian Foreign Service (IFS)", "Indian Revenue Service (IRS)", "Other Group A & B services"],
        eligibility: {
            education: "Bachelor's Degree in any stream.",
            ageLimit: "21-32 years (relaxations apply)."
        },
        selectionProcess: "Preliminary Exam (Objective) -> Main Exam (Written) -> Personality Test (Interview).",
        examFrequency: "Annually",
        website: "upsc.gov.in"
    },
    {
        id: 2,
        examName: "State Public Service Commission Exam",
        conductingBody: "State PSCs (e.g., UPPSC, BPSC, MPSC)",
        domain: "Civil Services",
        posts: ["Deputy Collector", "Deputy Superintendent of Police (DSP)", "Tehsildar", "Block Development Officer (BDO)"],
        eligibility: {
            education: "Bachelor's Degree in any stream.",
            ageLimit: "Varies by state (e.g., 21-40 years)."
        },
        selectionProcess: "Preliminary Exam -> Main Exam -> Interview.",
        examFrequency: "Annually or as per state government vacancies.",
        website: "Varies by state (e.g., uppsc.up.nic.in)."
    },
    {
        id: 3,
        examName: "IBPS Probationary Officer (PO) Exam",
        conductingBody: "Institute of Banking Personnel Selection (IBPS)",
        domain: "Banking",
        posts: ["Probationary Officer (PO)", "Management Trainee (MT)"],
        eligibility: {
            education: "Bachelor's Degree in any stream.",
            ageLimit: "20-30 years."
        },
        selectionProcess: "Prelims -> Mains -> Interview.",
        examFrequency: "Annually",
        website: "ibps.in"
    },
    {
        id: 4,
        examName: "SBI Probationary Officer (PO) Exam",
        conductingBody: "State Bank of India (SBI)",
        domain: "Banking",
        posts: ["Probationary Officer (PO)"],
        eligibility: {
            education: "Bachelor's Degree in any stream.",
            ageLimit: "21-30 years."
        },
        selectionProcess: "Prelims -> Mains -> Psychometric Test -> Group Exercise & Interview.",
        examFrequency: "Annually",
        website: "sbi.co.in/careers"
    },
    {
        id: 5,
        examName: "RBI Grade B Officer Exam",
        conductingBody: "Reserve Bank of India (RBI)",
        domain: "Banking",
        posts: ["Grade B Officer (General, DEPR, DSIM)"],
        eligibility: {
            education: "Bachelor's Degree with 60% marks or Master's in a relevant field.",
            ageLimit: "21-30 years."
        },
        selectionProcess: "Phase-I Exam -> Phase-II Exam -> Interview.",
        examFrequency: "Annually",
        website: "rbi.org.in"
    },
    {
        id: 6,
        examName: "IBPS Clerk Exam",
        conductingBody: "IBPS",
        domain: "Banking",
        posts: ["Clerical Cadre"],
        eligibility: {
            education: "Bachelor's Degree in any stream.",
            ageLimit: "20-28 years."
        },
        selectionProcess: "Prelims -> Mains.",
        examFrequency: "Annually",
        website: "ibps.in"
    },
    {
        id: 7,
        examName: "Combined Defence Services (CDS) Examination",
        conductingBody: "UPSC",
        domain: "Defence",
        posts: ["Admission to IMA, INA, AFA, OTA"],
        eligibility: {
            education: "Bachelor's Degree (specifics for Navy/Air Force).",
            ageLimit: "19-25 years (varies by academy)."
        },
        selectionProcess: "Written Exam -> SSB Interview -> Medical Examination.",
        examFrequency: "Twice a year",
        website: "upsc.gov.in"
    },
    {
        id: 8,
        examName: "National Defence Academy (NDA) & Naval Academy (NA) Exam",
        conductingBody: "UPSC",
        domain: "Defence",
        posts: ["Admission to Army, Navy, Air Force wings of NDA"],
        eligibility: {
            education: "12th Class pass (with Physics & Maths for Air Force/Navy).",
            ageLimit: "16.5-19.5 years."
        },
        selectionProcess: "Written Exam -> SSB Interview -> Medical Examination.",
        examFrequency: "Twice a year",
        website: "upsc.gov.in"
    },
    {
        id: 9,
        examName: "CAPF (Assistant Commandants) Exam",
        conductingBody: "UPSC",
        domain: "Police",
        posts: ["Assistant Commandant (AC) in BSF, CRPF, CISF, ITBP, SSB"],
        eligibility: {
            education: "Bachelor's Degree in any stream.",
            ageLimit: "20-25 years."
        },
        selectionProcess: "Written Exam -> Physical Test -> Medical Test -> Interview.",
        examFrequency: "Annually",
        website: "upsc.gov.in"
    },
    {
        id: 10,
        examName: "SSC Combined Graduate Level (CGL) Exam",
        conductingBody: "Staff Selection Commission (SSC)",
        domain: "Central Government",
        posts: ["Assistant Section Officer", "Inspector (Income Tax, Excise)", "Auditor", "Sub-Inspector (CBI, NIA)"],
        eligibility: {
            education: "Bachelor's Degree in any stream.",
            ageLimit: "18-32 years (varies by post)."
        },
        selectionProcess: "Tier-I (Objective) -> Tier-II (Objective) -> Document Verification/Skill Test.",
        examFrequency: "Annually",
        website: "ssc.nic.in"
    },
    {
        id: 11,
        examName: "SSC Combined Higher Secondary Level (CHSL) Exam",
        conductingBody: "SSC",
        domain: "Central Government",
        posts: ["Lower Divisional Clerk (LDC)", "Data Entry Operator (DEO)", "Postal Assistant"],
        eligibility: {
            education: "12th Class pass.",
            ageLimit: "18-27 years."
        },
        selectionProcess: "Tier-I (Objective) -> Tier-II (Objective + Skill Test).",
        examFrequency: "Annually",
        website: "ssc.nic.in"
    },
    {
        id: 12,
        examName: "RRB Non-Technical Popular Categories (NTPC)",
        conductingBody: "Railway Recruitment Boards (RRBs)",
        domain: "Railways",
        posts: ["Station Master", "Goods Guard", "Ticket Clerk", "Junior Clerk"],
        eligibility: {
            education: "12th Class pass or Bachelor's Degree (varies by post).",
            ageLimit: "18-33 years."
        },
        selectionProcess: "CBT Stage-1 -> CBT Stage-2 -> Skill Test -> Document Verification.",
        examFrequency: "As per vacancy.",
        website: "Respective RRB websites."
    },
    {
        id: 13,
        examName: "Engineering Services Examination (ESE)",
        conductingBody: "UPSC",
        domain: "Engineering",
        posts: ["Group A engineering posts in various government departments"],
        eligibility: {
            education: "Engineering Degree in a relevant discipline.",
            ageLimit: "21-30 years."
        },
        selectionProcess: "Prelims -> Mains -> Interview.",
        examFrequency: "Annually",
        website: "upsc.gov.in"
    },
    {
        id: 14,
        examName: "Graduate Aptitude Test in Engineering (GATE)",
        conductingBody: "IITs/IISc",
        domain: "Engineering",
        posts: ["Recruitment in Public Sector Undertakings (PSUs) like IOCL, NTPC, ONGC"],
        eligibility: {
            education: "Final year or pass out of an Engineering/Technology degree.",
            ageLimit: "No limit for exam; PSU age limits vary."
        },
        selectionProcess: "GATE Score -> Group Discussion & Interview (for PSUs).",
        examFrequency: "Annually",
        website: "gate.iit... (changes yearly)"
    },
    {
        id: 15,
        examName: "Central Teacher Eligibility Test (CTET)",
        conductingBody: "Central Board of Secondary Education (CBSE)",
        domain: "Teaching",
        posts: ["Eligibility for teaching in central government schools (KVS, NVS)"],
        eligibility: {
            education: "12th pass + D.El.Ed or Graduation + B.Ed.",
            ageLimit: "No upper age limit."
        },
        selectionProcess: "Qualifying a multiple-choice question paper.",
        examFrequency: "Twice a year",
        website: "ctet.nic.in"
    },
    {
        id: 16,
        examName: "UGC National Eligibility Test (NET)",
        conductingBody: "National Testing Agency (NTA)",
        domain: "Teaching",
        posts: ["Eligibility for Assistant Professor and Junior Research Fellowship (JRF)"],
        eligibility: {
            education: "Master's Degree with at least 55% marks.",
            ageLimit: "No limit for Assistant Professor; ~30 years for JRF."
        },
        selectionProcess: "Computer Based Test (CBT).",
        examFrequency: "Twice a year",
        website: "ugcnet.nta.nic.in"
    },
    {
        id: 17,
        examName: "SSC Central Police Organization (CPO) Exam",
        conductingBody: "SSC",
        domain: "Police",
        posts: ["Sub-Inspector (SI) in Delhi Police", "Sub-Inspector (SI) in CAPFs"],
        eligibility: {
            education: "Bachelor's Degree in any stream.",
            ageLimit: "20-25 years."
        },
        selectionProcess: "Paper-I -> PET/PST -> Paper-II -> Medical Examination.",
        examFrequency: "Annually",
        website: "ssc.nic.in"
    },
    {
        id: 18,
        examName: "IBPS Specialist Officer (SO) Exam",
        conductingBody: "IBPS",
        domain: "Banking",
        posts: ["IT Officer", "Law Officer", "HR Officer", "Marketing Officer", "Agricultural Field Officer"],
        eligibility: {
            education: "Professional Degree in the relevant field (e.g., B.Tech for IT Officer).",
            ageLimit: "20-30 years."
        },
        selectionProcess: "Prelims -> Mains -> Interview.",
        examFrequency: "Annually",
        website: "ibps.in"
    },
    {
        id: 19,
        examName: "Air Force Common Admission Test (AFCAT)",
        conductingBody: "Indian Air Force (IAF)",
        domain: "Defence",
        posts: ["Flying Branch (Pilot)", "Ground Duty (Technical & Non-Technical)"],
        eligibility: {
            education: "Graduation (specifics for each branch).",
            ageLimit: "20-26 years (varies by branch)."
        },
        selectionProcess: "Written Exam -> AFSB Interview -> Medicals.",
        examFrequency: "Twice a year",
        website: "afcat.cdac.in"
    },
    {
        id: 20,
        examName: "Intelligence Bureau ACIO Exam",
        conductingBody: "Ministry of Home Affairs (MHA)",
        domain: "Intelligence",
        posts: ["Assistant Central Intelligence Officer (ACIO) Grade-II/Executive"],
        eligibility: {
            education: "Bachelor's Degree in any stream.",
            ageLimit: "18-27 years."
        },
        selectionProcess: "Tier-I -> Tier-II -> Interview.",
        examFrequency: "As per vacancy.",
        website: "mha.gov.in"
    },
    {
        id: 21,
        examName: "LIC Assistant Administrative Officer (AAO) Exam",
        conductingBody: "Life Insurance Corporation of India (LIC)",
        domain: "Insurance",
        posts: ["Assistant Administrative Officer (AAO)"],
        eligibility: {
            education: "Bachelor's Degree in any stream.",
            ageLimit: "21-30 years."
        },
        selectionProcess: "Prelims -> Mains -> Interview.",
        examFrequency: "As per vacancy.",
        website: "licindia.in/careers"
    },
    {
        id: 22,
        examName: "SEBI Grade A (Assistant Manager) Exam",
        conductingBody: "Securities and Exchange Board of India (SEBI)",
        domain: "Finance",
        posts: ["Assistant Manager (General, Legal, IT, Research)"],
        eligibility: {
            education: "Master's Degree in a relevant field or Bachelor's in Law/Engineering.",
            ageLimit: "Maximum 30 years."
        },
        selectionProcess: "Phase I -> Phase II -> Interview.",
        examFrequency: "Annually/As per vacancy.",
        website: "sebi.gov.in"
    },
    {
        id: 23,
        examName: "NABARD Grade A & B Exam",
        conductingBody: "National Bank for Agriculture and Rural Development (NABARD)",
        domain: "Finance",
        posts: ["Assistant Manager (Grade A)", "Manager (Grade B)"],
        eligibility: {
            education: "Bachelor's/Master's Degree, often in Agriculture or related fields.",
            ageLimit: "21-30 years (Grade A)."
        },
        selectionProcess: "Prelims -> Mains -> Interview.",
        examFrequency: "Annually",
        website: "nabard.org"
    },
    {
        id: 24,
        examName: "SSC General Duty (GD) Constable Exam",
        conductingBody: "SSC",
        domain: "Police",
        posts: ["Constable (GD) in CAPFs, NIA, SSF and Rifleman (GD) in Assam Rifles"],
        eligibility: {
            education: "10th Class pass.",
            ageLimit: "18-23 years."
        },
        selectionProcess: "Computer Based Exam (CBE) -> PET/PST -> Medical Examination.",
        examFrequency: "Annually/As per vacancy.",
        website: "ssc.nic.in"
    },
    {
        id: 25,
        examName: "RRB Group D Exam",
        conductingBody: "RRBs",
        domain: "Railways",
        posts: ["Track Maintainer Grade IV", "Helper/Assistant in various departments"],
        eligibility: {
            education: "10th Class pass or ITI.",
            ageLimit: "18-33 years."
        },
        selectionProcess: "Computer Based Test (CBT) -> Physical Efficiency Test (PET) -> Document Verification.",
        examFrequency: "As per vacancy.",
        website: "Respective RRB websites."
    },
    {
        id: 26,
        examName: "SSC Junior Engineer (JE) Exam",
        conductingBody: "SSC",
        domain: "Engineering",
        posts: ["Junior Engineer (Civil, Mechanical, Electrical) in various central govt. departments"],
        eligibility: {
            education: "Diploma or Degree in Engineering.",
            ageLimit: "Up to 32 years."
        },
        selectionProcess: "Paper-I (Objective) -> Paper-II (Descriptive) -> Document Verification.",
        examFrequency: "Annually",
        website: "ssc.nic.in"
    },
    {
        id: 27,
        examName: "ISRO Scientist/Engineer Exam",
        conductingBody: "Indian Space Research Organisation (ISRO)",
        domain: "Engineering",
        posts: ["Scientist/Engineer 'SC'"],
        eligibility: {
            education: "B.E./B.Tech or equivalent with 65% marks.",
            ageLimit: "Maximum 35 years."
        },
        selectionProcess: "Written Test -> Interview.",
        examFrequency: "Annually/As per vacancy.",
        website: "isro.gov.in"
    },
    {
        id: 28,
        examName: "RBI Assistant Exam",
        conductingBody: "RBI",
        domain: "Banking",
        posts: ["Assistant"],
        eligibility: {
            education: "Bachelor's Degree with 50% marks.",
            ageLimit: "20-28 years."
        },
        selectionProcess: "Prelims -> Mains -> Language Proficiency Test (LPT).",
        examFrequency: "Annually/As per vacancy.",
        website: "rbi.org.in"
    },
    {
        id: 29,
        examName: "Judicial Services Examination (Civil Judge)",
        conductingBody: "State High Courts / State PSCs",
        domain: "Judiciary",
        posts: ["Civil Judge (Junior Division) / Judicial Magistrate"],
        eligibility: {
            education: "LL.B. Degree and enrollment as an advocate.",
            ageLimit: "Varies by state (e.g., 22-35 years)."
        },
        selectionProcess: "Prelims -> Mains -> Interview.",
        examFrequency: "Annually/As per vacancy.",
        website: "Varies by state high court."
    },
    {
        id: 30,
        examName: "SSC Multi Tasking (Non-Technical) Staff (MTS) Exam",
        conductingBody: "SSC",
        domain: "Central Government",
        posts: ["Peon", "Daftary", "Jamadar", "Gardener"],
        eligibility: {
            education: "10th Class pass.",
            ageLimit: "18-27 years."
        },
        selectionProcess: "Computer Based Exam -> PET/PST (for some posts).",
        examFrequency: "Annually",
        website: "ssc.nic.in"
    },
    {
        id: 31,
        examName: "FCI Manager Exam",
        conductingBody: "Food Corporation of India (FCI)",
        domain: "PSU",
        posts: ["Manager (General, Depot, Movement, Accounts, Technical)"],
        eligibility: {
            education: "Graduation/Post-Graduation (varies by post).",
            ageLimit: "Maximum 28-35 years."
        },
        selectionProcess: "Online Test (Phase-I & Phase-II) -> Interview.",
        examFrequency: "As per vacancy.",
        website: "fci.gov.in"
    },
    {
        id: 32,
        examName: "IBPS RRB Officer (Scale I, II, III) Exam",
        conductingBody: "IBPS",
        domain: "Banking",
        posts: ["Officer Scale I (PO)", "Officer Scale II (Specialist)", "Officer Scale III (Senior Manager)"],
        eligibility: {
            education: "Bachelor's Degree. Experience required for Scale II & III.",
            ageLimit: "18-40 years (varies by scale)."
        },
        selectionProcess: "Prelims -> Mains -> Interview.",
        examFrequency: "Annually",
        website: "ibps.in"
    },
    {
        id: 33,
        examName: "IBPS RRB Office Assistant (Multipurpose) Exam",
        conductingBody: "IBPS",
        domain: "Banking",
        posts: ["Office Assistant (Clerk) in Regional Rural Banks"],
        eligibility: {
            education: "Bachelor's Degree in any stream.",
            ageLimit: "18-28 years."
        },
        selectionProcess: "Prelims -> Mains.",
        examFrequency: "Annually",
        website: "ibps.in"
    },
    {
        id: 34,
        examName: "Indian Coast Guard Assistant Commandant Exam",
        conductingBody: "Indian Coast Guard",
        domain: "Defence",
        posts: ["Assistant Commandant (General Duty, Pilot, Technical)"],
        eligibility: {
            education: "Bachelor's Degree (specifics for each branch).",
            ageLimit: "21-25 years."
        },
        selectionProcess: "Written Test -> PSB -> FSB -> Medicals.",
        examFrequency: "Twice a year",
        website: "joinindiancoastguard.gov.in"
    },
    {
        id: 35,
        examName: "DRDO CEPTAM Exam",
        conductingBody: "Defence Research and Development Organisation (DRDO)",
        domain: "Engineering",
        posts: ["Senior Technical Assistant (STA-B)", "Technician (Tech-A)"],
        eligibility: {
            education: "B.Sc/Diploma (for STA-B), 10th+ITI (for Tech-A).",
            ageLimit: "18-28 years."
        },
        selectionProcess: "Tier-I -> Tier-II (Skill/Trade Test).",
        examFrequency: "As per vacancy.",
        website: "drdo.gov.in"
    },
    {
        id: 36,
        examName: "KVS Recruitment (TGT, PGT, PRT)",
        conductingBody: "Kendriya Vidyalaya Sangathan (KVS)",
        domain: "Teaching",
        posts: ["Post Graduate Teacher (PGT)", "Trained Graduate Teacher (TGT)", "Primary Teacher (PRT)"],
        eligibility: {
            education: "Master's+B.Ed (PGT), Bachelor's+B.Ed+CTET (TGT), 12th+D.El.Ed+CTET (PRT).",
            ageLimit: "30-40 years."
        },
        selectionProcess: "Written Test -> Interview/Skill Test.",
        examFrequency: "As per vacancy.",
        website: "kvsangathan.nic.in"
    },
    {
        id: 37,
        examName: "State TET (Teacher Eligibility Test)",
        conductingBody: "State Education Boards (e.g., UPTET, MAHA TET)",
        domain: "Teaching",
        posts: ["Eligibility for teaching in state government schools"],
        eligibility: {
            education: "Varies by state, similar to CTET.",
            ageLimit: "Varies by state."
        },
        selectionProcess: "Qualifying a written paper.",
        examFrequency: "Annually",
        website: "Varies by state."
    },
    {
        id: 38,
        examName: "LIC Apprentice Development Officer (ADO) Exam",
        conductingBody: "LIC",
        domain: "Insurance",
        posts: ["Apprentice Development Officer (ADO)"],
        eligibility: {
            education: "Bachelor's Degree in any stream.",
            ageLimit: "21-30 years."
        },
        selectionProcess: "Prelims -> Mains -> Interview.",
        examFrequency: "As per vacancy.",
        website: "licindia.in/careers"
    },
    {
        id: 39,
        examName: "NIACL Assistant/Administrative Officer (AO) Exam",
        conductingBody: "New India Assurance Company Limited (NIACL)",
        domain: "Insurance",
        posts: ["Assistant", "Administrative Officer (AO)"],
        eligibility: {
            education: "Bachelor's Degree in any stream.",
            ageLimit: "21-30 years (AO), 18-30 years (Assistant)."
        },
        selectionProcess: "Prelims -> Mains -> Interview (for AO).",
        examFrequency: "As per vacancy.",
        website: "newindia.co.in"
    },
    {
        id: 40,
        examName: "EPFO SSA & Stenographer Exam",
        conductingBody: "Employees' Provident Fund Organisation (EPFO)",
        domain: "Central Government",
        posts: ["Social Security Assistant (SSA)", "Stenographer"],
        eligibility: {
            education: "Bachelor's Degree (SSA), 12th pass (Steno).",
            ageLimit: "18-27 years."
        },
        selectionProcess: "Phase-I -> Phase-II (Skill Test).",
        examFrequency: "As per vacancy.",
        website: "epfindia.gov.in"
    },
    {
        id: 41,
        examName: "State Police Constable/Sub-Inspector (SI) Exam",
        conductingBody: "State Police Recruitment Boards",
        domain: "Police",
        posts: ["Constable", "Sub-Inspector (SI)"],
        eligibility: {
            education: "12th pass (Constable), Graduation (SI).",
            ageLimit: "18-28 years (varies)."
        },
        selectionProcess: "Written Exam -> Physical Test (PET/PST) -> Medical Test.",
        examFrequency: "As per vacancy.",
        website: "Varies by state police department."
    },
    {
        id: 42,
        examName: "Airport Authority of India (AAI) JE ATC Exam",
        conductingBody: "AAI",
        domain: "PSU",
        posts: ["Junior Executive (Air Traffic Control)"],
        eligibility: {
            education: "B.Sc with Physics & Maths or B.E./B.Tech.",
            ageLimit: "Maximum 27 years."
        },
        selectionProcess: "Online examination -> Voice Test -> Document Verification.",
        examFrequency: "As per vacancy.",
        website: "aai.aero"
    },
    {
        id: 43,
        examName: "SSC Stenographer (Grade C & D) Exam",
        conductingBody: "SSC",
        domain: "Central Government",
        posts: ["Stenographer Grade 'C' and 'D'"],
        eligibility: {
            education: "12th Class pass.",
            ageLimit: "18-30 years (Grade C), 18-27 years (Grade D)."
        },
        selectionProcess: "Computer Based Exam -> Skill Test in Stenography.",
        examFrequency: "Annually",
        website: "ssc.nic.in"
    },
    {
        id: 44,
        examName: "Indian Army Agniveer",
        conductingBody: "Indian Army",
        domain: "Defence",
        posts: ["Agniveer (General Duty, Technical, Clerk, Tradesman)"],
        eligibility: {
            education: "8th, 10th, or 12th pass depending on the trade.",
            ageLimit: "17.5-21 years."
        },
        selectionProcess: "Online Common Entrance Exam -> Physical Fitness Test -> Medical Test.",
        examFrequency: "Twice a year (as per rallies).",
        website: "joinindianarmy.nic.in"
    },
    {
        id: 45,
        examName: "Indian Navy Agniveer (SSR & MR)",
        conductingBody: "Indian Navy",
        domain: "Defence",
        posts: ["Agniveer (Senior Secondary Recruit - SSR)", "Agniveer (Matric Recruit - MR)"],
        eligibility: {
            education: "10+2 with Maths & Physics (SSR), 10th pass (MR).",
            ageLimit: "17.5-21 years."
        },
        selectionProcess: "Shortlisting -> Written Exam -> PFT -> Medicals.",
        examFrequency: "Twice a year",
        website: "joinindiannavy.gov.in"
    },
    {
        id: 46,
        examName: "Indian Air Force Agniveer Vayu",
        conductingBody: "Indian Air Force",
        domain: "Defence",
        posts: ["Agniveervayu"],
        eligibility: {
            education: "10+2 with Maths, Physics & English, or Diploma in Engineering.",
            ageLimit: "17.5-21 years."
        },
        selectionProcess: "Online Test -> Physical Fitness Test -> Medical Examination.",
        examFrequency: "Twice a year",
        website: "agnipathvayu.cdac.in"
    },
    {
        id: 47,
        examName: "High Court Assistant/Clerk Exam",
        conductingBody: "Respective High Courts",
        domain: "Judiciary",
        posts: ["Assistant", "Clerk", "Stenographer"],
        eligibility: {
            education: "Bachelor's Degree.",
            ageLimit: "18-35 years (varies)."
        },
        selectionProcess: "Written Test -> Skill Test (Typing/Stenography) -> Interview.",
        examFrequency: "As per vacancy.",
        website: "Varies by high court."
    },
    {
        id: 48,
        examName: "UPSC Combined Medical Services (CMS) Exam",
        conductingBody: "UPSC",
        domain: "Medical",
        posts: ["Medical Officer in Railways, Municipal Corporations, etc."],
        eligibility: {
            education: "Passed MBBS final examination.",
            ageLimit: "Maximum 32 years."
        },
        selectionProcess: "Written Examination -> Interview/Personality Test.",
        examFrequency: "Annually",
        website: "upsc.gov.in"
    },
    {
        id: 49,
        examName: "UPSC Combined Geo-Scientist and Geologist Exam",
        conductingBody: "UPSC",
        domain: "Science",
        posts: ["Geologist", "Geophysicist", "Chemist", "Hydrogeologist"],
        eligibility: {
            education: "Master's degree in Geology/Applied Geology/Geophysics etc.",
            ageLimit: "21-32 years."
        },
        selectionProcess: "Prelims -> Mains -> Interview.",
        examFrequency: "Annually",
        website: "upsc.gov.in"
    },
    {
        id: 50,
        examName: "BARC OCES/DGFS Exam",
        conductingBody: "Bhabha Atomic Research Centre (BARC)",
        domain: "Engineering",
        posts: ["Scientific Officer"],
        eligibility: {
            education: "B.E./B.Tech/M.Sc in relevant fields.",
            ageLimit: "Maximum 26 years."
        },
        selectionProcess: "Online Exam or GATE Score -> Interview.",
        examFrequency: "Annually",
        website: "barconlineexam.in"
    },
    {
        id: 51,
        examName: "SSC Selection Post Exam",
        conductingBody: "SSC",
        domain: "Central Government",
        posts: ["A wide variety of isolated posts in different ministries (e.g., Lab Assistant, Technical Operator)"],
        eligibility: {
            education: "10th, 12th, or Graduation depending on the post.",
            ageLimit: "Varies widely by post."
        },
        selectionProcess: "Computer Based Exam -> Skill Test (if applicable).",
        examFrequency: "Annually",
        website: "ssc.nic.in"
    }
];