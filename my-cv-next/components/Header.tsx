
export default function Header() {
  return (
    <nav className="nav wrap" aria-label="Main navigation">
      <a className="logo" href="/">AN<span>.</span></a>

      <div className="nav-links">
        <a href="/#about">About</a>
        <a href="/#skills">Skills</a>
        <a href="/projects">Projects</a>
        <a href="/#education">Education</a>
        <a className="nav-cta" href="/#contact">Contact ↗</a>
      </div>
    </nav>
  );
}
