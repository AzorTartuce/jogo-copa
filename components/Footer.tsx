export default function Footer() {
  return (
    <footer className="mt-12 border-t border-line py-5 text-center text-[11px] text-muted">
      <p>© {new Date().getFullYear()} Máquina do Tempo do Futebol · Jogo de entretenimento</p>
      <p className="mt-1">Não afiliado à FIFA ou qualquer federação oficial</p>
    </footer>
  );
}
