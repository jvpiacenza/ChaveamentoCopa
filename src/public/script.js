/* ══════════════════════════════════════════════════════════════
   COPA DO MUNDO 2026 — Frontend Script
   Mantém todos os fetch originais + melhorias de UI
   ══════════════════════════════════════════════════════════════ */

   const API = 'http://localhost:3000';

   /* ────────────────────────────────────────────────────────────
      NAV / SEÇÕES
      ──────────────────────────────────────────────────────────── */
   function showSection(section) {
     // Atualiza navbar
     document.getElementById('btnInicio').classList.toggle('active', section === 'inicio');
     document.getElementById('btnCadastrar').classList.toggle('active', section === 'cadastrar');
   
     // Troca seção visível
     document.getElementById('secInicio').classList.toggle('active', section === 'inicio');
     document.getElementById('secCadastrar').classList.toggle('active', section === 'cadastrar');
   
     // Se voltou para início, atualiza todos os dados
     if (section === 'inicio') refreshAll();
   }
   
   function showForm(formId) {
     // Remove active de todos os painéis e itens da sidebar
     document.querySelectorAll('.form-panel').forEach(p => p.classList.remove('active'));
     document.querySelectorAll('.sidebar__item').forEach(b => b.classList.remove('active'));
   
     document.getElementById(formId).classList.add('active');
   
     // Mapeia formId → sidebar button id
     const map = {
       formSelecoes:      'sideSelecoes',
       formGrupos:        'sideGrupos',
       formGrupoSelecao:  'sideGrupoSelecao',
       formJogos:         'sideJogos',
     };
     if (map[formId]) document.getElementById(map[formId]).classList.add('active');
   
     // Atualiza lista correspondente no formulário
     if (formId === 'formSelecoes')     listar();
     if (formId === 'formGrupos')       listarGrupos();
     if (formId === 'formGrupoSelecao') listarGrupoSelecao();
     if (formId === 'formJogos')        listarJogos();
   }
   
   /* ────────────────────────────────────────────────────────────
      TOAST
      ──────────────────────────────────────────────────────────── */
   let toastTimer;
   function showToast(msg, type = 'success') {
     const toast = document.getElementById('toast');
     const icon  = type === 'success' ? 'fa-circle-check' : 'fa-circle-xmark';
     toast.innerHTML = `<i class="fa-solid ${icon}"></i> ${msg}`;
     toast.classList.add('show');
     clearTimeout(toastTimer);
     toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
   }
   
   /* ────────────────────────────────────────────────────────────
      FEEDBACK inline
      ──────────────────────────────────────────────────────────── */
   function showFeedback(elId, msg, type = 'success') {
     const el = document.getElementById(elId);
     if (!el) return;
     const icon = type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation';
     el.innerHTML = `<i class="fa-solid ${icon}"></i> ${msg}`;
     el.className = `feedback ${type}`;
     setTimeout(() => { el.style.display = 'none'; el.className = 'feedback'; }, 3500);
   }
   
   /* ────────────────────────────────────────────────────────────
      HELPER: estado vazio
      ──────────────────────────────────────────────────────────── */
   function emptyState(icon, msg) {
     return `<div class="empty-state"><i class="fa-solid ${icon}"></i>${msg}</div>`;
   }
   
   /* ────────────────────────────────────────────────────────────
      ATUALIZAR CONTADORES DO HERO
      ──────────────────────────────────────────────────────────── */
   function animateNumber(el, target) {
     if (!el) return;
     const start = parseInt(el.textContent) || 0;
     const diff  = target - start;
     const steps = 20;
     let step = 0;
     const timer = setInterval(() => {
       step++;
       el.textContent = Math.round(start + diff * (step / steps));
       if (step >= steps) {
         el.textContent = target;
         clearInterval(timer);
       }
     }, 25);
   }
   
   function updateHeroStats(selecoes, grupos, jogos) {
     animateNumber(document.getElementById('numSelecoes'), selecoes);
     animateNumber(document.getElementById('numGrupos'),   grupos);
     animateNumber(document.getElementById('numJogos'),    jogos);
   }
   
   /* ════════════════════════════════════════════════════════════
      SELEÇÕES
      ════════════════════════════════════════════════════════════ */
   async function cadastrar() {
     const nome = document.getElementById('nome').value.trim();
     if (!nome) { showFeedback('feedbackSelecao', 'Informe o nome da seleção.', 'error'); return; }
   
     try {
       const res = await fetch(`${API}/selecoes`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ nome }),
       });
   
       if (!res.ok) throw new Error('Erro ao cadastrar.');
   
       document.getElementById('nome').value = '';
       showFeedback('feedbackSelecao', `Seleção "${nome}" cadastrada com sucesso!`);
       showToast(`⚽ ${nome} adicionada ao torneio!`);
       listar();
     } catch (e) {
       showFeedback('feedbackSelecao', e.message, 'error');
     }
   }
   
   async function listar() {
     try {
       const response = await fetch(`${API}/selecoes`);
       const dados = await response.json();
   
       // Overview (início)
       const lista = document.getElementById('lista');
       const count = document.getElementById('countSelecoes');
   
       if (lista) {
         if (!dados.length) {
           lista.innerHTML = emptyState('flag', 'Nenhuma seleção cadastrada');
         } else {
           lista.innerHTML = dados.map(s => `<li>${s.nome}</li>`).join('');
         }
       }
       if (count) count.textContent = `${dados.length} seleç${dados.length === 1 ? 'ão' : 'ões'}`;
   
       // Formulário (cadastrar)
       const listaForm = document.getElementById('listaFormSelecoes');
       if (listaForm) {
         listaForm.innerHTML = dados.length
           ? dados.map(s => `<li><strong>#${s.id}</strong>&nbsp; ${s.nome}</li>`).join('')
           : emptyState('flag', 'Nenhuma seleção ainda');
       }
   
       return dados.length;
     } catch (e) {
       console.error('Erro ao listar seleções:', e);
       return 0;
     }
   }
   
   /* ════════════════════════════════════════════════════════════
      GRUPOS
      ════════════════════════════════════════════════════════════ */
   async function cadastrarGrupo() {
     const descricao = document.getElementById('descricaoGrupo').value.trim();
     if (!descricao) { showFeedback('feedbackGrupo', 'Informe a descrição do grupo.', 'error'); return; }
   
     try {
       const res = await fetch(`${API}/grupos`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ descricao }),
       });
   
       if (!res.ok) throw new Error('Erro ao cadastrar grupo.');
   
       document.getElementById('descricaoGrupo').value = '';
       showFeedback('feedbackGrupo', `Grupo "${descricao}" cadastrado!`);
       showToast(`Grupo "${descricao}" criado!`);
       listarGrupos();
     } catch (e) {
       showFeedback('feedbackGrupo', e.message, 'error');
     }
   }
   
   async function listarGrupos() {
     try {
       const response = await fetch(`${API}/grupos`);
       const dados = await response.json();
   
       // Overview
       const lista = document.getElementById('listaGrupos');
       const count = document.getElementById('countGrupos');
   
       if (lista) {
         lista.innerHTML = dados.length
           ? dados.map(g => `<li>${g.descricao}</li>`).join('')
           : emptyState('layer-group', 'Nenhum grupo cadastrado');
       }
       if (count) count.textContent = `${dados.length} grupo${dados.length === 1 ? '' : 's'}`;
   
       // Formulário
       const listaForm = document.getElementById('listaFormGrupos');
       if (listaForm) {
         listaForm.innerHTML = dados.length
           ? dados.map(g => `<li><strong>#${g.id}</strong>&nbsp; ${g.descricao}</li>`).join('')
           : emptyState('layer-group', 'Nenhum grupo ainda');
       }
   
       return dados.length;
     } catch (e) {
       console.error('Erro ao listar grupos:', e);
       return 0;
     }
   }
   
   /* ════════════════════════════════════════════════════════════
      GRUPOS × SELEÇÕES
      ════════════════════════════════════════════════════════════ */
   async function cadastrarGrupoSelecao() {
     const id_grupo   = document.getElementById('idGrupo').value;
     const id_selecao = document.getElementById('idSelecao').value;
   
     if (!id_grupo || !id_selecao) {
       showFeedback('feedbackGrupoSelecao', 'Informe os IDs do grupo e da seleção.', 'error');
       return;
     }
   
     try {
       const res = await fetch(`${API}/grupos-selecoes`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ id_grupo, id_selecao }),
       });
   
       if (!res.ok) throw new Error('Erro ao vincular seleção ao grupo.');
   
       document.getElementById('idGrupo').value   = '';
       document.getElementById('idSelecao').value = '';
       showFeedback('feedbackGrupoSelecao', 'Seleção vinculada ao grupo!');
       showToast('Seleção vinculada ao grupo com sucesso!');
       listarGrupoSelecao();
     } catch (e) {
       showFeedback('feedbackGrupoSelecao', e.message, 'error');
     }
   }
   
   async function listarGrupoSelecao() {
     try {
       const response = await fetch(`${API}/grupos-selecoes`);
       const dados = await response.json();
   
       // Overview
       const lista = document.getElementById('listaGrupoSelecao');
       const count = document.getElementById('countGrupoSelecao');
   
       if (lista) {
         if (!dados.length) {
           lista.innerHTML = emptyState('sitemap', 'Nenhum vínculo cadastrado');
         } else {
           lista.innerHTML = dados.map(item => `
             <li>
               <span class="pair-group">${item.grupo}</span>
               <span class="pair-sep"><i class="fa-solid fa-angles-right"></i></span>
               <span class="pair-selecao">${item.selecao}</span>
             </li>
           `).join('');
         }
       }
       if (count) count.textContent = `${dados.length} vínculo${dados.length === 1 ? '' : 's'}`;
   
       // Formulário
       const listaForm = document.getElementById('listaFormGrupoSelecao');
       if (listaForm) {
         listaForm.innerHTML = dados.length
           ? dados.map(item => `<li>${item.grupo} → ${item.selecao}</li>`).join('')
           : emptyState('sitemap', 'Nenhum vínculo ainda');
       }
     } catch (e) {
       console.error('Erro ao listar grupos-seleções:', e);
     }
   }
   
   /* ════════════════════════════════════════════════════════════
      JOGOS
      ════════════════════════════════════════════════════════════ */
   async function cadastrarJogo() {
     const selecao_a = document.getElementById('selecaoA').value;
     const selecao_b = document.getElementById('selecaoB').value;
     const data_hora = document.getElementById('dataHora').value;
   
     if (!selecao_a || !selecao_b || !data_hora) {
       showFeedback('feedbackJogo', 'Preencha todos os campos do jogo.', 'error');
       return;
     }
   
     if (selecao_a === selecao_b) {
       showFeedback('feedbackJogo', 'As seleções devem ser diferentes.', 'error');
       return;
     }
   
     try {
       const res = await fetch(`${API}/jogos`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ selecao_a, selecao_b, data_hora }),
       });
   
       if (!res.ok) throw new Error('Erro ao cadastrar jogo.');
   
       document.getElementById('selecaoA').value = '';
       document.getElementById('selecaoB').value = '';
       document.getElementById('dataHora').value = '';
       showFeedback('feedbackJogo', 'Jogo cadastrado com sucesso!');
       showToast('⚽ Jogo agendado com sucesso!');
       listarJogos();
     } catch (e) {
       showFeedback('feedbackJogo', e.message, 'error');
     }
   }
   
   /* Formata data para pt-BR legível */
   function formatDate(dateStr) {
     const d = new Date(dateStr);
     return d.toLocaleString('pt-BR', {
       day: '2-digit', month: '2-digit', year: 'numeric',
       hour: '2-digit', minute: '2-digit',
     });
   }
   
   /* Cria o HTML de um match card */
   function buildMatchCard(jogo, idx) {
     return `
       <div class="match-card">
         <span class="match-card__id">#${jogo.id ?? idx + 1}</span>
         <div class="match-card__teams">
           <span class="match-card__team">${jogo.selecao_a}</span>
           <span class="match-card__vs">VS</span>
           <span class="match-card__team">${jogo.selecao_b}</span>
         </div>
         <div class="match-card__date">
           <i class="fa-solid fa-calendar-days"></i>
           ${formatDate(jogo.data_hora)}
         </div>
       </div>
     `;
   }
   
   async function listarJogos() {
     try {
       const response = await fetch(`${API}/jogos`);
       const dados = await response.json();
   
       // Overview
       const lista = document.getElementById('listaJogos');
       const count = document.getElementById('countJogos');
   
       if (lista) {
         lista.innerHTML = dados.length
           ? dados.map((j, i) => buildMatchCard(j, i)).join('')
           : emptyState('futbol', 'Nenhum jogo cadastrado');
       }
       if (count) count.textContent = `${dados.length} jogo${dados.length === 1 ? '' : 's'}`;
   
       // Formulário
       const listaForm = document.getElementById('listaFormJogos');
       if (listaForm) {
         listaForm.innerHTML = dados.length
           ? dados.map((j, i) => buildMatchCard(j, i)).join('')
           : emptyState('futbol', 'Nenhum jogo ainda');
       }
   
       return dados.length;
     } catch (e) {
       console.error('Erro ao listar jogos:', e);
       return 0;
     }
   }
   
   /* ════════════════════════════════════════════════════════════
      REFRESH ALL — atualiza tudo e hero stats
      ════════════════════════════════════════════════════════════ */
   async function refreshAll() {
     const [nSel, nGrp, , nJog] = await Promise.all([
       listar(),
       listarGrupos(),
       listarGrupoSelecao(),
       listarJogos(),
     ]);
     updateHeroStats(nSel, nGrp, nJog);
   }
   
   /* ════════════════════════════════════════════════════════════
      INIT
      ════════════════════════════════════════════════════════════ */
   document.addEventListener('DOMContentLoaded', () => {
     refreshAll();
   });