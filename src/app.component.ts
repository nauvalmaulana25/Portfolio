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
  logoUrl?: string;
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

const BINUS_TV_CLUB_LOGO_URL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhsQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAA8AFADASIAAhEBAxEB/8QAGwABAQACAwEAAAAAAAAAAAAAAAYCBwEEBQP/xAAyEAABAwIDBAcIAwAAAAAAAAABAgMEBQAGERIhMUEHExQiUWFxkbEVIjIzNFKBocH/xAAYAQEBAQEBAAAAAAAAAAAAAAAAAQMCBP/EAB0RAQEAAgIDAQEAAAAAAAAAAAABAhEDIRIxQVH/2gAMAwEAAhEDEQA/APcYiIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAqrP6j0+hTHYcmY6p5k2WEtNLcKT3E7JBsfOrVXmfpHT6LddYqNQhB96PI7SOHlqSVOFaglSgFYzZBA3bPLQXRxm+Wb8N9sXzT+F4l8JtjPmn8LxL4T+hGWWpDKHmVpcbWM0rQcpUD3g8RVnL+2M+afwvEvhNsZ80/heJfCb2iC/tjPmn8LxL4TbGfNP4XiXwm9ogv7Yz5p/C8S+E2xn7Q/heJfCb2iC/tjP2h/heJfCbWxnzT+F4l8JvaIL+2M+afwvEvhNsZ80/heJfCb2iC/tjPmn8LxL4V2g1Wg1yS5HhSnFPIGbItpbeX+oJUDmHeNw8atS861vT6LUa1Eq0WU3Enx1BSJCAQpwA5gFYIJB3jxBIIO4lD0BERAREQEREBERAREQEREBERB5l6X+y6v+c/+w1d9Af8AL6n+u9/2grXpf7Lq/wCc/wDsNXfQH/L6n+u9/wBoK1Z/M4+G6oiKkwIiICIiAiIgIiICIiAiIgIiICvO/S9p1bqldpdQpECRLaTGLa+CbKyFBa1EHHuOUg+INenIgi8K/wCHrLTLT8N+Q5IaTmcU2tSEqO8pClAYG+5+JNXGxqRzKfoK+w2NSOZUnQV9huaIK7Y1I5lSdBX2Gx6RzKk6CvsNzRBXbHpHMqToK+w2PSOZUnQV9huaIK7Y9I5lSdBX2Gx6RzKk6CvsNzRBXbHpHMqToK+w2PSOZUnQV9huaIK7Y9I5lSdBX2GxqRzKk6CvsNzRBp2n9OrkPXCHUp0B+NDYiOIK5CChS1rW2QkAkEkBCz4DP2VvSIgIiICIiAiIgIiICIiAiIg//Z';
const BINUS_SOCS_LOGO_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEX////r6+v29vby8vLq6ur7+/vt7e3s7Oz5+fn09PTu7u7k5OTw8PDl5eXn5+fMzMzW1tbb29vMzMmrq6uwsLCfn5+3t7fAwMDQ0NDf39+kpKTo6Ojj4+Pe3t7Y2Ni7u7usrKyBgYHPz8/ExMSvq6uH2291AAABhElEQVR4nO3c61LCQBSG0UQRBUFA8v5veLNa61g108y8N/v7B+xtD0O23QIAAAAAAAAAAAAAAAAAAAAAAAAAAABg8Nnsvh3E+X25n/N7L+6n+7p/jP2h+2m+M+5n2r/V/l1X9Rfruv6e+j/rfp3+2bV/3d/0r/T/Vm1wmL5eNfN+2G00f3o0f3p4f0r/c/1X3d/0X3f/z77f6Z/R/rX0X3//Xf2r/bfT/zT9p/p96n+v/nF9/e+V/v+9/+/2T/eP9r/Tf6v+tfqb/Sf9/0l/T//59v+r/i/3h+of6T/Wf6n+h/pP9F/rP9h/sv9/09/Sf+X/ffTf6v+t/uH9R/qf6f+rf5T/af6L/Tf6b/cf7P/f9Pf0n+l/3303+r/rf7h/Uf6n+n/q3+U/2n+i/03+m/3H+z/3/T39J/pf999N/q/63+4f1H+p/p/6t/lP9p/ov9N/pv9x/s/9/09/Sf6X/ffTf6v+t/uH9R/qf6f+rf5T/af6L/Tf6b/cf7P/f9Pf0n+l/3303+r/rf7h/Uf6n+n/q3+U/wG/AAYAAAAAAAAAAAAAAAAAAAAAAAAAAAD87B4gD84AFjsDRQAAAABJRU5ErkJggg==';

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
  
  technicalSkills = signal(['HTML5', 'Figma', 'JavaScript (Basic)', 'Generative AI', 'Python (Basic)', 'React', 'Content Creation']);
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
      logoUrl: 'https://i.ibb.co.com/B2YjSmtV/image.png'
    },
    {
      role: 'Creative and Design Activist',
      company: 'HIMTI BINUS University',
      period: 'March 2024 – March 2025',
      details: [
        'Developed and designed a variety of posters and visual materials to commemorate national and religious holidays',
        'Stage Decor Designer for TECHNO 2023 the official welcoming party for all new students of School of Computer Science.'
      ],
      logoUrl: 'https://i.ibb.co.com/mVScJbdP/himti-LOGO-keyen.webp'
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
      logoUrl: 'https://i.ibb.co.com/q32G3PJt/TFISC.webp'
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
        'This quick bootcamp provided me with advanced skills in leveraging the generative AI capabilities of Gemini within the Google AI Studio. I gained hands-on experience in fine-tuning AI models, enabling me to customize their thought processes, control output formats, and define specific AI personas to meet diverse project requirements..',
      ],
      imageUrl: 'https://i.ibb.co.com/nMkjBYQm/dataset-cover.webp'
    }
  ]);
}
