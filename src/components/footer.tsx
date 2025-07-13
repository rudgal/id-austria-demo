import { FaGithub } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-slate-100 py-3 dark:bg-slate-800">
      <div className="container mx-auto flex items-center justify-center px-4 text-xs text-slate-500 dark:text-slate-400 gap-4">
        <a
          href="https://github.com/rudgal/id-austria-demo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-slate-700 dark:hover:text-slate-200"
        >
          <FaGithub className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}
