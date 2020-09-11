const redirectToLogin = function(redirectUrl) {
    location.href = '/login?ReturnUrl=' + encodeURIComponent(redirectUrl);
};

module.exports = function (router, store) {
    router.beforeEach((routeTo, routeFrom, next) => {
        if (typeof(fetch) !== undefined) {
            if (store.state.stateString !== undefined) {
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
                        store.dispatch('updateViewData', responseData.viewData);
                        store.dispatch('updateViewModel', responseData.viewModel);
                        next();
                    })
                    .catch(() => {
                        redirectToLogin(routeTo.path);
                    });
            }
            else {
                next();
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