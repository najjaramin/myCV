
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="wrap project-detail">
      <Link className="back-link" href="/projects">
        ← All projects
      </Link>

      <p className="section-label">
        {project.number} / {project.type}
      </p>

      <h1>
        {project.title}<span>.</span>
      </h1>

      <p className="detail-lead">{project.description}</p>

      <div className="tags detail-tags">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="detail-panel">
        <h2>Project highlights</h2>
        <ul>
          {project.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
