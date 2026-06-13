const GAS_URL = 'https://script.google.com/macros/s/AKfycbz3pGU1eYRl-cClAwQrADTqdD5SYlLlwmueDKphl8NMUXa_qlhUnTm1HE2DQ_9-XfEm/exec';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const b = req.method === 'POST' ? req.body : req.query;

  const params = new URLSearchParams({
    action:      'createOrder',
    name:        b.name        || '',
    email:       b.email       || '',
    phone:       b.phone       || '',
    bump1:       b.bump1       || 'false',
    bump2:       b.bump2       || 'false',
    bump3:       b.bump3       || 'false',
    totalAmount: b.totalAmount || '229000'
  });

  try {
    const gasRes = await fetch(`${GAS_URL}?${params}`);
    const data   = await gasRes.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
