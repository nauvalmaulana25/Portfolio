import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  links: { name: string; url: string; }[];
  technologies: string[];
  description: string[];
  imageUrl?: string;
  videoEmbed?: boolean;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  details: string[];
  imageUrl?: string;
  link?: string;
}

interface Service {
  title: string;
  description: string;
}

interface Certificate {
  title: string;
  links: { name: string; url: string; }[];
  skills: string[];
  description: string[];
  imageUrl: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule]
})
export class AppComponent {
  name = signal('Muhammad Nauval Maulana');
  tagline = signal('A Computer Science student at Binus University with a dual focus in Software Engineering and Digital Business');

  showContactPage = signal(false);

  contactInfo = signal({
    email: 'nauval2504wf@gmail.com',
    phone: '+62 878 7656 1572',
    linkedin: 'https://www.linkedin.com/in/muhammad-nauval-maulana-6b157a202/'
  });
  
  isMenuOpen = signal(false);

  currentYear = new Date().getFullYear();

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  showContact() {
    this.showContactPage.set(true);
  }

  hideContact() {
    this.showContactPage.set(false);
  }

  services = signal<Service[]>([
    { title: 'Frontend Development', description: 'Crafting responsive  websites using modern frameworks like Angular and React.' },
    { title: 'AI Enthusiast', description: 'Interested in the application of Artificial Intelligence to automate processes, derive business insights, and enhance user experiences' },
    { title: 'Business-Driven Developer', description: 'Provide robust software solutions to solve core business challenges, drive growth, and create strategic advantages.' }
  ]);
  
  technicalSkills = signal(['HTML5', 'Figma', 'JavaScript', 'Generative AI', 'Python', 'React', 'SQL', 'Content Creation']);
  interpersonalSkills = signal(['Agile Project Management', 'Team Collaboration', 'Problem Solving', 'Public Speaking']);

  education = signal({
      university: 'BINUS University',
      school: 'School of Computer Science',
      degree: 'Bachelor of Computer Science',
      period: '2023 - Present',
      gpa: '3.09 / 4.00',
      logoUrl: 'https://i.ibb.co.com/ycMz5yfY/image.png'
  });

  experiences = signal<Experience[]>([
    {
      role: 'New Media Activist',
      company: 'BINUS TV Club',
      period: 'March 2025 – Present',
      details: [
        'Participated in pre-production research and development lifecycle for new What’s In Beken episodes',
        'Creating content designed to boost student engagement and familiarize new students with the BINUS @ Bekasi campus environment.'
      ],
      imageUrl: 'https://i.ibb.co.com/B2YjSmtV/image.png',
      link: 'https://www.binus.tv/'
    },
    {
      role: 'Creative and Design Activist',
      company: 'HIMTI BINUS University',
      period: 'March 2024 – March 2025',
      details: [
        'Developed and designed a variety of posters and visual materials to commemorate national and religious holidays',
        'Stage Decor Designer for TECHNO 2023 the official welcoming party for all new students of School of Computer Science.'
      ],
      imageUrl: 'https://i.ibb.co.com/mVScJbdP/himti-LOGO-keyen.webp',
      link: 'https://i.ibb.co.com/JFkkrG48/image.webp'
    },
     {
      role: 'Volunteer',
      company: 'PKM “Warna-Warni Jiwa, Mari Merayakan Kemanusiaan”',
      period: 'January 2025',
      details: [
        'Dedicated and active participant in a 5-day community service initiative (PKM) at the Jamrud Biru Bekasi Foundation, a social rehabilitation center that treats and cares for people with mental disorders.',
        'Organized creative activities to boost confidence and independence among individuals with mental disabilities',
        'Collaborated with local foundations to reduce stigma around mental health'
      ],
      imageUrl: 'https://i.ibb.co.com/q32G3PJt/TFISC.webp',
      link: 'https://i.ibb.co.com/hJJpcX0z/Muhammad-Nauval-Maulana-1-page-0001.webp'
    }
  ]);
  
  projects = signal<Project[]>([
    {
      title: 'BeatBreeze | Music Discovery Web App',
      links: [{name: 'Link to App', url: 'https://beatbreeze.netlify.app/'}],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Deezer API'],
      description: [
        '- Developed a responsive and user-friendly front-end application to provide a streamlined music search and discovery experience.',
        '- Integrated the Deezer API to fetch and dynamically display a vast library of song data, enabling users to search for tracks and artists in real-time.',
        '- Engineered a unique mood-based search feature, allowing for a personalized music discovery journey tailored to the user\'s emotions.',
        '- Prioritized user accessibility by designing the application to be fully functional without requiring any user login or account creation, reducing friction for new users.'
      ],
      imageUrl: 'https://i.ibb.co.com/LXDnmLYY/1749394254479.jpg'
    },
    {
      title: 'Christian Wijaya | Luxury Fashion Brand Website (UI/UX Design & Development)',
      links: [{name: 'Live Demo', url: 'https://christian-wijaya.netlify.app/'}],
      technologies: ['Figma (UI/UX Design)', 'HTML5', 'CSS3 (Flexbox, Grid)', 'Vanilla JavaScript (ES6)'],
      description: [
        '- Orchestrated the complete front-end development lifecycle for a luxury fashion brand\'s website, from initial high-fidelity prototyping in Figma to final deployment.',
        '- Designed a high-fidelity, interactive 5-page website prototype in Figma, establishing a cohesive visual identity, component library, and user navigation flow consistent with a high-end luxury brand.',
        '- Developed a fully responsive, pixel-perfect website from the ground up using vanilla HTML5, CSS3 (Flexbox/Grid), and JavaScript, ensuring a flawless user experience on desktop, tablet, and mobile devices (<768px) without the use of any frameworks.',
        '- Engineered a custom, client-side form validation system for the event registration page using pure JavaScript to validate five distinct user inputs (e.g., email format, name length, date logic) without relying on regular expressions, ensuring a robust and user-friendly data submission process.',
        '- Implemented dynamic and interactive product pages with a focus on Human-Computer Interaction (HCI) principles, delivering a sophisticated and elegant user experience aligned with the brand\'s luxury identity'
      ],
      imageUrl: 'https://i.ibb.co.com/jPZghQbG/image.webp'
    },
    {
      title: 'Movie Review Sentiment Analysis Web Application',
      links: [{name: 'GitHub', url: 'https://drive.google.com/drive/folders/14LorgVDp5cgtdUEbL3eZIsFJwiSUx5Kv?usp=drive_link'}],
      technologies: ['Python', 'TensorFlow/Keras', 'Scikit-learn', 'Pandas', 'NLTK', 'Flask', 'HTML', 'CSS'],
      description: [
        '- Engineered an end-to-end Natural Language Processing (NLP) project to classify movie review sentiment, covering the entire lifecycle from data preprocessing and model training to deployment as an interactive web application.',
        '- Implemented a robust text preprocessing pipeline for the 50k IMDB review dataset, including HTML tag removal, normalization, tokenization, and stopword elimination to ensure high-quality data for model training.',
        '- Designed, trained, and evaluated multiple models to find the optimal solution; achieved high classification accuracy by implementing a Bidirectional LSTM neural network using TensorFlow/Keras, which outperformed traditional TF-IDF based models (Logistic Regression, Random Forest).',
        '- Developed a lightweight Flask REST API to serve the serialized Keras model, creating an endpoint that processes raw text input from users and returns sentiment predictions in real-time.',
        '- Built a clean, user-friendly front-end interface with HTML and CSS, allowing users to easily submit movie reviews and receive instant \'Positive\' or \'Negative\' sentiment classifications from the deployed model.'
      ],
      imageUrl: 'https://i.ibb.co.com/4n1LGCbM/Screenshot-1444.png'
    }
  ]);

  certificates = signal<Certificate[]>([
    {
      title: 'Designing and Creating a Website using HTML5 & CSS3',
      links: [{name: 'Verify Credential', url: 'https://www.udemy.com/certificate/UC-b27c042a-1496-436c-825e-6c78c2b07ec4/'}],
      skills: ['HTML5', 'CSS3'],
      description: [
          'This course provides a comprehensive foundation in HTML and CSS, enabling us learners to build and design websites with a strong understanding of core web development concepts.',
      ],
      imageUrl: 'https://i.ibb.co.com/bgM0wd3D/udmeylogo.webp'
    },
    {
      title: 'Introduction to Digital Business Skills',
      links: [{name: 'View Certificate', url: 'https://www.life-global.org/certificate/064cb281-a264-4aca-a2b0-37d6ad83b45d'}],
      skills: ['Agile Project Management', 'Business Strategy'],
      description: [
        'Gained knowledge about many of the fundamentals and key drivers of a digital economy, discovered five digital ways of working essential to business transformation, explored key digital practices and tools, and learned various skills needed to succeed in the Digital Era.',
      ],
      imageUrl: 'https://i.ibb.co.com/1fM45qZH/r-ZFQPAAAABkl-EQVQDAKOPLOXqh-Pxh-AAAAAEl-FTk-Su-Qm-CC.webp'
    },
    {
      title: 'Google AI Studio Bootcamp: Build Apps, Media & Master Gen Al',
      links: [{name: 'See Details', url: 'https://www.udemy.com/certificate/UC-b1a29dcc-09ac-4f17-adfd-0afda4dc3dbb/'}],
      skills: ['Generative AI', 'Prompt Engineering'],
      description: [
        'From this course I learn how to visualize data using seaborn, a python data visualization library based on matplotlib. Its powerful and easy-to-use.',
      ],
      imageUrl: 'https://i.ibb.co.com/bgM0wd3D/udmeylogo.webp'
    },
    {
      title: 'Data Visualization Using Python',
      links: [{name: 'See Details', url: 'https://www.kaggle.com/learn/certification/mnauvalmaulana/data-visualization'}],
      skills: ['Data Visualization', 'Python', 'Data Processing'],
      description: [
        'This quick bootcamp provided me with advanced skills in leveraging the generative AI capabilities of Gemini within the Google AI Studio. I gained hands-on experience in fine-tuning AI models, enabling me to customize their thought processes, control output formats, and define specific AI personas to meet diverse project requirements.',
      ],
      imageUrl: 'https://i.ibb.co.com/nMkjBYQm/dataset-cover.webp'
    },
    {
      title: 'Public Speaking',
      links: [{name: 'See Details', url: 'https://i.ibb.co.com/7PM1WTG/image.webp'}],
      skills: ['Public Speaking'],
      description: [
        'Through this experience, I gained a deeper understanding that effective communication necessitates charisma. It is not merely about speaking voluminously, but about strategically pausing to engage and connect with the audience. Communication extends beyond verbal delivery; it involves influencing, fostering connections, utilizing appropriate body language, conveying messages clearly, and maintaining positive audience interaction.',
      ],
      imageUrl: 'https://i.ibb.co.com/7PM1WTG/image.webp'
    }
  ]);
}
