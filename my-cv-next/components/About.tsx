
export default function About() {
  return (
    <section className="section wrap" id="about">
      <div className="section-heading">
        <p className="section-label">01 / ABOUT ME</p>
        <h2>
          Curious mind.
          <br />
          <span>Infrastructure mindset.</span>
        </h2>
      </div>

      <div className="about-content">
        <p className="lead">
          Connecting systems, automation and software delivery.
        </p>

        <p className="muted">
          My background in Networks and IT Services gave me a foundation
          in IT infrastructure. I am developing my DevOps skills through
          practical labs and projects involving containers, CI/CD,
          monitoring and infrastructure automation.
        </p>

        <div className="principles">
          <div><b>01</b><span>Learn continuously</span></div>
          <div><b>02</b><span>Automate repetitive work</span></div>
          <div><b>03</b><span>Build reliable systems</span></div>
        </div>
      </div>
    </section>
  );
}
