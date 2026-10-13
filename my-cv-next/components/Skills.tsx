
import { skills } from "@/data/skills";

export default function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <div className="wrap">
        <div className="section-heading">
          <p className="section-label">02 / TECH STACK</p>
          <h2>Tools I&apos;m <span>working with.</span></h2>
        </div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <article className="skill-card" key={skill.name}>
              <span className="skill-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{skill.name}</h3>
                <p>{skill.category}</p>
              </div>
              <span className="skill-arrow">↗</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
