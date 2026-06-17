const LAWYERS = [
  {
    name: 'Ahmad Fauzan, S.H., M.H.',
    initial: 'AF',
    specialization: 'Spesialis Hukum Keluarga & Perceraian',
    detail: '10 Tahun Pengalaman • Alumni Universitas Gadjah Mada',
    rate: '4.8',
    note: 'Berpengalaman menangani perkara cerai gugat dan cerai talak di Pengadilan Agama.'
  },
  {
    name: 'Siti Nurhaliza, S.H., M.Kn.',
    initial: 'SN',
    specialization: 'Spesialis Hak Asuh Anak & Nafkah',
    detail: '12 Tahun Pengalaman • Alumni Universitas Indonesia',
    rate: '4.9',
    note: 'Fokus pada perlindungan hak anak dan nafkah pasca perceraian.'
  },
  {
    name: 'Rizky Pratama, S.H.I., M.H.',
    initial: 'RP',
    specialization: 'Spesialis Hukum Islam & Itsbat Nikah',
    detail: '9 Tahun Pengalaman • Alumni UIN Syarif Hidayatullah',
    rate: '4.7',
    note: 'Ahli dalam itsbat nikah, hukum waris Islam, dan sengketa keluarga muslim.'
  },
  {
    name: 'Dewi Sartika, S.H.',
    initial: 'DS',
    specialization: 'Spesialis KDRT & Perlindungan Perempuan',
    detail: '7 Tahun Pengalaman • Alumni Universitas Padjadjaran',
    rate: '4.9',
    note: 'Pendamping hukum bagi korban KDRT dengan pendekatan empatik dan profesional.'
  },
  {
    name: 'Dimas Ramadhan, S.H.',
    initial: 'DR',
    specialization: 'Spesialis Mediasi & Harta Gono-Gini',
    detail: '8 Tahun Pengalaman • Alumni Universitas Airlangga',
    rate: '4.6',
    note: 'Berpengalaman dalam mediasi perceraian dan pembagian harta bersama.'
  },
  {
    name: 'Hendra Wijaya, S.H., M.H.',
    initial: 'HW',
    specialization: 'Spesialis Sengketa Harta Gono-Gini',
    detail: '11 Tahun Pengalaman • Alumni Universitas Diponegoro',
    rate: '4.7',
    note: 'Ahli dalam sengketa pembagian harta bersama dan analisis bukti kepemilikan aset.'
  },
  {
    name: 'Fitriani, S.H., M.Kn.',
    initial: 'FN',
    specialization: 'Spesialis Perlindungan Anak',
    detail: '9 Tahun Pengalaman • Alumni Universitas Brawijaya',
    rate: '4.8',
    note: 'Berpengalaman dalam perkara hak asuh, adopsi anak, dan perlindungan anak korban perceraian.'
  },
  {
    name: 'Bayu Permana, S.H.',
    initial: 'BP',
    specialization: 'Spesialis Hukum Acara Pengadilan Agama',
    detail: '6 Tahun Pengalaman • Alumni Universitas Sebelas Maret',
    rate: '4.5',
    note: 'Menguasai prosedur beracara di Pengadilan Agama dan penyusunan dokumen hukum.'
  },
  {
    name: 'Ratna Dewi, S.H.I., M.H.',
    initial: 'RD',
    specialization: 'Spesialis Hukum Keluarga Islam',
    detail: '10 Tahun Pengalaman • Alumni IAIN Sunan Ampel',
    rate: '4.8',
    note: 'Pakar hukum keluarga Islam, poligami, penetapan wali, dan waris berdasarkan KHI.'
  },
  {
    name: 'Intan Permatasari, S.H.',
    initial: 'IP',
    specialization: 'Spesialis Konsultasi Pranikah & Mediasi',
    detail: '7 Tahun Pengalaman • Alumni Universitas Sumatera Utara',
    rate: '4.7',
    note: 'Membantu klien dalam mediasi pra-perceraian, konsultasi pranikah, dan pembuatan perjanjian kawin.'
  }
];

let currentSelectedLawyer = LAWYERS[0].name;
let currentPaymentType = 'consultation';

function renderLawyers() {
  const container = document.getElementById('lawyers-container');
  if (!container) return;
  container.innerHTML = LAWYERS.map(l => `
    <div class="bg-white rounded-xl p-5 border border-oceanLight flex flex-col justify-between shadow-sm">
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-toscaLight text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">${l.initial}</div>
          <div>
            <h4 class="font-bold text-slate-800 text-sm">${l.name}</h4>
            <p class="text-[11px] text-toscaDark font-medium">${l.specialization}</p>
          </div>
        </div>
        <p class="text-xs text-slate-500">${l.detail}</p>
        <p class="text-[10px] text-slate-400 italic border-t border-oceanLight pt-2">${l.note}</p>
      </div>
      <div class="mt-4 pt-3 border-t border-oceanLight flex items-center justify-between">
        <span class="text-xs text-amber-500 font-bold">&starf; ${l.rate}</span>
        <button onclick="openFreeTrialModal('${l.name.replace(/'/g, "\\'")}')" class="bg-toscaDark text-white text-xs px-3 py-1.5 rounded-md font-medium hover:bg-toscaLight shadow">Pilih Konsultan</button>
      </div>
    </div>
  `).join('');
}
if (document.getElementById('lawyers-container')) renderLawyers();
let currentChatSessionId = null;
let currentJenisDokumen = 'gugatan';
let childrenData = [];

function switchDashboardTab(tabName) {
  document.querySelectorAll('.dashboard-subtab').forEach(t => t.classList.add('hidden'));
  document.querySelectorAll('[id^="btn-tab-"]').forEach(b => b.classList.remove('bg-white/10', 'text-amber-200'));

  const tab = document.getElementById('subtab-' + tabName);
  if (tab) tab.classList.remove('hidden');

  const title = document.getElementById('dashboard-title');
  const desc = document.getElementById('dashboard-desc');

  const config = {
    home: { title: 'Pilih Konsultan Hukum', desc: 'Silakan tentukan penasehat hukum terbaik Anda di Cerai.Pro.' },
    order: { title: 'Riwayat Pesanan Klien', desc: 'Pantau jadwal temu aktif dan transaksi Direct API Anda.' },
    generator: { title: 'Generator Dokumen Hukum', desc: 'Buat gugatan cerai atau permohonan cerai sesuai data klien.' },
    'premium-feature': { title: 'Invoice & Direct API Payment Gateway', desc: 'Selesaikan pembayaran aman via Direct API Bank Mandiri.' },
    profile: { title: 'Profil Akun Klien', desc: 'Manajemen data pribadi dan kredensial keamanan hukum Anda.' }
  };

  if (config[tabName]) {
    title.innerText = config[tabName].title;
    desc.innerText = config[tabName].desc;
  }

  const btn = document.getElementById('btn-tab-' + tabName);
  if (btn) btn.classList.add('bg-white/10');

  if (tabName === 'home') {
    renderLawyers();
  }
  if (tabName === 'generator') {
    generateSurat();
  }
}

function getSuratData() {
  const el = id => document.getElementById(id);
  const val = id => { const e = el(id); return e ? e.value : ''; };

  return {
    jenis: currentJenisDokumen,
    nama: val('doc-nama') || '[Nama ' + (currentJenisDokumen === 'gugatan' ? 'Penggugat' : 'Pemohon') + ']',
    umur: val('doc-umur'),
    agama: val('doc-agama'),
    alamat: val('doc-alamat'),
    pasangan: val('doc-pasangan') || '[Nama ' + (currentJenisDokumen === 'gugatan' ? 'Tergugat' : 'Termohon') + ']',
    umurPasangan: val('doc-umur-pasangan'),
    alamatPasangan: val('doc-alamat-pasangan'),
    tanggalNikah: val('doc-tanggal-nikah'),
    nomorAkta: val('doc-nomor-akta'),
    tanggalAkta: val('doc-tanggal-akta'),
    alasan: val('doc-alasan'),
    punyaAnak: document.querySelector('input[name="doc-punya-anak"]:checked')?.value === 'ya',
    anak: childrenData.filter(a => a.nama.trim()),
    hakAsuh: val('doc-hak-asuh'),
    nafkah: val('doc-nafkah')
  };
}

function syncProfileData() {
  const user = Storage.getUser();
  if (!user) return;

  const nama = user.nama || '';
  const email = user.email || '';
  const nik = user.nik || '';

  const profHeader = document.getElementById('prof-header-nama');
  const profNama = document.getElementById('prof-nama');
  const profEmail = document.getElementById('prof-email');
  const profNik = document.getElementById('prof-nik');
  const gugatanNama = document.getElementById('doc-nama');
  const payNama = document.getElementById('pay-nama');
  const payLawyer = document.getElementById('pay-lawyer');

  if (profHeader) profHeader.innerText = nama;
  if (profNama) profNama.innerText = nama;
  if (profEmail) profEmail.innerText = email;
  if (profNik) profNik.innerText = nik;
  if (gugatanNama) gugatanNama.value = nama;
  if (payNama) payNama.value = nama;
}

function openFreeTrialModal(lawyerName) {
  currentSelectedLawyer = lawyerName;
  const modal = document.getElementById('trial-modal');
  const noteEl = document.getElementById('trial-lawyer-note');
  const nameEl = document.getElementById('trial-lawyer-name');

  if (nameEl) nameEl.innerText = lawyerName;

  const lawyer = LAWYERS.find(l => l.name === lawyerName);
  if (noteEl && lawyer) {
    noteEl.innerText = lawyer.note;
    noteEl.classList.remove('hidden');
  } else if (noteEl) {
    noteEl.classList.add('hidden');
  }

  if (modal) modal.classList.remove('hidden');
}

function closeFreeTrialModal() {
  const modal = document.getElementById('trial-modal');
  if (modal) modal.classList.add('hidden');
}

function startFreeTrialChat() {
  closeFreeTrialModal();
  const sessionId = Storage.saveChatSession(currentSelectedLawyer);
  Storage.saveOrder({
    sessionId: sessionId,
    lawyer: currentSelectedLawyer,
    type: 'Konsultasi Gratis (Uji Coba)',
    status: 'Aktif',
    amount: 0,
    paymentStatus: 'Gratis',
    schedule: 'Sesi langsung tersedia'
  });
  window.location.href = 'chat.html?id=' + sessionId;
}

function goToPremiumFeature(type) {
  currentPaymentType = type;
  closeFreeTrialModal();
  syncProfileData();

  const container = document.getElementById('billing-items-container');
  const totalText = document.getElementById('billing-total-amount');
  const payLawyer = document.getElementById('pay-lawyer');

  if (type === 'consultation') {
    if (payLawyer) payLawyer.value = currentSelectedLawyer;
    container.innerHTML = `
      <div class="flex justify-between border-b border-slate-100 pb-2">
        <div>
          <p class="font-semibold text-slate-700">Sesi Konsultasi Advokat Premium</p>
          <p class="text-[10px] text-slate-400">Tatap muka online via aplikasi (Durasi 1 Jam)</p>
        </div>
        <span class="font-mono font-semibold text-slate-700">Rp75.000</span>
      </div>`;
    totalText.innerText = 'Rp75.000';
  } else if (type === 'document') {
    if (payLawyer) payLawyer.value = 'Akses Eksport Dokumen Hukum Cerai.Pro';
    container.innerHTML = `
      <div class="flex justify-between border-b border-slate-100 pb-2">
        <div>
          <p class="font-semibold text-slate-700">Lisensi Unduh Berkas PDF Resmi</p>
          <p class="text-[10px] text-slate-400">Format standar Pengadilan Agama & e-Materai Terintegrasi</p>
        </div>
        <span class="font-mono font-semibold text-slate-700">Rp3.000.000</span>
      </div>`;
    totalText.innerText = 'Rp3.000.000';
  }

  switchDashboardTab('premium-feature');
}

function handleDownloadRequest() {
  if (Storage.hasPaid('document')) {
    const data = getSuratData();
    Storage.savePrintSurat({ ...data, user: Storage.getUser() });
    window.location.href = 'print.html?type=surat';
  } else {
    alert('Akses Terkunci! Anda harus menyelesaikan pembayaran lisensi dokumen Rp3.000.000 sebelum mengunduh berkas PDF ini.');
    goToPremiumFeature('document');
  }
}

function confirmPremiumPayment() {
  const amount = currentPaymentType === 'consultation' ? 75000 : 3000000;
  const label = currentPaymentType === 'consultation' ? 'Konsultasi Premium' : 'Dokumen Gugatan';

  Storage.savePayment(currentPaymentType, {
    lawyer: currentPaymentType === 'consultation' ? currentSelectedLawyer : 'E-Document PDF Generator',
    amount: amount
  });

  let sessionId = null;
  if (currentPaymentType === 'consultation') {
    sessionId = Storage.saveChatSession(currentSelectedLawyer);
  }

  Storage.saveOrder({
    sessionId: sessionId,
    lawyer: currentPaymentType === 'consultation' ? currentSelectedLawyer : 'E-Document PDF Generator',
    type: label,
    status: 'Lunas',
    amount: amount,
    paymentStatus: 'Lunas Rp' + amount.toLocaleString('id-ID'),
    schedule: 'Sesi langsung tersedia'
  });

  const orders = Storage.getOrders();
  const lastOrder = orders[orders.length - 1];

  Storage.savePrintInvoice({
    orderId: lastOrder ? lastOrder.id : 'CP-' + Date.now(),
    clientName: Storage.getUser()?.nama || 'Klien',
    type: label,
    amount: amount,
    date: new Date().toISOString()
  });

  alert('API Mandiri Berhasil Memverifikasi Dana Masuk! Transaksi Selesai.');
  switchDashboardTab('order');
  renderOrders();

  if (confirm('Cetak invoice pembayaran?')) {
    window.location.href = 'print.html?type=invoice';
  }
}

function renderOrders() {
  const container = document.getElementById('order-list-container');
  if (!container) return;

  const orders = Storage.getOrders();

  if (orders.length === 0) {
    container.innerHTML = '<div class="p-6 text-center text-slate-400 text-sm">Belum ada pesanan konsultasi.</div>';
    return;
  }

  container.innerHTML = orders.slice().reverse().map(o => `
    <div class="py-4 first:pt-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <span class="px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full text-[10px] font-bold uppercase tracking-wider">${o.status}</span>
          <span class="text-xs text-slate-400">ID Order: ${o.id}</span>
        </div>
        <h4 class="font-bold text-slate-800 text-base">${o.type}</h4>
        <p class="text-xs text-slate-600 flex items-center gap-1">👤 Penanggung Jawab: <strong class="text-toscaDark">${o.lawyer}</strong></p>
        <p class="text-xs text-toscaDark font-medium">📅 Pelaksanaan: <span class="underline font-semibold text-slate-800">${o.schedule}</span></p>
      </div>
      <div class="text-right space-y-2 w-full sm:w-48">
        <div class="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100 text-center w-full">${o.paymentStatus}</div>
        ${o.sessionId ? `<button onclick="window.location.href='chat.html?id=${o.sessionId}'" class="w-full bg-toscaDark text-white text-xs px-4 py-2 rounded-lg font-medium shadow hover:bg-toscaLight">Chat Sekarang</button>` : ''}
      </div>
    </div>
  `).join('');
}

function generateSurat() {
  const data = getSuratData();
  const output = document.getElementById('surat-output');
  if (!output) return;

  Storage.saveDocData(data);
  output.innerHTML = formatSuratPreview(data);
}

function setJenisDokumen(jenis) {
  currentJenisDokumen = jenis;

  const isGugatan = jenis === 'gugatan';
  const p = isGugatan ? 'Penggugat' : 'Pemohon';
  const t = isGugatan ? 'Tergugat' : 'Termohon';

  const el = id => document.getElementById(id);
  if (el('label-pemohon')) el('label-pemohon').innerText = 'Data ' + p;
  if (el('label-nama')) el('label-nama').innerText = 'Nama Lengkap ' + p;
  if (el('label-umur')) el('label-umur').innerText = 'Umur ' + p;
  if (el('label-alamat-pemohon')) el('label-alamat-pemohon').innerText = 'Alamat ' + p;
  if (el('label-termohon')) el('label-termohon').innerText = 'Data ' + t;
  if (el('label-pasangan')) el('label-pasangan').innerText = 'Nama Lengkap ' + t;
  if (el('label-umur-pasangan')) el('label-umur-pasangan').innerText = 'Umur ' + t;
  if (el('label-alamat-termohon')) el('label-alamat-termohon').innerText = 'Alamat ' + t;
  if (el('preview-label')) el('preview-label').innerText = 'Pratinjau Draf ' + (isGugatan ? 'Gugatan Cerai' : 'Permohonan Cerai');
  if (el('btn-unduh-label')) el('btn-unduh-label').innerText = 'Unduh PDF Surat ' + (isGugatan ? 'Gugatan' : 'Permohonan');

  const nafkahSection = el('doc-nafkah-section');
  if (nafkahSection) nafkahSection.classList.toggle('hidden', isGugatan);

  generateSurat();
}

function setPunyaAnak(ya) {
  const section = document.getElementById('doc-anak-section');
  if (section) section.classList.toggle('hidden', !ya);
  if (!ya) childrenData = [];
}

function addChild() {
  childrenData.push({ nama: '', jk: 'Laki-laki', ttl: '' });
  renderChildrenInputs();
  generateSurat();
}

function removeChild(i) {
  childrenData.splice(i, 1);
  renderChildrenInputs();
  generateSurat();
}

function updateChild(i, field, value) {
  if (!childrenData[i]) return;
  childrenData[i][field] = value;
  generateSurat();
}

function renderChildrenInputs() {
  const container = document.getElementById('doc-anak-container');
  if (!container) return;
  container.innerHTML = childrenData.map((c, i) => `
    <div class="flex gap-2 items-start p-2 bg-slate-50 rounded border border-oceanLight">
      <div class="flex-1 space-y-1.5">
        <input placeholder="Nama Anak" value="${c.nama.replace(/"/g, '&quot;')}" oninput="updateChild(${i},'nama',this.value)" class="w-full p-1.5 text-xs border border-oceanLight rounded focus:outline-none focus:border-toscaDark">
        <div class="flex gap-2">
          <select onchange="updateChild(${i},'jk',this.value)" class="p-1.5 text-xs border border-oceanLight rounded bg-white focus:outline-none focus:border-toscaDark">
            <option value="Laki-laki"${c.jk === 'Laki-laki' ? ' selected' : ''}>Laki-laki</option>
            <option value="Perempuan"${c.jk === 'Perempuan' ? ' selected' : ''}>Perempuan</option>
          </select>
          <input placeholder="Tempat, Tanggal Lahir" value="${c.ttl.replace(/"/g, '&quot;')}" oninput="updateChild(${i},'ttl',this.value)" class="flex-1 p-1.5 text-xs border border-oceanLight rounded focus:outline-none focus:border-toscaDark">
        </div>
      </div>
      <button type="button" onclick="removeChild(${i})" class="text-red-400 hover:text-red-600 text-lg leading-none mt-1 w-5 h-5 flex items-center justify-center">&times;</button>
    </div>
  `).join('');
}

function formatTanggal(iso) {
  if (!iso) return '-';
  const d = new Date(iso + 'T00:00:00');
  const bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  return d.getDate() + ' ' + bulan[d.getMonth()] + ' ' + d.getFullYear();
}

function formatSuratPreview(data) {
  const isGugatan = data.jenis === 'gugatan';
  const P = isGugatan ? 'Penggugat' : 'Pemohon';
  const T = isGugatan ? 'Tergugat' : 'Termohon';
  const jenisLabel = isGugatan ? 'GUGATAN CERAI' : 'PERMOHONAN CERAI';
  const nomorPrefix = isGugatan ? 'CP/SGC/' : 'CP/SPC/';

  const alasanText = data.alasan
    ? `Bahwa pokok perkara ini diajukan dengan alasan: <strong>${data.alasan}</strong>`
    : '';

  const anakText = data.punyaAnak && data.anak.length > 0 ? `
    <div style="margin-bottom: 6px;">Adapun anak dari perkawinan ini:</div>
    <table style="margin-left: 20px; margin-bottom: 8px; font-size: 10px; border-collapse: collapse;">
      <tr style="border-bottom: 1px solid #ccc;">
        <th style="padding: 2px 6px; text-align: left;">No</th>
        <th style="padding: 2px 6px; text-align: left;">Nama</th>
        <th style="padding: 2px 6px; text-align: left;">Jenis Kelamin</th>
        <th style="padding: 2px 6px; text-align: left;">Tempat, Tgl Lahir</th>
      </tr>
      ${data.anak.map((a, i) => `
        <tr>
          <td style="padding: 2px 6px;">${i + 1}</td>
          <td style="padding: 2px 6px;">${a.nama}</td>
          <td style="padding: 2px 6px;">${a.jk}</td>
          <td style="padding: 2px 6px;">${a.ttl}</td>
        </tr>
      `).join('')}
    </table>
  ` : '';

  const hakAsuhText = data.hakAsuh ? `
    <li>Menetapkan hak asuh anak-anak tersebut kepada <strong>${data.hakAsuh}</strong>.</li>
  ` : '';

  const nafkahText = data.nafkah ? `
    <li>Menghukum TERMOHON untuk membayar nafkah iddah sebesar <strong>Rp${data.nafkah.replace(/\./g, '')}</strong> kepada PEMOHON.</li>
  ` : '';

  const tuntutanAwal = isGugatan
    ? 'Mengabulkan gugatan PENGGUGAT untuk seluruhnya.'
    : 'Mengabulkan permohonan PEMOHON untuk seluruhnya.';

  const tuntutanTalak = isGugatan
    ? 'Menjatuhkan talak satu ba\'in sughra TERGUGAT terhadap PENGGUGAT.'
    : 'Menjatuhkan talak satu ba\'in sughra PEMOHON terhadap TERMOHON.';

  return `
<div style="font-family: 'Times New Roman', Times, serif; font-size: 11px; line-height: 1.6; color: #1e293b;">
  <div style="text-align: center; border-bottom: 2px solid #0D7A87; padding-bottom: 8px; margin-bottom: 12px;">
    <div style="font-size: 14px; font-weight: bold; letter-spacing: 2px;">CERAI.PRO</div>
    <div style="font-size: 9px; color: #64748b;">SOLUSI PERCERAIAN &bull; KONSULTASI HUKUM TERPERCAYA</div>
  </div>

  <div style="text-align: center; margin-bottom: 10px;">
    <div style="font-size: 13px; font-weight: bold; text-decoration: underline;">SURAT ${jenisLabel}</div>
    <div style="font-size: 9px; color: #64748b;">Nomor: ${nomorPrefix + Date.now()}</div>
  </div>

  <div style="margin-bottom: 8px;">
    Kepada Yth.<br>
    <strong>Ketua Pengadilan Agama</strong><br>
    di Tempat
  </div>

  <div style="margin-bottom: 6px;">Dengan hormat,</div>
  <div style="margin-bottom: 6px;">Yang bertanda tangan di bawah ini:</div>

  <table style="margin-left: 16px; margin-bottom: 8px; font-size: 10px;">
    <tr><td style="width: 100px;">Nama</td><td>: <strong>${data.nama}</strong></td></tr>
    <tr><td>Umur</td><td>: ${data.umur || '-'} tahun</td></tr>
    <tr><td>Agama</td><td>: ${data.agama || '-'}</td></tr>
    <tr><td>Pekerjaan</td><td>: -</td></tr>
    <tr><td>Alamat</td><td>: ${data.alamat || '-'}</td></tr>
  </table>

  <div style="margin-bottom: 6px;">Selanjutnya disebut sebagai <strong>${P}</strong>.</div>

  <div style="margin-bottom: 6px;">Dengan ini mengajukan ${isGugatan ? 'gugatan cerai' : 'permohonan cerai'} terhadap:</div>

  <table style="margin-left: 16px; margin-bottom: 8px; font-size: 10px;">
    <tr><td style="width: 100px;">Nama</td><td>: <strong>${data.pasangan}</strong></td></tr>
    <tr><td>Umur</td><td>: ${data.umurPasangan || '-'} tahun</td></tr>
    <tr><td>Agama</td><td>: -</td></tr>
    <tr><td>Pekerjaan</td><td>: -</td></tr>
    <tr><td>Alamat</td><td>: ${data.alamatPasangan || '-'}</td></tr>
  </table>

  <div style="margin-bottom: 6px;">Selanjutnya disebut sebagai <strong>${T}</strong>.</div>

  <div style="margin-bottom: 8px;">
    ${data.tanggalNikah ? '<div>Bahwa perkawinan antara ' + P + ' dan ' + T + ' dilangsungkan pada tanggal <strong>' + formatTanggal(data.tanggalNikah) + '</strong>.</div>' : ''}
    ${data.nomorAkta ? '<div>Akta Nikah Nomor: <strong>' + data.nomorAkta + '</strong>' + (data.tanggalAkta ? ', dikeluarkan pada tanggal ' + formatTanggal(data.tanggalAkta) : '') + '.</div>' : ''}
  </div>

  ${anakText}

  <div style="margin-bottom: 6px;">
    ${alasanText ? alasanText + ' Oleh karena itu, ' + P + ' mohon kepada Ketua Pengadilan Agama untuk memeriksa dan mengadili perkara ini, serta menjatuhkan putusan sebagai berikut:' : P + ' mohon kepada Ketua Pengadilan Agama untuk menjatuhkan putusan sebagai berikut:'}
  </div>

  <ol style="margin-left: 16px; margin-bottom: 8px;">
    <li>${tuntutanAwal}</li>
    <li>${tuntutanTalak}</li>
    ${hakAsuhText}
    ${nafkahText}
    <li>Memerintahkan Panitera Pengadilan Agama untuk mengirimkan salinan putusan kepada Pegawai Pencatat Nikah.</li>
    <li>Membebankan biaya perkara sesuai ketentuan yang berlaku.</li>
  </ol>

  <div style="margin-bottom: 6px;">
    Atau apabila Pengadilan berpendapat lain, mohon putusan yang seadil-adilnya (<em>ex aequo et bono</em>).
  </div>

  <div style="margin-bottom: 4px;">Demikian ${isGugatan ? 'surat gugatan' : 'permohonan'} ini dibuat dengan sebenarnya untuk dipergunakan sebagaimana mestinya.</div>

  <div style="text-align: right; margin-top: 16px;">
    <div>Hormat Kami,</div>
    <div style="margin-top: 32px;"><strong>${data.nama}</strong></div>
    <div style="font-size: 9px; color: #64748b;">${P}</div>
  </div>
</div>`;
}

function loadDocData() {
  const data = Storage.getDocData();
  if (!data) return;

  const el = id => document.getElementById(id);
  const setVal = (id, val) => { const e = el(id); if (e && val) e.value = val; };
  const setChecked = (name, val) => { const r = document.querySelector(`input[name="${name}"][value="${val}"]`); if (r) r.checked = true; };

  if (data.jenis === 'permohonan') {
    setChecked('doc-jenis', 'permohonan');
    setJenisDokumen('permohonan');
  }
  setVal('doc-nama', data.nama);
  setVal('doc-umur', data.umur);
  setVal('doc-agama', data.agama);
  setVal('doc-alamat', data.alamat);
  setVal('doc-pasangan', data.pasangan);
  setVal('doc-umur-pasangan', data.umurPasangan);
  setVal('doc-alamat-pasangan', data.alamatPasangan);
  setVal('doc-tanggal-nikah', data.tanggalNikah);
  setVal('doc-nomor-akta', data.nomorAkta);
  setVal('doc-tanggal-akta', data.tanggalAkta);
  setVal('doc-alasan', data.alasan);
  setVal('doc-hak-asuh', data.hakAsuh);
  setVal('doc-nafkah', data.nafkah);

  if (data.punyaAnak) {
    setChecked('doc-punya-anak', 'ya');
    setPunyaAnak(true);
    if (data.anak && data.anak.length > 0) {
      childrenData = data.anak;
      renderChildrenInputs();
    }
  }
}

function initDashboard() {
  syncProfileData();
  renderOrders();
  loadDocData();
  switchDashboardTab('home');
}

function initLogin() {
  const daftarBtn = document.querySelector('.tab-daftar');
  const masukBtn = document.querySelector('.tab-masuk');
  const formDaftar = document.getElementById('form-daftar');
  const formMasuk = document.getElementById('form-masuk');
  const banner = document.getElementById('register-success');

  if (daftarBtn) {
    daftarBtn.addEventListener('click', function () {
      daftarBtn.classList.add('bg-white', 'rounded-md', 'shadow-sm', 'text-toscaDark');
      masukBtn.classList.remove('bg-white', 'rounded-md', 'shadow-sm', 'text-toscaDark');
      masukBtn.classList.add('text-slate-500');
      if (formDaftar) formDaftar.classList.remove('hidden');
      if (formMasuk) formMasuk.classList.add('hidden');
    });
  }

  if (masukBtn) {
    masukBtn.addEventListener('click', function () {
      masukBtn.classList.add('bg-white', 'rounded-md', 'shadow-sm', 'text-toscaDark');
      daftarBtn.classList.remove('bg-white', 'rounded-md', 'shadow-sm', 'text-toscaDark');
      daftarBtn.classList.add('text-slate-500');
      if (formMasuk) formMasuk.classList.remove('hidden');
      if (formDaftar) formDaftar.classList.add('hidden');
    });
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get('registered') === '1') {
    if (banner) banner.classList.remove('hidden');
    if (masukBtn) masukBtn.click();
  }
}

function submitRegister() {
  const nama = document.getElementById('reg-nama').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const nik = document.getElementById('reg-nik').value.trim();
  const alasan = document.getElementById('reg-alasan').value.trim();

  if (!nama || !email || !nik) {
    alert('Harap isi semua field yang wajib (Nama, Email, NIK).');
    return;
  }

  Storage.saveUser({ nama, email, nik, alasan });
  window.location.href = 'login.html?registered=1';
}

function submitLogin() {
  const email = document.getElementById('login-email').value.trim();
  const user = Storage.getUser();

  if (!email) {
    alert('Masukkan Email / No HP Anda.');
    return;
  }

  if (user && user.email === email) {
    Storage.saveSession(user.nama);
    window.location.href = 'dashboard.html';
  } else {
    const daftarBaru = confirm('Akun dengan email tersebut tidak ditemukan. Ingin mendaftar baru?');
    if (daftarBaru) {
      document.getElementById('login-email').value = '';
      const daftarBtn = document.querySelector('.tab-daftar');
      if (daftarBtn) daftarBtn.click();
    }
  }
}

const CHAT_FALLBACKS = [
  'Baik, Ibu. Saya catat keluhan Anda. Silakan hubungi kami kembali jika ada pertanyaan lebih lanjut.',
  'Terima kasih informasinya. Untuk tindak lanjut, saya sarankan menyiapkan dokumen pendukung seperti akta nikah dan KTP.',
  'Mohon tunggu sebentar, saya sedang memeriksa berkas Anda. Saya akan kembali dalam waktu dekat.',
  'Untuk kasus seperti ini, sebaiknya kita siapkan bukti pendukung yang kuat agar proses di Pengadilan Agama berjalan lancar.',
  'Saya mengerti, Ibu. Nanti akan saya bantu proses pengajuannya. Sementara ini, silakan kumpulkan dokumen yang diperlukan.',
  'Tentu, bisa. Silakan lanjutkan, Ibu. Saya siap membantu Anda.',
  'Baik, akan saya tindak lanjuti setelah sesi ini. Terima kasih atas kesabarannya.',
  'Mohon maaf atas ketidaknyamanannya. Untuk informasi lebih detail, silakan atur jadwal konsultasi premium.'
];

function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text || !currentChatSessionId) return;

  Storage.saveChatMessage(currentChatSessionId, text, 'user');
  input.value = '';
  input.focus();
  renderMessages();

  const reply = CHAT_FALLBACKS[Math.floor(Math.random() * CHAT_FALLBACKS.length)];
  setTimeout(() => {
    Storage.saveChatMessage(currentChatSessionId, reply, 'lawyer');
    renderMessages();
  }, 600);
}

function renderMessages() {
  const container = document.getElementById('chat-messages');
  if (!container || !currentChatSessionId) return;

  const sesi = Storage.getSession();
  const userInitial = sesi ? sesi.nama.charAt(0).toUpperCase() : 'U';
  const messages = Storage.getChatMessages(currentChatSessionId);

  if (messages.length === 0) {
    container.innerHTML = `<div class="flex items-center justify-center h-full text-slate-400 text-xs">Belum ada pesan. Mulai percakapan dengan mengetik pesan di bawah.</div>`;
    return;
  }

  container.innerHTML = messages.map(m => {
    const isUser = m.sender === 'user';
    return `
      <div class="flex items-start gap-2.5 max-w-lg ${isUser ? 'ml-auto flex-row-reverse' : ''}">
        <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${isUser ? 'bg-toscaDark text-white' : 'bg-toscaDark/20 text-toscaDark'}">${isUser ? userInitial : 'A'}</div>
        <div class="p-3 rounded-2xl shadow-sm text-xs ${isUser ? 'bg-toscaDark/10 border border-toscaLight rounded-tr-none' : 'bg-white border border-oceanLight rounded-tl-none'}">${m.text}</div>
      </div>
    `;
  }).join('');

  container.scrollTop = container.scrollHeight;
}

function initChat() {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('id');
  if (!sessionId) { window.location.href = 'dashboard.html'; return; }

  currentChatSessionId = sessionId;

  const sessions = Storage.getChatSessions();
  const session = sessions.find(s => s.id === sessionId);
  if (!session) { window.location.href = 'dashboard.html'; return; }

  const sesi = Storage.getSession();
  const lawyerEl = document.getElementById('chat-lawyer-name');
  const clientEl = document.getElementById('chat-client-name');

  if (lawyerEl) lawyerEl.innerText = session.lawyer;
  if (clientEl && sesi) clientEl.innerText = sesi.nama;

  const messages = Storage.getChatMessages(sessionId);
  if (messages.length === 0) {
    Storage.saveChatMessage(sessionId, 'Selamat malam, Ibu. Saya dengan konsultan hukum Anda dari Cerai.Pro untuk sesi malam ini. Ada yang bisa saya bantu terkait draf hukum Anda?', 'lawyer');
  }
  renderMessages();
}

function initRating() {
  const stars = document.querySelectorAll('.rating-star');
  let selectedRating = 0;

  stars.forEach(star => {
    star.addEventListener('click', function () {
      selectedRating = parseInt(this.dataset.value);
      stars.forEach((s, i) => {
        s.innerText = i < selectedRating ? '★' : '☆';
        s.classList.toggle('text-amber-400', i < selectedRating);
        s.classList.toggle('text-slate-300', i >= selectedRating);
      });
    });
  });

  const submitBtn = document.getElementById('submit-rating');
  if (submitBtn) {
    submitBtn.addEventListener('click', function () {
      const review = document.getElementById('rating-review').value.trim();

      if (selectedRating === 0) {
        alert('Silakan pilih rating bintang terlebih dahulu.');
        return;
      }

      Storage.saveRating({
        rating: selectedRating,
        review: review || '(Tidak ada komentar)'
      });

      alert('Terima kasih! Penilaian Anda telah disimpan.');
      window.location.href = 'dashboard.html';
    });
  }
}
