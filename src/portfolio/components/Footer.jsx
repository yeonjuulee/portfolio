function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 17L17 7M17 7H8M17 7v9" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-note">
            <p className="eyebrow footer-eyebrow">Contact</p>
            <p>함께 만들 프로젝트가 있다면 편하게 연락 주세요.</p>
          </div>
          <ul className="footer-links">
            <li>
              <a href="mailto:hello@example.com">
                <ArrowIcon />
                hello@example.com
              </a>
            </li>
            <li>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                <ArrowIcon />
                GitHub
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <ArrowIcon />
                기술 블로그
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-bottom">
          <span>© 2026 portfolio. All rights reserved.</span>
          <span className="mono">Built with intent, not templates.</span>
        </div>
      </div>
    </footer>
  );
}