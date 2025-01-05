export const barra = (msg: string, Lojas: any[], tableRef: HTMLTableElement | null) => {
  const searchTerm = msg.toLowerCase();
  
  if (tableRef) { 
    const rows = Array.from(tableRef.getElementsByClassName('cards'));
  
    rows.forEach((row, index) => {
      const loja = Lojas[index];
  
      const searchContent = `
        ${loja.nome.toLowerCase()}
        ${loja.desc.toLowerCase()}
        ${loja.loc.toLowerCase()}
        ${loja.produtos.map((prod: any) => prod.titulo.toLowerCase() + prod.descProduto.toLowerCase()).join(' ')}
      `;

      if (searchContent.includes(searchTerm)) {
        (row as HTMLElement).style.display = ''; 
      } else {
        (row as HTMLElement).style.display = 'none';
      }
    });
  }
}