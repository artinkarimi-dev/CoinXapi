document.addEventListener("DOMContentLoaded", () => {
    let btn1 = document.getElementById("btn1");
    let btn2 = document.getElementById("btn2");
    let btn3 = document.getElementById("btn3");
    let btnShop = document.getElementById("btnShop");
    let tedad = document.getElementById("tedad");
    let priceInput = document.getElementById("price");
    let arzInput = document.getElementById("Arz");
    let errorDiv = document.getElementById("error-message");
    let loadingDiv = document.getElementById("loading");

    let newPrice = 0;
    let selectedCurrency = 'bitcoin';
    let priceCache = {};
    let abortController = null;

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function updatePriceInput() {
        const daryeft = Number(tedad.value) || 1;
        if (daryeft > 0) {
            const colPrice = daryeft * newPrice;
            priceInput.value = "$ " + colPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            console.log(`مقدار نهایی priceInput: ${priceInput.value}, newPrice: ${newPrice}, tedad: ${daryeft}`);
        } else {
            priceInput.value = "$ " + newPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            console.log(`مقدار نهایی priceInput: ${priceInput.value}, newPrice: ${newPrice}`);
        }
    }

    function fetchPriceById(currencyId, retryCount = 2, retryDelay = 1000) {
        loadingDiv.style.display = 'block';
        errorDiv.style.display = 'none';

        if (priceCache[currencyId] && Date.now() - priceCache[currencyId].timestamp < 60000) {
            newPrice = priceCache[currencyId].price;
            console.log(`استفاده از کش برای ${currencyId}: ${newPrice}`);
            updatePriceInput();
            loadingDiv.style.display = 'none';
            return Promise.resolve();
        }

        if (abortController) {
            abortController.abort();
        }
        abortController = new AbortController();

        const apiUrl = 'http://localhost:3000/api';

        return fetch(apiUrl, { signal: abortController.signal })
            .then(response => {
                if (!response.ok) {
                    throw new Error('خطا در ارتباط با سرور');
                }
                return response.json();
            })
            .then(data => {
                if (data && data[currencyId] && (data[currencyId].usd !== undefined || data[currencyId].hasOwnProperty('usd'))) {
                    newPrice = (typeof data[currencyId].usd === 'number') ? data[currencyId].usd : 1;
                    priceCache[currencyId] = {
                        price: newPrice,
                        timestamp: Date.now()
                    };
                    console.log(`قیمت جدید برای ${currencyId}: ${newPrice}`);
                } else {
                    console.warn(`داده نامعتبر برای ${currencyId}, تنظیم به پیش‌فرض`);
                    newPrice = (currencyId === 'tether') ? 1 : 0;
                }
                updatePriceInput();
                loadingDiv.style.display = 'none';
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    console.log('درخواست کنسل شد');
                    return;
                }
                console.error('خطا در دریافت داده');
                if (retryCount > 0) {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            resolve(fetchPriceById(currencyId, retryCount - 1, retryDelay * 2));
                        }, retryDelay);
                    });
                } else {
                    newPrice = (currencyId === 'tether') ? 1 : 0;
                    updatePriceInput();
                    errorDiv.style.display = 'block';
                    errorDiv.textContent = 'خطا در دریافت قیمت. لطفاً دوباره تلاش کنید.';
                    loadingDiv.style.display = 'none';
                    setTimeout(() => {
                        errorDiv.style.display = 'none';
                    }, 5000);
                }
            });
    }

    const debouncedFetchPrice = debounce(fetchPriceById, 500);

    function updateCurrency(currencyCode, currencyId) {
        arzInput.value = currencyCode;
        selectedCurrency = currencyId;
        debouncedFetchPrice(selectedCurrency);
        $('#exampleModalCenter').modal('hide');
    }

    fetchPriceById(selectedCurrency);

    setInterval(() => {
        fetchPriceById(selectedCurrency);
    }, 60000);

    tedad.addEventListener("input", () => {
        updatePriceInput();
    });

    btn1.addEventListener("click", () => {
        btn1.className = "btn2 btn1_Arz btn3";
        btn1.style.fontWeight = "bold";
        btn2.className = "btn2";
        btn3.className = "btn2";
    });

    btn2.addEventListener("click", () => {
        btn1.className = "btn2 btn3";
        btn1.style.fontWeight = "normal";
        btn2.className = "btn1";
        btn3.className = "btn2";
        btnShop.textContent = "Sell currency";
        btnShop.style.backgroundColor = "red";
        btnShop.style.color = "white";
    });

    btn3.addEventListener("click", () => {
        btn1.className = "btn2 btn3";
        btn1.style.fontWeight = "normal";
        btn2.className = "btn2";
        btn3.className = "btn1";
        btnShop.textContent = "Buy currency";
        btnShop.style.backgroundColor = "rgb(162, 255, 13)";
        btnShop.style.color = "black";
    });

    document.getElementById("btc").addEventListener("click", () => {
        updateCurrency("BTC", "bitcoin");
    });

    document.getElementById("eth").addEventListener("click", () => {
        updateCurrency("ETH", "ethereum");
    });

    document.getElementById("usdt").addEventListener("click", () => {
        updateCurrency("USDT", "tether");
    });
});