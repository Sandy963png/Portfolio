import { Component, HostListener, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Skill {
  name: string;
  category: 'Languages' | 'Full-Stack' | 'AI & Data Science' | 'Databases & Tools';
  level: string;
  icon: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  overview: string;
  features: string[];
  tech: string[];
  category: string;
  github: string;
  links: ProjectLink[];
  badge: string;
  gradient: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  encapsulation: ViewEncapsulation.None
})
export class App implements OnInit, AfterViewInit {
  menuOpen = false;
  activeSection = 'home';
  currentYear = new Date().getFullYear();

  // Skill Filtering
  selectedSkillCategory = 'All';
  skillCategories = ['All', 'Languages', 'Full-Stack', 'AI & Data Science', 'Databases & Tools'];

  skills: Skill[] = [
    { name: 'C', category: 'Languages', level: 'Core System', icon: '⚡' },
    { name: 'C++', category: 'Languages', level: 'Core System', icon: '⚙️' },
    { name: 'Java', category: 'Languages', level: 'OOP Architecture', icon: '☕' },
    { name: 'Python', category: 'Languages', level: 'Data & Scripting', icon: '🐍' },
    { name: 'JavaScript', category: 'Languages', level: 'ES6+ & Async', icon: '🟨' },
    { name: 'SQL', category: 'Languages', level: 'Relational Queries', icon: '🗄️' },
    { name: 'Angular', category: 'Full-Stack', level: 'Frontend Framework', icon: '🅰️' },
    { name: 'React', category: 'Full-Stack', level: 'Frontend Library', icon: '⚛️' },
    { name: 'Node.js', category: 'Full-Stack', level: 'Backend Runtime', icon: '🟢' },
    { name: 'Express.js', category: 'Full-Stack', level: 'REST APIs', icon: '🚀' },
    { name: 'Flask', category: 'Full-Stack', level: 'Python Web Framework', icon: '🧪' },
    { name: 'Machine Learning', category: 'AI & Data Science', level: 'Predictive Models', icon: '🤖' },
    { name: 'Scikit-Learn', category: 'AI & Data Science', level: 'ML Algorithms', icon: '🔬' },
    { name: 'Pandas', category: 'AI & Data Science', level: 'Data Processing', icon: '🐼' },
    { name: 'MongoDB', category: 'Databases & Tools', level: 'NoSQL Database', icon: '🍃' },
    { name: 'Git', category: 'Databases & Tools', level: 'DevOps & Versioning', icon: '🌱' }
  ];

  projects: Project[] = [
    {
      id: 'research-hub',
      title: 'Research & Guide Hub',
      subtitle: 'Academic Research Guidance & Student Portal',
      description: 'A student portal and admin dashboard for managing research guidance, user permissions, project submissions, and academic resources.',
      overview: 'Developed a dual-interface research management system comprising a React-based student portal and an Angular administrative dashboard, backed by a unified Node.js/Express RESTful API with MongoDB.',
      features: [
        'React-based student portal and Angular administrative dashboard',
        'Secure JWT authentication and custom middleware for administrative workflows',
        'Streamlined faculty-student correspondence & academic milestone tracking',
        'Unified Node.js / Express RESTful API integrated with MongoDB'
      ],
      tech: ['React', 'Angular', 'Node.js', 'Express', 'MongoDB'],
      category: 'Full-Stack Web App',
      github: 'https://github.com/Sandy963png/fst-project',
      links: [
        { label: 'React Portal ↗', url: 'https://fst-project-react.vercel.app/' },
        { label: 'Angular Admin ↗', url: 'https://fst-project-lac.vercel.app/' }
      ],
      badge: 'Featured',
      gradient: 'linear-gradient(135deg, #7047ff 0%, #4d7cff 100%)'
    },
    {
      id: 'sudoku-app',
      title: 'Sudoku Web Application',
      subtitle: 'Interactive Puzzle Generator & Visualization Solver',
      description: 'Interactive Sudoku engine featuring multi-difficulty puzzle generation, real-time error detection, strategic hints, and automated solver visualization.',
      overview: 'Designed and deployed an interactive Sudoku engine featuring multi-difficulty puzzle generation, real-time error detection, strategic hint algorithms, and an automated step-by-step solver visualization.',
      features: [
        'Dynamic Difficulty Matrix Generator & Step-by-Step Backtracking Solver',
        'Real-time cell error detection & strategic candidate hint algorithms',
        'User profile persistence tracking performance analytics & best completion times',
        'Automated daily puzzle updates & session state saving'
      ],
      tech: ['React', 'Node.js', 'Express', 'MongoDB'],
      category: 'Algorithms & Web',
      github: 'https://github.com/Sandy963png/sudoku-app',
      links: [
        { label: 'Live Frontend ↗', url: 'https://frontend-sudoku.onrender.com' },
        { label: 'Live Backend ↗', url: 'https://sudoku-app-rvmq.onrender.com' }
      ],
      badge: 'Interactive',
      gradient: 'linear-gradient(135deg, #ff479d 0%, #7047ff 100%)'
    },
    {
      id: 'crime-analysis',
      title: 'Crime Project',
      subtitle: 'ML-Powered Indian District Safety & Choropleth Analytics',
      description: 'Interactive dashboard using React and GeoJSON to visualize crime metrics across 5,700+ Indian districts with safety score predictions.',
      overview: 'Engineered an interactive dashboard using React and GeoJSON to visualize crime metrics across 5,700+ Indian districts through dynamic choropleth mapping, state-level filtering, and safety score predictions driven by a Random Forest ML model.',
      features: [
        'Dynamic Choropleth Mapping across 5,700+ Indian districts using GeoJSON',
        'Random Forest ML model predicting regional safety scores & demographic risk index',
        'Full-stack Flask API backend utilizing Pandas for demographic data aggregation',
        'Automated ReportLab PDF generation for downloadable regional safety insights'
      ],
      tech: ['Python', 'Flask', 'React', 'scikit-learn', 'Pandas'],
      category: 'Machine Learning',
      github: 'https://github.com/Sandy963png/Crime-Project',
      links: [
        { label: 'Live Frontend ↗', url: 'https://crime-project-frontend.onrender.com/' },
        { label: 'Live Backend ↗', url: 'https://crime-project-6fvh.onrender.com/' }
      ],
      badge: 'Data Science',
      gradient: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)'
    }
  ];

  // Project Modal State
  selectedProject: Project | null = null;

  // Contact Form State
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  contactSubmitted = false;
  contactSending = false;
  contactErrorMessage = '';

  // Theme State
  currentTheme = 'brutalist';
  themeKeywordInput = '';
  showThemeBar = false;
  themeFeedbackMessage = '';

  ngOnInit() {
    if (typeof document !== 'undefined') {
      document.body.classList.remove('theme-unique', 'theme-brutalist', 'theme-matrix', 'theme-editorial', 'theme-aurora', 'theme-slate', 'theme-obsidian', 'dark-theme');
      localStorage.removeItem('portfolio_theme_keyword');
    }
  }

  ngAfterViewInit() {
    this.initAntigravityParticleCanvas();
  }

  initAntigravityParticleCanvas() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const canvas = document.getElementById('antigravity-particle-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Array<{
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      radius: number;
      length: number;
      angle: number;
      speed: number;
      orbitRadius: number;
      color: string;
      alpha: number;
      type: 'dot' | 'dash';
    }> = [];

    const colors = [
      '#0ea5e9', // cyan
      '#38bdf8', // sky
      '#a855f7', // purple
      '#c084fc', // lavender
      '#ec4899', // pink
      '#10b981', // emerald
      '#f59e0b', // amber
      '#3b82f6'  // blue
    ];

    const numParticles = Math.min(400, Math.floor((width * height) / 4000));

    for (let i = 0; i < numParticles; i++) {
      const angle = Math.random() * Math.PI * 2;
      const orbitRadius = Math.random() * (Math.max(width, height) * 0.65);
      const isDash = Math.random() > 0.45;

      particles.push({
        x: width / 2 + Math.cos(angle) * orbitRadius,
        y: height / 2 + Math.sin(angle) * orbitRadius,
        baseX: width / 2,
        baseY: height / 2,
        radius: isDash ? 1.2 : Math.random() * 2 + 1,
        length: isDash ? Math.random() * 8 + 4 : 0,
        angle: angle,
        speed: (Math.random() * 0.0015 + 0.0005) * (Math.random() > 0.5 ? 1 : -1),
        orbitRadius: orbitRadius,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.3,
        type: isDash ? 'dash' : 'dot'
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles.forEach(p => {
        p.baseX = width / 2;
        p.baseY = height / 2;
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.angle += p.speed;

        const targetX = p.baseX + Math.cos(p.angle) * p.orbitRadius;
        const targetY = p.baseY + Math.sin(p.angle) * p.orbitRadius;

        const dx = mouseX - targetX;
        const dy = mouseY - targetY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let pushX = 0;
        let pushY = 0;

        if (dist < 140) {
          const force = (140 - dist) / 140;
          pushX = -(dx / dist) * force * 35;
          pushY = -(dy / dist) * force * 35;
        }

        p.x = targetX + pushX;
        p.y = targetY + pushY;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.strokeStyle = p.color;

        if (p.type === 'dash') {
          ctx.lineWidth = p.radius * 1.5;
          ctx.beginPath();
          const tangentAngle = p.angle + Math.PI / 2;
          const endX = p.x + Math.cos(tangentAngle) * p.length;
          const endY = p.y + Math.sin(tangentAngle) * p.length;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(endX, endY);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }

  toggleThemeBar() {
    this.showThemeBar = !this.showThemeBar;
    this.themeFeedbackMessage = '';
  }

  applyThemeByKeyword(keyword?: string, showFeedback = true) {
    const query = (keyword || this.themeKeywordInput || '').toLowerCase().trim();
    if (!query) return;

    let targetClass = 'theme-brutalist';
    let themeName = 'brutalist';
    let labelName = 'Neo-Brutalist Lime';

    if (query.includes('brutalist') || query.includes('neo') || query.includes('raw') || query.includes('default')) {
      targetClass = 'theme-brutalist';
      themeName = 'brutalist';
      labelName = 'Neo-Brutalist Lime';
    } else if (query.includes('matrix') || query.includes('terminal') || query.includes('hacker')) {
      targetClass = 'theme-matrix';
      themeName = 'matrix';
      labelName = 'Terminal Matrix';
    } else if (query.includes('editorial') || query.includes('minimal') || query.includes('gold')) {
      targetClass = 'theme-editorial';
      themeName = 'editorial';
      labelName = 'Editorial Gold';
    } else if (query.includes('aurora') || query.includes('nordic') || query.includes('frost')) {
      targetClass = 'theme-aurora';
      themeName = 'aurora';
      labelName = 'Nordic Aurora';
    } else {
      if (showFeedback) {
        this.themeFeedbackMessage = `Keyword "${query}" not recognized. Try: brutalist, matrix, editorial, or aurora.`;
      }
      return;
    }

    if (typeof document !== 'undefined') {
      document.body.classList.remove('theme-unique', 'theme-brutalist', 'theme-matrix', 'theme-editorial', 'theme-aurora', 'theme-slate', 'theme-obsidian');
      document.body.classList.add(targetClass);
      localStorage.setItem('portfolio_theme_keyword', themeName);
    }

    this.currentTheme = themeName;
    if (showFeedback) {
      this.themeFeedbackMessage = `⚡ Applied ${labelName} Theme! Saved for future visits.`;
      this.themeKeywordInput = '';
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const top = element.offsetTop - 120;
        const height = element.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          this.activeSection = sectionId;
          break;
        }
      }
    }
  }

  filterSkills(category: string) {
    this.selectedSkillCategory = category;
  }

  get filteredSkills(): Skill[] {
    if (this.selectedSkillCategory === 'All') {
      return this.skills;
    }
    return this.skills.filter(skill => skill.category === this.selectedSkillCategory);
  }

  openProjectModal(project: Project) {
    this.selectedProject = project;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeProjectModal() {
    this.selectedProject = null;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  }

  getCrimeProject(): Project {
    return this.projects.find(p => p.id === 'crime-analysis') || this.projects[2];
  }

  async submitContact() {
    if (!this.contactForm.name || !this.contactForm.email || !this.contactForm.message) {
      return;
    }
    this.contactSending = true;
    this.contactErrorMessage = '';

    try {
      const response = await fetch('https://formsubmit.co/ajax/sandeeprajasekar361@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: this.contactForm.name,
          email: this.contactForm.email,
          _subject: this.contactForm.subject || `Portfolio Contact from ${this.contactForm.name}`,
          message: this.contactForm.message,
          _captcha: 'false',
          _template: 'table'
        })
      });

      const result = await response.json();

      if (response.ok && (result.success === 'true' || result.success === true || result.message)) {
        this.contactSubmitted = true;
        this.contactForm = { name: '', email: '', subject: '', message: '' };
      } else {
        this.contactErrorMessage = result.message || 'Failed to submit form. Please try again or email sandeeprajasekar361@gmail.com directly.';
      }
    } catch (err) {
      console.error('FormSubmit error:', err);
      this.contactErrorMessage = 'Network error during submission. Please try again or reach out directly.';
    } finally {
      this.contactSending = false;
    }
  }

  resetContactForm() {
    this.contactSubmitted = false;
    this.contactErrorMessage = '';
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}

