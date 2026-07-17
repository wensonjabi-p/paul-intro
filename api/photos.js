/* Admin only -- photo upload(POST) / list(GET) / publish toggle & tag edit(PATCH) / delete(DELETE). */
const { put } = require('@vercel/blob');
const { isValidSession, kvListAll, kvReplaceAll, kvPushJSON } = require('./_lib');

module.exports = async (req, res) => {
  if (!isValidSession(req.headers.cookie)) return res.status(401).json({ error: 'login required' });

    try {
        if (req.method === 'GET') {
              const all = await kvListAll('photos:meta');
                    return res.status(200).json({ photos: all.sort((a, b) => b.createdAt - a.createdAt) });
                        }

                            let body = req.body;
                                if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }

                                    if (req.method === 'POST') {
                                          const { dataUrl, caption, tags } = body || {};
                                                if (!dataUrl || !/^data:image\//.test(dataUrl)) return res.status(400).json({ error: 'no image' });
                                                      const m = dataUrl.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
                                                            if (!m) return res.status(400).json({ error: 'bad image format' });
                                                                  const mime = m[1];
                                                                        const buf = Buffer.from(m[2], 'base64');
                                                                              const ext = mime.split('/')[1].replace('jpeg', 'jpg');
                                                                                    const filename = 'photos/' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.' + ext;
                                                                                          const blob = await put(filename, buf, { access: 'public', contentType: mime });
                                                                                                const record = {
                                                                                                        id: filename,
                                                                                                                url: blob.url,
                                                                                                                        caption: (caption || '').trim(),
                                                                                                                                tags: Array.isArray(tags) ? tags : [],
                                                                                                                                        createdAt: Date.now(),
                                                                                                                                                published: true,
                                                                                                                                                      };
                                                                                                                                                            await kvPushJSON('photos:meta', record);
                                                                                                                                                                  return res.status(200).json({ ok: true, photo: record });
                                                                                                                                                                      }
                                                                                                                                                                      
                                                                                                                                                                          if (req.method === 'PATCH') {
                                                                                                                                                                                const { id, published, caption, tags } = body || {};
                                                                                                                                                                                      const all = await kvListAll('photos:meta');
                                                                                                                                                                                            const idx = all.findIndex(p => p.id === id);
                                                                                                                                                                                                  if (idx === -1) return res.status(404).json({ error: 'not found' });
                                                                                                                                                                                                        if (typeof published === 'boolean') all[idx].published = published;
                                                                                                                                                                                                              if (typeof caption === 'string') all[idx].caption = caption;
                                                                                                                                                                                                                    if (Array.isArray(tags)) all[idx].tags = tags;
                                                                                                                                                                                                                          await kvReplaceAll('photos:meta', all);
                                                                                                                                                                                                                                return res.status(200).json({ ok: true, photo: all[idx] });
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                        if (req.method === 'DELETE') {
                                                                                                                                                                                                                                              const { id } = body || {};
                                                                                                                                                                                                                                                    const all = await kvListAll('photos:meta');
                                                                                                                                                                                                                                                          const kept = all.filter(p => p.id !== id);
                                                                                                                                                                                                                                                                await kvReplaceAll('photos:meta', kept);
                                                                                                                                                                                                                                                                      return res.status(200).json({ ok: true });
                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                          
                                                                                                                                                                                                                                                                              res.status(405).json({ error: 'method' });
                                                                                                                                                                                                                                                                                } catch (e) {
                                                                                                                                                                                                                                                                                    res.status(503).json({ error: 'storage not ready: ' + e.message });
                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                      };
                                                                                                                                                                                                                                                                                      
                                                                                                                                                                                                                                                                                      
