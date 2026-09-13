import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleExploreStories = () => {
    if (window.location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        document.getElementById("stories")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);

      return;
    }

    document.getElementById("stories")?.scrollIntoView({
      behavior: "smooth",
    });
  };
  const handleLogoClick = () => {
    if (window.location.pathname !== "/") {
      navigate("/");
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#E8E0D8]/80 bg-[#F7F3EE]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* LOGO */}
        <button
          onClick={handleLogoClick}
          className="text-2xl font-bold tracking-tight text-[#3E3027]"
        >
          COPI
        </button>

        {/* NAVIGATION */}
        <nav className="flex items-center gap-5 sm:gap-7">
          <button
            onClick={handleExploreStories}
            className="text-sm font-medium text-[#76685E] transition hover:text-[#8B5E3C]"
          >
            Explore Stories
          </button>

          <Link
            to="/about"
            className="text-sm font-medium text-[#76685E] transition hover:text-[#8B5E3C]"
          >
            <span className="sm:hidden">Why COPI</span>
            <span className="hidden sm:inline">Why I Made COPI</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
