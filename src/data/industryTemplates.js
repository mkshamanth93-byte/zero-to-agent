/**
 * Expanded industry data — 16 verticals + "Other".
 * Each industry carries enough context to make ALL downstream
 * guidance, tips, tool suggestions, and examples fully contextual.
 */

// ─── Industries ──────────────────────────────────────────────────────────────

export const INDUSTRY_OPTIONS = [
  { id: 'tech-software',   icon: '💻', label: 'Tech / Software Engineering',    description: 'SaaS, dev teams, DevOps, product engineering' },
  { id: 'data-ai',         icon: '🧠', label: 'Data Science & AI/ML',           description: 'Analytics, ML models, data pipelines, research' },
  { id: 'healthcare',      icon: '🏥', label: 'Healthcare & Medical',           description: 'Clinics, hospitals, allied health, pharma' },
  { id: 'dental',          icon: '🦷', label: 'Dental Practice',                description: 'Dental clinics, orthodontics, oral surgery' },
  { id: 'finance',         icon: '📊', label: 'Finance & Accounting',           description: 'Bookkeeping, advisory, fintech, banking' },
  { id: 'legal',           icon: '⚖️', label: 'Legal Practice',                 description: 'Law firms, in-house legal, compliance' },
  { id: 'hr-recruitment',  icon: '💼', label: 'HR & Recruitment',               description: 'Recruitment, onboarding, people analytics' },
  { id: 'sales-marketing', icon: '📣', label: 'Sales & Marketing',              description: 'Lead gen, content, campaigns, growth' },
  { id: 'operations',      icon: '⚙️', label: 'Operations & Logistics',         description: 'Supply chain, scheduling, business ops' },
  { id: 'education',       icon: '📚', label: 'Education & Training',           description: 'Schools, universities, L&D, edtech' },
  { id: 'real-estate',     icon: '🏠', label: 'Real Estate & Property',         description: 'Property management, agencies, development' },
  { id: 'retail-ecom',     icon: '🛒', label: 'Retail & E-commerce',            description: 'Online stores, inventory, customer service' },
  { id: 'creative-media',  icon: '🎨', label: 'Creative & Media',               description: 'Design, content production, video, agencies' },
  { id: 'consulting',      icon: '🎯', label: 'Consulting & Advisory',          description: 'Management consulting, strategy, client work' },
  { id: 'hospitality',     icon: '🍽️', label: 'Hospitality & Food Service',     description: 'Restaurants, hotels, catering, events' },
  { id: 'personal',        icon: '🏡', label: 'Personal Use & Life Automation', description: 'Life admin, side projects, personal finance' },
  { id: 'other',           icon: '✦',  label: 'Something Else',                 description: 'Tell us your world — we\'ll adapt' },
]

// ─── Business types ──────────────────────────────────────────────────────────

export const BUSINESS_TYPES = [
  { id: 'solo',       label: 'Solo / Freelance',      desc: 'Just me — or me + 1-2 people' },
  { id: 'small',      label: 'Small Team',             desc: '3–20 people' },
  { id: 'growing',    label: 'Growing Business',       desc: '20–200 people' },
  { id: 'large',      label: 'Large Organisation',     desc: '200+ people' },
  { id: 'personal',   label: 'Personal Project',       desc: 'Automating my life, not a business' },
]

// ─── Goal tracks (expanded) ──────────────────────────────────────────────────

export const GOAL_TRACKS = [
  {
    id: 'career',
    icon: '🚀',
    label: 'Advance my career',
    desc: 'Upskill into agentic AI. Automate your job search, build a portfolio of agent projects, prep for interviews — or get so good at this that your current role transforms.',
    examples: ['Job search automation', 'Portfolio of agent projects', 'Interview prep agent', 'Upskilling into AI engineering', 'Internal process automation to prove value'],
  },
  {
    id: 'business',
    icon: '⚡',
    label: 'Automate my work',
    desc: 'Build an intelligent layer on top of your existing tools and workflows. Reduce the admin, catch exceptions, ship insights. Connect the software you already pay for.',
    examples: ['Daily ops briefing', 'Client communication automation', 'Reporting & reconciliation', 'Invoice chasing', 'Customer onboarding flows'],
  },
  {
    id: 'project',
    icon: '🏗️',
    label: 'Build a specific system',
    desc: 'You know exactly what you want to build. Describe it — the course will structure the 30 days around making it real.',
    examples: ['Dental PMS + Xero + CRM integration', 'Automated legal research pipeline', 'Full recruitment engine', 'Content production pipeline', 'Property management automation'],
  },
  {
    id: 'personal',
    icon: '🏡',
    label: 'Automate my life',
    desc: 'Personal finance tracking, content creation, health routines, travel planning, side project management — anything you do repeatedly that an agent could handle.',
    examples: ['Personal finance tracker', 'Content calendar automation', 'Health & habit tracking', 'Email & calendar management', 'Side project coordination'],
  },
]

// ─── Per-industry contextual content ─────────────────────────────────────────
// This is the core of the contextual guidance system.
// Every field the user interacts with can pull from this.

export const INDUSTRY_TEMPLATES = {
  'tech-software': {
    label: 'Tech / Software',
    color: '#6366f1',
    roleExamples: [
      'Full-stack engineer at a B2B SaaS company — React frontend, Python backend, AWS infra',
      'DevOps engineer — managing CI/CD pipelines, Terraform, Kubernetes clusters for a 40-person team',
      'Engineering manager — 8 direct reports, sprint planning, cross-team coordination, code reviews',
      'Junior developer — 6 months in, building features in TypeScript, want to level up with AI tooling',
    ],
    automationExamples: {
      career: ['Automatically match my skills to job postings and draft targeted applications', 'Build a portfolio agent that showcases my GitHub projects with generated case studies', 'Prep agent that researches the company and interviewer before every call'],
      business: ['PR review agent that checks for style, security issues, and test coverage', 'Sprint summary agent that pulls from Jira/Linear and drafts a weekly update', 'On-call agent that triages alerts, checks runbooks, and suggests fixes'],
      project: ['CI/CD pipeline agent that auto-fixes failing tests and suggests PR improvements', 'Documentation agent that watches code changes and updates docs', 'Incident response agent that correlates alerts across services'],
      personal: ['GitHub repo organiser that triages stars, suggests archival, summarises READMEs', 'Learning agent that curates papers and tutorials based on your current focus'],
    },
    industryTools: ['github', 'jira', 'linear', 'datadog', 'aws', 'vercel', 'docker'],
    useCases: [
      'Auto-triage incoming bug reports and route to the right team',
      'Generate release notes from merged PRs with business-friendly language',
      'Monitor production logs and surface anomalies before users report them',
      'Draft technical RFCs from a problem statement and context',
      'Auto-update project documentation when code changes',
    ],
    whyThisMatters: 'Software teams are already surrounded by tools. The problem isn\'t more tools — it\'s connecting them intelligently. An agent that reads your Jira, checks your repo, and drafts your update saves hours a week of context-switching.',
    module7Goal: 'Development Workflow Agent — connects your issue tracker, repo, and CI pipeline into one intelligent loop',
    module8Capstone: 'Full Dev Ops Orchestrator — PR review + deploy + monitoring + incident response',
  },

  'data-ai': {
    label: 'Data Science & AI',
    color: '#8b5cf6',
    roleExamples: [
      'Data scientist at a retail bank — ML models for credit risk, moving into agentic workflows',
      'ML engineer — training and deploying models, building data pipelines in Airflow and Spark',
      'Research scientist — NLP focus, publishing papers, now exploring agent-based systems',
      'Analytics lead — dashboards in Looker, stakeholder reporting, starting to automate insights',
    ],
    automationExamples: {
      career: ['Match my ML/AI skills to relevant roles and draft applications referencing my published work', 'Portfolio agent that turns my Jupyter notebooks into presentable case studies', 'Interview prep agent that generates ML system design questions based on job descriptions'],
      business: ['Model monitoring agent that detects drift and triggers retraining pipelines', 'Data quality agent that validates incoming datasets against schema and flags anomalies', 'Automated experiment tracker that logs results and generates comparison reports'],
      project: ['End-to-end MLOps agent that handles data ingestion → training → deployment → monitoring', 'Research paper discovery agent that finds relevant papers and summarises key findings', 'Data pipeline orchestrator that manages Airflow DAGs and handles failures'],
      personal: ['Personal research assistant that tracks arxiv papers in your focus areas', 'Learning path agent that curates courses and resources based on skill gaps'],
    },
    industryTools: ['github', 'jupyter', 'airflow', 'databricks', 'snowflake', 'mlflow', 'aws'],
    useCases: [
      'Auto-generate EDA reports when new datasets arrive',
      'Monitor model performance in production and alert on drift',
      'Research agent that summarises relevant papers from arxiv daily',
      'Automated feature store management and documentation',
      'Stakeholder briefing agent that translates model outputs into business language',
    ],
    whyThisMatters: 'You already understand models and data. Agentic AI is the next layer — it\'s about making your models act autonomously, chain together, and handle the operational burden that currently falls on you.',
    module7Goal: 'ML Operations Agent — automated model monitoring, retraining triggers, and stakeholder reporting',
    module8Capstone: 'Full Data Intelligence Platform — ingestion + quality + training + monitoring + reporting',
  },

  'healthcare': {
    label: 'Healthcare & Medical',
    color: '#06b6d4',
    roleExamples: [
      'GP practice manager — 6 doctors, patient scheduling, Medicare billing, referral management',
      'Physiotherapy clinic owner — 3 physios, appointment booking, exercise program follow-ups',
      'Hospital administrator — bed management, staff rostering, compliance reporting',
      'Pharmacist — dispensing workflows, inventory management, patient medication reviews',
    ],
    automationExamples: {
      career: ['Build a health informatics portfolio with agent projects specific to clinical workflows', 'Research agent that finds health-AI roles and matches them to your clinical background', 'Upskilling agent that curates health-AI certifications and tracks your progress'],
      business: ['Patient reminder system — SMS/WhatsApp before appointments, follow-up after treatment', 'Insurance claim tracker that flags overdue claims and drafts follow-up letters', 'Referral management agent that tracks outbound referrals and chases missing reports'],
      project: ['Connect PMS to billing system — auto-generate invoices when treatment completes', 'Patient intake automation — pre-appointment forms, medical history collection, consent management', 'Waitlist management agent that fills cancellation slots automatically'],
      personal: ['Personal health tracker that monitors your own metrics and suggests adjustments', 'CPD tracker that logs your continuing education hours and finds relevant courses'],
    },
    industryTools: ['cliniko', 'practice-fusion', 'xero', 'twilio-sms', 'medicare-online', 'hotdoc'],
    useCases: [
      'Automated appointment reminder system (SMS/WhatsApp from your PMS)',
      'Patient follow-up agent that checks treatment plans and sends care prompts',
      'Insurance claim status tracker and follow-up automation',
      'Referral letter generator from clinical notes',
      'Waitlist management — fill cancellation slots with priority patients',
    ],
    whyThisMatters: 'Healthcare runs on repeated workflows — bookings, billing, follow-ups, referrals. Every hour your staff spends chasing these is an hour not spent on patient care. Agents handle the pattern; humans handle the exceptions.',
    module7Goal: 'Clinical Workflow Agent — patient reminders, billing automation, referral tracking',
    module8Capstone: 'Practice Intelligence System — scheduling + billing + follow-ups + reporting',
  },

  'dental': {
    label: 'Dental Practice',
    color: '#14b8a6',
    roleExamples: [
      'Dental practice owner — 4-chair clinic, patient scheduling, Xero invoicing, insurance claims',
      'Practice manager — handling bookings, treatment plans, recalls, and staff coordination',
      'Associate dentist — patient care, treatment planning, wanting to understand the business side',
      'Dental group operations — multi-site, standardising processes across 3-5 practices',
    ],
    automationExamples: {
      career: ['Build dental-tech portfolio projects that demonstrate AI in clinical workflows', 'Research agent for dental industry innovation — conferences, publications, tech trends'],
      business: ['Recall system — automatically contact patients overdue for check-ups with personalised messages', 'Treatment plan follow-up — chase patients who haven\'t booked recommended treatment', 'Insurance claim automation — submit, track, and chase outstanding claims'],
      project: ['Connect Dentally/PMS to Xero — auto-invoice on treatment completion, reconcile payments, flag overdue accounts', 'Patient communication hub — appointment reminders, post-treatment care instructions, recall notices, review requests', 'Multi-site dashboard — aggregate KPIs across practices, flag underperforming metrics'],
      personal: ['Personal CPD tracker and course finder for dental professionals'],
    },
    industryTools: ['dentally', 'xero', 'sms-gateway', 'dental-pms', 'practice-management'],
    useCases: [
      'Auto-invoice patients in Xero when treatment completes in Dentally',
      'Patient recall agent — contact overdue patients via SMS with personalised prompts',
      'Insurance claim tracker — submit claims, flag rejections, chase overdue payments',
      'Post-treatment care agent — send aftercare instructions based on procedure type',
      'End-of-day reconciliation — match PMS transactions to bank statements',
    ],
    whyThisMatters: 'Dental practices run on tight margins and repetitive admin — recalls, claims, invoicing, follow-ups. Each one follows a pattern. An agent handles the 80% that\'s routine so your front desk focuses on patients, not paperwork.',
    module7Goal: 'Dental Practice Agent — PMS + Xero + patient comms in one intelligent loop',
    module8Capstone: 'Full Practice Automation — scheduling + billing + recalls + claims + reporting',
  },

  'finance': {
    label: 'Finance & Accounting',
    color: '#f59e0b',
    roleExamples: [
      'Bookkeeper — 15 SMB clients, monthly reconciliation in Xero, BAS lodgement, payroll',
      'Financial controller — P&L reporting, budget vs actual analysis, cash flow forecasting',
      'Tax accountant — individual and business returns, tax planning, ATO compliance',
      'Fintech product manager — payments platform, regulatory compliance, KYC/AML workflows',
    ],
    automationExamples: {
      career: ['Portfolio of finance-AI projects — automated reconciliation, anomaly detection, forecasting', 'Job search agent targeting fintech and finance-tech hybrid roles', 'Upskilling agent that tracks CPA/CA requirements alongside AI certifications'],
      business: ['Monthly reconciliation agent — match bank transactions to invoices, flag unmatched items for review', 'Invoice chasing agent — send payment reminders on day 7, 14, 30 with escalating tone', 'Client reporting agent — pull P&L from Xero, generate management commentary, format as PDF'],
      project: ['End-to-end management accounts pipeline — Xero API → analysis → commentary → Word doc → client portal', 'Multi-entity consolidation agent that pulls from multiple Xero orgs and produces group accounts', 'KYC/AML screening agent that checks new clients against sanctions lists and flags risks'],
      personal: ['Personal finance tracker — categorise spending, spot trends, generate monthly summary'],
    },
    industryTools: ['xero', 'quickbooks', 'sage', 'myob', 'receipt-bank', 'stripe'],
    useCases: [
      'Automated bank reconciliation — match transactions, flag exceptions for human review',
      'Invoice chasing agent — escalating payment reminders at 7, 14, 30 days',
      'Monthly management accounts — pull data, generate commentary, produce report',
      'Expense categorisation — auto-classify receipts against chart of accounts',
      'Cash flow forecasting — analyse patterns and predict upcoming gaps',
    ],
    whyThisMatters: 'Accounting is 70% pattern and 30% judgment. The pattern part — reconciliation, categorisation, chasing, formatting — is exactly what agents excel at. Your judgment is what clients actually pay for.',
    module7Goal: 'Finance Automation Agent — reconciliation + invoicing + client reporting',
    module8Capstone: 'Full Practice Platform — multi-client reporting + compliance + advisory intelligence',
  },

  'legal': {
    label: 'Legal Practice',
    color: '#ec4899',
    roleExamples: [
      'Solicitor — commercial law, contract drafting, due diligence for M&A transactions',
      'In-house counsel — employment law, policy compliance, contract review for a tech company',
      'Legal practice manager — matter management, billing, client intake across 12 lawyers',
      'Paralegal — document review, research, filing, case preparation',
    ],
    automationExamples: {
      career: ['Legal-tech portfolio — contract analysis agent, precedent research tool, compliance checker', 'Job search agent for legal-tech hybrid roles at firms embracing AI'],
      business: ['Contract review agent — flag non-standard clauses, compare against templates, suggest edits', 'Precedent research agent — search case law databases for relevant decisions', 'Client intake automation — conflict checks, engagement letters, initial document requests'],
      project: ['Due diligence agent — ingest documents, extract key terms, flag risks, produce summary report', 'Matter management automation — track deadlines, generate status updates, chase outstanding items', 'Compliance monitoring agent — track regulatory changes relevant to your clients'],
      personal: ['Personal legal knowledge base — organise case notes, track CPD, find relevant updates'],
    },
    industryTools: ['clio', 'leap-legal', 'practice-panther', 'docusign', 'xero'],
    useCases: [
      'Contract review — extract key terms, flag deviations from templates, suggest edits',
      'Precedent research — find relevant case law and summarise holdings',
      'Client intake automation — conflict checks and engagement letter generation',
      'Matter deadline tracking with escalating reminders',
      'Time entry agent — suggest billable entries from calendar and email activity',
    ],
    whyThisMatters: 'Legal work is research-heavy and deadline-driven. An agent that handles the research groundwork, tracks deadlines, and drafts first passes gives you back hours of billable time every week.',
    module7Goal: 'Legal Research & Review Agent — precedent search, contract analysis, deadline tracking',
    module8Capstone: 'Full Legal Practice Intelligence — intake + research + review + billing + compliance',
  },

  'hr-recruitment': {
    label: 'HR & Recruitment',
    color: '#f472b6',
    roleExamples: [
      'HR Manager — 60-person startup, recruitment, onboarding, engagement surveys, policy updates',
      'Talent acquisition lead — sourcing, screening 50+ CVs per role, interview coordination',
      'Recruitment agency owner — 3 recruiters, client briefs, candidate pipelines, placement tracking',
      'People ops specialist — HRIS management, payroll coordination, employee lifecycle',
    ],
    automationExamples: {
      career: ['Build HR-tech portfolio projects — CV screening agent, onboarding automation', 'Job search agent targeting People & Culture or HR-Tech roles'],
      business: ['CV screening agent — score candidates against job spec, surface top 5 with reasoning', 'Onboarding automation — generate personalised first-week schedules, send welcome packs, track completion', 'Employee engagement agent — schedule pulse surveys, analyse results, flag concerns'],
      project: ['Full recruitment pipeline — job brief → JD generation → CV screening → interview scheduling → offer letter', 'Multi-channel sourcing agent — search LinkedIn, job boards, and internal database simultaneously', 'Exit interview analyser — collect feedback, identify patterns, generate retention recommendations'],
      personal: ['Personal career development tracker — skill gaps, course recommendations, goal tracking'],
    },
    industryTools: ['bamboohr', 'workday', 'greenhouse', 'lever', 'linkedin', 'slack'],
    useCases: [
      'Screen 50 CVs against a job spec and surface the top 5 with match reasoning',
      'Auto-generate personalised onboarding schedules for new hires',
      'Pulse survey agent — schedule, collect, analyse, and surface themes',
      'Interview scheduling agent — coordinate calendars across hiring managers',
      'Offer letter generator from approved compensation bands and role details',
    ],
    whyThisMatters: 'Recruitment and HR are drowning in repetitive coordination — screening, scheduling, chasing, onboarding. An agent handles the volume so you focus on the human decisions that actually matter.',
    module7Goal: 'Recruitment Intelligence Agent — screening, scheduling, and candidate communication',
    module8Capstone: 'Full People Ops Platform — sourcing + screening + onboarding + engagement + analytics',
  },

  'sales-marketing': {
    label: 'Sales & Marketing',
    color: '#f97316',
    roleExamples: [
      'Head of marketing — B2B SaaS, content strategy, demand gen, campaign management across 5 channels',
      'Sales development rep — cold outreach, lead qualification, CRM management, 80+ touches per day',
      'Growth marketer — SEO, paid ads, conversion optimisation, analytics for a D2C brand',
      'Freelance content strategist — 6 clients, content calendars, blog posts, social media scheduling',
    ],
    automationExamples: {
      career: ['Marketing-tech portfolio — lead scoring agent, content pipeline automation', 'Job search agent for growth/marketing ops roles at AI-forward companies'],
      business: ['Lead qualification agent — score inbound leads against ICP, route hot leads to sales immediately', 'Content repurposing agent — take a blog post, generate social posts, email copy, and ad variations', 'Campaign reporting agent — pull data from Google Ads, Meta, and HubSpot into one unified report'],
      project: ['Full content production pipeline — brief → research → draft → edit → schedule → distribute', 'ABM agent — research target accounts, personalise outreach sequences, track engagement', 'Competitive intelligence agent — monitor competitor websites, pricing changes, and product launches'],
      personal: ['Personal brand content agent — draft LinkedIn posts, schedule tweets, track engagement'],
    },
    industryTools: ['hubspot', 'salesforce', 'mailchimp', 'google-ads', 'meta-ads', 'slack', 'notion'],
    useCases: [
      'Lead scoring — qualify inbound leads against your ICP and route to the right rep',
      'Content repurposing — blog post → 5 social posts + email + ad copy in one go',
      'Campaign dashboard — unify Google Ads, Meta, email, and CRM data into one view',
      'Cold outreach personalisation — research prospects and draft tailored sequences',
      'Competitor monitoring — track pricing changes, new features, and content updates',
    ],
    whyThisMatters: 'Marketing and sales generate enormous amounts of repetitive work — outreach, reporting, content variations, lead qualification. Agents handle the throughput while you focus on strategy and relationships.',
    module7Goal: 'Sales & Marketing Agent — lead qualification, content generation, campaign reporting',
    module8Capstone: 'Full Revenue Ops System — lead scoring + outreach + content + analytics + reporting',
  },

  'operations': {
    label: 'Operations & Logistics',
    color: '#64748b',
    roleExamples: [
      'Operations manager — manufacturing, inventory management, supplier coordination, quality control',
      'Supply chain analyst — demand forecasting, procurement, logistics optimisation',
      'COO of a growing startup — process design, vendor management, scaling operations',
      'Logistics coordinator — fleet management, route planning, delivery tracking',
    ],
    automationExamples: {
      career: ['Operations-tech portfolio — inventory forecasting agent, process optimisation projects'],
      business: ['Inventory monitoring agent — track stock levels, auto-generate purchase orders at reorder points', 'Supplier communication agent — chase overdue deliveries, confirm ETAs, update your system', 'Daily ops briefing — summarise yesterday\'s KPIs, flag exceptions, suggest priorities for today'],
      project: ['End-to-end supply chain agent — demand forecast → purchase order → supplier tracking → receiving → inventory update', 'Quality control agent — ingest inspection data, flag defects, trigger corrective action workflows', 'Logistics optimiser — route planning, delivery scheduling, real-time ETA updates'],
      personal: ['Personal project manager — track multiple projects, deadlines, and dependencies'],
    },
    industryTools: ['cin7', 'tradegecko', 'xero', 'google-sheets', 'slack', 'asana'],
    useCases: [
      'Inventory reorder agent — monitor stock levels and auto-generate purchase orders',
      'Supplier chasing — auto-follow-up on overdue deliveries with escalation',
      'Daily ops briefing — KPI summary, exceptions, and priority suggestions',
      'Quality control — ingest inspection data and flag defects for action',
      'Delivery tracking — real-time updates to customers from carrier APIs',
    ],
    whyThisMatters: 'Operations is the connective tissue of a business — every process touches it. The repetitive monitoring, chasing, and reporting is exactly what agents are built for, freeing you to focus on the exceptions and strategy.',
    module7Goal: 'Operations Intelligence Agent — inventory, supplier management, daily briefings',
    module8Capstone: 'Full Ops Platform — procurement + inventory + logistics + quality + reporting',
  },

  'education': {
    label: 'Education & Training',
    color: '#10b981',
    roleExamples: [
      'University lecturer — course design, student assessment, research supervision, admin overload',
      'L&D manager — corporate training programs, skill gap analysis, LMS administration',
      'School administrator — timetabling, parent communication, compliance reporting',
      'EdTech product manager — building learning platforms, content management, student analytics',
    ],
    automationExamples: {
      career: ['EdTech portfolio — AI tutor agent, automated assessment tools, adaptive learning projects'],
      business: ['Student communication agent — assignment reminders, grade notifications, feedback delivery', 'Course material updater — flag outdated content, suggest updates, track revisions', 'Assessment agent — auto-grade rubric-based assignments, provide structured feedback'],
      project: ['Adaptive learning agent — personalise content paths based on student performance data', 'Parent communication hub — progress reports, event reminders, absence notifications', 'Curriculum mapping agent — align learning outcomes to assessments and resources'],
      personal: ['Personal learning agent — track your own courses, summarise key takeaways, build a knowledge base'],
    },
    industryTools: ['canvas-lms', 'moodle', 'google-classroom', 'notion', 'zoom', 'slack'],
    useCases: [
      'Auto-grade rubric-based assignments and generate structured feedback',
      'Student communication — reminders, grade notifications, feedback delivery',
      'Course content freshness checker — flag outdated material for review',
      'Timetable optimisation — handle room allocation and conflict resolution',
      'Parent update agent — weekly progress summaries and event reminders',
    ],
    whyThisMatters: 'Educators spend more time on admin than teaching. An agent that handles grading, communication, scheduling, and content management gives you back the hours that should be spent with students.',
    module7Goal: 'Education Workflow Agent — assessment, communication, content management',
    module8Capstone: 'Full Learning Intelligence System — grading + communication + content + analytics',
  },

  'real-estate': {
    label: 'Real Estate & Property',
    color: '#a78bfa',
    roleExamples: [
      'Property manager — 80 rental units, tenant communication, maintenance coordination, rent collection',
      'Real estate agent — listing management, buyer matching, open home coordination',
      'Property developer — project timelines, contractor management, council approvals',
      'Strata manager — body corporate administration, meeting minutes, maintenance schedules',
    ],
    automationExamples: {
      career: ['Property-tech portfolio — tenant matching agent, market analysis tools'],
      business: ['Tenant communication agent — rent reminders, maintenance updates, lease renewals', 'Listing agent — auto-generate property descriptions from photos and data, distribute to portals', 'Maintenance coordination — receive requests, triage urgency, dispatch contractors, track completion'],
      project: ['Full property management system — tenant comms + rent tracking + maintenance + inspections + reporting', 'Market intelligence agent — monitor comparable sales, rental yields, and development applications', 'Settlement tracker — coordinate between solicitors, brokers, and agents with deadline management'],
      personal: ['Personal property investment tracker — monitor portfolio value, rental yields, expenses'],
    },
    industryTools: ['property-tree', 're-agent', 'xero', 'domain-api', 'twilio-sms'],
    useCases: [
      'Tenant rent reminder automation — escalating messages at due, 3 days, 7 days overdue',
      'Property listing generator — descriptions from photos and data, multi-portal distribution',
      'Maintenance triage — receive requests, assess urgency, dispatch contractors',
      'Lease renewal agent — track expiry dates, generate renewal offers, negotiate terms',
      'Inspection scheduling — coordinate tenants, property managers, and report generation',
    ],
    whyThisMatters: 'Property management is communication-heavy and deadline-driven. Every lease, inspection, and maintenance request follows a pattern. Agents handle the coordination so you focus on relationships and deals.',
    module7Goal: 'Property Management Agent — tenant comms, maintenance, rent tracking',
    module8Capstone: 'Full Property Intelligence — listings + tenants + maintenance + financials + reporting',
  },

  'retail-ecom': {
    label: 'Retail & E-commerce',
    color: '#e879f9',
    roleExamples: [
      'E-commerce founder — Shopify store, 500 SKUs, customer service, marketing, inventory management',
      'Retail operations manager — multi-store, stock allocation, staff scheduling, loss prevention',
      'D2C brand manager — product launches, influencer coordination, customer retention',
      'Customer experience lead — support tickets, returns processing, review management',
    ],
    automationExamples: {
      career: ['E-commerce tech portfolio — inventory forecasting agent, customer service automation'],
      business: ['Customer service agent — handle common queries, process returns, escalate complex issues', 'Inventory forecasting — predict stockouts from sales velocity, auto-generate reorders', 'Review management agent — respond to reviews, flag negative patterns, generate insights'],
      project: ['Full order management pipeline — order received → payment confirmed → warehouse notified → shipping tracked → delivery confirmed → review requested', 'Dynamic pricing agent — monitor competitors, analyse demand, suggest price adjustments', 'Customer segmentation agent — analyse purchase patterns, create segments, trigger targeted campaigns'],
      personal: ['Personal shopping deal finder — track prices, find discounts, alert on price drops'],
    },
    industryTools: ['shopify', 'stripe', 'cin7', 'klaviyo', 'zendesk', 'google-sheets'],
    useCases: [
      'Customer service agent — handle FAQs, process returns, escalate complex tickets',
      'Inventory forecasting — predict stockouts and auto-generate purchase orders',
      'Review response agent — acknowledge reviews, flag issues, generate weekly digest',
      'Order status agent — proactively notify customers of shipping updates',
      'Competitor price monitoring — track competitor pricing and alert on changes',
    ],
    whyThisMatters: 'E-commerce generates volume — orders, queries, reviews, inventory changes. Every one follows a pattern. Agents handle the throughput so you focus on the product and the brand.',
    module7Goal: 'E-commerce Operations Agent — customer service, inventory, order management',
    module8Capstone: 'Full Retail Platform — orders + inventory + service + reviews + analytics',
  },

  'creative-media': {
    label: 'Creative & Media',
    color: '#fb923c',
    roleExamples: [
      'Creative agency owner — 8-person team, client briefs, project management, creative direction',
      'Freelance graphic designer — client management, project deliverables, invoicing, portfolio updates',
      'Content production manager — video shoots, editing pipelines, distribution across 4 platforms',
      'Social media manager — content calendar, posting schedule, analytics reporting for 6 clients',
    ],
    automationExamples: {
      career: ['Creative-tech portfolio — AI-assisted content pipeline, brief analysis agent'],
      business: ['Client brief analyser — extract requirements, create task breakdowns, estimate timelines', 'Content distribution agent — publish to multiple platforms, adapt format, track performance', 'Project status agent — track deliverables across clients, flag overdue items, generate updates'],
      project: ['Full content production pipeline — brief → research → outline → draft → review → publish → distribute → analyse', 'Asset management agent — organise files, tag content, maintain brand asset library', 'Client reporting agent — pull analytics from each platform, generate unified performance report'],
      personal: ['Personal content creator — draft posts, schedule publishing, track engagement metrics'],
    },
    industryTools: ['figma', 'canva', 'adobe-cc', 'notion', 'asana', 'buffer', 'google-sheets'],
    useCases: [
      'Client brief analyser — extract requirements, create task lists, estimate timelines',
      'Content distribution — publish to multiple platforms with adapted formats',
      'Project status tracking — deliverable deadlines, client updates, resource allocation',
      'Invoice generation from tracked project hours and deliverables',
      'Performance reporting — unify analytics across all platforms per client',
    ],
    whyThisMatters: 'Creative work is high-value but wrapped in low-value coordination — briefs, scheduling, distribution, reporting. An agent strips away the admin so your team spends time on the creative work clients actually pay for.',
    module7Goal: 'Creative Workflow Agent — brief analysis, project tracking, content distribution',
    module8Capstone: 'Full Agency Platform — briefs + production + distribution + analytics + billing',
  },

  'consulting': {
    label: 'Consulting & Advisory',
    color: '#0ea5e9',
    roleExamples: [
      'Management consultant — strategy engagements, client presentations, market research',
      'IT consultant — system implementations, vendor evaluation, change management',
      'Business advisor — SMB clients, monthly reviews, growth strategy, operational improvements',
      'Freelance consultant — proposal writing, client management, knowledge base building',
    ],
    automationExamples: {
      career: ['Consulting portfolio — client intelligence agent, proposal generator, market research automation'],
      business: ['Client intelligence agent — research client\'s industry, competitors, and recent news before every meeting', 'Proposal generator — template-based proposals customised from client brief and past engagements', 'Knowledge management — capture insights from engagements, build searchable knowledge base'],
      project: ['Full client engagement pipeline — proposal → SOW → kickoff → status tracking → deliverables → billing', 'Market research agent — industry analysis, competitor mapping, trend identification for client reports', 'Benchmark agent — compare client metrics against industry standards and peer companies'],
      personal: ['Personal knowledge vault — organise everything you learn, tag by client/industry, search later'],
    },
    industryTools: ['notion', 'google-workspace', 'xero', 'slack', 'airtable', 'miro'],
    useCases: [
      'Client research agent — company background, recent news, financials before every meeting',
      'Proposal generator — customised proposals from templates and client brief',
      'Engagement tracker — milestones, deliverables, hours, and billing status',
      'Knowledge capture — index insights from completed engagements for future reference',
      'Market analysis — competitive landscape and trend identification for client reports',
    ],
    whyThisMatters: 'Consulting is research and communication. Hours go into understanding the client\'s world before you can add value. An agent that handles the research groundwork and tracks engagement details lets you focus on the strategic thinking clients hire you for.',
    module7Goal: 'Consulting Intelligence Agent — client research, proposal generation, knowledge management',
    module8Capstone: 'Full Advisory Platform — research + proposals + engagement tracking + knowledge base + billing',
  },

  'hospitality': {
    label: 'Hospitality & Food Service',
    color: '#ef4444',
    roleExamples: [
      'Restaurant owner — 40 covers, staff scheduling, inventory ordering, reservation management',
      'Hotel general manager — front desk operations, housekeeping coordination, guest experience',
      'Catering business owner — event management, menu planning, supplier ordering, invoicing',
      'Café chain operations — 4 locations, standardising processes, stock levels, quality control',
    ],
    automationExamples: {
      career: ['Hospitality-tech portfolio — reservation optimisation, inventory forecasting'],
      business: ['Reservation management agent — handle bookings, confirmations, waitlist, no-show follow-up', 'Inventory ordering agent — track usage, predict needs, auto-generate supplier orders', 'Staff scheduling agent — build rosters from availability, predict busy periods, handle swap requests'],
      project: ['Full restaurant operations — reservations + inventory + staff scheduling + supplier ordering + daily reporting', 'Guest experience agent — pre-arrival preferences, room assignment, personalised recommendations', 'Multi-site operations dashboard — compare locations on key metrics, flag underperformers'],
      personal: ['Personal meal planning and grocery ordering agent'],
    },
    industryTools: ['square', 'toast-pos', 'xero', 'deputy', 'google-sheets', 'twilio-sms'],
    useCases: [
      'Reservation management — bookings, confirmations, waitlist, no-show follow-ups',
      'Inventory ordering — predict needs from sales data, auto-generate supplier orders',
      'Staff roster builder — match availability to predicted demand, handle swaps',
      'Daily ops report — yesterday\'s revenue, covers, food cost %, staff hours',
      'Guest review response — acknowledge, categorise issues, escalate complaints',
    ],
    whyThisMatters: 'Hospitality runs on tight margins and high volume. Every booking, stock check, and roster change follows a pattern. An agent that handles the operational rhythm lets you focus on the guest experience.',
    module7Goal: 'Hospitality Operations Agent — reservations, inventory, staff scheduling',
    module8Capstone: 'Full Venue Platform — bookings + inventory + staff + suppliers + guest experience + reporting',
  },

  'personal': {
    label: 'Personal & Life Automation',
    color: '#a3e635',
    roleExamples: [
      'I want to automate my personal finances — budgeting, expense tracking, investment monitoring',
      'I have a side project and a full-time job — I need an agent to help me manage both',
      'I create content on the side — YouTube, newsletter, social media — and it takes hours every week',
      'I want to organise my life — emails, calendar, tasks, health tracking, travel planning',
    ],
    automationExamples: {
      career: ['Personal upskilling agent — track learning goals, curate resources, log progress'],
      business: ['Side project manager — track tasks, deadlines, and progress across multiple projects'],
      project: ['Personal AI assistant — email triage, calendar management, task prioritisation, daily briefing', 'Content creation pipeline — idea capture → research → draft → edit → schedule → publish', 'Financial dashboard — aggregate accounts, track spending patterns, alert on anomalies'],
      personal: ['Morning briefing agent — today\'s calendar, weather, news, tasks, and priorities', 'Email triage agent — categorise, draft replies to routine emails, flag urgent ones', 'Health tracking agent — log meals, exercise, sleep, generate weekly insights'],
    },
    industryTools: ['notion', 'google-workspace', 'todoist', 'ynab', 'zapier', 'telegram'],
    useCases: [
      'Morning briefing — calendar, weather, top tasks, and priorities delivered at 7am',
      'Email triage — categorise inbox, draft routine replies, flag urgent messages',
      'Personal finance tracker — categorise spending, spot trends, monthly summary',
      'Content scheduler — draft posts, schedule across platforms, track engagement',
      'Health & habit tracker — log activities, generate weekly insights, suggest adjustments',
    ],
    whyThisMatters: 'Your life has patterns just like a business — emails, finances, scheduling, content, health. An agent that handles the repetitive parts gives you back hours every week for the things that actually matter to you.',
    module7Goal: 'Personal AI Assistant — email triage, daily briefing, task management',
    module8Capstone: 'Full Life Automation — email + calendar + finances + health + content + briefings',
  },

  'other': {
    label: 'Other',
    color: '#94a3b8',
    roleExamples: [
      'Describe your actual role — what you do day-to-day, what problems you solve, what tools you use',
    ],
    automationExamples: {
      career: ['Build a portfolio of agent projects relevant to your specific field'],
      business: ['Identify your most repeated workflow and automate it end-to-end'],
      project: ['Describe your system — what connects to what, what runs automatically, what you approve'],
      personal: ['Think about what you do every week that follows the same pattern'],
    },
    industryTools: [],
    useCases: [
      'Automate any repeated workflow that follows a consistent pattern',
      'Build an agent that handles the routine so you focus on the exceptions',
      'Connect the tools you already use into one intelligent system',
    ],
    whyThisMatters: 'Every industry has repeated patterns. If you can describe it step-by-step, an agent can learn it.',
    module7Goal: 'Your Custom Automation Agent',
    module8Capstone: 'Full Orchestrated System',
  },
}

// ─── Tools: Common + industry-specific ───────────────────────────────────────
// Each tool has a category and optional `industries` array.
// If `industries` is empty/absent, it's shown for everyone.

export const COMMON_TOOLS = [
  // Accounting & Finance
  { id: 'xero',            label: 'Xero',              category: 'accounting' },
  { id: 'quickbooks',      label: 'QuickBooks',        category: 'accounting' },
  { id: 'sage',            label: 'Sage',              category: 'accounting' },
  { id: 'myob',            label: 'MYOB',              category: 'accounting' },
  { id: 'receipt-bank',    label: 'Dext / Receipt Bank', category: 'accounting' },
  { id: 'ynab',            label: 'YNAB',              category: 'accounting', industries: ['personal'] },

  // CRM & Sales
  { id: 'salesforce',      label: 'Salesforce',        category: 'crm' },
  { id: 'hubspot',         label: 'HubSpot',           category: 'crm' },
  { id: 'pipedrive',       label: 'Pipedrive',         category: 'crm' },
  { id: 'zoho-crm',        label: 'Zoho CRM',          category: 'crm' },

  // Communication
  { id: 'slack',           label: 'Slack',             category: 'comms' },
  { id: 'ms-teams',        label: 'Microsoft Teams',   category: 'comms' },
  { id: 'gmail',           label: 'Gmail / Workspace', category: 'comms' },
  { id: 'twilio-sms',      label: 'Twilio / SMS',      category: 'comms' },
  { id: 'whatsapp-biz',    label: 'WhatsApp Business', category: 'comms' },
  { id: 'telegram',        label: 'Telegram',          category: 'comms' },

  // Productivity
  { id: 'notion',          label: 'Notion',            category: 'productivity' },
  { id: 'asana',           label: 'Asana / Monday',    category: 'productivity' },
  { id: 'airtable',        label: 'Airtable',          category: 'productivity' },
  { id: 'google-sheets',   label: 'Google Sheets',     category: 'productivity' },
  { id: 'todoist',         label: 'Todoist',           category: 'productivity', industries: ['personal'] },
  { id: 'miro',            label: 'Miro',              category: 'productivity', industries: ['consulting', 'creative-media'] },

  // Development
  { id: 'github',          label: 'GitHub',            category: 'dev' },
  { id: 'vscode',          label: 'VS Code / Cursor',  category: 'dev' },
  { id: 'jira',            label: 'Jira',              category: 'dev', industries: ['tech-software', 'data-ai'] },
  { id: 'linear',          label: 'Linear',            category: 'dev', industries: ['tech-software'] },
  { id: 'datadog',         label: 'Datadog',           category: 'dev', industries: ['tech-software'] },
  { id: 'jupyter',         label: 'Jupyter / Notebooks', category: 'dev', industries: ['data-ai'] },
  { id: 'airflow',         label: 'Airflow',           category: 'dev', industries: ['data-ai'] },
  { id: 'databricks',      label: 'Databricks',        category: 'dev', industries: ['data-ai'] },

  // Healthcare
  { id: 'cliniko',         label: 'Cliniko',           category: 'healthcare', industries: ['healthcare'] },
  { id: 'practice-fusion', label: 'Practice Fusion',   category: 'healthcare', industries: ['healthcare'] },
  { id: 'hotdoc',          label: 'HotDoc',            category: 'healthcare', industries: ['healthcare'] },
  { id: 'dentally',        label: 'Dentally',          category: 'dental', industries: ['dental'] },
  { id: 'dental-pms',      label: 'Other Dental PMS',  category: 'dental', industries: ['dental'] },

  // Legal
  { id: 'clio',            label: 'Clio',              category: 'legal', industries: ['legal'] },
  { id: 'leap-legal',      label: 'LEAP',              category: 'legal', industries: ['legal'] },
  { id: 'practice-panther', label: 'Practice Panther', category: 'legal', industries: ['legal'] },

  // HR & Recruitment
  { id: 'bamboohr',        label: 'BambooHR',          category: 'hr', industries: ['hr-recruitment'] },
  { id: 'greenhouse',      label: 'Greenhouse',        category: 'hr', industries: ['hr-recruitment'] },
  { id: 'lever',           label: 'Lever',             category: 'hr', industries: ['hr-recruitment'] },
  { id: 'workday',         label: 'Workday',           category: 'hr', industries: ['hr-recruitment'] },

  // E-commerce
  { id: 'shopify',         label: 'Shopify',           category: 'ecommerce', industries: ['retail-ecom'] },
  { id: 'woocommerce',     label: 'WooCommerce',       category: 'ecommerce', industries: ['retail-ecom'] },
  { id: 'cin7',            label: 'Cin7',              category: 'ecommerce', industries: ['retail-ecom', 'operations'] },
  { id: 'klaviyo',         label: 'Klaviyo',           category: 'ecommerce', industries: ['retail-ecom', 'sales-marketing'] },

  // Creative
  { id: 'figma',           label: 'Figma',             category: 'creative', industries: ['creative-media'] },
  { id: 'canva',           label: 'Canva',             category: 'creative', industries: ['creative-media', 'sales-marketing'] },
  { id: 'adobe-cc',        label: 'Adobe CC',          category: 'creative', industries: ['creative-media'] },
  { id: 'buffer',          label: 'Buffer / Hootsuite', category: 'creative', industries: ['creative-media', 'sales-marketing'] },

  // Education
  { id: 'canvas-lms',      label: 'Canvas LMS',        category: 'education', industries: ['education'] },
  { id: 'google-classroom', label: 'Google Classroom', category: 'education', industries: ['education'] },

  // Real Estate
  { id: 'property-tree',   label: 'PropertyTree',      category: 'real-estate', industries: ['real-estate'] },
  { id: 're-agent',        label: 'REA / Domain',      category: 'real-estate', industries: ['real-estate'] },

  // Hospitality
  { id: 'square',          label: 'Square POS',        category: 'hospitality', industries: ['hospitality'] },
  { id: 'toast-pos',       label: 'Toast POS',         category: 'hospitality', industries: ['hospitality'] },
  { id: 'deputy',          label: 'Deputy',            category: 'hospitality', industries: ['hospitality', 'retail-ecom'] },

  // Marketing / Ads
  { id: 'google-ads',      label: 'Google Ads',        category: 'marketing', industries: ['sales-marketing'] },
  { id: 'meta-ads',        label: 'Meta Ads',          category: 'marketing', industries: ['sales-marketing'] },
  { id: 'mailchimp',       label: 'Mailchimp',         category: 'marketing', industries: ['sales-marketing'] },

  // Payments
  { id: 'stripe',          label: 'Stripe',            category: 'payments' },

  // General
  { id: 'linkedin',        label: 'LinkedIn',          category: 'social' },
  { id: 'docusign',        label: 'DocuSign',          category: 'documents', industries: ['legal', 'real-estate', 'consulting'] },
  { id: 'zapier',          label: 'Zapier / Make',     category: 'automation' },
]

/**
 * Returns tools sorted for a given industry:
 * 1. Industry-specific tools first (highlighted)
 * 2. Common tools (no industry restriction) second
 * 3. Other industry tools last (hidden by default)
 */
export function getToolsForIndustry(industryId) {
  const specific = COMMON_TOOLS.filter(t =>
    t.industries && t.industries.includes(industryId)
  )
  const common = COMMON_TOOLS.filter(t => !t.industries)
  const other = COMMON_TOOLS.filter(t =>
    t.industries && !t.industries.includes(industryId)
  )
  return { specific, common, other }
}

// ─── Contextual tips generator ───────────────────────────────────────────────

/**
 * Returns { heading, body, examples } based on step, field, and full profile.
 * Everything adapts to what the user has already selected.
 */
export function getContextualTip(step, activeField, profile) {
  const industry = INDUSTRY_TEMPLATES[profile.industry]
  const industryLabel = industry?.label || 'your industry'
  const goalTrack = GOAL_TRACKS.find(g => g.id === profile.goalTrack)

  // Step 1: Industry selection
  if (step === 1) {
    if (activeField === 'industry') {
      return {
        heading: 'Pick the closest match.',
        body: 'This shapes every example, tool suggestion, and project brief in your course. If you\'re between two — pick where you spend most of your automation energy.',
        examples: [],
      }
    }
    if (activeField === 'businessType') {
      return {
        heading: 'How big is the world this agent operates in?',
        body: 'Solo/freelance agents tend to be personal productivity tools. Team agents need approval workflows and shared state. Enterprise agents need compliance and audit trails.',
        examples: [],
      }
    }
    return {
      heading: 'Start here. Everything adapts from this.',
      body: 'Your industry determines the examples, tools, use cases, and project briefs throughout your entire course. Pick the closest match — we have specific content for each one.',
      examples: [],
    }
  }

  // Step 2: About you
  if (step === 2) {
    if (activeField === 'role' && industry) {
      return {
        heading: `What do you actually do in ${industryLabel}?`,
        body: 'Not your job title — what lands on your desk. The software you deal with, the problems you solve, the people you coordinate with.',
        examples: industry.roleExamples || [],
      }
    }
    if (activeField === 'name') {
      return {
        heading: 'This personalises your course.',
        body: 'Your name appears in your MEMORY.md, your dashboard, and your completion certificate.',
        examples: [],
      }
    }
    return {
      heading: industry ? `You're in ${industryLabel}. Now tell us who you are.` : 'Tell us about yourself.',
      body: 'The more specific your role description, the more your MEMORY.md and examples will match your actual day-to-day.',
      examples: industry?.roleExamples?.slice(0, 2) || [],
    }
  }

  // Step 3: What to build
  if (step === 3) {
    if (activeField === 'goalTrack') {
      return {
        heading: 'One primary direction for 30 days.',
        body: industry
          ? `For ${industryLabel}, each track gives you different agent projects. Career = upskill + portfolio. Business = automate your actual workflows. Project = build one specific system. Personal = automate your life admin.`
          : 'Pick the track that matches where you want the most impact. You can always explore the others later.',
        examples: [],
      }
    }
    if (activeField === 'automationGoal') {
      const trackKey = profile.goalTrack || 'business'
      const examples = industry?.automationExamples?.[trackKey] || []
      return {
        heading: industry
          ? `What would an agent automate for you in ${industryLabel}?`
          : 'What takes the most time in your week?',
        body: 'The most painful, repeated thing in your week. The one you dread doing manually. This becomes your Module 7 project seed.',
        examples: examples.slice(0, 4),
      }
    }
    if (activeField === 'projectDescription') {
      const projExamples = industry?.automationExamples?.project || []
      return {
        heading: 'Describe your system clearly.',
        body: 'Name the software it connects to. Describe what runs automatically and what you approve before it acts. This becomes your Module 7 brief.',
        examples: projExamples.slice(0, 3),
      }
    }
    return {
      heading: industry ? `What should your ${industryLabel} agent do?` : 'What do you want to build?',
      body: 'This shapes your Module 7 project and the examples throughout the course.',
      examples: [],
    }
  }

  // Step 4: Tools
  if (step === 4) {
    if (activeField === 'successVision') {
      const visionExamples = []
      if (profile.goalTrack === 'career') {
        visionExamples.push('"I wake up and my agent has found 3 well-matched roles, drafted personalised applications, and they\'re queued for my review before sending."')
      }
      if (profile.goalTrack === 'business' && industry) {
        visionExamples.push(`"My ${industryLabel.toLowerCase()} operations run on autopilot. The agent handles the routine — I just see exceptions and approve the important ones."`)
      }
      if (profile.goalTrack === 'project') {
        visionExamples.push('"The system I described is running. Data flows between my tools automatically. I review a daily summary and only step in when something needs a human decision."')
      }
      if (profile.goalTrack === 'personal') {
        visionExamples.push('"My morning starts with a briefing — today\'s priorities, what the agent handled overnight, and what needs my attention. The routine is on autopilot."')
      }
      return {
        heading: 'What does "done" feel like?',
        body: 'Describe the specific moment when you know this was worth 30 days. Be concrete.',
        examples: visionExamples,
      }
    }
    return {
      heading: industry ? `Your ${industryLabel} toolkit` : 'What systems does your agent need to connect to?',
      body: industry
        ? `We've highlighted tools common in ${industryLabel}. Tick everything in your stack — your MEMORY.md and Module 7 build will reference these specifically.`
        : 'Tick everything you use. Your MEMORY.md and project build will reference these specifically.',
      examples: [],
    }
  }

  // Step 5: Generate
  if (step === 5) {
    return {
      heading: 'This is the intelligence step.',
      body: 'Your OpenAI key is used for one generation call (~$0.002) to write your personalised MEMORY.md, your specific Module 7 project brief, and tailored examples for every module. The key is never stored.',
      examples: [],
    }
  }

  // Step 6: Preview
  if (step === 6) {
    return {
      heading: 'Your course is ready.',
      body: 'Review what\'s been generated. Everything is editable — your MEMORY.md in Module 2, your project scope in Module 7. This is your starting point.',
      examples: [],
    }
  }

  return {
    heading: 'Let\'s build your course.',
    body: 'Answer a few questions and we\'ll tailor everything to your world.',
    examples: [],
  }
}
