const redirectToLogin = function(redirectUrl) {
    location.href = '/login?ReturnUrl=' + encodeURIComponent(redirectUrl);
};

module.exports = function (router, store) {
    router.beforeEach((routeTo, routeFrom, next) => {
        if (typeof(fetch) !== 'undefined') {
            if (routeTo.path !== routeFrom.path) {
                fetch(routeTo.path, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: null,
                    credentials: 'include'
                })
                    .then(response => response.json())
                    .then(responseData => {
                        store.dispatch('updateData', responseData.data);
                        next();
                    })
                    .catch(() => {
                        redirectToLogin(routeTo.path);
                    });
            }
        }
        else {
            if (process.env.VUE_ENV === 'server') {
                next();
            }
            else {
                redirectToLogin('/');
            }
        }
    });
};