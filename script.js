import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// 🔧 Substitua se mudar de projeto/chaves
const SUPABASE_URL  = "https://jnubttskgcdguoroyyzy.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpudWJ0dHNrZ2NkZ3Vvcm95eXp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MzMwNjcsImV4cCI6MjA3NjIwOTA2N30.dYZQl97-MvDRaqkSNLugY6fXrK92MiwmsGo7e89uVsk";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, { auth: { persistSession: false } });

const $ = s => document.querySelector(s);
const tb = $('#tb'), errBox = $('#err'), last = $('#last'), count = $('#count'), q = $('#q');

let fullData = [];

function render(rows){
  tb.innerHTML = '';
  let total = 0, comCheck = 0;
  for(const r of rows){
    total++; if(r.has_check) comCheck++;
    const tr = document.createElement('tr');
    if(r.has_check) tr.classList.add('hit');

    tr.innerHTML = `
      <td>${r.id_driver||''}</td>
      <td>${r.driver||''}</td>
      <td>${r.corridor||''}</td>
      <td>${r.hora ?? '-'}</td>
      <td>${r.has_check ? '✅' : '—'}</td>
      <td>${r.ordem != null ? '<span class="badge">'+r.ordem+'</span>' : '—'}</td>
    `;

    tb.appendChild(tr);
  }
  count.textContent = `Linhas: ${total}` + (total? ` • Com check-in: ${comCheck}` : '');
  last.textContent = 'Última atualização: ' + new Date().toLocaleString('pt-BR',{hour12:false});
}

async function fetchData(){
  const { data, error } = await supabase
    .from('v_painel_drivers')
    .select('id_driver, driver, corridor, has_check, hora, ordem')
    .order('corridor', { ascending: true })
    .order('has_check', { ascending: false })
    .order('ordem', { ascending: true });

  if(error){
    errBox.textContent = 'Erro: ' + (error.message || 'Falha ao buscar dados');
    errBox.style.display = 'block';
    return;
  }
  errBox.style.display = 'none';
  fullData = data || [];
  applyFilter();
}

function applyFilter(){
  const f = (q.value || '').toLowerCase().trim();
  if(!f){ render(fullData); return; }
  const filtered = fullData.filter(r =>
    (r.id_driver || '').toLowerCase().includes(f) ||
    (r.driver || '').toLowerCase().includes(f) ||
    (r.corridor || '').toLowerCase().includes(f)
  );
  render(filtered);
}

q.addEventListener('input', () => { applyFilter(); });

// primeira carga + polling
fetchData();
setInterval(fetchData, 25000);
