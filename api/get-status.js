const GAS_URL = 'https://script.google.com/macros/s/AKfycbz3pGU1eYRl-cClAwQrADTqdD5SYlLlwmueDKphl8NMUXa_qlhUnTm1HE2DQ_9-XfEm/exec';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const params = new URLSearchParams({
    action:  'getStatus',
    orderId: req.query.orderId || ''
  });

  try {
    const gasRes = await fetch(`${GAS_URL}?${params}`);
    const data   = await gasRes.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
