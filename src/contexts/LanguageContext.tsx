import React, { createContext, useContext, useEffect, useState } from 'react'

type Language = 'en' | 'kn'

type LanguageContextValue = {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const STORAGE_KEY = 'site_language'

const translations: Record<Language, Record<string, string>> = {
  en: {
    get_started: 'Get Started',
    chat_placeholder: 'Ask about crops, soil, pests...',
    chat_welcome: "Hello! How can I help you with your farming questions today?",
    run_analysis: 'Run AI Analysis',
    running_analysis: 'Running AI Analysis...',
    ready_for_analysis_title: 'Ready for Analysis',
    ready_for_analysis_description: 'Fill in the region parameters and click "Run ML Analysis" to get your personalized crop recommendations.',

    // Homepage
    hero_title_part1: 'Smarter Farming for a',
    hero_title_accent: 'Sustainable Future',
    hero_subtitle: 'Harnessing AI to recommend the perfect crop mix for your land, increasing yield, profit, and soil health.',
    hero_cta: 'Get Crop Recommendations',
    problems_title: 'The Challenge of Monoculture',
    problems_subtitle: 'Traditional single-crop farming practices pose significant risks to both farmers and the environment',
    problem1_title: 'Soil Degradation',
    problem1_desc: 'Monoculture depletes soil nutrients and reduces fertility over time',
    problem2_title: 'Pest Vulnerability',
    problem2_desc: 'Single crops are more susceptible to diseases and pest outbreaks',
    problem3_title: 'Market Risks',
    problem3_desc: 'Dependence on one crop creates income instability due to price fluctuations',

    solution_title: 'AI-Powered Crop Diversification',
    solution_subtitle: 'Our advanced machine learning system analyzes multiple data points to provide personalized crop recommendations that optimize yield, profit, and sustainability.',

    features_title: 'Transform Your Farming with AI',
  features_subtitle: 'Our platform delivers powerful insights to help you make informed decisions about crop selection and farm management',
    data_input_title: 'Data Input',
    data_input_desc: 'Soil conditions, climate data, and regional parameters',
    ai_analysis_title: 'AI Analysis',
    ai_analysis_desc: 'XGBoost algorithm processes complex patterns in agricultural data',
    smart_recommendations_title: 'Smart Recommendations',
    smart_recommendations_desc: 'Personalized crop mix with yield and profit predictions',
  feature1_title: 'Data-Driven Insights',
  feature1_desc: 'Predicts optimal crops based on soil, climate, and location data using advanced machine learning',
  feature2_title: 'Increased Profitability',
  feature2_desc: 'Recommends high-value crops with stable market demand to maximize your income',
  feature3_title: 'Enhanced Soil Health',
  feature3_desc: 'Promotes crop rotation that naturally enriches the soil and improves fertility',
  feature4_title: 'Climate Resilience',
  feature4_desc: 'Helps select crops that can withstand environmental stress and climate variations',
    final_cta_title: 'Ready to Diversify Your Farm?',
    final_cta_subtitle: 'Get personalized crop recommendations based on your specific conditions and start farming smarter today.',
    try_tool: 'Try Our Tool Now',
    learn_how: 'Learn How It Works',

    // HowItWorks
    how_title: 'How Our AI Technology Works',
    how_subtitle: 'Discover the science behind our crop diversification recommendations and how we\'re revolutionizing agriculture in Karnataka',
  step_label: 'Step',
  step1_title: 'Data Collection',
  step1_description: 'Our model is trained on vast datasets of soil, climate, and historical yield data from Karnataka. We analyze thousands of data points including temperature, rainfall, soil pH, nutrient levels, and crop performance records.',
  step1_feat1: 'Historical yield data from 29 districts',
  step1_feat2: 'Soil composition and health metrics',
  step1_feat3: 'Climate patterns and seasonal variations',
  step1_feat4: 'Market price trends and demand patterns',

  step2_title: 'AI-Powered Analysis',
  step2_description: 'The system uses XGBoost, a powerful machine learning algorithm, to find complex patterns in the data. This advanced gradient boosting technique can identify non-linear relationships between environmental factors and crop success.',
  step2_feat1: 'XGBoost gradient boosting algorithm',
  step2_feat2: 'Feature importance analysis',
  step2_feat3: 'Cross-validation for accuracy',
  step2_feat4: 'Ensemble learning for robust predictions',

  step3_title: 'Actionable Recommendations',
  step3_description: 'The model generates a personalized list of crops, complete with predictions on yield, profit, and environmental benefits. Each recommendation is tailored to your specific conditions and goals.',
  step3_feat1: 'Yield predictions with confidence intervals',
  step3_feat2: 'Profit estimation based on market data',
  step3_feat3: 'Soil health impact assessment',
  step3_feat4: 'Risk-benefit analysis for each crop',

  technology_card1_title: 'XGBoost ML',
  technology_card1_desc: 'Advanced gradient boosting for accurate predictions',
  technology_card2_title: 'Big Data',
  technology_card2_desc: "Extensive agricultural datasets from Karnataka",
  technology_card3_title: 'Deep Learning',
  technology_card3_desc: 'Neural networks for pattern recognition',
  technology_card4_title: 'Real-time API',
  technology_card4_desc: 'Fast, scalable predictions via REST API',

  benefit1_title: 'Increased Profitability',
  benefit1_desc: 'Optimize crop selection for maximum economic returns',
  benefit2_title: 'Soil Health',
  benefit2_desc: 'Improve long-term soil fertility through strategic rotation',
  benefit3_title: 'Risk Mitigation',
  benefit3_desc: 'Reduce vulnerability to pests, diseases, and market fluctuations',
  benefit4_title: 'Data-Driven Decisions',
  benefit4_desc: 'Make informed choices based on scientific analysis',
  our_methodology_title: 'Our Methodology',
  technology_stack_title: 'Technology Stack',
  benefits_title: 'Why It Works',
  how_cta_title: 'Ready to Experience AI-Powered Farming?',
  how_cta_subtitle: 'See our technology in action and get personalized recommendations for your farm',
  try_dashboard: 'Try the Dashboard',
  learn_more_about_project: 'Learn More About the Project',

    // About
    about_title: 'About CropDiversify',
    about_subtitle: 'An innovative academic project revolutionizing agricultural decision-making through artificial intelligence and sustainable farming practices',
  our_mission_title: 'Our Mission',
  mission_description: 'To empower farmers in Karnataka with intelligent, data-driven crop diversification recommendations that enhance productivity, profitability, and sustainability.',
  project_objectives_title: 'Project Objectives',
  objective1_title: 'Promote Sustainable Agriculture',
  objective1_desc: 'Encourage farming practices that maintain soil health and environmental balance while maximizing productivity.',
  objective2_title: 'Enhance Farmer Livelihoods',
  objective2_desc: 'Increase farmer income through optimized crop selection and reduced agricultural risks.',
  objective3_title: 'Climate Resilience',
  objective3_desc: 'Help farmers adapt to climate change through diversified and resilient cropping systems.',
  objective4_title: 'Knowledge Transfer',
  objective4_desc: 'Bridge the gap between agricultural research and practical farming applications.',
  project_impact_title: 'Project Impact',
  key_features_title: 'Key Features',
  academic_excellence_title: 'Academic Excellence',
  academic_bullet1: 'Research-driven approach with peer-reviewed methodologies',
  academic_bullet2: 'Collaborative effort between students and faculty',
  academic_bullet3: 'Focus on sustainable agricultural practices',
  vision_title: 'Our Vision for the Future',
  try_our_tool: 'Try Our Tool',
  meet_our_team: 'Meet Our Team',

  about_feature1_title: 'AI-Powered Recommendations',
  about_feature1_desc: 'Advanced machine learning algorithms analyze multiple factors to suggest optimal crop combinations',
  about_feature2_title: 'Regional Specificity',
  about_feature2_desc: "Tailored recommendations based on Karnataka's diverse agro-climatic zones and soil conditions",
  about_feature3_title: 'User-Friendly Interface',
  about_feature3_desc: 'Simple, intuitive dashboard accessible to farmers with varying levels of technological literacy',
  about_feature4_title: 'Evidence-Based Approach',
  about_feature4_desc: 'Recommendations backed by extensive research and validated agricultural data',

  impact1_label: 'Districts Covered',
  impact1_desc: 'Across Karnataka state',
  impact2_label: 'Prediction Accuracy',
  impact2_desc: 'In crop yield forecasting',
  impact3_label: 'Seasons Analyzed',
  impact3_desc: 'Kharif, Rabi, and Summer',
  impact4_label: 'Key Crops',
  impact4_desc: 'In recommendation system',

  methodology_bullet1: 'Comprehensive data collection from Karnataka Agricultural Department',
  methodology_bullet2: 'Machine learning model training using XGBoost algorithm',
  methodology_bullet3: 'Cross-validation and performance optimization',
  methodology_bullet4: 'User interface design based on farmer feedback',
  methodology_bullet5: 'Integration of traditional knowledge with modern technology',

    // Team
  team_title: 'Meet Our Team',
  team_subtitle: 'The passionate individuals behind CropDiversify, dedicated to revolutionizing agriculture through technology and innovation',
  guide_title: 'Project Guide',
  guide_expertise_title: 'Expertise',
  guide_achievements_title: 'Achievements',
  guide_description: 'Dr. Prasad is an experienced faculty member with expertise in machine learning and agricultural technology. He has guided numerous projects in the intersection of AI and agriculture, with several publications in international journals.',
  guide_achievement_1: '10+ years of teaching experience',
  guide_achievement_2: 'Published researcher in AI and Agriculture',
  guide_achievement_3: 'Mentor for 50+ student projects',
  guide_achievement_4: 'Industry consultant for agricultural tech',
  student_developers_title: 'Student Developers',
  specializations_title: 'Specializations',
  contact_label: 'Contact',
  institution_name: 'SDM Institute of Technology, Ujire',
  institution_description: 'A premier engineering institution committed to excellence in technical education and research. SDM Institute of Technology has been fostering innovation and producing skilled engineers who contribute significantly to society and industry.',
  visit_website: 'Visit Institution Website',
  cs_department: 'Computer Science Department',
  acknowledgments_title: 'Acknowledgments',
  acknowledgments_para1: 'We extend our heartfelt gratitude to the Karnataka Agricultural Department for providing the essential data, and to all the farmers who shared their valuable insights during our research phase.',
  acknowledgments_para2: 'Special thanks to our institution for providing the resources and support necessary to bring this project to life.',
  member_ayush_description: 'Specialized in machine learning algorithms and data preprocessing. Led the development of the XGBoost model for crop prediction.',
  member_chiranth_description: 'Focused on API development and database management. Built the FastAPI backend and data pipeline infrastructure.',
  member_yashwanthk_description: 'Designed and developed the user interface. Ensured the platform is accessible and user-friendly for farmers.',
  member_yashwantht_description: 'Conducted agricultural research and data analysis. Validated model performance and agricultural accuracy.',

    // NotFound
    notfound_title: 'Oops! Page not found',
    notfound_return: 'Return to Home',

    // Footer
    footer_brand: 'CropDiversify',
    footer_description: 'Harnessing AI to recommend the perfect crop mix for your land, increasing yield, profit, and soil health for sustainable farming.'
    ,
    quick_links: 'Quick Links',
    resources_title: 'Resources',
    research_paper: 'Research Paper',
    api_documentation: 'API Documentation',
    contact_email: 'cropDiversify@sdmit.in',
    address_line: 'SDM Institute of Technology, Ujire, Karnataka',
    home_label: 'Home',
    dashboard_label: 'Dashboard',
    how_it_works_label: 'How It Works',
    about_project_label: 'About Project',
    our_team_label: 'Our Team',
    copyright_line: '© 2024 CropDiversify. An Academic Project by SDM Institute of Technology.',
    built_for: 'Built for sustainable agriculture in Karnataka, India'
  },
  kn: {
    get_started: 'ಆರಂಭಿಸಿ',
    chat_placeholder: 'ಬೆಳೆಗಳು, ಮಣ್ಣು, ಕೀಟಗಳ ಬಗ್ಗೆ ಪ್ರಶ್ನೆ ಮಾಡಿ...',
    chat_welcome: 'ಹೇಲೋ! ನಿಮ್ಮ ಕೃಷಿ ಪ್ರಶ್ನೆಗಳಲ್ಲಿ 나는 ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
    run_analysis: 'ಎಐ ವಿಶ್ಲೇಷಣೆ ರನ್ ಮಾಡಿ',
    running_analysis: 'ಎಐ ವಿಶ್ಲೇಷಣೆ ನಡೆಯುತ್ತಿದೆ...',
    ready_for_analysis_title: 'ವಿಶ್ಲેષಣೆಗೆ ಸಿದ್ಧವಾಗಿದೆ',
    ready_for_analysis_description: 'ಪ್ರದೇಶದ ಪರಮಿತಿಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಬೆಳೆ ಶಿಫಾರಸ್ಸುಗಳನ್ನು ಪಡೆಯಲು "ಎಮ್ಎಲ್ ವಿಶ್ಲೇಷಣೆ ರನ್ ಮಾಡಿ" ಕ್ಲಿಕ್ ಮಾಡಿ.',

    // Homepage
    hero_title_part1: 'ಸ್ಮಾರ್ಟ್ ಕೃಷಿ',
    hero_title_accent: 'ಟಿಕಾವುದಾದ ಭವಿಷ್ಯದಿಗಾಗಿ',
    hero_subtitle: 'ನಿಮ್ಮ ಭೂಮಿಗಾಗಿ ಸೂಕ್ತ ಬೆಳೆ ಮಿಶ್ರಣವನ್ನು ಶಿಫಾರಸು ಮಾಡಲು ಎಐ ಬಳಸಿ, ಉತ್ಪಾದನೆ, ಲಾಭ ಮತ್ತು ಮಣ್ಣಿನ ಆರೋಗ್ಯವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.',
    hero_cta: 'ಬೆಳೆ ಶಿಫಾರಸ್ಸುಗಳನ್ನು ಪಡೆಯಿರಿ',
    problems_title: 'ಏಕಜಾತೀಯ ಕೃಷಿಯ ಸವಾಲು',
    problems_subtitle: 'ಸಾಂಪ್ರದಾಯಿಕ ಏಕಜಾತೀಯ ಕೃಷಿ ಅಭ್ಯಾಸಗಳು ರೈತರು ಮತ್ತು ಪರಿಸರದ ಮೇಲೆ ಪ್ರಮುಖ ಅಪಾಯಗಳನ್ನು ಉಂಟುಮಾಡುತ್ತವೆ',
    problem1_title: 'ಮಣ್ಣಿನ ಕುಗ್ಗು',
    problem1_desc: 'ಏಕಜಾತೀಯ ಕೃಷಿ ಮಣ್ಣಿನ ಪೋಷಕಾಂಶಗಳನ್ನು ಕಡಿಮೆಮಾಡುತ್ತದೆ ಮತ್ತು ಉಳಿತಾಯವನ್ನು ಹಾಳು ಮಾಡುತ್ತದೆ',
    problem2_title: 'ಕೀಟ ಸಂವೇದನಶೀಲತೆ',
    problem2_desc: 'ಒಂದು ರೀತಿ ಬೆಳೆಗಳು ರೋಗಗಳು ಮತ್ತು ಕೀಟಗಳ ಮೇಲೆ ಹೆಚ್ಚು ಸೂಕ್ಷ್ಮವಾಗಿರುತ್ತವೆ',
    problem3_title: 'ಬಜಾರಿನ ಅಪಾಯಗಳು',
    problem3_desc: 'ಒಂದು ಬೆಳೆದಿ ಮೇಲೆ ಅವಲಂಬನೆ ಆದಾಯ的不ಸ್ಥಿರತೆಯನ್ನು ಸೃಷ್ಟಿಸುತ್ತದೆ',

    solution_title: 'ಎಐ ಚಾಲಿತ ಬೆಳೆ ವಿಭಜನ',
    solution_subtitle: 'ನಮ್ಮ ಸುಧಾರಿತ ಯಂತ್ರ ಅಧ್ಯಯನ ವ್ಯವಸ್ಥೆ ಅನೇಕ ದತ್ತಾಂಶದ ಅಂಶಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ ವೈಯಕ್ತಿಕ ಶಿಫಾರಸ್ಸುಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.',

    features_title: 'ಎಐ ಮೂಲಕ ನಿಮ್ಮ ಕೃಷಿಯನ್ನು ಪರಿವರ್ತಿಸಿ',
  features_subtitle: 'ಬೆಳೆ ಆಯ್ಕೆಯಲ್ಲಿ ಮತ್ತು ಫಾರ್ಮ್ ನಿರ್ವಹಣೆಯಲ್ಲಿ ಬುದ್ಧಿವಂತ ನಿರ್ಣಯಗಳನ್ನು 만드는ಲ್ಲಿ ನಮ್ಮ ವೇದಿಕೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ',
  data_input_title: 'ದತ್ತಾ ಇನ್ಪುಟ್',
  data_input_desc: 'ಮಣ್ಣು ಪರಿಸ್ಥಿತಿಗಳು, ಹವಾಮಾನ ದತ್ತಾಂಶ ಮತ್ತು ಪ್ರಾದೇಶಿಕ ಪರಿಮಾಣಗಳು',
  ai_analysis_title: 'ಎಐ ವಿಶ್ಲೇಷಣೆ',
  ai_analysis_desc: 'XGBoost ಆಲ್ಗೋರಿಥಂ ಕೃಷಿ ದತ್ತಾಂಶದ ಸಂಕೀರ್ಣ ಮಾದರಿಗಳನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುತ್ತದೆ',
  smart_recommendations_title: 'ಸ್ಮಾರ್ಟ್ ಶಿಫಾರಸ್ಸುಗಳು',
  smart_recommendations_desc: 'ಉತ್ಪಾದನೆ ಮತ್ತು ಲಾಭ ಭವಿಷ್ಯವಾಣಿಗಳೊಂದಿಗೆ ವೈಯಕ್ತಿಕ ಬೆಳೆ ಮಿಶ್ರಣ',
  feature1_title: 'ದತ್ತಾ ಚಾಲಿತ ಒಳನೋಟಗಳು',
  feature1_desc: 'ಮಣ್ಣು, ಹವಾಮಾನ ಮತ್ತು ಸ್ಥಳದ ದತ್ತಾಂಶ ಆಧರಿಸಿ ಸೂಕ್ತ ಬೆಳೆಗಳನ್ನು ಭವಿಷ್ಯವಾಣಿ ಮಾಡುತ್ತದೆ',
  feature2_title: 'ಲಾಭವರ್ಧನೆ',
  feature2_desc: 'ಸ್ಥಿರ ಮಾರುಕಟ್ಟೆ ಬೇಡಿಕೆಯನ್ನು ಹೊಂದಿರುವ ಉನ್ನತ ಮೌಲ್ಯದ ಬೆಳೆಗಳನ್ನು ಶಿಫಾರಸು ಮಾಡುತ್ತದೆ',
  feature3_title: 'ಮಣ್ಣಿನ ಆರೈಕೆ',
  feature3_desc: 'ಬೆಳೆ ಚಕ್ರವನ್ನು ಪ್ರೋತ್ಸಾಹಿಸಿ ಮಣ್ಣಿನ ಪೋಷಕಾಂಶಗಳನ್ನು ಸುಧಾರಿಸುತ್ತದೆ',
  feature4_title: 'ಹವಾಮಾನ ಸಹನಶೀಲತೆ',
  feature4_desc: 'ಪರಿಸರ ಒತ್ತಡಗಳಿಗೆ ತಾಳಮಾಡುವ ಬೆಳೆಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ',
    final_cta_title: 'ನಿಮ್ಮ ರೈತಿಯನ್ನು ವಿಭಜಿಸಲು ಸಿದ್ಧರಾ?',
    final_cta_subtitle: 'ನಿಮ್ಮ ನಿರ್ದಿಷ್ಟ ಪರಿಸ್ಥಿತಿಗಳ ಆಧಾರದಲ್ಲಿ ವೈಯಕ್ತಿಕ ಶಿಫಾರಸ್ಸುಗಳನ್ನು ಪಡೆಯಿರಿ ಮತ್ತು ಸ್ಮಾರ್ಟ್ ಕೃಷಿಯನ್ನು ಪ್ರಾರಂಭಿಸಿ.',
    try_tool: 'ಈಗ ನಮ್ಮ ಸಾಧನ ಪ್ರಯತ್ನಿಸಿ',
    learn_how: 'ಯಾವ ರೀತಿ ಕೆಲಸ ಮಾಡುತ್ತದೆ',

    // HowItWorks
    how_title: 'ನಮ್ಮ ಎಐ ತಂತ್ರಜ್ಞಾನ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ',
    how_subtitle: 'ನಮ್ಮ ಬೆಳೆ ವಿಭಜನ ಶಿಫಾರಸ್ಸುಗಳ ಹಿಂದಿನ ವಿಜ್ಞಾನವನ್ನು ಮತ್ತು ನಾವು ಕರ್ನಾಟಕದಲ್ಲಿ ಹೇಗೆ ಕೃಷಿಯನ್ನು ಪರಿವರ್ತಿಸುತ್ತಿದ್ದೇವೆ ಎಂಬುದನ್ನು ಅನ್ವೇಷಿಸಿ',
  step_label: 'ಸ್ಟೆಪ್',
  step1_title: 'ದತ್ತಾ ಸಂಗ್ರಹಣೆ',
  step1_description: 'ನಮ್ಮ ಮಾದರಿ ಕರ್ನಾಟಕದಿಂದ来的 ಮಣ್ಣು, ಹವಾಮಾನ ಮತ್ತು ಐತಿಹಾಸಿಕ ಉತ್ಪಾದನಾ ದತ್ತಾಂಶಗಳ ಮೊತ್ತದ ಡೇಟಾಸೆಟ್‌ಗಳಲ್ಲಿ ತರಬೇತಿ ಮಾಡಲಾಗಿದೆ. ನಾವು ತಾಪಮಾನ, ಮಳೆಗೆ, ಮಣ್ಣಿನ pH, ಪೋರಕಾಂಶ ಮಟ್ಟಗಳು ಮತ್ತು ಬೆಳೆ ಪ್ರದರ್ಶನ ದಾಖಲಾತಿಗಳು ಸೇರಿದಂತೆ ಸಾವಿರಾರು ದತ್ತಾಂಶ пунк್ಟುಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತೇವೆ.',
  step1_feat1: '29 ಜಿಲ್ಲೆಗಳ ಐತಿಹಾಸಿಕ ಉತ್ಪಾದನಾ ದತ್ತಾಂಶ',
  step1_feat2: 'ಮಣ್ಣು ಸಂರಚನೆ ಮತ್ತು ಆರೋಗ್ಯದ ಮೌಲ್ಯಗಳನ್ನು',
  step1_feat3: 'ಹವಾಮಾನ ಮಾದರಿಗಳು ಮತ್ತು ಋತುವಿನ ವ್ಯತ್ಯಾಸಗಳು',
  step1_feat4: 'ಬಜಾರಿನ ಬೆಲೆ ಪ್ರವಣತೆಗಳು ಮತ್ತು ಬೇಡಿಕೆ ಮಾದರಿಗಳು',

  step2_title: 'ಎಐ-ಆಧಾರಿತ ವಿಶ್ಲೇಷಣೆ',
  step2_description: 'ವ್ಯವಸ್ಥೆ ಡೇಟಾದಲ್ಲಿನ ಸಂಕೀರ್ಣ ಮಾದರಿಗಳನ್ನು ಕಂಡುಹಿಡಿಯಲು XGBoost ಎಂಬ ಶಕ್ತಿಶಾಲಿ ಯಂತ್ರಾ ಅಧ್ಯಯನ ಆಲ್ಗೋರಿಥಂ ಬಳಸುತ್ತದೆ. ಈ ಸುಧಾರಿತ ಗ್ರೇಡಿಯಂಟ್ ಬೂಸ್ಟಿಂಗ್ ತಂತ್ರಜ್ಞಾನ ಪರಿಸರಾಂಶ ಮತ್ತು ಬೆಳೆ ಯಶಸ್ಸಿನ ನಡುವಿನ ಅರೆ-ರೇಖೀಯ ಸಂಬಂಧಗಳನ್ನು ಗುರುತಿಸಬಹುದು.',
  step2_feat1: 'XGBoost ಗ್ರೇಡಿಯಂಟ್ ಬೂಸ್ಟಿಂಗ್ ಆಲ್ಗೋರಿಥಂ',
  step2_feat2: 'ಫೀಚರ್ ಮಹತ್ವ ವಿಶ್ಲೇಷಣೆ',
  step2_feat3: 'ನಿಖರತೆಗೆ ಕ್ರಾಸ್-ವ್ಯಾಲಿಡೇಶನ್',
  step2_feat4: 'ಮುಕ್ತವರ್ಗ học (Ensemble) ದೃಡ ಉತ್ತಮ ನಿರೀಕ್ಷಣೆಗಳು',

  step3_title: 'ಕೈಗೊಳ್ಳಬಹುದಾದ ಶಿಫಾರಸ್ಸುಗಳು',
  step3_description: 'ಮಾಡೆಲ್ ವೈಯಕ್ತಿಕ ಶಿಫಾರಸ್ಸುಗಳ ಪಟ್ಟಿಯನ್ನು ರಚಿಸುತ್ತದೆ, ಉತ್ಪಾದನೆ, ಲಾಭ ಮತ್ತು ಪರಿಸರ ಲಾಭಗಳ ಮೇಲೆ ಭವಿಷ್ಯವಾಣಿಗಳನ್ನು ಒಳಗೊಂಡಿದೆ. ಪ್ರತಿ ಶಿಫಾರಸ್ಸು ನಿಮ್ಮ ನಿರ್ದಿಷ್ಟ ಪರಿಸ್ಥಿತಿಗಳಿಗನುಗುಣವಾಗಿದೆ.',
  step3_feat1: 'ಆತ್ಮವಿಶ್ವಾಸ ದೈಲ್ಪಟ್ಟುಗಳೊಂದಿಗೆ ಉತ್ಪಾದನಾ ಭವಿಷ್ಯವಾಣಿ',
  step3_feat2: 'ಬಜಾರಿನ ದತ್ತಾಂಶ ಆಧಾರದ ಮೇಲೆ ಲಾಭ ಅಂದಾಜು',
  step3_feat3: 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಪರಿಣಾಮ ಮೌಲ್ಯಮಾಪನ',
  step3_feat4: 'ಪ್ರತಿ ಬೆಳೆಗಾಗಿ ಅಪಾಯ-ಲಾಭ ವಿಶ್ಲೇಷಣೆ',

  technology_card1_title: 'XGBoost ML',
  technology_card1_desc: 'ನಿಖರ ಭವಿಷ್ಯವಾಣಿಯಲ್ಲಿ ಆಧುನಿಕ ಗ್ರೇಡಿಯಂಟ್ ಬೂಸ್ಟಿಂಗ್',
  technology_card2_title: 'ದತ್ತಾ-ವೈಶಾಲ್ಯ (Big Data)',
  technology_card2_desc: 'ಕರ್ನಾಟಕದ ವ್ಯಾಪಕ ಕೃಷಿ ದತ್ತಾಂಶಗಳ ಸಂಗ್ರಹ',
  technology_card3_title: 'ಡೀಪ್ ಲರ್ನಿಂಗ್',
  technology_card3_desc: 'ಮಾದರಿಗಳ ಪ್ಯಾಟರ್ನ್ ಗುರುತಿಸಲು ನ್ಯೂರಲ್ ನೆಟ್ವರ್ಕ್‌ಗಳು',
  technology_card4_title: 'ರಿಯಲ್-ಟೈಂ API',
  technology_card4_desc: 'REST API ಮೂಲಕ ವೇಗದ, ವೆಚ್ಚಯೋಗ್ಯ ಭವಿಷ್ಯವಾಣಿಗಳು',

  benefit1_title: 'ಲಾಭವರ್ಧನೆ',
  benefit1_desc: 'ಅರೋಗ್ಯಕರ ಆರ್ಥಿಕ ಫಲಾನುಭವಕ್ಕಾಗಿ ಬೆಳೆ ಆಯ್ಕೆಯನ್ನು ಆಪ್ಟಿಮೈಜ್ ಮಾಡಿ',
  benefit2_title: 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ',
  benefit2_desc: 'ತಂತ್ರಮಯ ಚಕ್ರಗಳನ್ನು ಮೂಲಕ ದೀರ್ಘಕಾಲೀನ ಮಣ್ಣಿನ ಉಳಿತಾಯ ಸುಧಾರಣೆ',
  benefit3_title: ' ಅಪಾಯ ನಿವಾರಣೆ',
  benefit3_desc: 'ಕೀಟಗಳು, ರೋಗಗಳು ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಏರಿಳಿತಗಳಿಗೆ ತಗ್ಗಿಸುವಂತಹ ಕ್ರಮಗಳು',
  benefit4_title: 'ದತ್ತಾ-ಆಧಾರಿತ ನಿರ್ಣಯಗಳು',
  benefit4_desc: 'ಶಾಸ್ತ್ರೀಯ ವಿಶ್ಲೇಷಣೆಯ ಆಧಾರದಲ್ಲಿ ತಿಳಿದ ನಿರ್ಣಯಗಳನ್ನು ಮಾಡಿಕೊಳ್ಳಿ',
  our_methodology_title: 'ನಮ್ಮ ವಿಧಾನಶಾಸ್ತ್ರ',
  technology_stack_title: 'ತಂತ್ರಜ್ಞಾನ ಸ್ಟాక్',
  benefits_title: 'ಇದಕ್ಕಾಗಿ ಇದು ಕೆಲಸ ಮಾಡುತ್ತದೆ',
  how_cta_title: 'ಎಐ ಚಾಲಿತ ಕೃಷಿಯನ್ನು ಅನುಭವಿಸಲು ಸಿದ್ಧರಾ?',
  how_cta_subtitle: 'ನಮ್ಮ ತಂತ್ರಜ್ಞಾನವನ್ನು ನೋಡಿ ಮತ್ತು ನಿಮ್ಮ фер್ಮ್‌ಗಾಗಿ ವೈಯಕ್ತಿಕ ಶಿಫಾರಸ್ಸುಗಳನ್ನು ಪಡೆಯಿರಿ',
  try_dashboard: 'ಡ್ಯಾಷ್‌ಬೋರ್ಡ್ ಪ್ರಯತ್ನಿಸಿ',
  learn_more_about_project: 'ಪ್ರಾಜೆಕ್ಟ್ ಕುರಿತು ಹೆಚ್ಚು ತಿಳಿದುಕೊಳ್ಳಿ',

    // About
    about_title: 'CropDiversify ಬಗ್ಗೆ',
    about_subtitle: 'ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಮತ್ತು ಟಿಕಾವುದಾದ ಕೃಷಿ ಅಭ್ಯಾಸಗಳ ಮೂಲಕ ಕೃಷಿ ನಿರ್ಣಯಗಳನ್ನು ಪರಿವರ್ತಿಸುವ ಪ್ರಾಜೆಕ್ಟ್',
  our_mission_title: 'ನಮ್ಮ ಗುರಿ',
  mission_description: 'ಕರ್ನಾಟಕದ ರೈತರಿಗೆ ಬುದ್ಧಿವಂತ ಮತ್ತು ದತ್ತಾ ಚಾಲಿತ ಬೆಳೆ ವಿಭಜನ ಶಿಫಾರಸ್ಸುಗಳನ್ನು ಒದಗಿಸಿ ಉತ್ಪಾದಕತೆ, ಲಾಭ ಮತ್ತು ಟಿಕಾವುದಾದ մշակೆಯನ್ನು ಸುಧಾರಿಸುವುದು.',
  project_objectives_title: 'ಪ್ರಾಜೆಕ್ಟ್ ಉದ್ದೇಶಗಳು',
  objective1_title: 'ಟಿಕಾವುದಾದ ಕೃಷಿಯ ಪ್ರಚಾರ',
  objective1_desc: 'ಉತ್ಪಾದಕತೆ ಹೆಚ್ಚಿಸುವಾಗ ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಮತ್ತು ಪರಿಸರ ಸರಿನಿಯತೆಯನ್ನು ಕಾಯುವ ಕೃಷಿ ಅಭ್ಯಾಸಗಳನ್ನು ಪ್ರೋತ್ಸಾಹಿಸಲು.',
  objective2_title: 'ರೈತರ ಜೀವನೋಪಾಯ ಹೆಚ್ಚಿಸು',
  objective2_desc: 'ಆప్టಿಮೈಸ್ಡ್ ಬೆಳೆ ಆಯ್ಕೆ ಮತ್ತು ತಗ್ಗಿಸಿದ ಕೃಷಿ ಅಪಾಯಗಳ ಮೂಲಕ ರೈತರ ಆದಾಯವನ್ನು ವೃದ್ಧಿಸುವುದು.',
  objective3_title: 'ಹವಾಮಾನ ಪ್ರತಿರೋಧ',
  objective3_desc: 'ವೈವಿಧ್ಯಮಯ ಮತ್ತು ದೃಢವಾದ ಬೆಳೆಯ ವ್ಯವಸ್ಥೆಗಳ ಮೂಲಕ ರೈತರು ಹವಾಮಾನ ಬದಲಾವಣೆಗೆ ತನ್ನನ್ನು ಹೊಂದಿಸಲು ಸಹಾಯ ಮಾಡುವುದು.',
  objective4_title: 'ಜ್ಞಾನ ಹಸ್ತಾಂತರ',
  objective4_desc: 'ಕೃಷಿ ಸಂಶೋಧನೆ ಮತ್ತು ಪ್ರಾಯೋಗಿಕ ಕೃಷಿ ಅನ್ವಯಗಳ ನಡುವಿನ ಅಪರಿಮಿತಿಯನ್ನು ಕಡಿಮೆಮಾಡುವುದು.',
  project_impact_title: 'ಪ್ರಾಜೆಕ್ಟ್ ಪರಿಣಾಮ',
  key_features_title: 'ಮುಖ್ಯ ಲಕ್ಷಣಗಳು',
  academic_excellence_title: 'ಅಕಾಡೆಮಿಕ್ ಪಾರದರ್ಶಕತೆ',
  academic_bullet1: 'ಪಿಯರ್-ರಿವ್ಯೂ ಮಾಡಿದ ಕಾರ್ಯವಿಧಾನಗಳೊಂದಿಗೆ ಸಂಶೋಧನಾ ಚಾಲಿತ ವಿಧಾನ',
  academic_bullet2: 'ವಿದ್ಯಾರ್ಥಿಗಳು ಮತ್ತು ಅಧ್ಯಾಪಕರ ನಡುವೆ ಸಹಭಾಗಿತ್ವದ ಪ್ರಯತ್ನ',
  academic_bullet3: 'ಟಿಕಾವುದಾದ ಕೃಷಿ ಅಭ್ಯಾಸಗಳ ಮೇಲೆ ಗಮನ',
  vision_title: 'ಭವಿಷ್ಯದ ನಮ್ಮ ದೃಷ್ಟಿ',
  try_our_tool: 'ನಮ್ಮ ಸಾಧನ ಪ್ರಯತ್ನಿಸಿ',
  meet_our_team: 'ನಮ್ಮ ತಂಡವನ್ನು ಭೇಟಿಯಾಗಿರಿ',

  about_feature1_title: 'ಎಐ-ಆಧಾರಿತ ಶಿಫಾರಸ್ಸುಗಳು',
  about_feature1_desc: 'ಅಧ್ಯತೃತ ದತ್ತಾ ವಿಶ್ಲೇಷಣೆಗಳಿಂದ ಅತ್ಯುತ್ತಮ ಬೆಳೆ ಸಂಯೋಜನೆಗಳನ್ನು ಸಲಹೆ ಮಾಡುವ ಆಧುನಿಕ ಯಂತ್ರ ಅಧ್ಯಯನ ಆಲ್ಗೋರಿಥಂಗಳು',
  about_feature2_title: 'ಪ್ರಾದೇಶಿಕ ವೈಶಿಷ್ಟ್ಯ',
  about_feature2_desc: 'ಕರ್ನಾಟಕದ ವಿಭಿನ್ನ ಕೃಷಿ-ಹವಾಮಾನ ವಲಯಗಳನ್ನು ಮತ್ತು ಮಣ್ಣಿನ ಪರಿಸ್ಥಿತಿಗಳನ್ನು ಆಧರಿಸಿ ವೈಯಕ್ತಿಕ ಶಿಫಾರಸ್ಸುಗಳು',
  about_feature3_title: 'ಬಳಕೆದಾರ-ಸೌಲಭ್ಯ ಇಂಟರ್ಫೇಸ್',
  about_feature3_desc: 'ವಿಭಿನ್ನ ತಂತ್ರಜ್ಞಾನ ಜ್ಞಾನ ಮಟ್ಟಗಳ ರೈತರಿಗೆ ಸുലಭ ಹಾಗೂ ಸುಲಭವಾಗಿ ಬಳಸಬಹುದಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಿದ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
  about_feature4_title: 'ಸಾಕ್ಷ್ಯಾಧಾರಿತ ವಿಧಾನ',
  about_feature4_desc: 'ವಿಸ್ತೃತ ಸಂಶೋಧನೆ ಮತ್ತು ಪರಿಶೀಲಿತ ಕೃಷಿ ದತ್ತಾ ಆಧಾರಿತ ಶಿಫಾರಸ್ಸುಗಳು',

  impact1_label: 'ಕವರ್ ಮಾಡಲಾದ ಜಿಲ್ಲೆಗಳು',
  impact1_desc: 'ಕರ್ನಾಟಕ ರಾಜ್ಯದಲ್ಲಿ ವ್ಯಾಪಿಸಿದೆ',
  impact2_label: 'ಭವಿಷ್ಯವಾಣಿ ನಿಖರತೆ',
  impact2_desc: 'ಬೆಳೆ ಉತ್ಪಾದನೆಯ ಭವಿಷ್ಯವಾಣಿಯಲ್ಲಿ',
  impact3_label: 'ವಿಶ್ಲೇಷಿಸಿದ ಋತುಗಳು',
  impact3_desc: 'ಖರಿಫ್, ರಬಿ ಮತ್ತು ಬೇಸಿಗೆ',
  impact4_label: 'ಪ್ರಮುಖ ಬೆಳೆಗಳು',
  impact4_desc: 'ಶಿಫಾರಸ್ಸು ವ್ಯವಸ್ಥೆಯಲ್ಲಿ',

  methodology_bullet1: 'ಕರ್ನಾಟಕ ಕೃಷಿ ಇಲಾಖೆಯಿಂದ ಸಮಗ್ರ ದತ್ತಾ ಸಂಗ್ರಹ',
  methodology_bullet2: 'XGBoost ಆಲ್ಗೋರಿಥಂ ಬಳಸಿ ಯಂತ್ರ ಅಧ್ಯಯನ ಮಾದರಿಯ ತರಬೇತಿ',
  methodology_bullet3: 'ಕ್ರಾಸ್-ವ್ಯಾಲಿಡೇಶನ್ ಮತ್ತು ಪ್ರದರ್ಶನ ಆప్టಿಮೈಜೆಶನ್',
  methodology_bullet4: 'ರೈತ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಆಧರಿಸಿದ ಬಳಕೆದಾರ ಇಂಟರ್ಫೇಸ್ ವಿನ್ಯಾಸ',
  methodology_bullet5: 'ಸಾಂಪ್ರದಾಯಿಕ ಜ್ಞಾನವನ್ನು ಆಧುನಿಕ ತಂತ್ರಜ್ಞಾನಗಳೊಂದಿಗೆ ಒಂದಿಗೊಳಿಸುವಿಕೆ',

    // Team
  team_title: 'ನಮ್ಮ ತಂಡವನ್ನು ಪರಿಚಯಿಸಿ',
  team_subtitle: 'CropDiversifyನ ಹಿಂದೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿರುವ ಉತ್ಕಟ ವ್ಯಕ್ತಿಗಳು, ತಂತ್ರಜ್ಞಾನ ಮತ್ತು ನವೀನತೆಯ ಮೂಲಕ ಕೃಷಿಯನ್ನು ಪರಿವರ್ತಿಸಲು ಬದ್ಧರಾಗಿದ್ದಾರೆ',
  guide_title: 'ಪ್ರಾಜೆಕ್ಟ್ ಗೈಡ್',
  guide_expertise_title: 'ನಿಪುಣತೆ',
  guide_achievements_title: 'ಸಾಧನೆಗಳು',
  guide_description: 'ಡಾ. ಪ್ರಸಾದ್ ಅನುಭವಿ ಫ್ಯಾಕಲ್ಟಿ ಸದಸ್ಯರಾಗಿ ಯಂತ್ರ ಅಧ್ಯಯನ ಮತ್ತು ಕೃಷಿ ತಂತ್ರಜ್ಞಾನದಲ್ಲಿ ಪರಿಣತಿ ಹೊಂದಿದ್ದಾರೆ. ಅವರು ಎಐ ಮತ್ತು ಕೃಷಿಯ ಸಂಧಿಯಲ್ಲಿ ಅನೇಕ ಪ್ರಾಜೆಕ್ಟ್ಗಳಿಗೆ ಮಾರ್ಗದರ್ಶನ ಮಾಡಿದ್ದಾರೆ ಮತ್ತು ಅಂತರರಾಷ್ಟ್ರೀಯ ಜರ್ನಲ್ ಗಳಲ್ಲಿ ಹಲವು ಪ್ರಕಟಣೆಗಳನ್ನು ಹೊಂದಿದ್ದಾರೆ.',
  guide_achievement_1: '10+ ವರ್ಷಗಳ ಉಪನ್ಯಾಸ ಅನುಭವ',
  guide_achievement_2: 'ಎಐ ಮತ್ತು ಕೃಷಿಯಲ್ಲಿ ಪ್ರಕಟಣೆಯಾದ ಸಂಶೋಧಕ',
  guide_achievement_3: '50+ ವಿದ್ಯಾರ್ಥಿ ಪ್ರಾಜೆಕ್ಟ್ಗಳಿಗೆ ಮಾರ್ಗದರ್ಶಕ',
  guide_achievement_4: 'ಕೃಷಿ ತಂತ್ರಜ್ಞಾನಕ್ಕೆ ಕೈಗಾರಿಕೆ ಸಲಹೆಗಾರ',
  student_developers_title: 'ವಿದ್ಯಾರ್ಥಿ ಡೆವಲಪರ್ಸ್',
  specializations_title: 'ವಿಶೇಷೀಕರಣಗಳು',
  contact_label: 'ಸಂಪರ್ಕ',
  institution_name: 'SDM ಇನ್ಸ್ಟಿಟ್ಯೂಟ್ ಆಫ್ ಟೆಕ್ನಾಲಜಿ, ಉಜिरे',
  institution_description: 'ತಂತ್ರಜ್ಞಾನ ಶಿಕ್ಷಣ ಮತ್ತು ಸಂಶೋಧನೆಯಲ್ಲಿ ಮಹತ್ವಾಕಾಂಕ್ಷೆ ಹೊಂದಿರುವ ಪ್ರಮುಖ ಇಂಜನಿಯರಿಂಗ್ ಸಂಸ್ಥೆ. SDM ಇನ್ಸ್ಟಿಟ್ಯೂಟ್ ಆಫ್ ಟೆಕ್ನಾಲಜಿ ನವೀನತೆಗೆ ಉತ್ತೇಜನ ನೀಡುತ್ತದೆ ಮತ್ತು ಸಮಾಜ ಮತ್ತು ಕೈಗಾರಿಕೆಗೆ ಪ್ರಮುಖವಾಗಿ ಕೊಡುಗೆ ನೀಡುವ ಕೌಶಲ್ಯಸಂಪನ್ನ ಇಂಜಿನಿಯರ್ ಗಳನ್ನು ತಯಾರಿಸುತ್ತದೆ.',
  visit_website: 'ಸಂಸ್ಥೆಯ ವೆಬ್‌ಸೈಟ್ ಭೇಟಿ ಮಾಡಿ',
  cs_department: 'ಕಂಪ್ಯೂಟರ್ ಸೈನ್ಸ್ ವಿಭಾಗ',
  acknowledgments_title: 'ಧನ್ಯವಾದಗಳು',
  acknowledgments_para1: 'ಕರ್ನಾಟಕ ಕೃಷಿ ಇಲಾಖೆಗೆ ಅತ್ಯावಶ್ಯಕ ಡೇಟಾವನ್ನು ಒದಗಿಸಿರುವುದಕ್ಕಾಗಿ ಮತ್ತು ನಮ್ಮ ಸಂಶೋಧನಾ ಹಂತದಲ್ಲಿ ಅಮૂલ್ಯವಾದ ಅಂಶಗಳನ್ನು ಹಂಚಿಕೊಂಡ ರೈತರಿಗೆ ಹೃದಯಪೂರ್ವಕ ಆಭಾರಗಳನ್ನು ವ್ಯಕ್ತಪಡಿಸುತ್ತೇವೆ.',
  acknowledgments_para2: 'ಈ ಪ್ರಾಜೆಕ್ಟ್ ಅನ್ನು ವ್ಯವಸ್ಥೆಗೆ ತರುವ ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ಬೆಂಬಲಕ್ಕಾಗಿ ನಮ್ಮ ಸಂಸ್ಥೆಗೆ ವಿಶೇಷ ಧನ್ಯವಾದಗಳು.',
  member_ayush_description: 'ಯಂತ್ರ ಅಧ್ಯಯನ ಆಲ್ಗೋರಿಥಂಗಳಲ್ಲಿ ಮತ್ತು ದತ್ತಾಂಶ ಪ್ರಿಫ್‌ಪ್ರೊಸೆಸಿಂಗ್‌ನಲ್ಲಿ ತಜ್ಞ. ಬೆಳೆ ಭವಿಷ್ಯವಾಣಿಿಗಾಗಿ XGBoost ಮಾದರಿಯನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸಲು ಮುನ್ನಡೆಸಿದ್ದವರು.',
  member_chiranth_description: 'API ಅಭಿವೃದ್ಧಿ ಮತ್ತು ಡೇಟಾಬೇಸ್ ನಿರ್ವಹಣೆಯಲ್ಲಿ கவன. FastAPI ಬ್ಯಾಕ್‌ಎಂಡ್ ಮತ್ತು ದತ್ತಾ ಪೈಪ್‌ಲೈನ್ ಇನ್‌ಫ್ರಾ ನಿರ್ಮಿಸಿದ್ದಾರೆ.',
  member_yashwanthk_description: 'ಉಪಯೋಗকারী ಇಂಟರ್ಫೇಸ್ ವಿನ್ಯಾಸ ಮತ್ತು ಅಭಿವೃದ್ದಿ ಮಾಡಿದ್ದಾರೆ. ವೇದಿಕೆ ರೈತರಿಗೆ ಪ್ರವೇಶಿಸಲು ಸುಲಭವಾಗಿರುವಂತೆ ಮತ್ತು ಬಳಕೆದಾರ-ಸ್ನೇಹಿ ಆಗಿರುವಂತೆ ಖಾತ್ರಿ ಪಡಿಸಿದ್ದಾರೆ.',
  member_yashwantht_description: 'ಕೃಷಿ ಸಂಶೋಧನೆ ಮತ್ತು ದತ್ತಾ ವಿಶ್ಲೇಷಣೆ ನಡೆಸಿದರು. ಮಾದರಿಯ ಪ್ರದರ್ಶನ ಮತ್ತು ಕೃಷಿ ಸರಾಸರಿ ಪರಿಶೋಧಿಸಲಾಯಿತು.',

    // NotFound
    notfound_title: 'ಓಪ್ಸ್! ಪುಟ ಕಂಡಿಲ್ಲ',
    notfound_return: 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',

    // Footer
    footer_brand: 'CropDiversify',
    footer_description: 'ನಿಮ್ಮ ಭೂಮಿಗಾಗಿ ಸೂಕ್ತ ಬೆಳೆ ಮಿಶ್ರಣವನ್ನು ಶಿಫಾರಸು ಮಾಡಲು ಎಐ ಬಳಸಿ, ಉತ್ಪಾದನೆ, ಲಾಭ ಮತ್ತು ಮಣ್ಣಿನ ಆರೈಕೆಯನ್ನು ಹೆಚ್ಚಿಸಿ.'
    ,
    quick_links: 'ಶೀಘ್ರ ಲಿಂಕ್ಸ್',
    resources_title: 'ಸಂಪನ್ಮೂಲಗಳು',
    research_paper: 'ಶೋಧನಾ ಪತ್ರಿಕೆ',
    api_documentation: 'API ಡಾಕ್ಯುಮೆಂಟೇಶನ್',
    contact_email: 'cropDiversify@sdmit.in',
    address_line: 'SDM ಇನ್ಸ್ಟಿಟ್ಯೂಟ್ ಆಫ್ ಟೆಕ್ನಾಲಜಿ, ಉಜಿರೆ, ಕರ್ನಾಟಕ',
    home_label: 'ಮುಖಪುಟ',
    dashboard_label: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    how_it_works_label: 'ಯಾವ ರೀತಿ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
    about_project_label: 'ಪ್ರಾಜೆಕ್ಟ್ ಕುರಿತು',
    our_team_label: 'ನಮ್ಮ ತಂಡ',
    copyright_line: '© 2024 CropDiversify. SDM ಇನ್ಸ್ಟಿಟ್ಯೂಟ್ ಆಫ್ ಟೆಕ್ನಾಲಜಿ ಅವರ ಒಂದು ಅಕಾಡೆಮಿಕ್ ಪ್ರಾಜೆಕ್ಟ್.',
    built_for: 'ಕರ್ನಾಟಕ, ಭಾರತದ ಟಿಕಾವುದಾದ ಕೃಷಿಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ'
  }
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'kn') return 'kn'
    } catch (e) {}
    return 'en'
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language)
    } catch (e) {}
  }, [language])

  const toggleLanguage = () => setLanguage((l) => (l === 'en' ? 'kn' : 'en'))

  const t = (key: string) => translations[language][key] ?? translations['en'][key] ?? key

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

export default LanguageContext
