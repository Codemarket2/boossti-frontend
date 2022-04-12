const teaList = [
  { title: 'Essiac tea' },
  { title: 'green tea' },
  { title: 'Ginger tea' },
  { title: 'Lavender tea' },
  { title: 'Matcha tea' },
  { title: 'Turmeric tea' },
];
const hospitalList = [
  { title: 'University of Texas MD Anderson Cancer Center', description: 'Houston, TX' },
  { title: 'Memorial Sloan Kettering Cancer Center', description: 'New York, NY' },
  { title: 'Mayo Clinic', description: 'Rochester, MN' },
  { title: 'Johns Hopkins Hospital', description: 'Baltimore, MD' },
  { title: 'Cleveland Clinic', description: 'Cleveland, OH' },
  { title: 'Dana-Farber Cancer Institute', description: 'Boston, MA' },
  { title: 'Cedars-Sinai Medical Center', description: 'Los Angeles, CA' },
  { title: 'Northwestern Memorial Hospital', description: 'Chicago, IL' },
  { title: 'Seattle Cancer Care Alliance', description: 'Seattle, WA' },
  { title: 'UCSF Medical Center', description: 'San Francisco, CA' },
  { title: 'H. Lee Moffitt Cancer Center and Research Institute', description: 'Tampa, FL' },
  { title: 'Barnes-Jewish Hospital', description: 'Saint Louis, MO' },
];

const doctorList = [
  { title: 'Foluso Ademuyiwa, MD, MPH', description: 'Washington University, St. Louis' },
  { title: 'Banu Arun, MD', description: 'Anderson Cancer Center, Houston' },
  {
    title: 'José Baselga, MD, PhD',
    description: 'Memorial Sloan Kettering Cancer Center, New York',
  },
  { title: 'Harold Burstein, MD, PhD', description: 'Dana-Farber Cancer Institute, Boston' },
  {
    title: 'Saundra Buys, MD',
    description:
      'Huntsman Cancer Institute’s and University of Utah School of Medicine, Salt Lake City',
  },
  { title: 'Melody Cobleigh, MD', description: 'Rush University Medical Center, Chicago' },
  {
    title: 'Gabriella D’Andrea, MD',
    description: 'Memorial Sloan Kettering Cancer Center, New York',
  },
  {
    title: 'Elizabeth Claire Dees, MD, MSc',
    description: 'University of North Carolina, Chapel Hill',
  },
  { title: 'Susan Domchek, MD', description: 'University of Pennsylvania, Philadelphia' },
  {
    title: 'Matthew Ellis, MB, BChir, BSc, PhD, FRCP',
    description: 'Baylor College of -Medicine, Houston',
  },
  { title: 'Monica Fornier, MD', description: 'Memorial Sloan Kettering Cancer Center, New York' },
  { title: 'Kevin Fox, MD', description: 'University of Pennsylvania, Philadelphia' },
  {
    title: 'Lori Goldstein, MD, FASCO',
    description: 'Fox Chase Cancer Center, Temple University, Philadelphia',
  },
  {
    title: 'William Gradishar, MD',
    description: 'Northwestern Medicine Feinberg School of Medicine, Chicago',
  },
];
const cancerList = [
  { title: 'Bladder cancer' },
  { title: 'Bone cancer ' },
  { title: 'Bowel (colorectal) cancer ' },
  { title: 'Brain cancer' },
  { title: 'Breast cancer' },
  { title: 'Childhood cancer' },
  { title: 'Cervical cancer' },
  { title: 'Gastrointestinal Cancer' },
  { title: 'Gynaecological (women’s) Cancer' },
  { title: 'Head and neck cancer' },
  { title: 'Kidney cancer' },
  { title: 'Liver cancer' },
  { title: 'Lung Cancer' },
  { title: 'Laryngeal cancer' },
  { title: 'Lymphoma – Hodgkin' },
  { title: 'Lymphoma – Non-Hodgkin' },
  { title: 'Mesothelioma' },
  { title: 'Mouth cancer' },
  { title: 'Myeloma' },
  { title: 'Nasopharyngeal cancer' },
  { title: 'Oesophageal cancer' },
  { title: 'Ovarian cancer' },
  { title: 'Pancreatic cancer' },
  { title: 'Paranasal sinus and nasal cavity cancer' },
  { title: 'Prostate cancer' },
  { title: 'Skin cancer' },
  { title: 'Stomach (gastric) cancer' },
  { title: 'Uterine cancer ' },
  { title: 'Vaginal cancer' },
];

export const emojis = [
  [
    { value: '👨‍⚕️', list: doctorList, title: 'Select Doctor 👨‍⚕️' },
    { value: '👩‍⚕️', list: doctorList, title: 'Select Doctor 👩‍⚕️' },
    { value: '🏥', list: hospitalList, title: 'Select hospital 🏥' },
    { value: '💉' },
    { value: '💊' },
    { value: '🩺' },
  ],
  [
    { value: '🎗️', list: cancerList, title: 'Select Cancer type' },
    { value: '⚕' },
    { value: '🩸' },
    { value: '🧂' },
    { value: '🍾' },
    { value: '🚑' },
  ],
  [
    { value: '🧠' },
    { value: '🦶' },
    { value: '👂' },
    { value: '🦴' },
    { value: '🫀' },
    { value: '🫁' },
  ],
  [
    { value: '🍀' },
    { value: '🥕' },
    { value: '🥦' },
    { value: '🍄' },
    { value: '🥒' },
    { value: '🍋' },
  ],
  [
    { value: '🍵', list: teaList, title: 'Select Type of Tea 🍵' },
    { value: '🐟' },
    { value: '🍽️' },
    { value: '🥗' },
    { value: '🥥' },
    { value: '🥛' },
  ],
];

export const customEmojis = [
  {
    code: '♋',
    img:
      'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/237/father-christmas_1f385.png',
    name: 'santa',
    category: 'Cancer Emoji',
    sort_order: 1,
    skin: [],
  },
  {
    code: '🎅🏼',
    img:
      'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/237/father-christmas_1f385.png',
    name: 'santa',
    category: 'Spa Emoji',
    sort_order: 1,
    skin: [],
  },
  {
    code: '🎅🏼',
    img:
      'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/237/father-christmas_1f385.png',
    name: 'santa',
    category: 'Doctor Emoji',
    sort_order: 1,
    skin: [],
  },
];
