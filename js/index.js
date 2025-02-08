import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: any[] = [];
  filteredProjects: any[] = [];
  featuredProjects: any[] = [];
  techFilters: string[] = [];
  complexityFilters: string[] = [];
  statusFilters: string[] = [];
  availableTechs: string[] = [];
  availableComplexities: string[] = [];
  availableStatuses: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getProjects().subscribe(data => {
      this.projects = data;
      this.filteredProjects = data;
      this.featuredProjects = data.filter(project => project.isFeatured)
                                 .sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());

      // Extract unique filter categories dynamically
      this.availableTechs = this.extractUniqueCategories(data, 'techStack');
      this.availableComplexities = this.extractUniqueCategories(data, 'complexity');
      this.availableStatuses = this.extractUniqueCategories(data, 'status');
    });
  }

  getProjects(): Observable<any[]> {
    return new Observable(observer => {
      observer.next([
        {
          id: 'resuspark',
          name: 'ResuSpark',
          description: 'AI-powered resume optimization tool.',
          techStack: ['Python', 'Django', 'Bootstrap'],
          complexity: 'Advanced',
          status: 'Open Source',
          impact: 'Used by 500+ job seekers, improved ATS scores by 30%',
          diagram: 'assets/diagrams/resuspark.png',
          repo: 'https://github.com/yourgithub/resuspark',
          demo: 'https://resuspark.com',
          codeAvailability: 'Available on GitHub',
          isFeatured: true,
          dateCreated: '2024-05-15'
        },
        {
          id: 'chatapp',
          name: 'ChatApp',
          description: 'Secure chat application with end-to-end encryption.',
          techStack: ['Angular', 'Firebase'],
          complexity: 'Intermediate',
          status: 'Open Source',
          impact: 'Handled 10,000+ messages per day with 99.9% uptime.',
          diagram: 'assets/diagrams/chatapp.png',
          repo: 'https://github.com/yourgithub/chatapp',
          demo: 'https://chatapp.com',
          codeAvailability: 'Available on GitHub',
          isFeatured: false,
          dateCreated: '2024-04-10'
        }
      ]);
    });
  }

  extractUniqueCategories(projects: any[], field: string): string[] {
    return [...new Set(projects.flatMap(project => project[field]))];
  }

  applyFilters() {
    this.filteredProjects = this.projects.filter(project =>
      (this.techFilters.length === 0 || project.techStack.some(tech => this.techFilters.includes(tech))) &&
      (this.complexityFilters.length === 0 || this.complexityFilters.includes(project.complexity)) &&
      (this.statusFilters.length === 0 || this.statusFilters.includes(project.status))
    );
  }

  toggleFilter(event: any, category: string) {
    const value = event.target.value;
    if (category === 'tech') {
      this.techFilters.includes(value) ? this.techFilters.splice(this.techFilters.indexOf(value), 1) : this.techFilters.push(value);
    } else if (category === 'complexity') {
      this.complexityFilters.includes(value) ? this.complexityFilters.splice(this.complexityFilters.indexOf(value), 1) : this.complexityFilters.push(value);
    } else if (category === 'status') {
      this.statusFilters.includes(value) ? this.statusFilters.splice(this.statusFilters.indexOf(value), 1) : this.statusFilters.push(value);
    }
  }
}
