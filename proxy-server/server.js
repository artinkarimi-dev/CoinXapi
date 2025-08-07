const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

let priceCache = {};

const isCacheValid = () => priceCache.data && Date.now() - priceCache.timestamp < 60000;

app.get('/api', async (req, res) => {
    try {
        if (isCacheValid()) {
            console.log('استفاده از کش سرور');
            return res.json(priceCache.data);
        }

        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd', {
            timeout: 5000
        });

        priceCache = {
            data: response.data,
            timestamp: Date.now()
        };

        res.json(response.data);
    } catch (error) {
        console.error('خطا در دریافت داده');
        if (error.response) {
            res.status(error.response.status).json({
                error: 'خطا در API',
                message: error.response.status === 429 ? 'تعداد درخواست‌ها زیاد است، لطفاً بعداً امتحان کنید' : 'خطا در دریافت داده'
            });
        } else if (error.code === 'ECONNABORTED') {
            res.status(504).json({ error: 'تایم‌اوت', message: 'پاسخ API طولانی شد' });
        } else {
            res.status(500).json({ error: 'خطای سرور', message: 'خطا در دریافت اطلاعات' });
        }
    }
});

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});