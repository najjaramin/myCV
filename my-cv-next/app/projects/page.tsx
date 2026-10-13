
import Link from "next/link";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <main className="wrap section">
      <a className="logo" href="/">AN<span>.</span></a>

      <p className="section-label">PROJECT ARCHIVE</p>
      <h1>
        Projects &amp;
        <br />
        <span>experiments.</span>
      </h1>

      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.slug}>
            <p className="project-type">{project.type}</p>
            <h2>{project.title}</h2>
            <p className="project-description">{project.description}</p>

            <div className="tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <Link
              className="project-detail-link"
              href={`/projects/${project.slug}`}
            >
              View project details ↗
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
