const Footer = () => {
  return (
    <footer className="bg-amber-900 text-amber-100 text-center py-3 text-sm mt-auto">
      <p>
        &copy; {new Date().getFullYear()} Meu Projeto. Todos os direitos
        reservados.
      </p>
    </footer>
  );
};

export default Footer