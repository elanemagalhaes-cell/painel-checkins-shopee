const SUPABASE_URL = 'https://jnubttskgcdguoroyyzy.supabase.co/rest/v1/v_painel_drivers?select=*';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpudWJ0dHNrZ2NkZ3Vvcm95eXp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MzMwNjcsImV4cCI6MjA3NjIwOTA2N30.dYZQl97-MvDRaqkSNLugY6fXrK92MiwmsGo7e89uVsk';

async function carregarDrivers() {
  try {
    const resposta = await fetch(SUPABASE_URL, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    });

    if (!resposta.ok) throw new Error('Erro ao buscar dados do Supabase');

    const dados = await resposta.json();
    const tabela = document.querySelector('#driverTable tbody');
    tabela.innerHTML = '';

    dados.forEach(driver => {
      const linha = document.createElement('tr');
      linha.innerHTML = `
        <td>${driver.driver_id || ''}</td>
        <td>${driver.driver || ''}</td>
        <td>${driver.corridor_cage || ''}</td>
        <td>${driver.hora || ''}</td>
        <td>${driver.checkin || ''}</td>
        <td>${driver.ordem || ''}</td>
      `;
      tabela.appendChild(linha);
    });

  } catch (erro) {
    console.error('Erro:', erro);
  }
}

document.addEventListener('DOMContentLoaded', carregarDrivers);

document.getElementById('filterInput').addEventListener('input', (e) => {
  const filtro = e.target.value.toLowerCase();
  const linhas = document.querySelectorAll('#driverTable tbody tr');
  linhas.forEach(linha => {
    const texto = linha.textContent.toLowerCase();
    linha.style.display = texto.includes(filtro) ? '' : 'none';
  });
});
