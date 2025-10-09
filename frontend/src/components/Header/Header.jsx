const Header = () => {
  return (
    <header className="w-full bg-gradient-to-r from-yellow-100 to-amber-200 shadow-md">
      <div className="flex justify-between items-center max-w-4xl mx-auto py-3 px-4">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold text-amber-700">
            Meu Novo Projeto
          </span>
        </div>

        <nav>
          <ul className="flex space-x-4">
            <li>
              <a
                href="/dashboard"
                className="text-gray-600 hover:text-amber-800 transition text-sm"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/perfil"
                className="text-gray-600 hover:text-amber-800 transition text-sm"
              >
                Perfil
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header